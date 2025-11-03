export interface ParsedZone {
  name: string; // e.g., "Zone pastorale d’Akono"
  parishes: ParsedParish[];
}

export interface ParsedParish {
  place?: string; // e.g., AKONO, MFIDA
  name: string; // e.g., Notre-Dame des Sept-Douleurs
  address?: string;
  staff: { name: string; role: string; congregation?: string; notes?: string }[];
}

const roleKeywords = [
  'Curé', 'Administrateur', 'Vicaire', 'Recteur', 'Directeur', 'Aumônier', 'Diacre', 'Responsable', 'Recteur', 'Principal', 'Résident', 'stagiaire', 'Vicaire de w.e', 'Vicaire étudiant'
];

const churchIndicators = [
  'Paroisse', 'Notre', 'St ', 'Sts ', 'Sainte', 'Saint', 'Ste ', 'Basilique', 'Sanctuaire', 'Centre Eucharistique', 'Chapelle'
];

function looksLikeZone(line: string) {
  // e.g., "I. ZONE PASTORALE D’AKONO"
  return /\bZONE PASTORALE\b/i.test(line);
}

function extractZoneName(line: string) {
  // Return proper "Zone pastorale de ..."
  const m = line.match(/ZONE PASTORALE\s+(.*)$/i);
  if (!m) return 'Zone pastorale';
  let tail = m[1].trim();
  return `Zone pastorale ${tail}`;
}

function looksLikeParishStart(line: string) {
  // e.g., "1. AKONO" or "2. MFIDA Ste Famille"
  return /^\s*\d+\./.test(line);
}

function cleanText(s: string) {
  return s.replace(/\s+/g, ' ').replace(/\s+,/g, ',').trim();
}

function extractChurchName(lines: string[]): { place?: string; church?: string } {
  // Detect place on the first numbered line, church on subsequent lines
  const first = lines[0] || '';
  const afterNumber = first.replace(/^\s*\d+\.\s*/, '');
  const parts = afterNumber.split(/\s{2,}|\t/).map((p) => p.trim()).filter(Boolean);
  let place = parts[0];
  let church: string | undefined;

  // Search among following lines for a church indicator
  for (let i = 1; i < lines.length; i++) {
    const l = lines[i].trim();
    if (!l) continue;
    if (churchIndicators.some((kw) => l.startsWith(kw))) {
      church = cleanText(l);
      break;
    }
  }

  // Sometimes the first line already contains a church name after place
  if (!church && parts.length > 1) {
    church = parts.slice(1).join(' ');
  }

  return { place, church };
}

function extractStaffFromBlock(block: string[]): ParsedParish['staff'] {
  const staff: ParsedParish['staff'] = [];
  for (const raw of block) {
    const line = raw.replace(/\t/g, ' ').trim();
    if (!line) continue;

    // Look for role keywords and a name on the same line
    const roleMatch = roleKeywords.find((kw) => new RegExp(`\\b${kw}\\b`, 'i').test(line));
    if (!roleMatch) continue;

    // Heuristic: names are before or after the role marker separated by commas
    // Try pattern: "A. Name, cmf, Curé" or "Curé: A. Name"
    let name: string | undefined;
    let congregation: string | undefined;

    // Pattern 1: Before role, with commas
    const m1 = line.match(/([^,]+?),\s*([^,]*?)?\s*\b(Curé|Administrateur|Vicaire|Recteur|Directeur|Aumônier|Diacre)\b/i);
    if (m1) {
      name = cleanText(m1[1]);
      const maybeCong = cleanText(m1[2] || '');
      if (maybeCong && maybeCong.length <= 8) congregation = maybeCong; // e.g., cmf, sac, cicm
    }

    // Pattern 2: After role with colon
    if (!name) {
      const m2 = line.match(/\b(Curé|Administrateur|Vicaire|Recteur|Directeur|Aumônier|Diacre)\b\s*[:\-]?\s*(.+)$/i);
      if (m2) {
        name = cleanText(m2[2]);
      }
    }

    if (name) {
      staff.push({ name, role: roleMatch, congregation });
    }
  }
  return staff;
}

export function parseZonesAndParishesFromText(text: string): ParsedZone[] {
  const lines = text.split(/\r?\n/);
  const zones: ParsedZone[] = [];

  let currentZone: ParsedZone | null = null;
  let currentParishLines: string[] = [];

  function flushParish() {
    if (!currentZone || currentParishLines.length === 0) return;
    const { place, church } = extractChurchName(currentParishLines);
    const name = cleanText(church || (place ? `Paroisse ${place}` : 'Paroisse'));
    const staff = extractStaffFromBlock(currentParishLines);
    currentZone.parishes.push({ place, name, address: place, staff });
    currentParishLines = [];
  }

  for (const raw of lines) {
    const line = raw.replace(/\u00A0/g, ' ').trim();
    if (!line) continue;

    if (looksLikeZone(line)) {
      // New zone
      flushParish();
      if (currentZone) zones.push(currentZone);
      currentZone = { name: extractZoneName(line), parishes: [] };
      continue;
    }

    if (looksLikeParishStart(line)) {
      flushParish();
      currentParishLines = [line];
      continue;
    }

    if (currentParishLines.length > 0) {
      currentParishLines.push(line);
    }
  }

  // Final flush
  flushParish();
  if (currentZone) zones.push(currentZone);

  // Filter out empty zones
  return zones.filter((z) => z.parishes.length > 0);
}

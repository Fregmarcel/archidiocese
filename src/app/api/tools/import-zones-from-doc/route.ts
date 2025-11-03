import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import { parseZonesAndParishesFromText } from '@/lib/parsers/pastoralZones';
import PastoralZone from '@/models/PastoralZone';
import Parish from '@/models/Parish';
import path from 'path';
import fs from 'fs/promises';
import { slugify, codeify } from '@/lib/slug';

async function readFirstExistingFile(paths: string[]) {
  for (const p of paths) {
    try {
      await fs.access(p);
      const txt = await fs.readFile(p, 'utf-8');
      return { path: p, text: txt };
    } catch {
      // try next
    }
  }
  return null;
}

export async function POST(request: NextRequest) {
  try {
    await connect();

    const { searchParams } = new URL(request.url);
    const replace = ['1', 'true', 'yes'].includes((searchParams.get('replace') || '').toLowerCase());

    const candidates = [
      path.join(process.cwd(), 'doc', 'zones_pastorales.txt'),
      path.join(process.cwd(), 'doc', 'zones.txt'),
      path.join(process.cwd(), 'doc', 'Zone pastoral.txt'),
      path.join(process.cwd(), 'Zone pastoral.txt')
    ];

    const found = await readFirstExistingFile(candidates);
    if (!found) {
      return NextResponse.json({ success: false, message: 'Fichier texte introuvable (doc/zones_pastorales.txt ou Zone pastoral.txt)' }, { status: 404 });
    }

    if (replace) {
      await Parish.deleteMany({});
      await PastoralZone.deleteMany({});
    }

    const parsed = parseZonesAndParishesFromText(found.text);
    let zonesCount = 0;
    let parishesCount = 0;
    const errors: Array<{ scope: 'zone' | 'parish'; name?: string; error: string }> = [];

    // Per-run slug registry to avoid duplicates
    const usedParishSlugs = new Set<string>();
    const makeUniqueParishSlug = (base: string) => {
      const root = slugify(base);
      let candidate = root;
      let i = 2;
      while (usedParishSlugs.has(candidate)) {
        candidate = `${root}-${i++}`;
      }
      usedParishSlugs.add(candidate);
      return candidate;
    };

    for (const zone of parsed) {
      let zoneDoc: any = null;
      try {
        const zoneNameTail = zone.name.replace(/^[Zz]one\s+[Pp]astorale\s*/,'').trim();
        const zoneSlug = slugify(zone.name);
        zoneDoc = await PastoralZone.create({
          name: zone.name,
          description: `Regroupement des paroisses de ${zoneNameTail}`,
          numberOfParishes: zone.parishes.length,
          slug: zoneSlug,
          code: codeify(zoneNameTail, { prefix: 'ZP' })
        });
        zonesCount++;
      } catch (e: any) {
        errors.push({ scope: 'zone', name: zone.name, error: e?.message || 'Erreur inconnue' });
        continue; // skip parishes for this zone
      }

      for (const parish of zone.parishes) {
        try {
          const zoneNameTail = zone.name.replace(/^[Zz]one\s+[Pp]astorale\s*/,'').trim();
          const base = `${parish.name} ${parish.place || zoneNameTail}`.trim();
          const slug = makeUniqueParishSlug(base);
          await Parish.create({
            name: parish.name,
            description: `Paroisse de la ${zone.name}`,
            pastoralZone: zoneDoc._id,
            address: parish.place && parish.place.trim().length > 0 ? parish.place : zoneNameTail,
            staff: Array.isArray(parish.staff) ? parish.staff : [],
            slug,
            code: codeify(slug, { prefix: 'PA' })
          });
          parishesCount++;
        } catch (e: any) {
          errors.push({ scope: 'parish', name: parish.name, error: e?.message || 'Erreur inconnue' });
        }
      }
    }

    return NextResponse.json({ success: true, message: 'Import terminé', counts: { zones: zonesCount, parishes: parishesCount }, source: found.path, errors });
  } catch (error) {
    console.error('Import from doc error:', error);
    return NextResponse.json({ success: false, message: 'Erreur serveur' }, { status: 500 });
  }
}

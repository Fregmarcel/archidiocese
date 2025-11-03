import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import PastoralZone from '@/models/PastoralZone';
import Parish from '@/models/Parish';
import { parseZonesAndParishesFromText } from '@/lib/parsers/pastoralZones';
import { slugify, codeify, normalizeText } from '@/lib/slug';

export async function POST(request: NextRequest) {
  try {
    await connect();
    const { text, replace } = await request.json();
    if (!text) return NextResponse.json({ success: false, message: 'Texte manquant' }, { status: 400 });

    const parsed = parseZonesAndParishesFromText(text);

    if (replace) {
      await PastoralZone.deleteMany({});
      await Parish.deleteMany({});
    }

    for (const zone of parsed) {
      const cleanedName = normalizeText(zone.name);
      const slug = slugify(cleanedName);
      const code = codeify(cleanedName, { prefix: 'ZP' });

      const zoneDoc = await PastoralZone.create({
        name: cleanedName,
        description: `Regroupement des paroisses de ${cleanedName.replace(/^Zone pastorale\s*/i, '').trim()}`,
        numberOfParishes: zone.parishes.length,
        slug,
        code
      });

      for (const parish of zone.parishes) {
        await Parish.create({
          name: normalizeText(parish.name),
          description: `Paroisse de la ${cleanedName}`,
          pastoralZone: zoneDoc._id.toString(),
          address: parish.place || '',
          staff: parish.staff
        });
      }
    }

    return NextResponse.json({ success: true, zones: parsed.length });
  } catch (error) {
    console.error('Import zones/parishes error:', error);
    return NextResponse.json({ success: false, message: 'Erreur serveur' }, { status: 500 });
  }
}

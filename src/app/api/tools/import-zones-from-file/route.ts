import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import { parseZonesAndParishesFromText } from '@/lib/parsers/pastoralZones';
import PastoralZone from '@/models/PastoralZone';
import Parish from '@/models/Parish';

export async function POST(request: NextRequest) {
  try {
    await connect();

    // Accept raw text body (multipart not needed here)
    const text = await request.text();
    if (!text || text.trim().length < 10) {
      return NextResponse.json({ success: false, message: 'Fichier texte vide' }, { status: 400 });
    }

    // Optional query param ?replace=1
    const { searchParams } = new URL(request.url);
    const replace = searchParams.get('replace') === '1';

    if (replace) {
      await PastoralZone.deleteMany({});
      await Parish.deleteMany({});
    }

    const parsed = parseZonesAndParishesFromText(text);

    for (const zone of parsed) {
      const zoneDoc = await PastoralZone.create({
        name: zone.name,
        description: `Regroupement des paroisses de ${zone.name.replace('Zone pastorale', '').trim()}`,
        numberOfParishes: zone.parishes.length
      });

      for (const parish of zone.parishes) {
        await Parish.create({
          name: parish.name,
          description: `Paroisse de la ${zone.name}`,
          pastoralZone: zoneDoc._id.toString(),
          address: parish.place || '',
          staff: parish.staff
        });
      }
    }

    return NextResponse.json({ success: true, zones: parsed.length });
  } catch (error) {
    console.error('Import tools error:', error);
    return NextResponse.json({ success: false, message: 'Erreur serveur' }, { status: 500 });
  }
}

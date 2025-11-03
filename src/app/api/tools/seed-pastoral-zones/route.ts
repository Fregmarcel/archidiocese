import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import PastoralZone from '@/models/PastoralZone';
import Parish from '@/models/Parish';
import path from 'path';
import fs from 'fs/promises';

export async function POST(request: NextRequest) {
  try {
    await connect();

    const { searchParams } = new URL(request.url);
    const replaceParam = searchParams.get('replace');
    let replace = false;

    // support JSON body as well
    try {
      const body = await request.json();
      if (typeof body?.replace === 'boolean') replace = body.replace;
    } catch {
      // ignore if no json body
    }

    if (replaceParam === '1' || replaceParam === 'true') replace = true;

    const filePath = path.join(process.cwd(), 'src', 'data', 'pastoralZones.seed.json');
    const raw = await fs.readFile(filePath, 'utf-8');
    const zones: Array<any> = JSON.parse(raw);

    if (!Array.isArray(zones) || zones.length === 0) {
      return NextResponse.json({ success: false, message: 'Aucune donnée à importer' }, { status: 400 });
    }

    if (replace) {
      await Parish.deleteMany({});
      await PastoralZone.deleteMany({});
    }

    let createdZones = 0;
    let createdParishes = 0;

    for (const z of zones) {
      const parishes: Array<any> = Array.isArray(z.parishes) ? z.parishes : [];

      const zoneDoc = await PastoralZone.create({
        name: z.name,
        description: z.description || '',
        code: z.code,
        slug: z.slug,
        leaders: Array.isArray(z.leaders) ? z.leaders : [],
        numberOfParishes: parishes.length,
        coordinator: z.coordinator || undefined,
        coordinatorPhone: z.coordinatorPhone || undefined,
        coordinatorEmail: z.coordinatorEmail || undefined,
        address: z.address || undefined
      });
      createdZones++;

      for (const p of parishes) {
        await Parish.create({
          name: p.name,
          address: p.address || '',
          description: p.description || '',
          staff: Array.isArray(p.staff) ? p.staff : [],
          pastoralZone: zoneDoc._id
        });
        createdParishes++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Import terminé: ${createdZones} zones, ${createdParishes} paroisses`,
      counts: { zones: createdZones, parishes: createdParishes }
    });
  } catch (error) {
    console.error('Erreur lors du seed pastoral zones:', error);
    return NextResponse.json({ success: false, message: 'Erreur serveur' }, { status: 500 });
  }
}

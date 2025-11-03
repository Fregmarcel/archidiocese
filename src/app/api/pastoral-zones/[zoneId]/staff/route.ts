import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import PastoralZone from '@/models/PastoralZone';

export async function GET(request: NextRequest, { params }: { params: Promise<{ zoneId: string }> }) {
  try {
    await connect();
    const { zoneId } = await params;
    const zone = await PastoralZone.findById(zoneId, { leaders: 1, name: 1 });
    if (!zone) return NextResponse.json({ success: false, message: 'Zone non trouvée' }, { status: 404 });
    return NextResponse.json({ success: true, data: zone.leaders || [] });
  } catch (error) {
    console.error('Erreur GET zone leaders:', error);
    return NextResponse.json({ success: false, message: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ zoneId: string }> }) {
  try {
    await connect();
    const { zoneId } = await params;
    const body = await request.json();
    const updated = await PastoralZone.findByIdAndUpdate(zoneId, { $push: { leaders: body } }, { new: true });
    return NextResponse.json({ success: true, data: updated?.leaders || [] });
  } catch (error) {
    console.error('Erreur POST zone leader:', error);
    return NextResponse.json({ success: false, message: 'Erreur serveur' }, { status: 500 });
  }
}

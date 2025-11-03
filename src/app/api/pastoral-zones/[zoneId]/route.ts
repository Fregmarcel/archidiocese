import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import PastoralZone from '@/models/PastoralZone';

export async function GET(request: NextRequest, { params }: { params: Promise<{ zoneId: string }> }) {
  try {
    await connect();
    const { zoneId } = await params;
    const zone = await PastoralZone.findById(zoneId);
    if (!zone) return NextResponse.json({ success: false, message: 'Zone non trouvée' }, { status: 404 });
    return NextResponse.json({ success: true, data: zone });
  } catch (error) {
    console.error('Erreur GET zone:', error);
    return NextResponse.json({ success: false, message: 'Erreur serveur' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ zoneId: string }> }) {
  try {
    await connect();
    const { zoneId } = await params;
    const body = await request.json();
    const updated = await PastoralZone.findByIdAndUpdate(zoneId, body, { new: true });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Erreur PUT zone:', error);
    return NextResponse.json({ success: false, message: 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ zoneId: string }> }) {
  try {
    await connect();
    const { zoneId } = await params;
    await PastoralZone.findByIdAndDelete(zoneId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur DELETE zone:', error);
    return NextResponse.json({ success: false, message: 'Erreur serveur' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import TVShow from '@/models/TVShow';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connect();
    const { id } = await params;
    const doc = await TVShow.findById(id);
    if (!doc) return NextResponse.json({ success: false, message: 'Non trouvé' }, { status: 404 });
    return NextResponse.json({ success: true, data: doc });
  } catch (e) {
    return NextResponse.json({ success: false, message: 'Erreur serveur' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connect();
    const { id } = await params;
    const body = await request.json();
    const updated = await TVShow.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ success: true, data: updated });
  } catch (e) {
    return NextResponse.json({ success: false, message: 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connect();
    const { id } = await params;
    await TVShow.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false, message: 'Erreur serveur' }, { status: 500 });
  }
}

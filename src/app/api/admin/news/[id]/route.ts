import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import News from '@/models/News';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connect();
    const { id } = await params;
    const body = await request.json();
    const updated = await News.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ data: updated });
  } catch (e) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connect();
    const { id } = await params;
    await News.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

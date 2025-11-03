import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import Event from '@/models/Event';

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    await connect();
    const doc = await Event.findOne({ slug }).lean();
    if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ data: doc });
  } catch (e) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

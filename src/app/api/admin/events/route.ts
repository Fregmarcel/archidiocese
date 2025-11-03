import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import Event from '@/models/Event';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'fr';
  try {
    await connect();
    const now = new Date();
    const data = await Event.find({ locale }).sort({ date: 1 }).lean();
    return NextResponse.json({ data });
  } catch (e) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connect();
    const body = await request.json();
    const created = await Event.create(body);
    return NextResponse.json({ data: created });
  } catch (e) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

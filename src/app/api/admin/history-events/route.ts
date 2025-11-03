import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import HistoryEvent from '@/models/HistoryEvent';

export async function GET() {
  try {
    await connect();
    const data = await HistoryEvent.find({}).sort({ displayOrder: 1, year: -1 }).lean();
    return NextResponse.json({ data });
  } catch (e) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connect();
    const body = await request.json();
    const created = await HistoryEvent.create(body);
    return NextResponse.json({ data: created });
  } catch (e) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

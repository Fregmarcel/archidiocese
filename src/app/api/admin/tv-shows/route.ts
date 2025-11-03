import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import TVShow from '@/models/TVShow';

export async function GET() {
  try {
    await connect();
    const data = await TVShow.find({}).sort({ broadcastDate: -1, createdAt: -1 }).lean();
    return NextResponse.json({ data });
  } catch (e) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connect();
    const body = await request.json();
    const created = await TVShow.create(body);
    return NextResponse.json({ data: created });
  } catch (e) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

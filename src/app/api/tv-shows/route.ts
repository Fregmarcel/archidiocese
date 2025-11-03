import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import TVShow from '@/models/TVShow';

export async function GET(request: NextRequest) {
  try {
    await connect();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '12');

    const query: any = {};
    if (category) query.category = category;

    const shows = await TVShow.find(query).sort({ broadcastDate: -1, createdAt: -1 }).limit(limit);
    return NextResponse.json({ success: true, data: shows });
  } catch (e) {
    return NextResponse.json({ success: false, message: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connect();
    const body = await request.json();
    const created = await TVShow.create(body);
    return NextResponse.json({ success: true, data: created });
  } catch (e) {
    return NextResponse.json({ success: false, message: 'Erreur serveur' }, { status: 500 });
  }
}

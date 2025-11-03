import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import News from '@/models/News';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'fr';
  try {
    await connect();
    const data = await News.find({ locale }).sort({ publishedAt: -1, createdAt: -1 }).lean();
    return NextResponse.json({ data });
  } catch (e) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connect();
    const body = await request.json();
    const created = await News.create(body);
    return NextResponse.json({ data: created });
  } catch (e) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import News from '@/models/News';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'fr';
  try {
    await connect();
    const data = await News.find({ locale, status: 'published' })
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(20)
      .lean();
    return NextResponse.json({ data });
  } catch (e) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

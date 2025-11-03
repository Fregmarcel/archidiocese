import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import Event from '@/models/Event';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'fr';
  try {
    await connect();
    const now = new Date();
    const data = await Event.find({ locale, status: 'published', date: { $gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()) } })
      .sort({ date: 1 })
      .limit(30)
      .lean();
    return NextResponse.json({ data });
  } catch (e) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

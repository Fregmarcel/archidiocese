import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import Partner from '@/models/Partner';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'fr';
  const category = searchParams.get('category');
  try {
    await connect();
    const q: any = { locale };
    if (category) q.category = category;
    const data = await Partner.find(q).sort({ order: 1, name: 1 }).lean();
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connect();
    const body = await request.json();
    const created = await Partner.create(body);
    return NextResponse.json({ data: created });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import Parish from '@/models/Parish';

export async function GET() {
  try {
    await connect();
    const data = await Parish.find({}).sort({ name: 1 });
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connect();
    const body = await request.json();
    const created = await Parish.create(body);
    return NextResponse.json({ data: created });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

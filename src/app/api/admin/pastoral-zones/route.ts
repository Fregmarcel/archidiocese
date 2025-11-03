import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import PastoralZone from '@/models/PastoralZone';

export async function GET() {
  try {
    await connect();
    const zones = await PastoralZone.find({}).sort({ name: 1 });
    return NextResponse.json({ data: zones });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connect();
    const body = await request.json();
    const created = await PastoralZone.create(body);
    return NextResponse.json({ data: created });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

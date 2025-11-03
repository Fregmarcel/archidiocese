import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import Parish from '@/models/Parish';
import mongoose from 'mongoose';

export async function GET(request: NextRequest) {
  try {
    await connect();
    const { searchParams } = new URL(request.url);
    const zoneId = searchParams.get('zone');
    const search = searchParams.get('search');

    const query: any = {};
    if (zoneId) query.pastoralZone = new mongoose.Types.ObjectId(zoneId);
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { address: { $regex: search, $options: 'i' } }
      ];
    }

    const list = await Parish.find(query).sort({ name: 1 });
    return NextResponse.json({ success: true, data: list });
  } catch (error) {
    console.error('Erreur GET parishes:', error);
    return NextResponse.json({ success: false, message: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connect();
    const body = await request.json();
    if (body.pastoralZone && typeof body.pastoralZone === 'string') {
      body.pastoralZone = new mongoose.Types.ObjectId(body.pastoralZone);
    }
    const created = await Parish.create(body);
    return NextResponse.json({ success: true, data: created });
  } catch (error) {
    console.error('Erreur POST parish:', error);
    return NextResponse.json({ success: false, message: 'Erreur serveur' }, { status: 500 });
  }
}

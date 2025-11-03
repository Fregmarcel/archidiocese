import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import Parish from '@/models/Parish';
import mongoose from 'mongoose';

export async function GET(request: NextRequest, { params }: { params: { zoneId: string } }) {
  try {
    await connect();

    const { zoneId } = params;
    if (!zoneId || !mongoose.Types.ObjectId.isValid(zoneId)) {
      return NextResponse.json({ success: false, message: 'Paramètre zoneId invalide' }, { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';

    const zoneObjectId = new mongoose.Types.ObjectId(zoneId);
    const baseQuery: any = { pastoralZone: zoneObjectId };

    let query: any = baseQuery;
    if (search) {
      query = {
        $and: [
          baseQuery,
          {
            $or: [
              { name: { $regex: search, $options: 'i' } },
              { description: { $regex: search, $options: 'i' } },
              { address: { $regex: search, $options: 'i' } }
            ]
          }
        ]
      };
    }

    const parishes = await Parish.find(query).sort({ name: 1 }).lean();

    return NextResponse.json({ success: true, data: parishes });
  } catch (error) {
    console.error('Erreur lors de la récupération des paroisses:', error);
    return NextResponse.json({ success: false, message: 'Erreur serveur' }, { status: 500 });
  }
}

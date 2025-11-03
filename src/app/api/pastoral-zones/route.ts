import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import PastoralZone from '@/models/PastoralZone';

export async function GET(request: NextRequest) {
  try {
    await connect();
    
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    
    let query = {};
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ]
      };
    }
    
    const zones = await PastoralZone.find(query).sort({ name: 1 });
    
    return NextResponse.json({
      success: true,
      data: zones
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des zones pastorales:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connect();
    
    const data = await request.json();
    const zone = new PastoralZone(data);
    const savedZone = await zone.save();
    
    return NextResponse.json({
      success: true,
      data: savedZone,
      message: 'Zone pastorale créée avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la création de la zone pastorale:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la création' },
      { status: 500 }
    );
  }
}

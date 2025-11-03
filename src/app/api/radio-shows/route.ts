import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import RadioShow from '@/models/RadioShow';

export async function GET(request: NextRequest) {
  try {
    await connect();
    
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    let query: any = {};
    
    if (type) {
      query.type = type;
    }
    
    if (category) {
      query.category = category;
    }
    
    const shows = await RadioShow.find(query)
      .sort({ broadcastDate: -1, createdAt: -1 })
      .limit(limit);
    
    return NextResponse.json({
      success: true,
      data: shows
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des émissions radio:', error);
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
    const show = new RadioShow(data);
    const savedShow = await show.save();
    
    return NextResponse.json({
      success: true,
      data: savedShow,
      message: 'Émission radio créée avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la création de l\'émission radio:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la création' },
      { status: 500 }
    );
  }
}

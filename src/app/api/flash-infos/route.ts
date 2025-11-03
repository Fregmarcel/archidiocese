import { NextRequest, NextResponse } from 'next/server';
import { connect } from '../../../lib/mongodb';
import FlashInfo from '../../../models/FlashInfo';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  try {
    await connect();
    
    const now = new Date();
    
    // Récupérer les flash infos actives et dans les dates valides
    const flashInfos = await FlashInfo
      .find({
        isActive: true,
        $and: [
          {
            $or: [
              { startDate: null },
              { startDate: { $lte: now } }
            ]
          },
          {
            $or: [
              { endDate: null },
              { endDate: { $gte: now } }
            ]
          }
        ]
      })
      .sort({ displayOrder: 1, createdAt: -1 })
      .lean();
    
    return NextResponse.json({
      success: true,
      data: flashInfos.map(info => ({
        id: info._id,
        title: info.title,
        content: info.content,
        url: info.url
      }))
    });
  } catch (error) {
    console.error('Error fetching flash infos:', error);
    return NextResponse.json({
      success: false,
      message: 'Erreur lors de la récupération des flash infos'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({
        success: false,
        message: 'Non autorisé'
      }, { status: 401 });
    }

    await connect();
    
    const body = await request.json();
    
    // Validation des champs requis
    if (!body.title || !body.content) {
      return NextResponse.json({
        success: false,
        message: 'Les champs titre et contenu sont obligatoires'
      }, { status: 400 });
    }

    // Si aucun displayOrder n'est spécifié, mettre à la fin
    if (body.displayOrder === undefined) {
      const lastInfo = await FlashInfo.findOne({}).sort({ displayOrder: -1 }).lean() as any;
      body.displayOrder = (lastInfo?.displayOrder || 0) + 1;
    }
    
    const flashInfo = new FlashInfo(body);
    await flashInfo.save();
    
    return NextResponse.json({
      success: true,
      data: flashInfo,
      message: 'Flash info créée avec succès'
    });
  } catch (error) {
    console.error('Error creating flash info:', error);
    return NextResponse.json({
      success: false,
      message: 'Erreur lors de la création de la flash info'
    }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { connect } from '../../../lib/mongodb';
import CurieMember from '../../../models/CurieMember';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  try {
    await connect();
    
    const curieMembers = await CurieMember
      .find({})
      .sort({ displayOrder: 1, createdAt: -1 })
      .lean();
    
    return NextResponse.json({
      success: true,
      data: curieMembers
    });
  } catch (error) {
    console.error('Error fetching curie members:', error);
    return NextResponse.json({
      success: false,
      message: 'Erreur lors de la récupération des membres de la curie'
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
    if (!body.name || !body.role || !body.image) {
      return NextResponse.json({
        success: false,
        message: 'Les champs nom, rôle et image sont obligatoires'
      }, { status: 400 });
    }

    // Si aucun displayOrder n'est spécifié, mettre à la fin
    if (body.displayOrder === undefined) {
      const lastMember = await CurieMember.findOne({}).sort({ displayOrder: -1 }).lean() as any;
      body.displayOrder = (lastMember?.displayOrder || 0) + 1;
    }
    
    const curieMember = new CurieMember(body);
    await curieMember.save();
    
    return NextResponse.json({
      success: true,
      data: curieMember,
      message: 'Membre de la curie créé avec succès'
    });
  } catch (error) {
    console.error('Error creating curie member:', error);
    return NextResponse.json({
      success: false,
      message: 'Erreur lors de la création du membre de la curie'
    }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { connect } from '../../../../lib/mongodb';
import CurieMember from '../../../../models/CurieMember';
import { auth } from '@clerk/nextjs/server';
import mongoose from 'mongoose';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connect();
    
    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({
        success: false,
        message: 'ID invalide'
      }, { status: 400 });
    }
    
    const curieMember = await CurieMember.findById(id).lean();
    
    if (!curieMember) {
      return NextResponse.json({
        success: false,
        message: 'Membre de la curie non trouvé'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: curieMember
    });
  } catch (error) {
    console.error('Error fetching curie member:', error);
    return NextResponse.json({
      success: false,
      message: 'Erreur lors de la récupération du membre de la curie'
    }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({
        success: false,
        message: 'Non autorisé'
      }, { status: 401 });
    }

    await connect();
    
    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({
        success: false,
        message: 'ID invalide'
      }, { status: 400 });
    }
    
    const body = await request.json();
    
    // Validation des champs requis
    if (!body.name || !body.role || !body.image) {
      return NextResponse.json({
        success: false,
        message: 'Les champs nom, rôle et image sont obligatoires'
      }, { status: 400 });
    }
    
    const curieMember = await CurieMember.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    
    if (!curieMember) {
      return NextResponse.json({
        success: false,
        message: 'Membre de la curie non trouvé'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: curieMember,
      message: 'Membre de la curie mis à jour avec succès'
    });
  } catch (error) {
    console.error('Error updating curie member:', error);
    return NextResponse.json({
      success: false,
      message: 'Erreur lors de la mise à jour du membre de la curie'
    }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({
        success: false,
        message: 'Non autorisé'
      }, { status: 401 });
    }

    await connect();
    
    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({
        success: false,
        message: 'ID invalide'
      }, { status: 400 });
    }
    
    const curieMember = await CurieMember.findByIdAndDelete(id);
    
    if (!curieMember) {
      return NextResponse.json({
        success: false,
        message: 'Membre de la curie non trouvé'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Membre de la curie supprimé avec succès'
    });
  } catch (error) {
    console.error('Error deleting curie member:', error);
    return NextResponse.json({
      success: false,
      message: 'Erreur lors de la suppression du membre de la curie'
    }, { status: 500 });
  }
}

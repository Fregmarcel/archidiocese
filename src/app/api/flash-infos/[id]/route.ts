import { NextRequest, NextResponse } from 'next/server';
import { connect } from '../../../../lib/mongodb';
import FlashInfo from '../../../../models/FlashInfo';
import { auth } from '@clerk/nextjs/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connect();
    
    const flashInfo = await FlashInfo.findById(id).lean();
    
    if (!flashInfo) {
      return NextResponse.json({
        success: false,
        message: 'Flash info non trouvée'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: flashInfo
    });
  } catch (error) {
    console.error('Error fetching flash info:', error);
    return NextResponse.json({
      success: false,
      message: 'Erreur lors de la récupération de la flash info'
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({
        success: false,
        message: 'Non autorisé'
      }, { status: 401 });
    }

    const { id } = await params;
    await connect();
    
    const body = await request.json();
    
    const flashInfo = await FlashInfo.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    
    if (!flashInfo) {
      return NextResponse.json({
        success: false,
        message: 'Flash info non trouvée'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: flashInfo,
      message: 'Flash info mise à jour avec succès'
    });
  } catch (error) {
    console.error('Error updating flash info:', error);
    return NextResponse.json({
      success: false,
      message: 'Erreur lors de la mise à jour de la flash info'
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({
        success: false,
        message: 'Non autorisé'
      }, { status: 401 });
    }

    const { id } = await params;
    await connect();
    
    const flashInfo = await FlashInfo.findByIdAndDelete(id);
    
    if (!flashInfo) {
      return NextResponse.json({
        success: false,
        message: 'Flash info non trouvée'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Flash info supprimée avec succès'
    });
  } catch (error) {
    console.error('Error deleting flash info:', error);
    return NextResponse.json({
      success: false,
      message: 'Erreur lors de la suppression de la flash info'
    }, { status: 500 });
  }
}

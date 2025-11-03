import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import RadioShow from '@/models/RadioShow';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connect();
    
    const { id } = await params;
    const show = await RadioShow.findById(id);
    
    if (!show) {
      return NextResponse.json(
        { success: false, message: 'Émission non trouvée' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: show
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'émission:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connect();
    
    const { id } = await params;
    const updates = await request.json();
    
    const show = await RadioShow.findByIdAndUpdate(id, updates, { new: true });
    
    if (!show) {
      return NextResponse.json(
        { success: false, message: 'Émission non trouvée' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: show,
      message: 'Émission mise à jour avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'émission:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la mise à jour' },
      { status: 500 }
    );
  }
}

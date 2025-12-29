import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import Chaplaincy from '@/models/Chaplaincy';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connect();
    const chaplaincy = await Chaplaincy.findById(params.id);
    
    if (!chaplaincy) {
      return NextResponse.json(
        { success: false, error: 'Aumônerie non trouvée' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: chaplaincy });
  } catch (error) {
    console.error('Error fetching chaplaincy:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connect();
    const body = await request.json();
    
    const chaplaincy = await Chaplaincy.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!chaplaincy) {
      return NextResponse.json(
        { success: false, error: 'Aumônerie non trouvée' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: chaplaincy });
  } catch (error) {
    console.error('Error updating chaplaincy:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la mise à jour' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connect();
    const chaplaincy = await Chaplaincy.findByIdAndDelete(params.id);
    
    if (!chaplaincy) {
      return NextResponse.json(
        { success: false, error: 'Aumônerie non trouvée' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, message: 'Aumônerie supprimée' });
  } catch (error) {
    console.error('Error deleting chaplaincy:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la suppression' },
      { status: 500 }
    );
  }
}

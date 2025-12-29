import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import University from '@/models/University';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connect();
    const university = await University.findById(params.id);
    
    if (!university) {
      return NextResponse.json(
        { success: false, error: 'Université non trouvée' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: university });
  } catch (error) {
    console.error('Error fetching university:', error);
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
    
    const university = await University.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!university) {
      return NextResponse.json(
        { success: false, error: 'Université non trouvée' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: university });
  } catch (error) {
    console.error('Error updating university:', error);
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
    const university = await University.findByIdAndDelete(params.id);
    
    if (!university) {
      return NextResponse.json(
        { success: false, error: 'Université non trouvée' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, message: 'Université supprimée' });
  } catch (error) {
    console.error('Error deleting university:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la suppression' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import ReligiousInstitute from '@/models/ReligiousInstitute';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connect();
    const { id } = await params;
    const institute = await ReligiousInstitute.findById(id);
    
    if (!institute) {
      return NextResponse.json(
        { success: false, error: 'Institut non trouvé' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: institute });
  } catch (error) {
    console.error('Error fetching institute:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connect();
    const { id } = await params;
    const body = await request.json();
    
    const institute = await ReligiousInstitute.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!institute) {
      return NextResponse.json(
        { success: false, error: 'Institut non trouvé' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: institute });
  } catch (error) {
    console.error('Error updating institute:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la mise à jour' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connect();
    const { id } = await params;
    const institute = await ReligiousInstitute.findByIdAndDelete(id);
    
    if (!institute) {
      return NextResponse.json(
        { success: false, error: 'Institut non trouvé' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, message: 'Institut supprimé' });
  } catch (error) {
    console.error('Error deleting institute:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la suppression' },
      { status: 500 }
    );
  }
}

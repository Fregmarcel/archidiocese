import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import DiocesanService from '@/models/DiocesanService';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connect();
    const service = await DiocesanService.findById(params.id);
    
    if (!service) {
      return NextResponse.json(
        { success: false, error: 'Service non trouvé' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: service });
  } catch (error) {
    console.error('Error fetching service:', error);
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
    
    const service = await DiocesanService.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!service) {
      return NextResponse.json(
        { success: false, error: 'Service non trouvé' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: service });
  } catch (error) {
    console.error('Error updating service:', error);
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
    const service = await DiocesanService.findByIdAndDelete(params.id);
    
    if (!service) {
      return NextResponse.json(
        { success: false, error: 'Service non trouvé' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, message: 'Service supprimé' });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la suppression' },
      { status: 500 }
    );
  }
}

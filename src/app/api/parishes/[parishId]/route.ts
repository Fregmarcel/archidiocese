import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import Parish from '@/models/Parish';

export async function GET(request: NextRequest, { params }: { params: Promise<{ parishId: string }> }) {
  try {
    await connect();
    
    const { parishId } = await params;
    const parish = await Parish.findById(parishId);
    
    if (!parish) {
      return NextResponse.json(
        { success: false, message: 'Paroisse non trouvée' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: parish
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de la paroisse:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ parishId: string }> }) {
  try {
    await connect();
    const { parishId } = await params;
    const body = await request.json();
    const updated = await Parish.findByIdAndUpdate(parishId, body, { new: true });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Erreur maj paroisse:', error);
    return NextResponse.json({ success: false, message: 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ parishId: string }> }) {
  try {
    await connect();
    const { parishId } = await params;
    await Parish.findByIdAndDelete(parishId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur suppression paroisse:', error);
    return NextResponse.json({ success: false, message: 'Erreur serveur' }, { status: 500 });
  }
}

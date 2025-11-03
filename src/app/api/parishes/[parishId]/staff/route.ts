import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import Parish from '@/models/Parish';

export async function GET(request: NextRequest, { params }: { params: Promise<{ parishId: string }> }) {
  try {
    await connect();
    const { parishId } = await params;
    const parish = await Parish.findById(parishId, { staff: 1, name: 1 });
    if (!parish) return NextResponse.json({ success: false, message: 'Paroisse non trouvée' }, { status: 404 });
    return NextResponse.json({ success: true, data: parish.staff || [] });
  } catch (error) {
    console.error('Erreur GET staff:', error);
    return NextResponse.json({ success: false, message: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ parishId: string }> }) {
  try {
    await connect();
    const { parishId } = await params;
    const body = await request.json();
    const updated = await Parish.findByIdAndUpdate(
      parishId,
      { $push: { staff: body } },
      { new: true }
    );
    return NextResponse.json({ success: true, data: updated?.staff || [] });
  } catch (error) {
    console.error('Erreur POST staff:', error);
    return NextResponse.json({ success: false, message: 'Erreur serveur' }, { status: 500 });
  }
}

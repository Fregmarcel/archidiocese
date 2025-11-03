import { NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import CurieMember from '@/models/CurieMember';

export async function GET() {
  try {
    await connect();
    
    const members = await CurieMember.find({}).lean();
    
    return NextResponse.json({
      success: true,
      count: members.length,
      members: members.map(m => ({
        _id: m._id,
        name: m.name,
        role: m.role,
        isActive: m.isActive,
        displayOrder: m.displayOrder
      }))
    });
  } catch (error) {
    console.error('Error counting members:', error);
    return NextResponse.json({
      success: false,
      message: 'Erreur lors du comptage'
    }, { status: 500 });
  }
}

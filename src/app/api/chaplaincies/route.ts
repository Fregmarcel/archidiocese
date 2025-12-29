import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import Chaplaincy from '@/models/Chaplaincy';

export async function GET(request: NextRequest) {
  try {
    await connect();
    
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    
    if (slug) {
      const chaplaincy = await Chaplaincy.findOne({ slug, isActive: true });
      if (!chaplaincy) {
        return NextResponse.json(
          { success: false, error: 'Chaplaincy not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: chaplaincy });
    }
    
    const chaplaincies = await Chaplaincy.find({ isActive: true })
      .sort({ name: 1 });
    
    return NextResponse.json({ success: true, data: chaplaincies });
  } catch (error) {
    console.error('Error fetching chaplaincies:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch chaplaincies' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connect();
    const body = await request.json();
    
    const chaplaincy = await Chaplaincy.create(body);
    
    return NextResponse.json({ success: true, data: chaplaincy }, { status: 201 });
  } catch (error) {
    console.error('Error creating chaplaincy:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create chaplaincy' },
      { status: 500 }
    );
  }
}

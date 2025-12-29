import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import University from '@/models/University';

export async function GET(request: NextRequest) {
  try {
    await connect();
    
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    
    if (slug) {
      const university = await University.findOne({ slug, isActive: true });
      if (!university) {
        return NextResponse.json(
          { success: false, error: 'University not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: university });
    }
    
    const universities = await University.find({ isActive: true })
      .sort({ name: 1 });
    
    return NextResponse.json({ success: true, data: universities });
  } catch (error) {
    console.error('Error fetching universities:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch universities' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connect();
    const body = await request.json();
    
    const university = await University.create(body);
    
    return NextResponse.json({ success: true, data: university }, { status: 201 });
  } catch (error) {
    console.error('Error creating university:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create university' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import ReligiousInstitute from '@/models/ReligiousInstitute';

export async function GET(request: NextRequest) {
  try {
    await connect();
    
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    
    if (slug) {
      const institute = await ReligiousInstitute.findOne({ slug, isActive: true });
      if (!institute) {
        return NextResponse.json(
          { success: false, error: 'Institute not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: institute });
    }
    
    const institutes = await ReligiousInstitute.find({ isActive: true })
      .sort({ name: 1 });
    
    return NextResponse.json({ success: true, data: institutes });
  } catch (error) {
    console.error('Error fetching religious institutes:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch institutes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connect();
    const body = await request.json();
    
    const institute = await ReligiousInstitute.create(body);
    
    return NextResponse.json({ success: true, data: institute }, { status: 201 });
  } catch (error) {
    console.error('Error creating religious institute:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create institute' },
      { status: 500 }
    );
  }
}

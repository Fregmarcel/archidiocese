import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import DiocesanService from '@/models/DiocesanService';

export async function GET(request: NextRequest) {
  try {
    await connect();
    
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    
    if (slug) {
      const service = await DiocesanService.findOne({ slug, isActive: true });
      if (!service) {
        return NextResponse.json(
          { success: false, error: 'Service not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: service });
    }
    
    const services = await DiocesanService.find({ isActive: true })
      .sort({ name: 1 });
    
    return NextResponse.json({ success: true, data: services });
  } catch (error) {
    console.error('Error fetching diocesan services:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connect();
    const body = await request.json();
    
    const service = await DiocesanService.create(body);
    
    return NextResponse.json({ success: true, data: service }, { status: 201 });
  } catch (error) {
    console.error('Error creating diocesan service:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create service' },
      { status: 500 }
    );
  }
}

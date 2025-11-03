import { NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import HistoryEvent from '@/models/HistoryEvent';

export async function GET() {
  try {
    await connect();
    
    // Récupérer tous les événements historiques actifs triés par année décroissante
    const historyEvents = await HistoryEvent
      .find({ isActive: true })
      .sort({ year: -1, displayOrder: 1 })
      .lean();
    
    return NextResponse.json({
      success: true,
      data: historyEvents.map(event => ({
        id: event._id,
        year: event.year,
        title: event.title,
        description: event.description,
        image: event.image,
        category: event.category
      }))
    });
  } catch (error) {
    console.error('Error fetching history events:', error);
    return NextResponse.json({
      success: false,
      message: 'Erreur lors de la récupération des événements historiques'
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connect();
    const body = await request.json();
    const created = await HistoryEvent.create(body);
    return NextResponse.json({ success: true, data: created });
  } catch (error) {
    console.error('Error creating history event:', error);
    return NextResponse.json({ success: false, message: 'Erreur lors de la création' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import NewsletterSubscription from '@/models/NewsletterSubscription';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({
      success: false,
      message: 'Email manquant'
    }, { status: 400 });
  }

  try {
    await connect();

    const subscription = await NewsletterSubscription.findOne({ email });

    if (!subscription) {
      return NextResponse.json({
        success: false,
        message: 'Aucun abonnement trouvé pour cet email'
      }, { status: 404 });
    }

    subscription.isActive = false;
    subscription.unsubscriptionDate = new Date();
    await subscription.save();

    return NextResponse.json({
      success: true,
      message: 'Vous avez été désabonné de la newsletter avec succès.'
    });

  } catch (error) {
    console.error('Error unsubscribing from newsletter:', error);
    return NextResponse.json({
      success: false,
      message: 'Erreur lors de la désinscription'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connect();
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({
        success: false,
        message: 'Email manquant'
      }, { status: 400 });
    }

    const subscription = await NewsletterSubscription.findOne({ email });

    if (!subscription) {
      return NextResponse.json({
        success: false,
        message: 'Aucun abonnement trouvé pour cet email'
      }, { status: 404 });
    }

    subscription.isActive = false;
    subscription.unsubscriptionDate = new Date();
    await subscription.save();

    return NextResponse.json({
      success: true,
      message: 'Vous avez été désabonné de la newsletter avec succès.'
    });

  } catch (error) {
    console.error('Error unsubscribing from newsletter:', error);
    return NextResponse.json({
      success: false,
      message: 'Erreur lors de la désinscription'
    }, { status: 500 });
  }
}

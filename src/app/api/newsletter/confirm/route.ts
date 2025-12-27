import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import NewsletterSubscription from '@/models/NewsletterSubscription';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({
      success: false,
      message: 'Token de confirmation manquant'
    }, { status: 400 });
  }

  try {
    await connect();

    const subscription = await NewsletterSubscription.findOne({
      confirmationToken: token
    });

    if (!subscription) {
      return NextResponse.json({
        success: false,
        message: 'Token de confirmation invalide'
      }, { status: 404 });
    }

    // Vérifier si le token a expiré (48h)
    if (subscription.confirmationSentAt) {
      const expirationTime = 48 * 60 * 60 * 1000; // 48 heures en ms
      const tokenAge = Date.now() - subscription.confirmationSentAt.getTime();
      
      if (tokenAge > expirationTime) {
        return NextResponse.json({
          success: false,
          message: 'Le token de confirmation a expiré. Veuillez vous réinscrire.'
        }, { status: 410 });
      }
    }

    // Activer l'abonnement
    subscription.confirmed = true;
    subscription.isActive = true;
    subscription.confirmationToken = undefined;
    await subscription.save();

    return NextResponse.json({
      success: true,
      message: 'Votre inscription à la newsletter a été confirmée avec succès ! Vous recevrez désormais nos actualités.'
    });

  } catch (error) {
    console.error('Error confirming newsletter subscription:', error);
    return NextResponse.json({
      success: false,
      message: 'Erreur lors de la confirmation'
    }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import NewsletterSubscription from '@/models/NewsletterSubscription';
import { sendNewsletterEmail } from '@/lib/email';
import { auth } from '@clerk/nextjs/server';

// Route protégée - uniquement pour les admins
export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({
        success: false,
        message: 'Non autorisé'
      }, { status: 401 });
    }

    await connect();

    const { newsTitle, newsExcerpt, newsSlug, newsImage } = await request.json();

    if (!newsTitle || !newsExcerpt || !newsSlug) {
      return NextResponse.json({
        success: false,
        message: 'Données manquantes (titre, extrait ou slug)'
      }, { status: 400 });
    }

    // Récupérer tous les abonnés actifs
    const subscribers = await NewsletterSubscription.find({
      isActive: true,
      confirmed: true
    }).select('email firstName language').lean();

    if (subscribers.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'Aucun abonné actif trouvé',
        stats: { sent: 0, failed: 0 }
      });
    }

    // Formater les données pour l'envoi
    const formattedSubscribers = subscribers.map(sub => ({
      email: sub.email as string,
      firstName: sub.firstName as string | undefined,
      language: (sub.language as string) || 'fr'
    }));

    // Envoyer les emails
    const results = await sendNewsletterEmail(
      formattedSubscribers,
      newsTitle,
      newsExcerpt,
      newsSlug,
      newsImage
    );

    return NextResponse.json({
      success: true,
      message: `Newsletter envoyée à ${results.sent} abonné(s)`,
      stats: {
        sent: results.sent,
        failed: results.failed,
        total: subscribers.length,
        errors: results.errors.length > 0 ? results.errors : undefined
      }
    });

  } catch (error) {
    console.error('Error sending newsletter:', error);
    return NextResponse.json({
      success: false,
      message: 'Erreur lors de l\'envoi de la newsletter'
    }, { status: 500 });
  }
}

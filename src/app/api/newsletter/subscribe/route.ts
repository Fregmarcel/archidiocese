import { NextRequest, NextResponse } from 'next/server';
import { connect } from '../../../../lib/mongodb';
import NewsletterSubscription from '../../../../models/NewsletterSubscription';

export async function POST(request: NextRequest) {
  try {
    await connect();
    
    const { email, firstName, lastName, language = 'fr', source = 'homepage' } = await request.json();
    
    // Validation email
    if (!email || !email.includes('@')) {
      return NextResponse.json({
        success: false,
        message: 'Adresse email invalide'
      }, { status: 400 });
    }

    // Vérifier si l'email existe déjà
    const existingSubscription = await NewsletterSubscription.findOne({ email });
    
    if (existingSubscription) {
      if (existingSubscription.isActive && existingSubscription.confirmed) {
        return NextResponse.json({
          success: false,
          message: 'Cette adresse email est déjà abonnée à notre newsletter'
        }, { status: 409 });
      } else {
        // Réactiver l'abonnement existant
        existingSubscription.isActive = false; // Sera activé après confirmation
        existingSubscription.confirmed = false;
        existingSubscription.firstName = firstName || existingSubscription.firstName;
        existingSubscription.lastName = lastName || existingSubscription.lastName;
        existingSubscription.language = language;
        existingSubscription.source = source;
        existingSubscription.subscriptionDate = new Date();
        existingSubscription.unsubscriptionDate = null;
        
        const token = existingSubscription.generateConfirmationToken();
        await existingSubscription.save();
        
        // TODO: Envoyer email de confirmation
        console.log(`Email de confirmation à envoyer à ${email} avec token: ${token}`);
        
        return NextResponse.json({
          success: true,
          message: 'Un email de confirmation a été envoyé à votre adresse. Veuillez vérifier votre boîte de réception.',
          requiresConfirmation: true
        });
      }
    }

    // Créer un nouveau abonnement
    const subscription = new NewsletterSubscription({
      email,
      firstName,
      lastName,
      language,
      source,
      isActive: false, // Sera activé après confirmation
      confirmed: false
    });

    const token = subscription.generateConfirmationToken();
    await subscription.save();

    // TODO: Envoyer email de confirmation
    console.log(`Email de confirmation à envoyer à ${email} avec token: ${token}`);
    
    return NextResponse.json({
      success: true,
      message: 'Merci pour votre inscription ! Un email de confirmation a été envoyé à votre adresse. Veuillez vérifier votre boîte de réception.',
      requiresConfirmation: true
    });
    
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return NextResponse.json({
      success: false,
      message: 'Une erreur est survenue lors de l\'inscription'
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connect();
    
    const stats = await NewsletterSubscription.aggregate([
      {
        $group: {
          _id: null,
          totalSubscriptions: { $sum: 1 },
          activeSubscriptions: {
            $sum: {
              $cond: [{ $and: ['$isActive', '$confirmed'] }, 1, 0]
            }
          },
          pendingConfirmations: {
            $sum: {
              $cond: [{ $and: [{ $not: '$confirmed' }, { $ne: ['$confirmationToken', null] }] }, 1, 0]
            }
          }
        }
      }
    ]);
    
    return NextResponse.json({
      success: true,
      data: stats[0] || {
        totalSubscriptions: 0,
        activeSubscriptions: 0,
        pendingConfirmations: 0
      }
    });
  } catch (error) {
    console.error('Error fetching newsletter stats:', error);
    return NextResponse.json({
      success: false,
      message: 'Erreur lors de la récupération des statistiques'
    }, { status: 500 });
  }
}

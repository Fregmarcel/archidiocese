import mongoose, { Schema, Document } from 'mongoose';

export interface INewsletterSubscription extends Document {
  email: string;
  firstName?: string;
  lastName?: string;
  isActive: boolean;
  subscriptionDate: Date;
  unsubscriptionDate?: Date;
  language: string;
  source: string;
  confirmed: boolean;
  confirmationToken?: string;
  confirmationSentAt?: Date;
}

const NewsletterSubscriptionSchema = new Schema<INewsletterSubscription>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  firstName: {
    type: String,
    trim: true,
    default: null
  },
  lastName: {
    type: String,
    trim: true,
    default: null
  },
  isActive: {
    type: Boolean,
    default: false, // Nécessite confirmation par email
    index: true
  },
  subscriptionDate: {
    type: Date,
    default: Date.now,
    index: true
  },
  unsubscriptionDate: {
    type: Date,
    default: null
  },
  language: {
    type: String,
    enum: ['fr', 'en'],
    default: 'fr'
  },
  source: {
    type: String,
    enum: ['homepage', 'contact', 'manual', 'other'],
    default: 'homepage'
  },
  confirmed: {
    type: Boolean,
    default: false,
    index: true
  },
  confirmationToken: {
    type: String,
    default: null,
    index: true
  },
  confirmationSentAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Index composé pour optimiser les requêtes
NewsletterSubscriptionSchema.index({ 
  isActive: 1, 
  confirmed: 1, 
  subscriptionDate: -1 
});

// Méthode pour générer un token de confirmation
NewsletterSubscriptionSchema.methods.generateConfirmationToken = function() {
  this.confirmationToken = Math.random().toString(36).substring(2, 15) + 
                          Math.random().toString(36).substring(2, 15);
  this.confirmationSentAt = new Date();
  return this.confirmationToken;
};

// Méthode pour confirmer l'abonnement
NewsletterSubscriptionSchema.methods.confirmSubscription = function() {
  this.confirmed = true;
  this.isActive = true;
  this.confirmationToken = null;
  return this.save();
};

const NewsletterSubscription = mongoose.models.NewsletterSubscription || 
  mongoose.model<INewsletterSubscription>('NewsletterSubscription', NewsletterSubscriptionSchema);

export default NewsletterSubscription;

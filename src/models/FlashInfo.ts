import mongoose, { Schema, Document } from 'mongoose';

export interface IFlashInfo extends Document {
  title: string;
  content: string;
  url?: string;
  isActive: boolean;
  displayOrder: number;
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const FlashInfoSchema = new Schema<IFlashInfo>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 200
  },
  content: {
    type: String,
    required: true,
    trim: true,
    maxLength: 500
  },
  url: {
    type: String,
    trim: true,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  displayOrder: {
    type: Number,
    default: 0,
    index: true
  },
  startDate: {
    type: Date,
    default: null
  },
  endDate: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Index pour optimiser les requêtes
FlashInfoSchema.index({ isActive: 1, displayOrder: 1, startDate: 1, endDate: 1 });

// Méthode pour vérifier si l'info est active selon les dates
FlashInfoSchema.methods.isCurrentlyActive = function() {
  const now = new Date();
  
  if (!this.isActive) return false;
  
  if (this.startDate && now < this.startDate) return false;
  if (this.endDate && now > this.endDate) return false;
  
  return true;
};

// Méthode pour formater l'affichage
FlashInfoSchema.methods.toDisplayFormat = function() {
  return {
    id: this._id,
    title: this.title,
    content: this.content,
    url: this.url,
    displayOrder: this.displayOrder
  };
};

const FlashInfo = mongoose.models.FlashInfo || mongoose.model<IFlashInfo>('FlashInfo', FlashInfoSchema);

export default FlashInfo;

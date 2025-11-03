import mongoose, { Schema, Document } from 'mongoose';

export interface IHistoryEvent extends Document {
  year: number;
  title: string;
  description: string;
  image: string;
  category: 'creation' | 'construction' | 'nomination' | 'modernisation' | 'other';
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const HistoryEventSchema = new Schema<IHistoryEvent>({
  year: {
    type: Number,
    required: true,
    min: 1800,
    max: new Date().getFullYear() + 10,
    index: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 200
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxLength: 1000
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['creation', 'construction', 'nomination', 'modernisation', 'other'],
    default: 'other',
    index: true
  },
  displayOrder: {
    type: Number,
    default: 0,
    index: true
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  }
}, {
  timestamps: true
});

// Index pour optimiser les requêtes
HistoryEventSchema.index({ year: -1, displayOrder: 1 });
HistoryEventSchema.index({ isActive: 1, year: -1 });

// Méthode pour formater l'affichage
HistoryEventSchema.methods.toDisplayFormat = function() {
  return {
    id: this._id,
    year: this.year,
    title: this.title,
    description: this.description,
    image: this.image,
    category: this.category
  };
};

const HistoryEvent = mongoose.models.HistoryEvent || mongoose.model<IHistoryEvent>('HistoryEvent', HistoryEventSchema);

export default HistoryEvent;

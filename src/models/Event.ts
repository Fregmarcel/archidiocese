import mongoose from 'mongoose';

export interface IEvent extends mongoose.Document {
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  image?: string;
  date: Date;
  location?: string;
  tags?: string[];
  locale: string;
  status: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new mongoose.Schema<IEvent>({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, index: true, lowercase: true },
  excerpt: { type: String, default: '' },
  content: { type: String, default: '' },
  image: { type: String, default: '' },
  date: { type: Date, required: true, index: true },
  location: { type: String, default: '' },
  tags: { type: [String], default: [] },
  locale: { type: String, required: true, default: 'fr', index: true },
  status: { type: String, enum: ['draft', 'published'], default: 'draft', index: true },
}, { timestamps: true });

EventSchema.index({ locale: 1, status: 1, date: 1 });

export default mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);

import mongoose from 'mongoose';

export interface INews extends mongoose.Document {
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  image?: string; // URL absolute ou chemin public
  tags?: string[];
  locale: string; // 'fr' | 'en' ...
  status: 'draft' | 'published';
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const NewsSchema = new mongoose.Schema<INews>({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, index: true, lowercase: true },
  excerpt: { type: String, default: '' },
  content: { type: String, default: '' },
  image: { type: String, default: '' },
  tags: { type: [String], default: [] },
  locale: { type: String, required: true, default: 'fr', index: true },
  status: { type: String, enum: ['draft', 'published'], default: 'draft', index: true },
  publishedAt: { type: Date },
}, {
  timestamps: true
});

NewsSchema.index({ locale: 1, status: 1, publishedAt: -1 });

export default mongoose.models.News || mongoose.model<INews>('News', NewsSchema);

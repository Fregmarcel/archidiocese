import mongoose from 'mongoose';

export interface ITVShow {
  _id?: string;
  title: string;
  description: string;
  category: 'messe' | 'evenement' | 'enseignement' | 'autre';
  duration?: string;
  videoUrl?: string;
  imageUrl?: string;
  host?: string;
  broadcastDate?: Date;
  isLive?: boolean;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const TVShowSchema = new mongoose.Schema<ITVShow>({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['messe', 'evenement', 'enseignement', 'autre'], required: true },
  duration: { type: String },
  videoUrl: { type: String, trim: true },
  imageUrl: { type: String, trim: true },
  host: { type: String, trim: true },
  broadcastDate: { type: Date },
  isLive: { type: Boolean, default: false },
  tags: [String]
}, { timestamps: true });

export default mongoose.models.TVShow || mongoose.model<ITVShow>('TVShow', TVShowSchema);

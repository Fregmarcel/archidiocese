import mongoose from 'mongoose';

export interface IRadioShow {
  _id?: string;
  title: string;
  description: string;
  type: 'live' | 'recorded';
  category: 'messe' | 'predication' | 'magazine' | 'temoignage' | 'autre';
  duration: string; // Format: "45 min"
  audioUrl?: string;
  imageUrl?: string;
  host?: string; // Animateur/Présentateur
  recordedAt?: Date;
  broadcastDate?: Date;
  isLive?: boolean;
  listenCount?: number;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const RadioShowSchema = new mongoose.Schema<IRadioShow>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['live', 'recorded'],
    required: true,
    default: 'recorded'
  },
  category: {
    type: String,
    enum: ['messe', 'predication', 'magazine', 'temoignage', 'autre'],
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  audioUrl: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
    trim: true
  },
  host: {
    type: String,
    trim: true
  },
  recordedAt: {
    type: Date
  },
  broadcastDate: {
    type: Date
  },
  isLive: {
    type: Boolean,
    default: false
  },
  listenCount: {
    type: Number,
    default: 0
  },
  tags: [String]
}, {
  timestamps: true
});

export default mongoose.models.RadioShow || mongoose.model<IRadioShow>('RadioShow', RadioShowSchema);

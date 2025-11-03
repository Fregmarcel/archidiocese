import mongoose from 'mongoose';

export interface IParish {
  _id?: string;
  name: string;
  description: string;
  pastoralZone: string; // Reference to PastoralZone (ObjectId as string)
  pastor?: string;
  vicePastor?: string;
  address: string;
  phone?: string;
  email?: string;
  website?: string;
  founded?: Date;
  massSchedule?: {
    weekdays?: string;
    saturday?: string;
    sunday?: string;
  };
  services?: string[];
  groups?: string[];
  events?: string[];
  images?: string[];
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  staff?: {
    name: string;
    role: string; // e.g., Curé, Administrateur, Vicaire, Recteur, Directeur
    congregation?: string; // e.g., cmf, sac, cssp, etc.
    notes?: string;
  }[];
  // Stable identifiers
  slug?: string; // e.g., paroisse-notre-dame-des-sept-douleurs-akono
  code?: string; // e.g., PA-AKONO-NDSD
  createdAt?: Date;
  updatedAt?: Date;
}

const ParishSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  pastoralZone: { type: mongoose.Schema.Types.ObjectId, ref: 'PastoralZone', required: true, index: true },
  pastor: { type: String, trim: true },
  vicePastor: { type: String, trim: true },
  address: { type: String, required: true, trim: true },
  phone: { type: String, trim: true },
  email: { type: String, trim: true, lowercase: true },
  website: { type: String, trim: true },
  founded: { type: Date },
  massSchedule: {
    weekdays: String,
    saturday: String,
    sunday: String
  },
  services: [String],
  groups: [String],
  events: [String],
  images: [String],
  coordinates: { latitude: Number, longitude: Number },
  staff: [
    { name: { type: String, required: true, trim: true }, role: { type: String, required: true, trim: true }, congregation: { type: String, trim: true }, notes: { type: String, trim: true } }
  ],
  slug: { type: String, trim: true, index: true, unique: true, sparse: true },
  code: { type: String, trim: true, index: true, unique: true, sparse: true }
}, { timestamps: true });

export default mongoose.models.Parish || mongoose.model<IParish>('Parish', ParishSchema);

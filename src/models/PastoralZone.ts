import mongoose from 'mongoose';

export interface IZoneLeader { name: string; role: string; phone?: string; email?: string; }

export interface IPastoralZone {
  _id?: string;
  name: string;
  description: string;
  numberOfParishes: number;
  coordinator?: string;
  coordinatorPhone?: string;
  coordinatorEmail?: string;
  address?: string;
  leaders?: IZoneLeader[];
  // Stable identifiers
  slug?: string; // e.g., zone-pastorale-d-akono
  code?: string; // e.g., ZP-AKONO
  createdAt?: Date;
  updatedAt?: Date;
}

const PastoralZoneSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  numberOfParishes: { type: Number, required: true, min: 0 },
  coordinator: { type: String, trim: true },
  coordinatorPhone: { type: String, trim: true },
  coordinatorEmail: { type: String, trim: true, lowercase: true },
  address: { type: String, trim: true },
  leaders: [
    { name: { type: String, required: true, trim: true }, role: { type: String, required: true, trim: true }, phone: { type: String, trim: true }, email: { type: String, trim: true, lowercase: true } }
  ],
  slug: { type: String, trim: true, index: true, unique: true, sparse: true },
  code: { type: String, trim: true, index: true, unique: true, sparse: true }
}, { timestamps: true });

export default mongoose.models.PastoralZone || mongoose.model<IPastoralZone>('PastoralZone', PastoralZoneSchema);

import mongoose from 'mongoose';

export interface IServiceLeader {
  name: string;
  role: string;
  phone?: string;
  email?: string;
}

export interface IDiocesanService {
  _id?: string;
  name: string;
  description: string;
  category?: string; // 'pastoral', 'administrative', 'social', etc.
  coordinator?: string;
  coordinatorPhone?: string;
  coordinatorEmail?: string;
  address?: string;
  schedule?: string; // Horaires d'ouverture
  leaders?: IServiceLeader[];
  slug?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const DiocesanServiceSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { type: String, trim: true },
  coordinator: { type: String, trim: true },
  coordinatorPhone: { type: String, trim: true },
  coordinatorEmail: { type: String, trim: true, lowercase: true },
  address: { type: String, trim: true },
  schedule: { type: String, trim: true },
  leaders: [
    {
      name: { type: String, required: true, trim: true },
      role: { type: String, required: true, trim: true },
      phone: { type: String, trim: true },
      email: { type: String, trim: true, lowercase: true }
    }
  ],
  slug: { type: String, trim: true, index: true, unique: true, sparse: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.DiocesanService || mongoose.model<IDiocesanService>('DiocesanService', DiocesanServiceSchema);

import mongoose from 'mongoose';

export interface IInstituteLeader {
  name: string;
  role: string;
  phone?: string;
  email?: string;
}

export interface IReligiousInstitute {
  _id?: string;
  name: string;
  description: string;
  type?: string; // 'congregation', 'order', 'monastery', 'community'
  gender?: string; // 'male', 'female', 'mixed'
  superior?: string;
  superiorPhone?: string;
  superiorEmail?: string;
  address?: string;
  foundedYear?: number;
  numberOfMembers?: number;
  charism?: string; // Charisme de l'institut
  leaders?: IInstituteLeader[];
  slug?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const ReligiousInstituteSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  type: { type: String, trim: true },
  gender: { type: String, enum: ['male', 'female', 'mixed'], trim: true },
  superior: { type: String, trim: true },
  superiorPhone: { type: String, trim: true },
  superiorEmail: { type: String, trim: true, lowercase: true },
  address: { type: String, trim: true },
  foundedYear: { type: Number },
  numberOfMembers: { type: Number },
  charism: { type: String, trim: true },
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

export default mongoose.models.ReligiousInstitute || mongoose.model<IReligiousInstitute>('ReligiousInstitute', ReligiousInstituteSchema);

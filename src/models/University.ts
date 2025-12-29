import mongoose from 'mongoose';

export interface IUniversityChaplain {
  name: string;
  role: string;
  phone?: string;
  email?: string;
}

export interface IUniversity {
  _id?: string;
  name: string;
  description: string;
  type?: string; // 'university', 'grande-ecole', 'college'
  chaplain?: string;
  chaplainPhone?: string;
  chaplainEmail?: string;
  address?: string;
  massSchedule?: string;
  activities?: string; // Activités proposées
  chaplains?: IUniversityChaplain[];
  slug?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const UniversitySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  type: { type: String, trim: true },
  chaplain: { type: String, trim: true },
  chaplainPhone: { type: String, trim: true },
  chaplainEmail: { type: String, trim: true, lowercase: true },
  address: { type: String, trim: true },
  massSchedule: { type: String, trim: true },
  activities: { type: String, trim: true },
  chaplains: [
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

export default mongoose.models.University || mongoose.model<IUniversity>('University', UniversitySchema);

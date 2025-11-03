import mongoose from 'mongoose';

export type PartnerCategoryKey = 'universites' | 'recherche' | 'entreprises' | 'etranger' | 'emploi';

export interface IPartner extends mongoose.Document {
  name: string;
  url?: string;
  description?: string;
  logo?: string;
  category: PartnerCategoryKey;
  locale: string;
  order?: number;
  createdAt: Date;
  updatedAt: Date;
}

const PartnerSchema = new mongoose.Schema<IPartner>({
  name: { type: String, required: true, trim: true },
  url: { type: String, default: '' },
  description: { type: String, default: '' },
  logo: { type: String, default: '' },
  category: { type: String, enum: ['universites','recherche','entreprises','etranger','emploi'], required: true, index: true },
  locale: { type: String, required: true, default: 'fr', index: true },
  order: { type: Number, default: 0, index: true },
}, { timestamps: true });

PartnerSchema.index({ locale: 1, category: 1, order: 1, name: 1 });

export default mongoose.models.Partner || mongoose.model<IPartner>('Partner', PartnerSchema);

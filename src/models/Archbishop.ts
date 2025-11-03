import mongoose, { Schema, model, models } from 'mongoose';

export interface IArchbishop {
  locale: string; // 'fr' | 'en'
  name: string;
  title?: string; // e.g., Archevêque Métropolitain de Yaoundé
  description?: string;
  portraitUrl?: string;
  bibliography?: string[]; // list of URLs or identifiers (legacy)
  bibliographyRich?: string; // Rich HTML content for biography
  publications?: string[]; // list of URLs or identifiers
  gallery?: string[]; // list of image URLs
  updatedAt?: Date;
  createdAt?: Date;
}

const ArchbishopSchema = new Schema<IArchbishop>({
  locale: { type: String, required: true, index: true, unique: true },
  name: { type: String, required: true },
  title: { type: String },
  description: { type: String },
  portraitUrl: { type: String },
  bibliography: { type: [String], default: [] },
  bibliographyRich: { type: String },
  publications: { type: [String], default: [] },
  gallery: { type: [String], default: [] },
}, { timestamps: true });

export const Archbishop = models.Archbishop || model<IArchbishop>('Archbishop', ArchbishopSchema);

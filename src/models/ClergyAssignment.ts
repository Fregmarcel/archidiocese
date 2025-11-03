import mongoose, { Schema, Document, models, model } from 'mongoose';

export type AssignmentScope = 'curie' | 'zone' | 'parish' | 'sanctuary' | 'seminary' | 'service';

export interface IClergyAssignment extends Document {
  name: string; // e.g., "A. Jean Marie ..." or "Mgr ..." or "P. ..."
  role: string; // Curé, Administrateur, Vicaire, Modérateur, Vicaire Général, Recteur, etc.
  congregation?: string; // cmf, sac, cicm, etc.
  scope: AssignmentScope; // where this role applies
  zoneId?: string; // optional link to PastoralZone
  parishId?: string; // optional link to Parish
  notes?: string;
  phone?: string;
  email?: string;
  startDate?: Date;
  endDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const ClergyAssignmentSchema = new Schema<IClergyAssignment>({
  name: { type: String, required: true, trim: true },
  role: { type: String, required: true, trim: true },
  congregation: { type: String, trim: true },
  scope: { type: String, enum: ['curie', 'zone', 'parish', 'sanctuary', 'seminary', 'service'], required: true, index: true },
  zoneId: { type: String, index: true },
  parishId: { type: String, index: true },
  notes: { type: String, trim: true },
  phone: { type: String, trim: true },
  email: { type: String, trim: true, lowercase: true }
}, { timestamps: true });

export const ClergyAssignment = models.ClergyAssignment || model<IClergyAssignment>('ClergyAssignment', ClergyAssignmentSchema);

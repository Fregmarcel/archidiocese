import mongoose, { Schema, model, models } from 'mongoose';

export interface IUserProfile {
  clerkId: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  createdAt?: Date;
  isAdmin?: boolean;
  role?: string;
}

const UserProfileSchema = new Schema<IUserProfile>({
  clerkId: { type: String, required: true, unique: true, index: true },
  email: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, default: false, index: true },
  role: { type: String, index: true },
});

export const UserProfile = models.UserProfile || model<IUserProfile>('UserProfile', UserProfileSchema);

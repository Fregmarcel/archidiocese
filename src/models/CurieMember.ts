import mongoose from 'mongoose';

export interface ICurieMember {
  _id?: string;
  name: string;
  role: string;
  subtitle?: string;
  image: string;
  biography?: string;
  email?: string;
  phone?: string;
  address?: string;
  ordination?: string;
  dateOfBirth?: string;
  placeOfBirth?: string;
  nationality?: string;
  languages?: string[];
  education?: string[];
  ministries?: string[];
  publications?: string[];
  isActive: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const curieMemberSchema = new mongoose.Schema<ICurieMember>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  subtitle: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  biography: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  ordination: {
    type: String,
    trim: true
  },
  dateOfBirth: {
    type: String,
    trim: true
  },
  placeOfBirth: {
    type: String,
    trim: true
  },
  nationality: {
    type: String,
    trim: true
  },
  languages: [{
    type: String,
    trim: true
  }],
  education: [{
    type: String,
    trim: true
  }],
  ministries: [{
    type: String,
    trim: true
  }],
  publications: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  displayOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index pour l'ordre d'affichage
curieMemberSchema.index({ displayOrder: 1, isActive: 1 });

// Méthode pour formater les données pour l'affichage
curieMemberSchema.methods.toDisplayFormat = function() {
  return {
    id: this._id.toString(),
    name: this.name,
    role: this.role,
    subtitle: this.subtitle,
    image: this.image,
    biography: this.biography,
    email: this.email,
    phone: this.phone,
    address: this.address,
    ordination: this.ordination,
    dateOfBirth: this.dateOfBirth,
    placeOfBirth: this.placeOfBirth,
    nationality: this.nationality,
    languages: this.languages || [],
    education: this.education || [],
    ministries: this.ministries || [],
    publications: this.publications || []
  };
};

export default mongoose.models.CurieMember || mongoose.model<ICurieMember>('CurieMember', curieMemberSchema);

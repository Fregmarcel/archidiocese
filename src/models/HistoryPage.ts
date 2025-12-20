import mongoose, { Schema, model, models } from 'mongoose';

export interface IDepartmentData {
  name: string;
  superficie: string;
  arrondissements: number;
  population: number;
}

export interface IStatistic {
  label: string;
  value: string | number;
}

export interface IPastoralAction {
  title: string;
  description: string;
  programs: {
    name: string;
    target: string;
    actions: string;
    actors: string;
    collaborators: string;
  }[];
}

export interface IHistoryPage {
  locale: string; // 'fr' | 'en'
  
  // Section I - Présentation générale
  missionPresence: string; // "1890"
  apostolicVicariate: string; // "1931"
  archdiocesisErection: string; // "04 septembre 1955"
  
  departments: IDepartmentData[];
  
  // Statistiques religieuses
  baptizedCatholics: number;
  nonCatholicChristians: number;
  muslims: number;
  revivalChurches: number;
  neoPagans: number;
  undefinedReligion: number;
  totalPopulation: number;
  
  // Présence missionnaire
  diocesanPriests: number;
  priestsStudyingLocal: number;
  priestsStudyingAbroad: number;
  fideiDonumPriests: number;
  totalPriests: number;
  receivedFideiDonum: number;
  religiousPriests: number;
  religiousBrothers: number;
  religiousSisters: number;
  catechists: number;
  
  // Situation géographique et stratégique
  geographicSituation: string;
  strategicSituation: string;
  spokenLanguages: string;
  migrationIssue: string;
  
  // Patrimoine
  landHeritage: string;
  infrastructures: string;
  humanCapital: string;
  spiritualHeritage: string;
  
  // Sanctuaires (JSON array)
  sanctuaries: {
    name: string;
    location: string;
    department: string;
    pastoralZone: string;
    erectionYear: string;
  }[];
  
  // Associations et mouvements
  associations: {
    platform: string;
    count: number;
  }[];
  
  // Section II - Départements
  mfoundiAnalysis: string; // Texte SWOT
  mefouAfambaAnalysis: string;
  mefouAkonoAnalysis: string;
  
  // Section III - Action pastorale
  teachingAction: IPastoralAction;
  sanctificationAction: IPastoralAction;
  governmentAction: IPastoralAction;
  
  // Organigramme
  moderators: string[];
  vicarsGeneral: string[];
  chancellors: string[];
  episcopalVicars: number;
  
  // Images de galerie
  galleryImages: string[];
  
  conclusion: string;
  
  createdAt?: Date;
  updatedAt?: Date;
}

const HistoryPageSchema = new Schema<IHistoryPage>({
  locale: { type: String, required: true, index: true, unique: true },
  
  // Section I
  missionPresence: { type: String, default: "1890" },
  apostolicVicariate: { type: String, default: "1931" },
  archdiocesisErection: { type: String, default: "04 septembre 1955" },
  
  departments: [{
    name: String,
    superficie: String,
    arrondissements: Number,
    population: Number
  }],
  
  baptizedCatholics: { type: Number, default: 2371213 },
  nonCatholicChristians: { type: Number, default: 656961 },
  muslims: { type: Number, default: 122026 },
  revivalChurches: { type: Number, default: 199953 },
  neoPagans: { type: Number, default: 4 },
  undefinedReligion: { type: Number, default: 934985 },
  totalPopulation: { type: Number, default: 4285042 },
  
  diocesanPriests: { type: Number, default: 298 },
  priestsStudyingLocal: { type: Number, default: 32 },
  priestsStudyingAbroad: { type: Number, default: 37 },
  fideiDonumPriests: { type: Number, default: 10 },
  totalPriests: { type: Number, default: 298 },
  receivedFideiDonum: { type: Number, default: 20 },
  religiousPriests: { type: Number, default: 253 },
  religiousBrothers: { type: Number, default: 12 },
  religiousSisters: { type: Number, default: 1174 },
  catechists: { type: Number, default: 3338 },
  
  geographicSituation: { type: String },
  strategicSituation: { type: String },
  spokenLanguages: { type: String },
  migrationIssue: { type: String },
  
  landHeritage: { type: String },
  infrastructures: { type: String },
  humanCapital: { type: String },
  spiritualHeritage: { type: String },
  
  sanctuaries: [{
    name: String,
    location: String,
    department: String,
    pastoralZone: String,
    erectionYear: String
  }],
  
  associations: [{
    platform: String,
    count: Number
  }],
  
  mfoundiAnalysis: { type: String },
  mefouAfambaAnalysis: { type: String },
  mefouAkonoAnalysis: { type: String },
  
  teachingAction: {
    title: String,
    description: String,
    programs: [{
      name: String,
      target: String,
      actions: String,
      actors: String,
      collaborators: String
    }]
  },
  
  sanctificationAction: {
    title: String,
    description: String,
    programs: [{
      name: String,
      target: String,
      actions: String,
      actors: String,
      collaborators: String
    }]
  },
  
  governmentAction: {
    title: String,
    description: String,
    programs: [{
      name: String,
      target: String,
      actions: String,
      actors: String,
      collaborators: String
    }]
  },
  
  moderators: [String],
  vicarsGeneral: [String],
  chancellors: [String],
  episcopalVicars: { type: Number, default: 24 },
  
  galleryImages: [String],
  
  conclusion: { type: String },
}, { timestamps: true });

export const HistoryPage = models.HistoryPage || model<IHistoryPage>('HistoryPage', HistoryPageSchema);

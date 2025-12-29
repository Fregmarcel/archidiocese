export interface ReligiousInstituteData {
  _id?: string;
  name: string;
  description: string;
  type?: string;
  gender?: string;
  superior?: string;
  superiorPhone?: string;
  superiorEmail?: string;
  address?: string;
  foundedYear?: number;
  numberOfMembers?: number;
  charism?: string;
  slug?: string;
  isActive?: boolean;
}

export const religiousInstituteCrudConfig = {
  title: "Instituts Religieux",
  apiEndpoint: "/api/religious-institutes",
  fields: [
    {
      name: "name",
      label: "Nom de l'institut",
      type: "text" as const,
      required: true,
      placeholder: "Ex: Sœurs du Saint-Cœur de Marie"
    },
    {
      name: "description",
      label: "Description",
      type: "textarea" as const,
      required: true,
      placeholder: "Description de l'institut religieux..."
    },
    {
      name: "type",
      label: "Type",
      type: "select" as const,
      required: false,
      options: [
        { value: "Congrégation", label: "Congrégation" },
        { value: "Ordre", label: "Ordre" },
        { value: "Monastère", label: "Monastère" },
        { value: "Société", label: "Société de vie apostolique" }
      ]
    },
    {
      name: "gender",
      label: "Genre",
      type: "select" as const,
      required: false,
      options: [
        { value: "male", label: "Masculin" },
        { value: "female", label: "Féminin" },
        { value: "mixed", label: "Mixte" }
      ]
    },
    {
      name: "superior",
      label: "Supérieur(e)",
      type: "text" as const,
      required: false,
      placeholder: "Nom du/de la supérieur(e)"
    },
    {
      name: "superiorPhone",
      label: "Téléphone",
      type: "text" as const,
      required: false,
      placeholder: "+237 6XX XXX XXX"
    },
    {
      name: "superiorEmail",
      label: "Email",
      type: "email" as const,
      required: false,
      placeholder: "email@institut.org"
    },
    {
      name: "address",
      label: "Adresse",
      type: "text" as const,
      required: false,
      placeholder: "Adresse de la maison"
    },
    {
      name: "foundedYear",
      label: "Année de fondation au Cameroun",
      type: "number" as const,
      required: false,
      placeholder: "1950"
    },
    {
      name: "numberOfMembers",
      label: "Nombre de membres",
      type: "number" as const,
      required: false,
      placeholder: "50"
    },
    {
      name: "charism",
      label: "Charisme",
      type: "text" as const,
      required: false,
      placeholder: "Éducation, mission, vie contemplative..."
    },
    {
      name: "slug",
      label: "Slug (URL)",
      type: "text" as const,
      required: false,
      placeholder: "soeurs-saint-coeur-marie"
    },
    {
      name: "isActive",
      label: "Actif",
      type: "checkbox" as const,
      required: false
    }
  ],
  columns: [
    { key: "name", label: "Nom" },
    { key: "type", label: "Type" },
    { key: "gender", label: "Genre", render: (value: string) => {
      const labels: Record<string, string> = { male: "♂", female: "♀", mixed: "♂♀" };
      return labels[value] || value;
    }},
    { key: "numberOfMembers", label: "Membres" },
    { key: "isActive", label: "Actif", render: (value: boolean) => value ? "✓" : "✗" }
  ]
};

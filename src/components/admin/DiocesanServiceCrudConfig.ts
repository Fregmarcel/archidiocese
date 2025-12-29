export interface DiocesanServiceData {
  _id?: string;
  name: string;
  description: string;
  category?: string;
  coordinator?: string;
  coordinatorPhone?: string;
  coordinatorEmail?: string;
  address?: string;
  schedule?: string;
  slug?: string;
  isActive?: boolean;
}

export const diocesanServiceCrudConfig = {
  title: "Services Diocésains",
  apiEndpoint: "/api/diocesan-services",
  fields: [
    {
      name: "name",
      label: "Nom du service",
      type: "text" as const,
      required: true,
      placeholder: "Ex: Pastorale Familiale"
    },
    {
      name: "description",
      label: "Description",
      type: "textarea" as const,
      required: true,
      placeholder: "Description détaillée du service..."
    },
    {
      name: "category",
      label: "Catégorie",
      type: "select" as const,
      required: false,
      options: [
        { value: "Pastoral", label: "Pastoral" },
        { value: "Liturgie", label: "Liturgie" },
        { value: "Formation", label: "Formation" },
        { value: "Social", label: "Social" },
        { value: "Administratif", label: "Administratif" }
      ]
    },
    {
      name: "coordinator",
      label: "Coordinateur",
      type: "text" as const,
      required: false,
      placeholder: "Nom du coordinateur"
    },
    {
      name: "coordinatorPhone",
      label: "Téléphone",
      type: "text" as const,
      required: false,
      placeholder: "+237 6XX XXX XXX"
    },
    {
      name: "coordinatorEmail",
      label: "Email",
      type: "email" as const,
      required: false,
      placeholder: "email@archidiocese-yaounde.org"
    },
    {
      name: "address",
      label: "Adresse",
      type: "text" as const,
      required: false,
      placeholder: "Adresse du service"
    },
    {
      name: "schedule",
      label: "Horaires",
      type: "text" as const,
      required: false,
      placeholder: "Lundi - Vendredi: 8h - 16h"
    },
    {
      name: "slug",
      label: "Slug (URL)",
      type: "text" as const,
      required: false,
      placeholder: "pastorale-familiale"
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
    { key: "category", label: "Catégorie" },
    { key: "coordinator", label: "Coordinateur" },
    { key: "isActive", label: "Actif", render: (value: boolean) => value ? "✓" : "✗" }
  ]
};

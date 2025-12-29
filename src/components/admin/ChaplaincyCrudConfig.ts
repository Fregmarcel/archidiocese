export interface ChaplaincyData {
  _id?: string;
  name: string;
  description: string;
  type?: string;
  chaplain?: string;
  chaplainPhone?: string;
  chaplainEmail?: string;
  address?: string;
  massSchedule?: string;
  slug?: string;
  isActive?: boolean;
}

export const chaplaincyCrudConfig = {
  title: "Aumôneries",
  apiEndpoint: "/api/chaplaincies",
  fields: [
    {
      name: "name",
      label: "Nom de l'aumônerie",
      type: "text" as const,
      required: true,
      placeholder: "Ex: Aumônerie des Hôpitaux"
    },
    {
      name: "description",
      label: "Description",
      type: "textarea" as const,
      required: true,
      placeholder: "Description de l'aumônerie..."
    },
    {
      name: "type",
      label: "Type",
      type: "select" as const,
      required: false,
      options: [
        { value: "Hôpital", label: "Hôpital" },
        { value: "Prison", label: "Prison" },
        { value: "Militaire", label: "Militaire" },
        { value: "Scolaire", label: "Scolaire" },
        { value: "Social", label: "Social" }
      ]
    },
    {
      name: "chaplain",
      label: "Aumônier",
      type: "text" as const,
      required: false,
      placeholder: "Nom de l'aumônier"
    },
    {
      name: "chaplainPhone",
      label: "Téléphone",
      type: "text" as const,
      required: false,
      placeholder: "+237 6XX XXX XXX"
    },
    {
      name: "chaplainEmail",
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
      placeholder: "Adresse de l'aumônerie"
    },
    {
      name: "massSchedule",
      label: "Horaires des messes",
      type: "text" as const,
      required: false,
      placeholder: "Dimanche 9h"
    },
    {
      name: "slug",
      label: "Slug (URL)",
      type: "text" as const,
      required: false,
      placeholder: "aumonerie-hopitaux"
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
    { key: "chaplain", label: "Aumônier" },
    { key: "isActive", label: "Actif", render: (value: unknown) => value ? "✓" : "✗" }
  ]
};

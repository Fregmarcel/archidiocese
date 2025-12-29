export interface UniversityData {
  _id?: string;
  name: string;
  description: string;
  type?: string;
  chaplain?: string;
  chaplainPhone?: string;
  chaplainEmail?: string;
  address?: string;
  massSchedule?: string;
  activities?: string;
  slug?: string;
  isActive?: boolean;
}

export const universityCrudConfig = {
  title: "Universités & Grandes Écoles",
  apiEndpoint: "/api/universities",
  fields: [
    {
      name: "name",
      label: "Nom de l'établissement",
      type: "text" as const,
      required: true,
      placeholder: "Ex: Aumônerie de l'Université de Yaoundé I"
    },
    {
      name: "description",
      label: "Description",
      type: "textarea" as const,
      required: true,
      placeholder: "Description de l'aumônerie universitaire..."
    },
    {
      name: "type",
      label: "Type d'établissement",
      type: "select" as const,
      required: false,
      options: [
        { value: "Université", label: "Université" },
        { value: "Grande École", label: "Grande École" },
        { value: "Université Catholique", label: "Université Catholique" }
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
      label: "Adresse / Campus",
      type: "text" as const,
      required: false,
      placeholder: "Campus de Ngoa-Ekellé"
    },
    {
      name: "massSchedule",
      label: "Horaires des messes",
      type: "text" as const,
      required: false,
      placeholder: "Mardi 12h15, Dimanche 10h"
    },
    {
      name: "activities",
      label: "Activités",
      type: "textarea" as const,
      required: false,
      placeholder: "Chorale, groupe biblique, retraites..."
    },
    {
      name: "slug",
      label: "Slug (URL)",
      type: "text" as const,
      required: false,
      placeholder: "universite-yaounde-1"
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
    { key: "isActive", label: "Actif", render: (value: boolean) => value ? "✓" : "✗" }
  ]
};

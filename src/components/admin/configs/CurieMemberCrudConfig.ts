import { CrudConfig } from '@/components/admin/configs/types';

export const curieMemberCrudConfig: CrudConfig = {
  title: "Curie Diocésaine",
  description: "Gestion des membres de la Curie Diocésaine",
  apiEndpoint: "/api/curie-members",
  fields: [
    {
      name: "name",
      label: "Nom complet",
      type: "text",
      required: true,
      placeholder: "Ex: Mgr Gabriel François Xavier MINTSA NDO",
      validation: {
        minLength: 2,
        maxLength: 100
      }
    },
    {
      name: "role",
      label: "Rôle",
      type: "select",
      required: true,
      options: [
        { value: "ARCHEVÊQUE MÉTROPOLITAIN", label: "Archevêque Métropolitain" },
        { value: "VICAIRE GÉNÉRAL", label: "Vicaire Général" },
        { value: "CHANCELIER", label: "Chancelier" },
        { value: "ÉCONOME DIOCÉSAIN", label: "Économe Diocésain" },
        { value: "SECRÉTAIRE GÉNÉRAL", label: "Secrétaire Général" },
        { value: "DIRECTEUR DES ŒUVRES", label: "Directeur des Œuvres" },
        { value: "VICAIRE ÉPISCOPAL", label: "Vicaire Épiscopal" },
        { value: "MEMBRE DE LA CURIE", label: "Membre de la Curie" }
      ]
    },
    {
      name: "subtitle",
      label: "Sous-titre",
      type: "text",
      required: false,
      placeholder: "Ex: Archevêque Métropolitain de Yaoundé",
      validation: {
        maxLength: 200
      }
    },
    {
      name: "image",
      label: "Photo",
      type: "image",
      required: true,
      uploadPath: "curie-members",
      acceptedFormats: ["jpg", "jpeg", "png", "webp"],
      maxSize: 5 * 1024 * 1024 // 5MB
    },
    {
      name: "biography",
      label: "Biographie",
      type: "textarea",
      required: false,
      placeholder: "Biographie courte pour l'affichage sur les cartes...",
      validation: {
        maxLength: 500
      },
      rows: 4
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      required: false,
      placeholder: "exemple@archidioceseyaounde.org"
    },
    {
      name: "phone",
      label: "Téléphone",
      type: "text",
      required: false,
      placeholder: "+237 222 23 24 25"
    },
    {
      name: "address",
      label: "Adresse",
      type: "text",
      required: false,
      placeholder: "Archevêché de Yaoundé, BP 644, Yaoundé - Cameroun"
    },
    {
      name: "ordination",
      label: "Ordination",
      type: "text",
      required: false,
      placeholder: "Ex: Ordonné prêtre le 29 avril 1990 à..."
    },
    {
      name: "education",
      label: "Formation",
      type: "array",
      required: false,
      placeholder: "Ajoutez les éléments de formation (diplômes, institutions...)",
      arrayType: "text"
    },
    {
      name: "ministries",
      label: "Ministères et Responsabilités",
      type: "array",
      required: false,
      placeholder: "Ajoutez les ministères et responsabilités actuels et passés",
      arrayType: "text"
    },
    {
      name: "publications",
      label: "Publications",
      type: "array",
      required: false,
      placeholder: "Ajoutez les publications académiques et ouvrages",
      arrayType: "text"
    },
    {
      name: "displayOrder",
      label: "Ordre d'affichage",
      type: "number",
      required: false,
      placeholder: "Numéro d'ordre pour l'affichage (1, 2, 3...)",
      validation: {
        min: 1,
        max: 100
      }
    },
    {
      name: "isActive",
      label: "Actif",
      type: "boolean",
      required: false,
      defaultValue: true,
      helpText: "Afficher ce membre sur le site public"
    }
  ],
  tableColumns: [
    {
      key: "image",
      label: "Photo",
      type: "image",
      width: "80px"
    },
    {
      key: "name",
      label: "Nom",
      type: "text",
      sortable: true
    },
    {
      key: "role",
      label: "Rôle",
      type: "text",
      sortable: true
    },
    {
      key: "subtitle",
      label: "Sous-titre",
      type: "text",
      truncate: true
    },
    {
      key: "email",
      label: "Email",
      type: "email",
      truncate: true
    },
    {
      key: "displayOrder",
      label: "Ordre",
      type: "number",
      sortable: true,
      width: "80px"
    },
    {
      key: "isActive",
      label: "Statut",
      type: "boolean",
      sortable: true,
      width: "80px"
    },
    {
      key: "updatedAt",
      label: "Mis à jour",
      type: "date",
      sortable: true
    }
  ],
  searchFields: ["name", "role", "subtitle", "email"],
  defaultSort: { field: "displayOrder", direction: "asc" },
  itemsPerPage: 10,
  options: {
    allowCreate: true,
    allowEdit: true,
    allowDelete: true,
    allowExport: true,
    showImagePreview: true,
    bulkActions: ["delete", "toggleStatus"]
  }
};

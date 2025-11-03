import ArchbishopFormNew from "./ArchbishopFormNew";
import { TableColumn } from "@/components/ui/DataTable";

export type ArchbishopData = {
  _id?: string;
  name: string;
  title?: string;
  description?: string;
  portraitUrl?: string;
  bibliography: string[];
  bibliographyRich?: string;
  publications: string[];
  gallery: string[];
  locale: string;
};

// Colonnes pour le tableau
export const archbishopColumns: TableColumn<ArchbishopData>[] = [
  {
    key: "name",
    label: "Nom",
    width: "20%"
  },
  {
    key: "title",
    label: "Titre officiel",
    width: "25%"
  },
  {
    key: "description",
    label: "Description",
    width: "30%",
    render: (item: ArchbishopData) => item.description 
      ? (item.description.length > 100 
          ? `${item.description.substring(0, 100)}...` 
          : item.description)
      : 'Aucune description'
  },
  {
    key: "portraitUrl",
    label: "Portrait",
    width: "10%",
    render: (item: ArchbishopData) => item.portraitUrl 
      ? '🖼️ Oui' 
      : '❌ Non'
  },
  {
    key: "publications",
    label: "Publications",
    width: "8%",
    render: (item: ArchbishopData) => `📄 ${item.publications?.length || 0}`
  },
  {
    key: "locale",
    label: "Langue",
    width: "7%",
    render: (item: ArchbishopData) => item.locale === 'fr' ? '🇫🇷 FR' : '🇬🇧 EN'
  }
];

// Configuration CRUD pour les archevêques
export const archbishopCrudConfig = {
  title: "Archevêque",
  entityName: "archevêque", 
  apiEndpoint: "/api/admin/archbishop",
  columns: archbishopColumns,
  FormComponent: ArchbishopFormNew,
  options: {
    hideCreateButton: true, // Pas de bouton créer - il n'y a qu'un seul archevêque
    hideDeleteButton: true, // Pas de bouton supprimer - on ne supprime pas l'archevêque
    singleEntity: true      // Entité unique
  },
  messages: {
    updateSuccess: "Les informations de l'archevêque ont été mises à jour avec succès !",
    updateError: "Erreur lors de la mise à jour des informations de l'archevêque",
    emptyMessage: "Aucune information sur l'archevêque n'est encore configurée. Utilisez le bouton Modifier pour ajouter les informations."
  }
};

import ArchbishopFormNew from "./ArchbishopFormNew";
import type { TableColumn } from "../ui/DataTable";

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
    label: "Nom"
  },
  {
    key: "title",
    label: "Titre"
  },
  {
    key: "description",
    label: "Description",
    render: (item: ArchbishopData) => item.description ? 
      (item.description.length > 100 ? item.description.substring(0, 100) + "..." : item.description) 
      : "Non renseigné"
  },
  {
    key: "portraitUrl",
    label: "Portrait",
    render: (item: ArchbishopData) => item.portraitUrl ? 
      <span className="text-green-600">✓ Photo ajoutée</span> : 
      <span className="text-gray-400">Aucune photo</span>
  },
  {
    key: "bibliographyRich",
    label: "Bibliographie",
    render: (item: ArchbishopData) => item.bibliographyRich ? 
      <span className="text-green-600">✓ Renseignée</span> : 
      <span className="text-gray-400">Non renseignée</span>
  },
  {
    key: "publications",
    label: "Publications",
    render: (item: ArchbishopData) => `${item.publications?.length || 0} fichier(s)`
  },
  {
    key: "gallery",
    label: "Galerie",
    render: (item: ArchbishopData) => `${item.gallery?.length || 0} photo(s)`
  },
  {
    key: "locale",
    label: "Langue",
    render: (item: ArchbishopData) => item.locale === 'fr' ? '🇫🇷 Français' : '🇬🇧 Anglais'
  }
];

// Configuration CRUD pour les archevêques
export const archbishopCrudConfig = {
  title: "Gestion des Archevêques",
  entityName: "archevêque", 
  apiEndpoint: "/api/admin/archbishop",
  columns: archbishopColumns,
  FormComponent: ArchbishopFormNew,
  options: {
    hideCreateButton: true, // Masquer le bouton "Créer" - il n'y a qu'un seul archevêque
    hideDeleteButton: true, // Masquer le bouton "Supprimer" - on ne supprime pas l'archevêque
    singleEntity: true      // Entité unique
  },
  messages: {
    updateSuccess: "Les informations de l'archevêque ont été mises à jour avec succès !",
    updateError: "Erreur lors de la mise à jour des informations de l'archevêque",
    emptyMessage: "Aucune information sur l'archevêque n'est encore configurée. Utilisez le bouton Modifier pour ajouter les informations."
  }
};

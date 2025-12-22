import HistoryPageForm from "./HistoryPageForm";
import type { TableColumn } from "../ui/DataTable";

export type HistoryPageData = {
  _id?: string;
  locale: string;
  missionPresence: string;
  apostolicVicariate: string;
  archdiocesisErection: string;
  baptizedCatholics: number;
  nonCatholicChristians: number;
  muslims: number;
  totalPopulation: number;
  diocesanPriests: number;
  catechists: number;
  geographicSituation: string;
  strategicSituation: string;
  spokenLanguages: string;
  migrationIssue: string;
  landHeritage: string;
  infrastructures: string;
  conclusion: string;
};

export const historyPageColumns: TableColumn<HistoryPageData>[] = [
  {
    key: "locale",
    label: "Langue",
    render: (item: HistoryPageData) => item.locale === 'fr' ? '🇫🇷 Français' : '🇬🇧 Anglais'
  },
  {
    key: "missionPresence",
    label: "Présence missionnaire",
  },
  {
    key: "baptizedCatholics",
    label: "Catholiques",
    render: (item: HistoryPageData) => item.baptizedCatholics.toLocaleString()
  },
  {
    key: "diocesanPriests",
    label: "Prêtres",
  },
  {
    key: "catechists",
    label: "Catéchistes",
    render: (item: HistoryPageData) => item.catechists.toLocaleString()
  },
];

export const historyPageCrudConfig = {
  title: "Gestion de la Page Historique",
  entityName: "page historique",
  apiEndpoint: "/api/admin/history",
  columns: historyPageColumns,
  FormComponent: HistoryPageForm,
  options: {
    hideCreateButton: true,
    hideDeleteButton: true,
    singleEntity: true
  },
  messages: {
    updateSuccess: "La page historique a été mise à jour avec succès !",
    updateError: "Erreur lors de la mise à jour de la page historique",
    emptyMessage: "Aucune donnée historique n'est encore configurée. Utilisez le bouton Modifier pour ajouter les informations."
  }
};

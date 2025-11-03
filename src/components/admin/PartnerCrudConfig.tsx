import { TableColumn } from '@/components/ui/DataTable';
import PartnerForm, { PartnerData } from './PartnerForm';

export type { PartnerData };

export const partnerCrudConfig = {
  title: 'Réseaux & Partenaires',
  apiEndpoint: '/api/admin/partners',
  columns: [
    { key: 'logo', label: 'Logo', width: '80px', render: (row: any) => row.logo ? (<img src={row.logo} alt="" className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200" />) : (<div className="w-16 h-16 bg-gray-100 rounded-lg border-2 border-gray-200" />) },
    { key: 'name', label: 'Nom', render: (row:any) => (<div className="max-w-md"><p className="font-semibold text-gray-900 line-clamp-2">{row.name}</p>{row.description && (<p className="text-xs text-gray-500 mt-1 line-clamp-1">{row.description}</p>)}</div>) },
    { key: 'category', label: 'Catégorie', width: '160px', render: (row:any) => {
      const map: any = { universites: 'Universités', recherche: 'Recherche', entreprises: 'Entreprises', etranger: "À l'étranger", emploi: "Emploi" };
      return (<span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700 border border-blue-300">{map[row.category] || row.category}</span>);
    } },
    { key: 'url', label: 'Lien', width: '200px', render: (row:any) => row.url ? (<a href={row.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">{row.url}</a>) : '-' },
    { key: 'order', label: 'Ordre', width: '90px', render: (row:any) => typeof row.order === 'number' ? row.order : '-' },
  ] as TableColumn<PartnerData>[],
  FormComponent: PartnerForm,
  options: {},
  messages: { emptyMessage: "Aucun partenaire" }
};

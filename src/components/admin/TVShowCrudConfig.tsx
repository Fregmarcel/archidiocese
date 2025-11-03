import { TableColumn } from '@/components/ui/DataTable';
import TVShowForm, { TVShowData } from './TVShowForm';

export type { TVShowData };

export const tvShowCrudConfig = {
  title: 'Télévision Diocésaine',
  apiEndpoint: '/api/admin/tv-shows',
  columns: [
    { key: 'imageUrl', label: 'Image', width: '80px', render: (row: any) => row.imageUrl ? (<img src={row.imageUrl} alt="" className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200" />) : (<div className="w-16 h-16 bg-gray-100 rounded-lg border-2 border-gray-200" />) },
    { key: 'title', label: 'Titre', render: (row:any) => (<div className="max-w-md"><p className="font-semibold text-gray-900 line-clamp-2">{row.title}</p>{row.description && (<p className="text-xs text-gray-500 mt-1 line-clamp-1">{row.description}</p>)}</div>) },
    { key: 'category', label: 'Catégorie', width: '140px' },
    { key: 'broadcastDate', label: 'Diffusé le', width: '180px', render: (row:any) => row.broadcastDate ? new Date(row.broadcastDate).toLocaleString('fr-FR') : '-' },
  ] as TableColumn<TVShowData>[],
  FormComponent: TVShowForm,
  options: {},
  messages: { emptyMessage: "Aucune vidéo" }
};

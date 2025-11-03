import { TableColumn } from '@/components/ui/DataTable';
import HistoryEventForm, { HistoryEventData } from './HistoryEventForm';

export type { HistoryEventData };

export const historyCrudConfig = {
  title: 'Historique',
  // Use admin endpoint so CRUD operations (including DELETE /:id) work
  apiEndpoint: '/api/admin/history-events',
  columns: [
    { key: 'year', label: 'Année', width: '100px' },
    { key: 'title', label: 'Titre', render: (row:any) => (
      <div className="max-w-md">
        <p className="font-semibold text-gray-900 line-clamp-2">{row.title}</p>
        {row.description && (<p className="text-xs text-gray-500 mt-1 line-clamp-1">{row.description}</p>)}
      </div>
    )},
    { key: 'category', label: 'Catégorie', width: '160px' },
    { key: 'image', label: 'Image', width: '80px', render: (row:any) => row.image ? (<img src={row.image} alt="" className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200" />) : (<div className="w-16 h-16 bg-gray-100 rounded-lg border-2 border-gray-200" />) },
    { key: 'displayOrder', label: 'Ordre', width: '90px', render: (row:any) => typeof row.displayOrder === 'number' ? row.displayOrder : '-' },
  ] as TableColumn<HistoryEventData>[],
  FormComponent: HistoryEventForm,
  options: {},
  messages: { emptyMessage: "Aucun évènement historique trouvé" }
};

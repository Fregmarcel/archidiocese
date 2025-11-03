import { TableColumn } from '@/components/ui/DataTable';
import EventForm, { EventData } from './EventForm';

export type { EventData };

export const eventCrudConfig = {
  title: 'Évènements & Agenda',
  apiEndpoint: '/api/admin/events',
  columns: [
    { key: 'image', label: 'Image', width: '80px', render: (row: any) => row.image ? (<img src={row.image} alt="" className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200" />) : (<div className="w-16 h-16 bg-gray-100 rounded-lg border-2 border-gray-200" />) },
    { key: 'title', label: 'Titre', render: (row:any) => (<div className="max-w-md"><p className="font-semibold text-gray-900 line-clamp-2">{row.title}</p>{row.excerpt && (<p className="text-xs text-gray-500 mt-1 line-clamp-1">{row.excerpt}</p>)}</div>) },
    { key: 'date', label: 'Date', width: '160px', render: (row:any) => row.date ? new Date(row.date).toLocaleString() : '-' },
    { key: 'status', label: 'Statut', width: '120px', render: (row:any) => (<span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${row.status==='published'?'bg-green-100 text-green-700 border border-green-300':'bg-yellow-100 text-yellow-700 border border-yellow-300'}`}>{row.status==='published'?'Publié':'Brouillon'}</span>) },
  ] as TableColumn<EventData>[],
  FormComponent: EventForm,
  options: {},
  messages: { emptyMessage: "Aucun évènement trouvé" }
};

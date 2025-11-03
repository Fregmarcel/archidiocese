import { TableColumn } from '@/components/ui/DataTable';
import RadioShowForm, { RadioShowData } from './RadioShowForm';

export type { RadioShowData };

export const radioShowCrudConfig = {
  title: 'Radio Diocésaine',
  apiEndpoint: '/api/admin/radio-shows',
  columns: [
    { key: 'imageUrl', label: 'Image', width: '80px', render: (row: any) => row.imageUrl ? (<img src={row.imageUrl} alt="" className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200" />) : (<div className="w-16 h-16 bg-gray-100 rounded-lg border-2 border-gray-200" />) },
    { key: 'title', label: 'Titre', render: (row:any) => (<div className="max-w-md"><p className="font-semibold text-gray-900 line-clamp-2">{row.title}</p>{row.description && (<p className="text-xs text-gray-500 mt-1 line-clamp-1">{row.description}</p>)}</div>) },
    { key: 'category', label: 'Catégorie', width: '140px' },
    { key: 'type', label: 'Type', width: '120px', render: (row:any)=> row.type === 'live' ? (<span className="px-2 py-1 text-xs font-bold rounded-full bg-red-100 text-red-700 border border-red-300">Direct</span>) : (<span className="px-2 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-700 border border-blue-300">Rediffusion</span>) },
    { key: 'broadcastDate', label: 'Diffusé le', width: '180px', render: (row:any) => row.broadcastDate ? new Date(row.broadcastDate).toLocaleString('fr-FR') : '-' },
  ] as TableColumn<RadioShowData>[],
  FormComponent: RadioShowForm,
  options: {},
  messages: { emptyMessage: "Aucune émission" }
};

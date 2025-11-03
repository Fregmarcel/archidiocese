import { TableColumn } from '../ui/DataTable';
import ParishForm from './ParishForm';
import type { IParish } from '@/models/Parish';

export interface ParishData extends IParish {}

export const parishCrudConfig = {
  title: 'Paroisses',
  apiEndpoint: '/api/admin/parishes',
  FormComponent: ParishForm,
  columns: [
    { key: 'name', label: 'Nom' },
    { key: 'pastoralZone', label: 'Zone (ID)' },
    { key: 'address', label: 'Adresse', render: (p: ParishData) => <span className="line-clamp-1 max-w-[240px] block">{p.address}</span> },
    { key: 'phone', label: 'Téléphone' },
    { key: 'email', label: 'Email' },
    {
      key: 'staff',
      label: 'Responsables',
      render: (p: ParishData) => {
        const leader = (p.staff || []).find(s => /Curé|Administrateur|Recteur/i.test(s.role));
        const vicaires = (p.staff || []).filter(s => /Vicaire/i.test(s.role));
        return (
          <div className="text-sm">
            <div>
              <span className="text-gray-500">Responsable: </span>
              <span>{leader ? `${leader.name} (${leader.role})` : (p.pastor || '-')}</span>
            </div>
            {vicaires.length > 0 && (
              <div className="text-gray-600">
                <span>Vicaire(s): </span>
                <span>{vicaires.map(v => v.name).join(', ')}</span>
              </div>
            )}
          </div>
        )
      }
    }
  ] as TableColumn<ParishData>[],
  options: {
    hideCreateButton: false,
    hideDeleteButton: false,
  },
  messages: {
    createSuccess: 'Paroisse créée',
    updateSuccess: 'Paroisse mise à jour',
    deleteSuccess: 'Paroisse supprimée',
  }
};

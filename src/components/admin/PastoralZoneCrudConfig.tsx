import { TableColumn } from '../ui/DataTable';
import PastoralZoneForm from './PastoralZoneForm';
import type { IPastoralZone } from '@/models/PastoralZone';

export interface PastoralZoneData extends IPastoralZone {}

export const pastoralZoneCrudConfig = {
  title: 'Zones pastorales',
  apiEndpoint: '/api/admin/pastoral-zones',
  FormComponent: PastoralZoneForm,
  columns: [
    { key: 'name', label: 'Nom' },
    { key: 'numberOfParishes', label: 'Nb. Paroisses' },
    { key: 'coordinator', label: 'Coordinateur' },
    { key: 'coordinatorPhone', label: 'Téléphone' },
    { key: 'coordinatorEmail', label: 'Email' },
    { key: 'address', label: 'Adresse', render: (z: PastoralZoneData) => <span className="line-clamp-1 max-w-[300px] block">{z.address}</span> },
  ] as TableColumn<PastoralZoneData>[],
  options: {
    hideCreateButton: false,
    hideDeleteButton: false,
  },
  messages: {
    createSuccess: 'Zone créée',
    updateSuccess: 'Zone mise à jour',
    deleteSuccess: 'Zone supprimée',
  }
};

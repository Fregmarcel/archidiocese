import { TableColumn } from '../ui/DataTable';
import CurieMemberForm from './CurieMemberForm';
import { ICurieMember } from '../../models/CurieMember';

export interface CurieMemberData extends ICurieMember {}

export const curieMemberCrudConfig = {
  title: "Curie Diocésaine",
  apiEndpoint: "/api/curie-members",
  FormComponent: CurieMemberForm,
  columns: [
    {
      key: 'image',
      label: 'Photo',
      render: (member: CurieMemberData) => (
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img 
            src={member.image} 
            alt={member.name}
            className="w-full h-full object-cover"
          />
        </div>
      )
    },
    {
      key: 'name',
      label: 'Nom',
      sortable: true
    },
    {
      key: 'role',
      label: 'Rôle',
      sortable: true
    },
    {
      key: 'subtitle',
      label: 'Sous-titre',
      render: (member: CurieMemberData) => (
        <span className="text-sm text-gray-600 truncate max-w-xs block">
          {member.subtitle}
        </span>
      )
    },
    {
      key: 'email',
      label: 'Email',
      render: (member: CurieMemberData) => (
        member.email ? (
          <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">
            {member.email}
          </a>
        ) : '-'
      )
    },
    {
      key: 'displayOrder',
      label: 'Ordre',
      sortable: true,
      render: (member: CurieMemberData) => member.displayOrder || 0
    },
    {
      key: 'isActive',
      label: 'Statut',
      sortable: true,
      render: (member: CurieMemberData) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          member.isActive 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {member.isActive ? 'Actif' : 'Inactif'}
        </span>
      )
    },
    {
      key: 'updatedAt',
      label: 'Mis à jour',
      sortable: true,
      render: (member: CurieMemberData) => (
        member.updatedAt ? new Date(member.updatedAt).toLocaleDateString() : '-'
      )
    }
  ] as TableColumn<CurieMemberData>[],
  options: {
    hideCreateButton: false,
    hideDeleteButton: false,
  },
  messages: {
    loading: "Chargement des membres de la curie...",
    noData: "Aucun membre trouvé",
    createSuccess: "Membre créé avec succès",
    updateSuccess: "Membre mis à jour avec succès",
    deleteSuccess: "Membre supprimé avec succès",
    createError: "Erreur lors de la création",
    updateError: "Erreur lors de la mise à jour",
    deleteError: "Erreur lors de la suppression",
    confirmDelete: "Êtes-vous sûr de vouloir supprimer ce membre ?",
  }
};

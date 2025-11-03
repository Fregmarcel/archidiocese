"use client";

import CrudManager from '@/components/admin/CrudManager';
import CurieMemberForm from '@/components/admin/CurieMemberForm';
import { TableColumn } from '@/components/ui/DataTable';
import { ICurieMember } from '@/models/CurieMember';

const columns: TableColumn<ICurieMember>[] = [
  {
    key: 'image',
    label: 'Photo',
    width: '80px',
    render: (member) => member.image ? (
      <img 
        src={member.image} 
        alt={member.name} 
        className="w-12 h-12 rounded-full object-cover"
      />
    ) : (
      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
        <span className="text-gray-400 text-xs">?</span>
      </div>
    )
  },
  {
    key: 'name',
    label: 'Nom'
  },
  {
    key: 'role',
    label: 'Rôle'
  },
  {
    key: 'subtitle',
    label: 'Sous-titre',
    render: (member) => member.subtitle ? (
      <span className="text-sm text-gray-600" title={member.subtitle}>
        {member.subtitle.length > 40 ? `${member.subtitle.slice(0, 40)}...` : member.subtitle}
      </span>
    ) : null
  },
  {
    key: 'email',
    label: 'Email',
    render: (member) => member.email ? (
      <a 
        href={`mailto:${member.email}`}
        className="text-blue-600 hover:text-blue-800 text-sm"
      >
        {member.email.length > 25 ? `${member.email.slice(0, 25)}...` : member.email}
      </a>
    ) : null
  },
  {
    key: 'displayOrder',
    label: 'Ordre',
    width: '80px'
  },
  {
    key: 'isActive',
    label: 'Statut',
    width: '80px',
    render: (member) => (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
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
    render: (member) => member.updatedAt ? 
      new Date(member.updatedAt).toLocaleDateString('fr-FR') : ''
  }
];

export default function CurieMembersAdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Gestion de la Curie Diocésaine</h1>
            <p className="mt-2 text-gray-600">
              Gérez les membres de la Curie Diocésaine, leurs rôles, informations et ordre d'affichage.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow">
            <CrudManager<ICurieMember>
              title="Curie Diocésaine"
              apiEndpoint="/api/curie-members"
              columns={columns}
              FormComponent={CurieMemberForm}
              messages={{
                createSuccess: "Membre de la curie créé avec succès",
                updateSuccess: "Membre de la curie mis à jour avec succès",
                deleteSuccess: "Membre de la curie supprimé avec succès",
                createError: "Erreur lors de la création du membre",
                updateError: "Erreur lors de la mise à jour du membre",
                deleteError: "Erreur lors de la suppression du membre",
                emptyMessage: "Aucun membre de la curie trouvé"
              }}
              locale=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

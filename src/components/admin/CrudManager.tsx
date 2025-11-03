"use client";

import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import DataTable, { TableColumn, TableAction } from '@/components/ui/DataTable';
import { useSimpleNotifications } from '@/hooks/useSimpleNotifications';

export type CrudMode = 'list' | 'create' | 'edit';

interface CrudManagerProps<T = any> {
  // Configuration
  title: string;
  apiEndpoint: string; // e.g., "/api/curie-members"
  locale?: string;

  // Table configuration
  columns: TableColumn<T>[];
  
  // Form component
  FormComponent: React.ComponentType<{
    locale?: string;
    initialData?: T | null;
    onSave: (data: T) => void;
    onCancel: () => void;
  }>;

  // Options d'interface
  options?: {
    hideCreateButton?: boolean;
    hideDeleteButton?: boolean;
    hideEditButton?: boolean;
    singleEntity?: boolean; // Pour les entités uniques
  };

  // Messages
  messages?: {
    createSuccess?: string;
    updateSuccess?: string;
    deleteSuccess?: string;
    createError?: string;
    updateError?: string;
    deleteError?: string;
    emptyMessage?: string;
  };
}

export default function CrudManager<T extends { _id?: string; name?: string }>({
  title,
  apiEndpoint,
  locale = 'fr',
  columns,
  FormComponent,
  options = {},
  messages = {}
}: CrudManagerProps<T>) {
  const [mode, setMode] = useState<CrudMode>('list');
  const [data, setData] = useState<T[]>([]);
  const [currentItem, setCurrentItem] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  
  const {
    showSuccess,
    showError,
    NotificationContainer
  } = useSimpleNotifications();

  // Messages par défaut
  const defaultMessages = {
    createSuccess: `${title} créé avec succès !`,
    updateSuccess: `${title} modifié avec succès !`,
    deleteSuccess: `${title} supprimé avec succès !`,
    createError: `Erreur lors de la création du ${title.toLowerCase()}`,
    updateError: `Erreur lors de la modification du ${title.toLowerCase()}`,
    deleteError: `Erreur lors de la suppression du ${title.toLowerCase()}`,
    emptyMessage: `Aucun ${title.toLowerCase()} trouvé`,
    ...messages
  };

  // Charger les données
  const loadData = async () => {
    setLoading(true);
    try {
      const endpoint = apiEndpoint; // ne pas altérer l'endpoint
      const response = await fetch(endpoint);
      if (response.ok) {
        const result = await response.json();
        // Support { data: [...] } ou tableau direct
        if (Array.isArray(result)) {
          setData(result);
        } else if (result?.data) {
          setData(Array.isArray(result.data) ? result.data : [result.data]);
        } else if (result?.doc) {
          setData([result.doc]);
        } else {
          setData([]);
        }
      } else {
        setData([]);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [apiEndpoint]);

  // Actions CRUD
  const handleCreate = () => {
    setCurrentItem(null);
    setMode('create');
  };

  const handleEdit = (item: T) => {
    setCurrentItem(item);
    setMode('edit');
  };

  const handleDelete = async (item: T) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${item.name || 'cet élément'}" ?`)) {
      return;
    }

    try {
      const endpoint = `${apiEndpoint}/${item._id}`; // DELETE /:id
      const response = await fetch(endpoint, {
        method: 'DELETE'
      });

      if (response.ok) {
        showSuccess('Suppression réussie', defaultMessages.deleteSuccess);
        loadData();
      } else {
        throw new Error('Delete failed');
      }
    } catch (error) {
      console.error('Delete error:', error);
      showError('Erreur de suppression', defaultMessages.deleteError);
    }
  };

  const handleSave = async (formData: T) => {
    try {
      const isEdit = Boolean(formData._id);
      const endpoint = isEdit ? `${apiEndpoint}/${formData._id}` : apiEndpoint; // PUT /:id ou POST
      const method = isEdit ? 'PUT' : 'POST';
      
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const successMessage = isEdit 
          ? defaultMessages.updateSuccess 
          : defaultMessages.createSuccess;
        
        showSuccess(
          isEdit ? 'Modification réussie' : 'Création réussie',
          successMessage
        );
        
        setMode('list');
        loadData();
      } else {
        throw new Error(`${method} failed`);
      }
    } catch (error) {
      console.error('Save error:', error);
      const errorMessage = mode === 'edit' 
        ? defaultMessages.updateError 
        : defaultMessages.createError;
      
      showError(
        mode === 'edit' ? 'Erreur de modification' : 'Erreur de création',
        errorMessage
      );
    }
  };

  const handleCancel = () => {
    setMode('list');
    setCurrentItem(null);
  };

  // Actions pour le tableau - créées conditionnellement selon les options
  const tableActions: TableAction<T>[] = [];

  // Bouton Modifier (affiché sauf si explicitement masqué)
  if (!options.hideEditButton) {
    tableActions.push({
      label: 'Modifier',
      icon: ({ className }) => (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M4 20h4l10.243-10.243a1.5 1.5 0 000-2.121l-1.879-1.879a1.5 1.5 0 00-2.121 0L4 16v4z" />
        </svg>
      ),
      onClick: handleEdit,
      variant: 'primary'
    });
  }

  // Bouton Supprimer (masqué si hideDeleteButton = true)
  if (!options.hideDeleteButton) {
    tableActions.push({
      label: 'Supprimer',
      icon: ({ className }) => (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
      onClick: handleDelete,
      variant: 'danger'
    });
  }

  return (
    <div className="min-h-[70vh] container mx-auto px-4 py-8">
      <NotificationContainer />
      
      {mode === 'list' && (
        <>
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Gestion des {title}
            </h1>
            <p className="text-gray-600 mt-2">
              Créez, modifiez et supprimez les {title.toLowerCase()}.
            </p>
          </div>

          <DataTable
            title={title}
            data={data}
            columns={columns}
            actions={tableActions}
            onAdd={options.hideCreateButton ? undefined : handleCreate}
            loading={loading}
            emptyMessage={defaultMessages.emptyMessage}
            addButtonLabel={`Créer un ${title.toLowerCase()}`}
          />
        </>
      )}

      {(mode === 'create' || mode === 'edit') && (
        <div>
          <div className="flex items-center mb-6">
            <button
              onClick={handleCancel}
              className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {mode === 'edit' ? `Modifier ${title}` : `Créer ${title}`}
              </h1>
              <p className="text-gray-600 mt-1">
                {mode === 'edit' 
                  ? `Modifiez les informations de ce ${title.toLowerCase()}.`
                  : `Créez un nouveau ${title.toLowerCase()}.`
                }
              </p>
            </div>
          </div>

          <FormComponent
            locale={locale}
            initialData={currentItem}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, Loader2, Search, Eye, EyeOff } from 'lucide-react';

export interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'email' | 'tel' | 'number' | 'select' | 'checkbox' | 'url';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  rows?: number;
}

export interface ColumnConfig {
  key: string;
  label: string;
  render?: (value: unknown, item: Record<string, unknown>) => React.ReactNode;
}

export interface CrudConfig {
  title: string;
  apiEndpoint: string;
  fields: FieldConfig[];
  columns: ColumnConfig[];
}

interface SimpleCrudManagerProps {
  config: CrudConfig;
}

export default function SimpleCrudManager({ config }: SimpleCrudManagerProps) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Record<string, unknown> | null>(null);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [isSaving, setIsSaving] = useState(false);

  // Fetch items
  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(config.apiEndpoint);
      if (!res.ok) throw new Error('Erreur lors du chargement');
      const data = await res.json();
      setItems(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setIsLoading(false);
    }
  }, [config.apiEndpoint]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Initialize form with default values
  const initializeForm = (item?: Record<string, unknown>) => {
    const defaults: Record<string, unknown> = {};
    config.fields.forEach(field => {
      if (item && item[field.name] !== undefined) {
        defaults[field.name] = item[field.name];
      } else if (field.type === 'checkbox') {
        defaults[field.name] = true;
      } else if (field.type === 'number') {
        defaults[field.name] = 0;
      } else {
        defaults[field.name] = '';
      }
    });
    return defaults;
  };

  // Open form for new item
  const handleAdd = () => {
    setEditingItem(null);
    setFormData(initializeForm());
    setIsFormOpen(true);
  };

  // Open form for editing
  const handleEdit = (item: Record<string, unknown>) => {
    setEditingItem(item);
    setFormData(initializeForm(item));
    setIsFormOpen(true);
  };

  // Close form
  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingItem(null);
    setFormData({});
  };

  // Save item (create or update)
  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    try {
      const url = editingItem 
        ? `${config.apiEndpoint}/${(editingItem as { _id: string })._id}`
        : config.apiEndpoint;
      
      const method = editingItem ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Erreur lors de la sauvegarde');
      }

      await fetchItems();
      handleCancel();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setIsSaving(false);
    }
  };

  // Delete item
  const handleDelete = async (item: Record<string, unknown>) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) return;
    
    try {
      const res = await fetch(`${config.apiEndpoint}/${(item as { _id: string })._id}`, {
        method: 'DELETE'
      });

      if (!res.ok) throw new Error('Erreur lors de la suppression');
      
      await fetchItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    }
  };

  // Toggle active status
  const handleToggleActive = async (item: Record<string, unknown>) => {
    try {
      const res = await fetch(`${config.apiEndpoint}/${(item as { _id: string })._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...item, isActive: !item.isActive })
      });

      if (!res.ok) throw new Error('Erreur lors de la mise à jour');
      
      await fetchItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    }
  };

  // Filter items by search term
  const filteredItems = items.filter(item => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return Object.values(item).some(value => 
      String(value).toLowerCase().includes(searchLower)
    );
  });

  // Render form field
  const renderField = (field: FieldConfig) => {
    const value = formData[field.name];
    const baseClasses = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent";

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            value={String(value || '')}
            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            placeholder={field.placeholder}
            rows={field.rows || 4}
            className={baseClasses}
            required={field.required}
          />
        );
      
      case 'select':
        return (
          <select
            value={String(value || '')}
            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            className={baseClasses}
            required={field.required}
          >
            <option value="">Sélectionner...</option>
            {field.options?.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        );
      
      case 'checkbox':
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={Boolean(value)}
              onChange={(e) => setFormData({ ...formData, [field.name]: e.target.checked })}
              className="w-4 h-4 text-[#B8860B] border-gray-300 rounded focus:ring-[#B8860B]"
            />
            <span className="ml-2 text-sm text-gray-600">Actif</span>
          </div>
        );
      
      case 'number':
        return (
          <input
            type="number"
            value={Number(value) || 0}
            onChange={(e) => setFormData({ ...formData, [field.name]: parseInt(e.target.value) || 0 })}
            placeholder={field.placeholder}
            className={baseClasses}
            required={field.required}
          />
        );
      
      default:
        return (
          <input
            type={field.type}
            value={String(value || '')}
            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            placeholder={field.placeholder}
            className={baseClasses}
            required={field.required}
          />
        );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-[#B8860B]" />
        <span className="ml-2 text-gray-600">Chargement...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">{config.title}</h2>
        <button
          onClick={handleAdd}
          className="inline-flex items-center px-4 py-2 bg-[#B8860B] hover:bg-[#9a7209] text-white font-medium rounded-md transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
        />
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {editingItem ? 'Modifier' : 'Ajouter'} - {config.title}
              </h3>

              <div className="space-y-4">
                {config.fields.map(field => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {renderField(field)}
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="inline-flex items-center px-4 py-2 bg-[#B8860B] hover:bg-[#9a7209] text-white font-medium rounded-md transition-colors disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    'Enregistrer'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {config.columns.map(col => (
                  <th
                    key={col.key}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {col.label}
                  </th>
                ))}
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.length === 0 ? (
                <tr>
                  <td
                    colSpan={config.columns.length + 1}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    Aucun élément trouvé
                  </td>
                </tr>
              ) : (
                filteredItems.map((item, idx) => (
                  <tr key={(item as { _id?: string })._id || idx} className="hover:bg-gray-50">
                    {config.columns.map(col => (
                      <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {col.render 
                          ? col.render(item[col.key], item)
                          : col.key === 'isActive' 
                            ? (item[col.key] ? 
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Actif</span> : 
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Inactif</span>
                              )
                            : String(item[col.key] || '-')
                        }
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggleActive(item)}
                          className="p-1 text-gray-400 hover:text-gray-600"
                          title={item.isActive ? 'Désactiver' : 'Activer'}
                        >
                          {item.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-1 text-blue-600 hover:text-blue-800"
                          title="Modifier"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          className="p-1 text-red-600 hover:text-red-800"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="text-sm text-gray-500">
        {filteredItems.length} élément{filteredItems.length !== 1 ? 's' : ''} trouvé{filteredItems.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}

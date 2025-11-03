"use client";

import { useState, useMemo } from 'react';
import { Plus, Eye } from 'lucide-react';

export interface TableColumn<T = any> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
  width?: string;
}

export interface TableAction<T = any> {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  onClick: (item: T) => void;
  variant?: 'primary' | 'secondary' | 'danger';
}

interface DataTableProps<T = any> {
  title: string;
  data: T[];
  columns: TableColumn<T>[];
  actions?: TableAction<T>[];
  onAdd?: () => void;
  loading?: boolean;
  emptyMessage?: string;
  addButtonLabel?: string;
  pageSize?: number; // 20 par défaut
}

export default function DataTable<T extends { _id?: string }>({
  title,
  data,
  columns,
  actions = [],
  onAdd,
  loading = false,
  emptyMessage = "Aucun élément trouvé",
  addButtonLabel = "Ajouter un élément",
  pageSize = 20,
}: DataTableProps<T>) {
  const [page, setPage] = useState(1);

  const total = data.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, total);

  const pageData = useMemo(() => data.slice(startIndex, endIndex), [data, startIndex, endIndex]);

  const getActionButtonClass = (variant?: string) => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 hover:bg-blue-700 text-white';
      case 'secondary':
        return 'bg-gray-600 hover:bg-gray-700 text-white';
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 text-white';
      default:
        return 'bg-gray-100 hover:bg-gray-200 text-gray-700';
    }
  };

  const goto = (p: number) => setPage(Math.min(Math.max(1, p), totalPages));

  return (
    <div className="bg-white shadow-lg border-2 border-gray-200 rounded-xl overflow-hidden">
      {/* En-tête */}
      <div className="px-6 py-5 bg-gradient-to-r from-indigo-50 to-purple-50 border-b-2 border-gray-200 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-semibold">
              {total}
            </span>
            <span>élément{total > 1 ? 's' : ''}</span>
            <span className="text-gray-400">•</span>
            <span>Page {safePage} / {totalPages}</span>
          </p>
        </div>
        {onAdd && (
          <button
            onClick={onAdd}
            className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-semibold rounded-lg shadow-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-105"
          >
            <Plus className="w-5 h-5 mr-2" />
            {addButtonLabel}
          </button>
        )}
      </div>

      {/* Chargement */}
      {loading && (
        <div className="p-12 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      )}

      {/* Vide */}
      {!loading && total === 0 && (
        <div className="p-12 text-center">
          <div className="text-gray-400 mb-4">
            <Eye className="w-16 h-16 mx-auto opacity-50" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun contenu</h3>
          <p className="text-gray-600 mb-4">{emptyMessage}</p>
          {onAdd && (
            <button
              onClick={onAdd}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              {addButtonLabel}
            </button>
          )}
        </div>
      )}

      {/* Tableau */}
      {!loading && total > 0 && (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      style={{ width: column.width }}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {column.label}
                    </th>
                  ))}
                  {actions.length > 0 && (
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pageData.map((item, index) => (
                  <tr key={(item as any)._id || index} className="hover:bg-gray-50 transition-colors">
                    {columns.map((column) => (
                      <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm">
                        {column.render ? column.render(item) : (item as any)[column.key]?.toString() || '-'}
                      </td>
                    ))}
                    {actions.length > 0 && (
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          {actions.map((action, actionIndex) => {
                            const Icon = action.icon;
                            return (
                              <button
                                key={actionIndex}
                                onClick={() => action.onClick(item)}
                                className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded transition-colors ${getActionButtonClass(action.variant)}`}
                                title={action.label}
                              >
                                {Icon && <Icon className="w-3 h-3 mr-1" />}
                                {action.label}
                              </button>
                            );
                          })}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination controls */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Affichage {startIndex + 1}-{endIndex} sur {total}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => goto(safePage - 1)}
                disabled={safePage <= 1}
                className={`px-3 py-1.5 text-sm rounded border ${safePage <= 1 ? 'text-gray-400 border-gray-200' : 'text-gray-700 border-gray-300 hover:bg-gray-100'}`}
              >
                Précédent
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                const base = Math.max(1, Math.min(safePage - 2, totalPages - 4));
                const p = base + i;
                const active = p === safePage;
                return (
                  <button
                    key={p}
                    onClick={() => goto(p)}
                    className={`px-3 py-1.5 text-sm rounded border ${active ? 'bg-[#BE2722] text-white border-[#BE2722]' : 'text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                  >
                    {p}
                  </button>
                );
              })}
              <button
                onClick={() => goto(safePage + 1)}
                disabled={safePage >= totalPages}
                className={`px-3 py-1.5 text-sm rounded border ${safePage >= totalPages ? 'text-gray-400 border-gray-200' : 'text-gray-700 border-gray-300 hover:bg-gray-100'}`}
              >
                Suivant
              </button>
            </div>
          </div>
        </>
      )}
      {/* fin Table */}
    </div>
  );
}

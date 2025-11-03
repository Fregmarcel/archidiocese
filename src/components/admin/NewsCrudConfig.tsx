import { TableColumn } from '@/components/ui/DataTable';
import NewsForm, { NewsData } from './NewsForm';

export type { NewsData };

export const newsCrudConfig = {
  title: 'Actualités',
  apiEndpoint: '/api/admin/news',
  columns: [
    { 
      key: 'image', 
      label: 'Image',
      width: '80px',
      render: (row: any) => row.image ? (
        <img 
          src={row.image} 
          alt="" 
          className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
        />
      ) : (
        <div className="w-16 h-16 bg-gray-100 rounded-lg border-2 border-gray-200 flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )
    },
    { 
      key: 'title', 
      label: 'Titre',
      render: (row: any) => (
        <div className="max-w-md">
          <p className="font-semibold text-gray-900 line-clamp-2">{row.title}</p>
          {row.excerpt && (
            <p className="text-xs text-gray-500 mt-1 line-clamp-1">{row.excerpt}</p>
          )}
        </div>
      )
    },
    { 
      key: 'tags', 
      label: 'Tags',
      render: (row: any) => row.tags && row.tags.length > 0 ? (
        <div className="flex flex-wrap gap-1">
          {row.tags.slice(0, 3).map((tag: string, i: number) => (
            <span key={i} className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
              {tag}
            </span>
          ))}
          {row.tags.length > 3 && (
            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
              +{row.tags.length - 3}
            </span>
          )}
        </div>
      ) : (
        <span className="text-gray-400 text-sm">-</span>
      )
    },
    { 
      key: 'status', 
      label: 'Statut',
      width: '120px',
      render: (row: any) => (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
          row.status === 'published' 
            ? 'bg-green-100 text-green-700 border border-green-300' 
            : 'bg-yellow-100 text-yellow-700 border border-yellow-300'
        }`}>
          <span className="w-2 h-2 rounded-full bg-current"></span>
          {row.status === 'published' ? 'Publié' : 'Brouillon'}
        </span>
      )
    },
    { 
      key: 'publishedAt', 
      label: 'Publié le',
      width: '180px',
      render: (row: any) => row.publishedAt ? (
        <div className="text-sm">
          <p className="font-medium text-gray-900">
            {new Date(row.publishedAt).toLocaleDateString('fr-FR', { 
              day: 'numeric', 
              month: 'short', 
              year: 'numeric' 
            })}
          </p>
          <p className="text-xs text-gray-500">
            {new Date(row.publishedAt).toLocaleTimeString('fr-FR', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
        </div>
      ) : (
        <span className="text-gray-400 text-sm">Non planifié</span>
      )
    },
  ] as TableColumn<NewsData>[],
  FormComponent: NewsForm,
  options: {},
  messages: {
    emptyMessage: "Aucune actualité trouvée. Créez votre première actualité pour commencer."
  }
};

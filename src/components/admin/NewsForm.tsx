"use client";

import { useEffect, useState, useRef } from 'react';
import { useSimpleNotifications } from '@/hooks/useSimpleNotifications';
import RichTextEditor from './RichTextEditor';
import { ImageIcon, Upload, X, Calendar, Tag, FileText, Eye, Edit3 } from 'lucide-react';

export interface NewsData {
  _id?: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  image?: string;
  tags?: string[];
  locale: string;
  status: 'draft' | 'published';
  publishedAt?: string;
}

export default function NewsForm({ initialData, onSave, onCancel, locale = 'fr' }: {
  initialData?: NewsData | null;
  onSave: (data: NewsData) => void;
  onCancel: () => void;
  locale?: string;
}) {
  const [form, setForm] = useState<NewsData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image: '',
    tags: [],
    locale,
    status: 'draft',
    publishedAt: ''
  });

  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { NotificationContainer, showError, showSuccess } = useSimpleNotifications();

  useEffect(() => {
    if (initialData) setForm({ ...initialData, publishedAt: initialData.publishedAt || '' });
  }, [initialData]);

  const handleChange = (field: keyof NewsData, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    
    // Auto-génération du slug depuis le titre
    if (field === 'title' && !initialData) {
      const slug = value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setForm((prev) => ({ ...prev, slug }));
    }
  };

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith('image/')) {
      showError('Erreur', 'Veuillez sélectionner une image');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'news');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Erreur upload');

      const result = await response.json();
      if (result.success) {
        handleChange('image', result.url);
        showSuccess('Succès', 'Image uploadée avec succès');
      } else {
        throw new Error(result.error || 'Erreur inconnue');
      }
    } catch (error) {
      console.error('Upload error:', error);
      showError('Erreur', "Erreur lors de l'upload de l'image");
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return showError('Validation', 'Le titre est requis');
    if (!form.slug.trim()) return showError('Validation', 'Le slug est requis');
    onSave({ ...form, publishedAt: form.publishedAt || undefined });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
      <NotificationContainer />

      {/* En-tête avec badge statut */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {initialData ? 'Modifier l\'actualité' : 'Nouvelle actualité'}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Remplissez les informations ci-dessous pour créer ou modifier une actualité
          </p>
        </div>
        <div className={`px-4 py-2 rounded-full font-semibold text-sm ${
          form.status === 'published' 
            ? 'bg-green-100 text-green-700 border-2 border-green-300' 
            : 'bg-yellow-100 text-yellow-700 border-2 border-yellow-300'
        }`}>
          {form.status === 'published' ? '● Publié' : '● Brouillon'}
        </div>
      </div>

      <div className="space-y-6">
        {/* Section Informations principales */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-semibold text-gray-900">Informations principales</h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Titre de l'actualité *
              </label>
              <input
                value={form.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                placeholder="Ex: Grande célébration à la cathédrale"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Slug (URL) *
              </label>
              <div className="relative">
                <input
                  value={form.slug}
                  onChange={(e) => handleChange('slug', e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                  placeholder="grande-celebration-cathedrale"
                  required
                />
                <Edit3 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 mt-1">Généré automatiquement depuis le titre</p>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Extrait (résumé court)
            </label>
            <textarea
              value={form.excerpt}
              onChange={(e) => handleChange('excerpt', e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all resize-none"
              rows={3}
              placeholder="Courte description qui apparaîtra dans les cartes d'aperçu..."
            />
            <p className="text-xs text-gray-500 mt-1">
              {form.excerpt?.length || 0} caractères (recommandé: 100-200)
            </p>
          </div>
        </div>

        {/* Section Image */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <ImageIcon className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-semibold text-gray-900">Image de couverture</h3>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files)}
            className="hidden"
          />

          {form.image ? (
            <div className="relative group">
              <img
                src={form.image}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg border-2 border-gray-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all rounded-lg flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Changer
                </button>
                <button
                  type="button"
                  onClick={() => handleChange('image', '')}
                  className="opacity-0 group-hover:opacity-100 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Supprimer
                </button>
              </div>
            </div>
          ) : (
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all ${
                dragActive 
                  ? 'border-indigo-500 bg-indigo-50' 
                  : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
              }`}
            >
              {uploading ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
                  <p className="text-gray-600 font-medium">Upload en cours...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold">Cliquez ou glissez une image ici</p>
                    <p className="text-sm text-gray-500 mt-1">PNG, JPG, WEBP jusqu'à 10MB</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Section Contenu */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Edit3 className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-semibold text-gray-900">Contenu de l'article</h3>
          </div>
          <RichTextEditor
            value={form.content || ''}
            onChange={(v) => handleChange('content', v)}
          />
        </div>

        {/* Section Métadonnées */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-semibold text-gray-900">Métadonnées et publication</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Date de publication
              </label>
              <input
                type="datetime-local"
                value={form.publishedAt || ''}
                onChange={(e) => handleChange('publishedAt', e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                style={{
                  colorScheme: 'light',
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Eye className="w-4 h-4 inline mr-1" />
                Statut
              </label>
              <select
                value={form.status}
                onChange={(e) => handleChange('status', e.target.value as 'draft' | 'published')}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              >
                <option value="draft">📝 Brouillon</option>
                <option value="published">✅ Publié</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🌍 Langue
              </label>
              <select
                value={form.locale}
                onChange={(e) => handleChange('locale', e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              >
                <option value="fr">🇫🇷 Français</option>
                <option value="en">🇬🇧 English</option>
              </select>
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Tag className="w-4 h-4 inline mr-1" />
                Tags (séparés par des virgules)
              </label>
              <input
                value={(form.tags || []).join(', ')}
                onChange={(e) => handleChange('tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                placeholder="UCAC, Célébration, Formation, Pastorale..."
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {form.tags?.map((tag, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleChange('tags', form.tags?.filter((_, idx) => idx !== i))}
                      className="hover:bg-indigo-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t-2 border-gray-200">
          <button 
            type="button" 
            onClick={onCancel} 
            className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
          >
            Annuler
          </button>
          <button 
            type="submit" 
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-indigo-800 transition-all flex items-center gap-2"
          >
            <FileText className="w-5 h-5" />
            {initialData ? 'Mettre à jour' : 'Publier l\'actualité'}
          </button>
        </div>
      </div>
    </form>
  );
}

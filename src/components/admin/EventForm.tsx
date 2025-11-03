"use client";

import { useEffect, useRef, useState } from 'react';
import RichTextEditor from './RichTextEditor';
import { useSimpleNotifications } from '@/hooks/useSimpleNotifications';
import { Calendar, MapPin, Image as ImageIcon, Upload, X, FileText, Tag, Eye } from 'lucide-react';

export interface EventData {
  _id?: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  image?: string;
  date: string; // ISO
  location?: string;
  tags?: string[];
  locale: string;
  status: 'draft' | 'published';
}

export default function EventForm({ initialData, onSave, onCancel, locale = 'fr' }: {
  initialData?: EventData | null;
  onSave: (data: EventData) => void;
  onCancel: () => void;
  locale?: string;
}) {
  const [form, setForm] = useState<EventData>({
    title: '', slug: '', excerpt: '', content: '', image: '', date: '', location: '', tags: [], locale, status: 'draft'
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { NotificationContainer, showError, showSuccess } = useSimpleNotifications();

  useEffect(() => { if (initialData) setForm({ ...initialData, date: initialData.date || '' }); }, [initialData]);

  const handleChange = (field: keyof EventData, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === 'title' && !initialData) {
      const slug = value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setForm((prev) => ({ ...prev, slug }));
    }
  };

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith('image/')) return showError('Erreur', 'Veuillez sélectionner une image');
    const fd = new FormData(); fd.append('file', file); fd.append('type', 'events');
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    if (!res.ok) return showError('Erreur', "Upload échoué");
    const json = await res.json();
    if (json.success) { handleChange('image', json.url); showSuccess('Succès', 'Image uploadée'); }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return showError('Validation', 'Le titre est requis');
    if (!form.slug.trim()) return showError('Validation', 'Le slug est requis');
    if (!form.date) return showError('Validation', 'La date est requise');
    onSave(form);
  };

  return (
    <form onSubmit={submit} className="max-w-6xl mx-auto space-y-6">
      <NotificationContainer />

      <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4"><FileText className="w-5 h-5 text-indigo-600"/><h3 className="text-lg font-semibold">Informations</h3></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Titre *</label>
            <input value={form.title} onChange={(e)=>handleChange('title', e.target.value)} className="w-full border-2 rounded-lg px-4 py-3 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"/>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Slug *</label>
            <input value={form.slug} onChange={(e)=>handleChange('slug', e.target.value)} className="w-full border-2 rounded-lg px-4 py-3 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"/>
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-sm font-semibold mb-2">Extrait</label>
          <textarea value={form.excerpt} onChange={(e)=>handleChange('excerpt', e.target.value)} rows={3} className="w-full border-2 rounded-lg px-4 py-3 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"/>
        </div>
      </div>

      <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4"><ImageIcon className="w-5 h-5 text-indigo-600"/><h3 className="text-lg font-semibold">Image</h3></div>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e)=>handleImageUpload(e.target.files)} />
        {form.image ? (
          <div className="relative group">
            <img src={form.image} alt="" className="w-full h-64 object-cover rounded-lg border-2 border-gray-300"/>
            <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/0 group-hover:bg-black/40 transition-all rounded-lg">
              <button type="button" onClick={()=>fileInputRef.current?.click()} className="opacity-0 group-hover:opacity-100 bg-white px-4 py-2 rounded-lg font-semibold">Changer</button>
              <button type="button" onClick={()=>handleChange('image','')} className="opacity-0 group-hover:opacity-100 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">Supprimer</button>
            </div>
          </div>
        ) : (
          <div onClick={()=>fileInputRef.current?.click()} className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover:border-indigo-400 hover:bg-gray-50">
            <Upload className="w-8 h-8 text-indigo-600 mx-auto"/>
            <p className="mt-2 text-gray-600">Cliquez ou glissez une image ici</p>
          </div>
        )}
      </div>

      <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4"><Calendar className="w-5 h-5 text-indigo-600"/><h3 className="text-lg font-semibold">Planification</h3></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Date *</label>
            <input type="datetime-local" value={form.date || ''} onChange={(e)=>handleChange('date', e.target.value)} className="w-full border-2 rounded-lg px-4 py-3 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"/>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Lieu</label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
              <input value={form.location || ''} onChange={(e)=>handleChange('location', e.target.value)} className="w-full border-2 rounded-lg pl-10 pr-4 py-3 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" placeholder="Ex: Cathédrale Notre-Dame des Victoires"/>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Statut</label>
            <select value={form.status} onChange={(e)=>handleChange('status', e.target.value as 'draft'|'published')} className="w-full border-2 rounded-lg px-4 py-3 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200">
              <option value="draft">📝 Brouillon</option>
              <option value="published">✅ Publié</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Langue</label>
            <select value={form.locale} onChange={(e)=>handleChange('locale', e.target.value)} className="w-full border-2 rounded-lg px-4 py-3 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200">
              <option value="fr">🇫🇷 Français</option>
              <option value="en">🇬🇧 English</option>
            </select>
          </div>
          <div className="lg:col-span-2">
            <label className="block text-sm font-semibold mb-2">Tags</label>
            <input value={(form.tags||[]).join(', ')} onChange={(e)=>handleChange('tags', e.target.value.split(',').map(t=>t.trim()).filter(Boolean))} className="w-full border-2 rounded-lg px-4 py-3 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" placeholder="Pastorale, Célébration..."/>
          </div>
        </div>
      </div>

      <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4"><Eye className="w-5 h-5 text-indigo-600"/><h3 className="text-lg font-semibold">Description</h3></div>
        <RichTextEditor value={form.content || ''} onChange={(v)=>handleChange('content', v)} />
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t-2 border-gray-200">
        <button type="button" onClick={onCancel} className="px-6 py-3 rounded-lg border-2 border-gray-300">Annuler</button>
        <button type="submit" className="px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold">{initialData ? 'Mettre à jour' : 'Publier l\'évènement'}</button>
      </div>
    </form>
  );
}

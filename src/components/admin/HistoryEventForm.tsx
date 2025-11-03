"use client";

import { useEffect, useRef, useState } from 'react';
import { useSimpleNotifications } from '@/hooks/useSimpleNotifications';
import { Calendar, Image as ImageIcon, Hash, Type, AlignLeft, ListOrdered, CheckCircle2 } from 'lucide-react';

export type HistoryEventData = {
  _id?: string;
  year: number;
  title: string;
  description: string;
  image: string;
  category: 'creation' | 'construction' | 'nomination' | 'modernisation' | 'other';
  displayOrder?: number;
  isActive?: boolean;
};

export default function HistoryEventForm({ initialData, onSave, onCancel }: {
  initialData?: HistoryEventData | null;
  onSave: (data: HistoryEventData) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<HistoryEventData>({
    year: new Date().getFullYear(),
    title: '',
    description: '',
    image: '',
    category: 'other',
    displayOrder: 0,
    isActive: true,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { NotificationContainer, showError, showSuccess } = useSimpleNotifications();

  useEffect(() => { if (initialData) setForm({ ...initialData }); }, [initialData]);

  const handleChange = (field: keyof HistoryEventData, value: any) => setForm((p) => ({ ...p, [field]: value }));

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith('image/')) return showError('Erreur', 'Veuillez sélectionner une image');
    const fd = new FormData(); fd.append('file', file); fd.append('type', 'history');
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    if (!res.ok) return showError('Erreur', "Upload échoué");
    const json = await res.json();
    if (json.success) { handleChange('image', json.url); showSuccess('Succès', 'Image uploadée'); }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return showError('Validation', 'Le titre est requis');
    if (!form.description.trim()) return showError('Validation', 'La description est requise');
    if (!form.image.trim()) return showError('Validation', 'L\'image est requise');
    onSave(form);
  };

  return (
    <form onSubmit={submit} className="max-w-5xl mx-auto space-y-6">
      <NotificationContainer />

      {/* Informations principales */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4"><Type className="w-5 h-5 text-indigo-600"/><h3 className="text-lg font-semibold">Informations</h3></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Titre *</label>
            <input value={form.title} onChange={(e)=>handleChange('title', e.target.value)} className="w-full border-2 rounded-lg px-4 py-3 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"/>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Année *</label>
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
              <input type="number" value={form.year} onChange={(e)=>handleChange('year', Number(e.target.value))} className="w-full border-2 rounded-lg pl-10 pr-4 py-3 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-sm font-semibold mb-2">Description *</label>
          <textarea value={form.description} onChange={(e)=>handleChange('description', e.target.value)} rows={4} className="w-full border-2 rounded-lg px-4 py-3 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"/>
        </div>
      </div>

      {/* Image */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4"><ImageIcon className="w-5 h-5 text-indigo-600"/><h3 className="text-lg font-semibold">Image *</h3></div>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e)=>handleImageUpload(e.target.files)} />
        {form.image ? (
          <div className="relative group">
            <img src={form.image} alt="" className="w-64 h-40 object-cover rounded-lg border-2 border-gray-300"/>
            <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/0 group-hover:bg-black/40 transition-all rounded-lg">
              <button type="button" onClick={()=>fileInputRef.current?.click()} className="opacity-0 group-hover:opacity-100 bg-white px-4 py-2 rounded-lg font-semibold">Changer</button>
              <button type="button" onClick={()=>handleChange('image','')} className="opacity-0 group-hover:opacity-100 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">Supprimer</button>
            </div>
          </div>
        ) : (
          <div onClick={()=>fileInputRef.current?.click()} className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover:border-indigo-400 hover:bg-gray-50">
            <ImageIcon className="w-8 h-8 text-indigo-600 mx-auto"/>
            <p className="mt-2 text-gray-600">Cliquez ou glissez une image ici</p>
          </div>
        )}
      </div>

      {/* Métadonnées */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Catégorie</label>
            <select value={form.category} onChange={(e)=>handleChange('category', e.target.value as any)} className="w-full border-2 rounded-lg px-4 py-3 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200">
              <option value="creation">Création</option>
              <option value="construction">Construction</option>
              <option value="nomination">Nomination</option>
              <option value="modernisation">Modernisation</option>
              <option value="other">Autre</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Ordre d'affichage</label>
            <div className="relative">
              <ListOrdered className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
              <input type="number" value={form.displayOrder ?? 0} onChange={(e)=>handleChange('displayOrder', Number(e.target.value))} className="w-full border-2 rounded-lg pl-10 pr-4 py-3 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Actif</label>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={!!form.isActive} onChange={(e)=>handleChange('isActive', e.target.checked)} className="h-5 w-5"/>
              <span className="text-sm text-gray-700">Visible sur le site</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t-2 border-gray-200">
        <button type="button" onClick={onCancel} className="px-6 py-3 rounded-lg border-2 border-gray-300">Annuler</button>
        <button type="submit" className="px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold">{initialData ? 'Mettre à jour' : 'Ajouter à l\'historique'}</button>
      </div>
    </form>
  );
}

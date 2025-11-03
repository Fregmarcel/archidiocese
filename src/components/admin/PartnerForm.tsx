"use client";

import { useEffect, useRef, useState } from 'react';
import { useSimpleNotifications } from '@/hooks/useSimpleNotifications';
import { Upload, Globe, FileText, Image as ImageIcon, Hash, ListOrdered } from 'lucide-react';

export type PartnerData = {
  _id?: string;
  name: string;
  url?: string;
  description?: string;
  logo?: string;
  category: 'universites' | 'recherche' | 'entreprises' | 'etranger' | 'emploi';
  order?: number;
  locale: string;
};

export default function PartnerForm({ initialData, onSave, onCancel, locale = 'fr' }: {
  initialData?: PartnerData | null;
  onSave: (data: PartnerData) => void;
  onCancel: () => void;
  locale?: string;
}) {
  const [form, setForm] = useState<PartnerData>({ name: '', url: '', description: '', logo: '', category: 'universites', order: 0, locale });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { NotificationContainer, showError, showSuccess } = useSimpleNotifications();

  useEffect(() => { if (initialData) setForm({ ...initialData }); }, [initialData]);

  const handleChange = (field: keyof PartnerData, value: any) => setForm((p) => ({ ...p, [field]: value }));

  const handleLogoUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith('image/')) return showError('Erreur', 'Veuillez sélectionner une image');
    const fd = new FormData(); fd.append('file', file); fd.append('type', 'partners');
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    if (!res.ok) return showError('Erreur', "Upload échoué");
    const json = await res.json();
    if (json.success) { handleChange('logo', json.url); showSuccess('Succès', 'Logo uploadé'); }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return showError('Validation', 'Le nom est requis');
    onSave(form);
  };

  return (
    <form onSubmit={submit} className="max-w-5xl mx-auto space-y-6">
      <NotificationContainer />

      <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4"><FileText className="w-5 h-5 text-indigo-600"/><h3 className="text-lg font-semibold">Informations</h3></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Nom *</label>
            <input value={form.name} onChange={(e)=>handleChange('name', e.target.value)} className="w-full border-2 rounded-lg px-4 py-3 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"/>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Lien (URL)</label>
            <div className="relative">
              <Globe className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
              <input value={form.url || ''} onChange={(e)=>handleChange('url', e.target.value)} className="w-full border-2 rounded-lg pl-10 pr-4 py-3 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" placeholder="https://..."/>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-sm font-semibold mb-2">Description</label>
          <textarea value={form.description || ''} onChange={(e)=>handleChange('description', e.target.value)} rows={3} className="w-full border-2 rounded-lg px-4 py-3 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"/>
        </div>
      </div>

      <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4"><ImageIcon className="w-5 h-5 text-indigo-600"/><h3 className="text-lg font-semibold">Logo</h3></div>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e)=>handleLogoUpload(e.target.files)} />
        {form.logo ? (
          <div className="relative group">
            <img src={form.logo} alt="" className="w-48 h-48 object-cover rounded-lg border-2 border-gray-300"/>
            <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/0 group-hover:bg-black/40 transition-all rounded-lg">
              <button type="button" onClick={()=>fileInputRef.current?.click()} className="opacity-0 group-hover:opacity-100 bg-white px-4 py-2 rounded-lg font-semibold">Changer</button>
              <button type="button" onClick={()=>handleChange('logo','')} className="opacity-0 group-hover:opacity-100 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">Supprimer</button>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Catégorie</label>
            <select value={form.category} onChange={(e)=>handleChange('category', e.target.value as any)} className="w-full border-2 rounded-lg px-4 py-3 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200">
              <option value="universites">Universités</option>
              <option value="recherche">Recherche scientifique</option>
              <option value="entreprises">Entreprises</option>
              <option value="etranger">Étudier à l'étranger</option>
              <option value="emploi">Partenaires pour l'emploi</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Ordre d'affichage</label>
            <div className="relative">
              <ListOrdered className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
              <input type="number" value={form.order ?? 0} onChange={(e)=>handleChange('order', Number(e.target.value))} className="w-full border-2 rounded-lg pl-10 pr-4 py-3 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Langue</label>
            <select value={form.locale} onChange={(e)=>handleChange('locale', e.target.value)} className="w-full border-2 rounded-lg px-4 py-3 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200">
              <option value="fr">🇫🇷 Français</option>
              <option value="en">🇬🇧 English</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t-2 border-gray-200">
        <button type="button" onClick={onCancel} className="px-6 py-3 rounded-lg border-2 border-gray-300">Annuler</button>
        <button type="submit" className="px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold">{initialData ? 'Mettre à jour' : 'Ajouter le partenaire'}</button>
      </div>
    </form>
  );
}

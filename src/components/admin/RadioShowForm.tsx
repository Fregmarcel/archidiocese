"use client";

import { useEffect, useState } from 'react';
import FileUpload from './FileUpload';

export interface RadioShowData {
  _id?: string;
  title: string;
  description: string;
  type: 'live' | 'recorded';
  category: 'messe' | 'predication' | 'magazine' | 'temoignage' | 'autre';
  duration: string;
  audioUrl?: string;
  imageUrl?: string;
  host?: string;
  recordedAt?: string;
  broadcastDate?: string;
  isLive?: boolean;
  tags?: string[];
}

interface Props {
  locale?: string;
  initialData?: RadioShowData | null;
  onSave: (data: RadioShowData) => void;
  onCancel: () => void;
}

export default function RadioShowForm({ initialData, onSave, onCancel }: Props) {
  const [form, setForm] = useState<RadioShowData>({
    title: '',
    description: '',
    type: 'recorded',
    category: 'autre',
    duration: '30 min',
    audioUrl: '',
    imageUrl: '',
    host: '',
    recordedAt: '',
    broadcastDate: '',
    isLive: false,
    tags: []
  });

  useEffect(() => {
    if (initialData) setForm({
      ...initialData,
      recordedAt: initialData.recordedAt ? String(initialData.recordedAt).slice(0,16) : '',
      broadcastDate: initialData.broadcastDate ? String(initialData.broadcastDate).slice(0,16) : ''
    });
  }, [initialData]);

  const update = (k: keyof RadioShowData, v: any) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...form });
  };

  const handleImageUploaded = (url: string) => update('imageUrl', url);
  const handleAudioUploaded = async (file: File) => {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('type', 'publication');
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const json = await res.json();
    if (json.success) update('audioUrl', json.url);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Titre</label>
          <input value={form.title} onChange={e=>update('title', e.target.value)} required className="mt-1 w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Animateur</label>
          <input value={form.host} onChange={e=>update('host', e.target.value)} className="mt-1 w-full border rounded-lg px-3 py-2" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea value={form.description} onChange={e=>update('description', e.target.value)} required rows={3} className="mt-1 w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select value={form.type} onChange={e=>update('type', e.target.value as any)} className="mt-1 w-full border rounded-lg px-3 py-2">
            <option value="live">Direct</option>
            <option value="recorded">Rediffusion</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Catégorie</label>
          <select value={form.category} onChange={e=>update('category', e.target.value as any)} className="mt-1 w-full border rounded-lg px-3 py-2">
            <option value="messe">Messe</option>
            <option value="predication">Prédication</option>
            <option value="magazine">Magazine</option>
            <option value="temoignage">Témoignage</option>
            <option value="autre">Autre</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Durée</label>
          <input value={form.duration} onChange={e=>update('duration', e.target.value)} className="mt-1 w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date d'enregistrement</label>
          <input type="datetime-local" value={form.recordedAt} onChange={e=>update('recordedAt', e.target.value)} className="mt-1 w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date de diffusion</label>
          <input type="datetime-local" value={form.broadcastDate} onChange={e=>update('broadcastDate', e.target.value)} className="mt-1 w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">En direct</label>
          <input type="checkbox" checked={form.isLive} onChange={e=>update('isLive', e.target.checked)} className="mt-2" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
          <FileUpload value={form.imageUrl} onChange={handleImageUploaded} onRemove={()=>update('imageUrl','')} type="gallery" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Audio (MP3)</label>
          <input type="file" accept="audio/mpeg" onChange={e=>{ const f=e.target.files?.[0]; if (f) handleAudioUploaded(f); }} />
          {form.audioUrl && (
            <p className="text-sm text-green-700 mt-2">Audio chargé: {form.audioUrl.split('/').pop()}</p>
          )}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Tags (séparés par des virgules)</label>
          <input value={(form.tags||[]).join(', ')} onChange={(e)=>update('tags', e.target.value.split(',').map(t=>t.trim()).filter(Boolean))} className="mt-1 w-full border rounded-lg px-3 py-2" />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">Annuler</button>
        <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Enregistrer</button>
      </div>
    </form>
  );
}

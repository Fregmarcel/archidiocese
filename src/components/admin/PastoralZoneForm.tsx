"use client";

import { useState } from 'react';
import type { IPastoralZone } from '@/models/PastoralZone';

interface Props {
  initialData?: Partial<IPastoralZone> | null;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export default function PastoralZoneForm({ initialData, onSave, onCancel }: Props) {
  const [form, setForm] = useState<Partial<IPastoralZone>>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    numberOfParishes: initialData?.numberOfParishes || 0,
    coordinator: initialData?.coordinator || '',
    coordinatorEmail: initialData?.coordinatorEmail || '',
    coordinatorPhone: initialData?.coordinatorPhone || '',
    address: initialData?.address || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === 'numberOfParishes' ? Number(value) : value }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form as any);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nom</label>
        <input name="name" value={form.name as string} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea name="description" value={form.description as string} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" rows={3} required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nb. Paroisses</label>
          <input type="number" name="numberOfParishes" value={form.numberOfParishes as number} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" min={0} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Coordinateur</label>
          <input name="coordinator" value={form.coordinator as string} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input name="coordinatorEmail" value={form.coordinatorEmail as string} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Téléphone</label>
          <input name="coordinatorPhone" value={form.coordinatorPhone as string} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Adresse</label>
          <input name="address" value={form.address as string} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">Enregistrer</button>
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-100 rounded">Annuler</button>
      </div>
    </form>
  );
}

"use client";

import { useState } from 'react';
import type { IParish } from '@/models/Parish';

interface Props {
  initialData?: Partial<IParish> | null;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export default function ParishForm({ initialData, onSave, onCancel }: Props) {
  const [form, setForm] = useState<any>({
    name: initialData?.name ?? '',
    description: initialData?.description ?? '',
    pastoralZone: (initialData as any)?.pastoralZone ?? '',
    address: initialData?.address ?? '',
    pastor: (initialData as any)?.pastor ?? '',
    vicePastor: (initialData as any)?.vicePastor ?? '',
    phone: (initialData as any)?.phone ?? '',
    email: (initialData as any)?.email ?? ''
  });

  // Mass schedule fields (simple strings in form UI)
  const [weekdays, setWeekdays] = useState<string>((initialData as any)?.massSchedule?.weekdays ?? '');
  const [saturday, setSaturday] = useState<string>((initialData as any)?.massSchedule?.saturday ?? '');
  const [sunday, setSunday] = useState<string>((initialData as any)?.massSchedule?.sunday ?? '');

  // One item per line textareas
  const [servicesStr, setServicesStr] = useState<string>(Array.isArray((initialData as any)?.services) ? ((initialData as any).services as string[]).join('\n') : '');
  const [groupsStr, setGroupsStr] = useState<string>(Array.isArray((initialData as any)?.groups) ? ((initialData as any).groups as string[]).join('\n') : '');
  const [eventsStr, setEventsStr] = useState<string>(Array.isArray((initialData as any)?.events) ? ((initialData as any).events as string[]).join('\n') : '');
  const [imagesStr, setImagesStr] = useState<string>(Array.isArray((initialData as any)?.images) ? ((initialData as any).images as string[]).join('\n') : '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f: any) => ({ ...f, [name]: value }));
  };

  const toArray = (s: string) => s
    .split(/\r?\n|,/) // split by new line or comma
    .map((v) => v.trim())
    .filter(Boolean);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: any = { ...form };

    // Mass schedule
    const ms = {
      weekdays: weekdays.trim(),
      saturday: saturday.trim(),
      sunday: sunday.trim(),
    } as any;
    if (ms.weekdays || ms.saturday || ms.sunday) payload.massSchedule = ms;

    // Arrays
    const sv = toArray(servicesStr);
    if (sv.length) payload.services = sv;
    const gr = toArray(groupsStr);
    if (gr.length) payload.groups = gr;
    const ev = toArray(eventsStr);
    if (ev.length) payload.events = ev;
    const im = toArray(imagesStr);
    if (im.length) payload.images = im;

    onSave(payload);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom</label>
          <input name="name" value={form.name} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Zone pastorale (ID)</label>
          <input name="pastoralZone" value={String(form.pastoralZone || '')} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" required />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Adresse</label>
        <input name="address" value={form.address || ''} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea name="description" value={form.description || ''} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" rows={3} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Curé</label>
          <input name="pastor" value={form.pastor || ''} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Vicaire</label>
          <input name="vicePastor" value={form.vicePastor || ''} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Téléphone</label>
          <input name="phone" value={form.phone || ''} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input name="email" value={form.email || ''} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" />
        </div>
      </div>

      {/* Mass schedule */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Horaires Semaine</label>
          <input value={weekdays} onChange={(e) => setWeekdays(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Horaires Samedi</label>
          <input value={saturday} onChange={(e) => setSaturday(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Horaires Dimanche</label>
          <input value={sunday} onChange={(e) => setSunday(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
        </div>
      </div>

      {/* Arrays */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Services (un par ligne)</label>
          <textarea value={servicesStr} onChange={(e) => setServicesStr(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" rows={4} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Groupes/Mouvements (un par ligne)</label>
          <textarea value={groupsStr} onChange={(e) => setGroupsStr(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" rows={4} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Événements (un par ligne)</label>
          <textarea value={eventsStr} onChange={(e) => setEventsStr(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" rows={4} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Images (URLs, une par ligne)</label>
          <textarea value={imagesStr} onChange={(e) => setImagesStr(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" rows={4} />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">Enregistrer</button>
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-100 rounded">Annuler</button>
      </div>
    </form>
  );
}
"use client";

import { useState } from 'react';
import { ICurieMember } from '../../models/CurieMember';

interface CurieMemberFormProps {
  locale?: string;
  initialData?: ICurieMember | null;
  onSave: (data: ICurieMember) => void;
  onCancel: () => void;
}

export default function CurieMemberForm({ 
  initialData, 
  onSave, 
  onCancel 
}: CurieMemberFormProps) {
  const [formData, setFormData] = useState<Partial<ICurieMember>>({
    name: '',
    role: '',
    subtitle: '',
    image: '',
    biography: '',
    email: '',
    phone: '',
    address: '',
    ordination: '',
    dateOfBirth: '',
    placeOfBirth: '',
    nationality: '',
    languages: [],
    education: [],
    ministries: [],
    publications: [],
    isActive: true,
    displayOrder: 0,
    ...initialData
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as ICurieMember);
  };

  const handleChange = (field: keyof ICurieMember, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addArrayItem = (field: 'education' | 'ministries' | 'publications' | 'languages') => {
    const currentArray = formData[field] || [];
    setFormData(prev => ({
      ...prev,
      [field]: [...currentArray, '']
    }));
  };

  const removeArrayItem = (field: 'education' | 'ministries' | 'publications' | 'languages', index: number) => {
    const currentArray = formData[field] || [];
    setFormData(prev => ({
      ...prev,
      [field]: currentArray.filter((_, i) => i !== index)
    }));
  };

  const updateArrayItem = (field: 'education' | 'ministries' | 'publications' | 'languages', index: number, value: string) => {
    const currentArray = formData[field] || [];
    const newArray = [...currentArray];
    newArray[index] = value;
    setFormData(prev => ({
      ...prev,
      [field]: newArray
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nom complet */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom complet *
          </label>
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Rôle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rôle *
          </label>
          <input
            type="text"
            value={formData.role || ''}
            onChange={(e) => handleChange('role', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: Vicaire Général, Chancelier, etc."
            required
          />
          <p className="mt-1 text-xs text-gray-500">
            Exemples: Archevêque Métropolitain, Vicaire Général, Chancelier, Économe Diocésain
          </p>
        </div>

        {/* Sous-titre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sous-titre
          </label>
          <input
            type="text"
            value={formData.subtitle || ''}
            onChange={(e) => handleChange('subtitle', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Photo (upload) *
          </label>
          <div className="flex items-center gap-4">
            {formData.image && (
              <img src={formData.image as string} alt="Aperçu" className="h-16 w-16 rounded object-cover border" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const data = new FormData();
                data.append('file', file);
                data.append('type', 'portrait');
                try {
                  const res = await fetch('/api/upload', { method: 'POST', body: data });
                  const json = await res.json();
                  if (res.ok && json?.url) {
                    handleChange('image', json.url);
                  } else {
                    alert(json?.error || "Erreur lors de l'upload");
                  }
                } catch (error) {
                  console.error('Upload error', error);
                  alert("Erreur lors de l'upload");
                }
              }}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required={!formData.image}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">Formats: JPG, PNG, WEBP. Max 5MB.</p>
        </div>

        {/* Ordre d'affichage */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ordre d'affichage
          </label>
          <input
            type="number"
            value={formData.displayOrder || 0}
            onChange={(e) => handleChange('displayOrder', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
          />
        </div>

        {/* Statut actif */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isActive"
            checked={formData.isActive || false}
            onChange={(e) => handleChange('isActive', e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
            Membre actif
          </label>
        </div>
      </div>

      {/* Biographie */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Biographie
        </label>
        <textarea
          value={formData.biography || ''}
          onChange={(e) => handleChange('biography', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Adresse */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Adresse
        </label>
        <input
          type="text"
          value={formData.address || ''}
          onChange={(e) => handleChange('address', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Informations personnelles - Grid 2 colonnes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Téléphone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Téléphone
          </label>
          <input
            type="tel"
            value={formData.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="+237 XX XX XX XX"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={formData.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="nom@archidiocese.org"
          />
        </div>

        {/* Date de naissance */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date de naissance
          </label>
          <input
            type="date"
            value={formData.dateOfBirth || ''}
            onChange={(e) => handleChange('dateOfBirth', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Lieu de naissance */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lieu de naissance
          </label>
          <input
            type="text"
            value={formData.placeOfBirth || ''}
            onChange={(e) => handleChange('placeOfBirth', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ville, Pays"
          />
        </div>

        {/* Nationalité */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nationalité
          </label>
          <input
            type="text"
            value={formData.nationality || ''}
            onChange={(e) => handleChange('nationality', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Gabonaise, Camerounaise, etc."
          />
        </div>
      </div>

      {/* Ordination */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ordination
        </label>
        <input
          type="text"
          value={formData.ordination || ''}
          onChange={(e) => handleChange('ordination', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Formation */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Formation
        </label>
        {(formData.education || []).map((item, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={item}
              onChange={(e) => updateArrayItem('education', index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => removeArrayItem('education', index)}
              className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('education')}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Ajouter formation
        </button>
      </div>

      {/* Langues */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Langues parlées
        </label>
        {(formData.languages || []).map((item, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={item}
              onChange={(e) => updateArrayItem('languages', index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Français, Anglais, Fang, etc."
            />
            <button
              type="button"
              onClick={() => removeArrayItem('languages', index)}
              className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('languages')}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Ajouter langue
        </button>
      </div>

      {/* Ministères */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ministères et Responsabilités
        </label>
        {(formData.ministries || []).map((item, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={item}
              onChange={(e) => updateArrayItem('ministries', index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => removeArrayItem('ministries', index)}
              className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('ministries')}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Ajouter ministère
        </button>
      </div>

      {/* Publications */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Publications
        </label>
        {(formData.publications || []).map((item, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={item}
              onChange={(e) => updateArrayItem('publications', index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => removeArrayItem('publications', index)}
              className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('publications')}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Ajouter publication
        </button>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Sauvegarder
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}

"use client";

import { useState, useEffect } from 'react';

interface FlashInfoFormData {
  title: string;
  content: string;
  url: string;
  isActive: boolean;
  displayOrder: number;
  startDate: string;
  endDate: string;
}

interface FlashInfoFormProps {
  flashInfoId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function FlashInfoForm({ flashInfoId, onSuccess, onCancel }: FlashInfoFormProps) {
  const [formData, setFormData] = useState<FlashInfoFormData>({
    title: '',
    content: '',
    url: '',
    isActive: true,
    displayOrder: 0,
    startDate: '',
    endDate: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Charger les données si on édite un flash info existant
  useEffect(() => {
    if (flashInfoId) {
      const loadFlashInfo = async () => {
        try {
          const response = await fetch(`/api/flash-infos/${flashInfoId}`);
          const data = await response.json();
          
          if (data.success) {
            const flashInfo = data.data;
            setFormData({
              title: flashInfo.title || '',
              content: flashInfo.content || '',
              url: flashInfo.url || '',
              isActive: flashInfo.isActive ?? true,
              displayOrder: flashInfo.displayOrder || 0,
              startDate: flashInfo.startDate ? new Date(flashInfo.startDate).toISOString().split('T')[0] : '',
              endDate: flashInfo.endDate ? new Date(flashInfo.endDate).toISOString().split('T')[0] : ''
            });
          }
        } catch (error) {
          console.error('Erreur lors du chargement:', error);
          setError('Erreur lors du chargement des données');
        }
      };
      
      loadFlashInfo();
    }
  }, [flashInfoId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const submitData = {
        ...formData,
        startDate: formData.startDate || null,
        endDate: formData.endDate || null,
      };

      const url = flashInfoId ? `/api/flash-infos/${flashInfoId}` : '/api/flash-infos';
      const method = flashInfoId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (data.success) {
        onSuccess?.();
      } else {
        setError(data.message || 'Une erreur est survenue');
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      setError('Erreur lors de la sauvegarde');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Titre */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Titre *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            maxLength={200}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Titre de la flash info"
          />
        </div>

        {/* Contenu */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contenu * 
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            maxLength={500}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Contenu de la flash info qui défilera"
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.content.length}/500 caractères
          </p>
        </div>

        {/* URL (optionnelle) */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lien (optionnel)
          </label>
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://exemple.com/lien-vers-article"
          />
        </div>

        {/* Ordre d'affichage */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ordre d'affichage
          </label>
          <input
            type="number"
            name="displayOrder"
            value={formData.displayOrder}
            onChange={handleChange}
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Active */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">
            Flash info active
          </label>
        </div>

        {/* Date de début */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date de début (optionnelle)
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Date de fin */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date de fin (optionnelle)
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="flex justify-end gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? 'Sauvegarde...' : (flashInfoId ? 'Mettre à jour' : 'Créer')}
        </button>
      </div>
    </form>
  );
}

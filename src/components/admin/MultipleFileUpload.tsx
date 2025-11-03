"use client";

import { useState } from 'react';
import { Plus, X, Image as ImageIcon } from 'lucide-react';
import FileUpload from './FileUpload';

interface MultipleFileUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  type: 'gallery' | 'publication';
  label: string;
  maxFiles?: number;
}

export default function MultipleFileUpload({ 
  value = [], 
  onChange, 
  type, 
  label,
  maxFiles = 10 
}: MultipleFileUploadProps) {
  const [showUpload, setShowUpload] = useState(false);

  const handleAdd = (url: string) => {
    onChange([...value, url]);
    setShowUpload(false);
  };

  const handleRemove = (index: number) => {
    const newValue = value.filter((_, i) => i !== index);
    onChange(newValue);
  };

  const canAddMore = value.length < maxFiles;

  return (
    <div className="space-y-4">
      {/* Liste des fichiers existants */}
      {value.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">
            {label} ({value.length}/{maxFiles})
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {value.map((url, index) => (
              <div key={index} className="relative group">
                {type === 'publication' && url.endsWith('.pdf') ? (
                  <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg bg-gray-50 h-32">
                    <ImageIcon className="w-8 h-8 text-red-500 mb-2" />
                    <p className="text-xs text-center text-gray-600 truncate w-full">
                      {url.split('/').pop()?.substring(0, 20)}...
                    </p>
                  </div>
                ) : (
                  <img
                    src={url}
                    alt={`${label} ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                  />
                )}
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bouton d'ajout ou formulaire d'upload */}
      {canAddMore && (
        <>
          {!showUpload ? (
            <button
              type="button"
              onClick={() => setShowUpload(true)}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors"
            >
              <div className="flex flex-col items-center">
                <Plus className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                  {value.length === 0 ? `Ajouter des ${label.toLowerCase()}` : `Ajouter un autre`}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {type === 'publication' ? 'Images ou PDFs' : 'Images uniquement'}
                </p>
              </div>
            </button>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-700">
                  Ajouter un fichier
                </h4>
                <button
                  type="button"
                  onClick={() => setShowUpload(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FileUpload
                value=""
                onChange={handleAdd}
                onRemove={() => {}}
                type={type}
                accept={type === 'publication' ? "image/*,application/pdf" : "image/*"}
              />
            </div>
          )}
        </>
      )}

      {!canAddMore && (
        <p className="text-sm text-gray-500 text-center py-4">
          Limite maximale atteinte ({maxFiles} fichiers)
        </p>
      )}
    </div>
  );
}

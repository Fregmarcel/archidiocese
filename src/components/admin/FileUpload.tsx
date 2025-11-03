"use client";

import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, File } from 'lucide-react';

interface FileUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove: () => void;
  type: 'portrait' | 'gallery' | 'publication';
  accept?: string;
  multiple?: boolean;
  className?: string;
}

export default function FileUpload({ 
  value, 
  onChange, 
  onRemove, 
  type, 
  accept = "image/*", 
  multiple = false,
  className = "" 
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0]; // Pour l'instant, on ne prend que le premier fichier
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'upload');
      }

      const result = await response.json();
      if (result.success) {
        onChange(result.url);
      } else {
        throw new Error(result.error || 'Erreur inconnue');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Erreur lors de l\'upload du fichier');
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
      handleUpload(e.dataTransfer.files);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const getFileIcon = () => {
    if (type === 'publication') return <File className="w-8 h-8" />;
    return <ImageIcon className="w-8 h-8" />;
  };

  const getAcceptedTypes = () => {
    if (type === 'publication') return "image/*,application/pdf,.pdf";
    return "image/*";
  };

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept={getAcceptedTypes()}
        multiple={multiple}
        onChange={(e) => handleUpload(e.target.files)}
        className="hidden"
      />

      {value ? (
        <div className="relative group">
          {type === 'publication' && value.endsWith('.pdf') ? (
            <div className="flex items-center p-4 border border-gray-200 rounded-lg bg-gray-50">
              <File className="w-8 h-8 text-red-500 mr-3" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Document PDF</p>
                <p className="text-xs text-gray-500">{value.split('/').pop()}</p>
              </div>
            </div>
          ) : (
            <img
              src={value}
              alt="Aperçu"
              className="w-full max-w-xs h-32 object-cover rounded-lg border border-gray-200"
            />
          )}
          <button
            type="button"
            onClick={onRemove}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            dragActive
              ? 'border-indigo-500 bg-indigo-50'
              : 'border-gray-300 hover:border-gray-400'
          } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={!uploading ? openFileDialog : undefined}
        >
          {uploading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              <p className="mt-2 text-sm text-gray-600">Upload en cours...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="text-gray-400 mb-2">
                {getFileIcon()}
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-indigo-600">Cliquez pour uploader</span> ou glissez-déposez
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {type === 'publication' ? 'PNG, JPG, PDF jusqu\'à 5MB' : 'PNG, JPG jusqu\'à 5MB'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

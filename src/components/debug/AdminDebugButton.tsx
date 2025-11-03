"use client";

import { useState } from 'react';

export default function AdminDebugButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  const handleSync = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/auth/force-sync', {
        method: 'POST',
      });
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
      
      if (data.success) {
        // Recharger la page pour que le Header récupère le nouveau statut
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      setResult(`Erreur: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white p-4 border rounded shadow-lg max-w-md">
      <h3 className="font-bold mb-2">Debug Admin</h3>
      <button 
        onClick={handleSync}
        disabled={isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? 'Synchronisation...' : 'Synchroniser Admin'}
      </button>
      {result && (
        <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto max-h-32">
          {result}
        </pre>
      )}
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import FileUpload from "./FileUpload";
import RichTextEditor from "./RichTextEditor";
import MultipleFileUpload from "./MultipleFileUpload";

type FormData = {
  name: string;
  title?: string;
  description?: string;
  portraitUrl?: string;
  bibliography: string[];
  bibliographyRich?: string;
  publications: string[];
  gallery: string[];
};

export default function ArchbishopForm({ locale }: { locale: string }) {
  const [loading, setLoading] = useState(false);
  const [initialLoaded, setInitialLoaded] = useState(false);
  const [data, setData] = useState<FormData>({ name: "", title: "", description: "", portraitUrl: "", bibliography: [], bibliographyRich: "", publications: [], gallery: [] });
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/admin/archbishop/${locale}`);
        const json = await res.json();
        if (!cancelled && json.doc) {
          setData({
            name: json.doc.name ?? "",
            title: json.doc.title ?? "",
            description: json.doc.description ?? "",
            portraitUrl: json.doc.portraitUrl ?? "",
            bibliography: json.doc.bibliography ?? [],
            bibliographyRich: json.doc.bibliographyRich ?? "",
            publications: json.doc.publications ?? [],
            gallery: json.doc.gallery ?? [],
          });
        }
      } catch {}
      finally {
        if (!cancelled) setInitialLoaded(true);
      }
    })();
    return () => { cancelled = true; };
  }, [locale]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); 
    setMessage(null);
    
    try {
      const res = await fetch(`/api/admin/archbishop/${locale}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Erreur de sauvegarde");
      setMessage({ type: 'success', text: 'Données sauvegardées avec succès !' });
      setTimeout(() => setMessage(null), 4000);
    } catch (e: any) {
      setMessage({ type: 'error', text: e?.message || "Une erreur est survenue" });
      setTimeout(() => setMessage(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  const setField = (k: keyof FormData, v: any) => setData((d) => ({ ...d, [k]: v }));

  if (!initialLoaded) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <span className="ml-3 text-gray-600 font-medium">Chargement des données...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Message de notification */}
      {message && (
        <div className={`mb-6 rounded-lg border-l-4 p-4 ${
          message.type === 'success' 
            ? 'bg-green-50 border-green-400 text-green-700' 
            : 'bg-red-50 border-red-400 text-red-700'
        }`}>
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm font-medium">
                {message.type === 'success' ? '✅ ' : '❌ '}
                {message.text}
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-8">
        {/* Section Informations personnelles */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              👤 Informations personnelles
            </h3>
            <p className="text-sm text-gray-600 mt-1">Nom, titre et description de l'archevêque</p>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="Son Excellence le Seigneur..."
                  value={data.name}
                  onChange={(e) => setField("name", e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Titre officiel
                </label>
                <input
                  id="title"
                  type="text"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="Archevêque Métropolitain de..."
                  value={data.title || ""}
                  onChange={(e) => setField("title", e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description / Biographie
              </label>
              <textarea
                id="description"
                rows={5}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-vertical"
                placeholder="Présentez l'archevêque, son parcours, sa mission..."
                value={data.description || ""}
                onChange={(e) => setField("description", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Section Portrait */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              📸 Portrait officiel
            </h3>
            <p className="text-sm text-gray-600 mt-1">Photo principale affichée sur le site</p>
          </div>
          <div className="p-6">
            <FileUpload
              value={data.portraitUrl}
              onChange={(url) => setField("portraitUrl", url)}
              onRemove={() => setField("portraitUrl", "")}
              type="portrait"
              accept="image/*"
            />
          </div>
        </div>

        {/* Section Bibliographie */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              � Bibliographie
            </h3>
            <p className="text-sm text-gray-600 mt-1">Contenu riche pour présenter la biographie de l'archevêque</p>
          </div>
          <div className="p-6">
            <RichTextEditor
              value={data.bibliographyRich || ""}
              onChange={(value) => setField("bibliographyRich", value)}
              placeholder="Rédigez la bibliographie avec mise en forme..."
            />
          </div>
        </div>

        {/* Section Publications */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              📄 Publications
            </h3>
            <p className="text-sm text-gray-600 mt-1">Documents et publications de l'archevêque</p>
          </div>
          <div className="p-6">
            <MultipleFileUpload
              value={data.publications}
              onChange={(urls) => setField("publications", urls)}
              type="publication"
              label="Publications"
              maxFiles={20}
            />
          </div>
        </div>

        {/* Section Galerie */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              🖼️ Galerie photo
            </h3>
            <p className="text-sm text-gray-600 mt-1">Collection d'images de l'archevêque</p>
          </div>
          <div className="p-6">
            <MultipleFileUpload
              value={data.gallery}
              onChange={(urls) => setField("gallery", urls)}
              type="gallery"
              label="Photos"
              maxFiles={30}
            />
          </div>
        </div>

        {/* Bouton de sauvegarde */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sauvegarde en cours...
              </>
            ) : (
              <>
                💾 Sauvegarder les modifications
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

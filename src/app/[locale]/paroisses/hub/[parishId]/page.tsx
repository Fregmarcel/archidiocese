"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

// Types minimaux pour l'affichage
type Parish = { _id: string; name: string; address?: string };

type Tile = { label: string; color: string; key: string };

export default function ParishHubPage() {
  const params = useParams<{ parishId: string; locale: string }>();
  const parishId = params?.parishId as string;

  const [parish, setParish] = useState<Parish | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const tiles = useMemo<Tile[]>(
    () => [
      { label: "Agenda", color: "#BE2722", key: "agenda" },
      { label: "Sacrements", color: "#2E9B51", key: "sacrements" },
      { label: "Galerie", color: "#0284C7", key: "galerie" },
      { label: "Historique", color: "#7C3AED", key: "historique" },
      { label: "Développement", color: "#0EA5E9", key: "developpement" },
      { label: "Liturgie", color: "#16A34A", key: "liturgie" },
      { label: "DMS / Documents", color: "#DC2626", key: "documents" },
      { label: "Équipe pastorale", color: "#F59E0B", key: "equipe-pastorale" },
    ],
    []
  );

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/parishes/${parishId}`);
        const json = await res.json();
        if (json?.success) setParish(json.data);
      } catch (e) {
        console.error("Erreur chargement paroisse", e);
      } finally {
        setLoading(false);
      }
    };
    if (parishId) load();
  }, [parishId]);

  const openModal = (idx: number) => { setActiveIndex(idx); setModalOpen(true); };
  const closeModal = () => setModalOpen(false);
  const nextItem = () => setActiveIndex((i) => (i + 1) % tiles.length);

  if (loading) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <div className="h-10 w-10 rounded-full border-2 border-[#BE2722] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!parish) {
    return <div className="min-h-[60vh] grid place-items-center text-neutral-600">Paroisse non trouvée.</div>;
  }

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-6 md:py-10">
        {/* En-tête */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#25282E]">{parish.name}</h1>
            {parish.address && <p className="text-sm text-neutral-500">{parish.address}</p>}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-12 gap-4">
          <div className="col-span-12 space-y-6">
            {/* Tuiles rapides */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
              {tiles.map((t, idx) => (
                <button
                  key={t.key}
                  onClick={() => openModal(idx)}
                  className="relative overflow-hidden rounded border border-neutral-200 bg-white group h-24 focus:outline-none focus:ring-2 focus:ring-[#BE2722]/30"
                >
                  <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${t.color}22, ${t.color}11)` }} />
                  <div className="relative h-full w-full grid place-items-center">
                    <span className="text-sm font-extrabold uppercase text-[#0F172A]">{t.label}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Zone Actualités */}
            <div>
              <div className="flex items-end justify-between gap-3 mb-3">
                <h2 className="text-xl md:text-2xl font-extrabold text-[#25282E]">Actualités de la paroisse</h2>
              </div>
              <div className="border border-dashed border-neutral-300 rounded p-8 text-center text-neutral-600">
                Aucune information pour l'instant.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal flottant */}
      {modalOpen && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={closeModal} aria-hidden />
          <div className="relative z-10 mx-auto my-8 w-[92vw] max-w-3xl rounded-lg bg-white shadow-lg">
            <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
              <h3 className="text-base font-bold">{tiles[activeIndex]?.label}</h3>
              <button onClick={closeModal} aria-label="Fermer" className="p-1 rounded hover:bg-neutral-100">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
            <div className="px-4 py-4 text-sm text-neutral-700">Aucune information pour l'instant.</div>
            <div className="flex items-center justify-end gap-2 border-t border-neutral-200 px-4 py-3">
              <button onClick={nextItem} className="px-3 py-2 text-sm rounded bg-[#BE2722] text-white hover:bg-[#a0201c]">Suivant</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

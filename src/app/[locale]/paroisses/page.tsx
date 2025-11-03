"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

// Types minimales pour l'affichage
interface Parish {
  _id: string;
  name: string;
  description?: string;
  address?: string;
  pastoralZone?: string;
}

interface Zone {
  _id: string;
  name: string;
}

export default function ParishesIndexPage() {
  const params = useParams<{ locale: string }>();
  const locale = (params?.locale as string) || "fr";

  const [parishes, setParishes] = useState<Parish[]>([]);
  const [zones, setZones] = useState<Zone[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isZonesLoading, setIsZonesLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [zoneFilter, setZoneFilter] = useState<string>("all");

  useEffect(() => {
    // Charger les paroisses
    const loadParishes = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/parishes`);
        const json = await res.json();
        if (json?.success) setParishes(json.data || []);
      } catch (e) {
        console.error("Erreur chargement des paroisses", e);
      } finally {
        setIsLoading(false);
      }
    };

    // Charger les zones
    const loadZones = async () => {
      try {
        setIsZonesLoading(true);
        const res = await fetch(`/api/pastoral-zones`);
        const json = await res.json();
        if (json?.success) setZones(json.data || []);
      } catch (e) {
        console.error("Erreur chargement des zones", e);
      } finally {
        setIsZonesLoading(false);
      }
    };

    loadParishes();
    loadZones();
  }, []);

  const zoneMap = useMemo(() => {
    const m = new Map<string, string>();
    zones.forEach((z) => m.set(z._id, z.name));
    return m;
  }, [zones]);

  // Filtrer côté client + randomiser l'ordre
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    let list = parishes.filter((p) => {
      const matchesText = term
        ? (p.name?.toLowerCase().includes(term) ||
           p.description?.toLowerCase().includes(term) ||
           p.address?.toLowerCase().includes(term))
        : true;
      const matchesZone = zoneFilter === "all" || p.pastoralZone === zoneFilter;
      return matchesText && matchesZone;
    });
    // Désordonnée: shuffle simple (Fisher–Yates)
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }, [parishes, search, zoneFilter]);

  // Pagination client (20/page)
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, total);
  const pageData = useMemo(() => filtered.slice(startIndex, endIndex), [filtered, startIndex, endIndex]);
  const goto = (p: number) => setPage(Math.min(Math.max(1, p), totalPages));

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-6 md:py-10">
        {/* En-tête */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#25282E]">Toutes les paroisses</h1>
            <p className="text-sm text-neutral-500">Accueil / Paroisses</p>
          </div>
        </div>

        {/* Filtres */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-1">
            <label className="block text-xs font-semibold text-neutral-600 mb-1">Zone pastorale</label>
            <select
              value={zoneFilter}
              onChange={(e) => setZoneFilter(e.target.value)}
              className="w-full rounded border border-neutral-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#BE2722]/30"
              disabled={isZonesLoading}
            >
              <option value="all">Toutes les zones</option>
              {zones.map((z) => (
                <option key={z._id} value={z._id}>{z.name}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-neutral-600 mb-1">Recherche par nom ou adresse</label>
            <div className="flex gap-2">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                placeholder="Rechercher une paroisse..."
                className="flex-1 rounded border border-neutral-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#BE2722]/30"
              />
            </div>
          </div>
        </div>

        {/* Liste */}
        <div className="mt-6">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-28 rounded border border-neutral-200 bg-neutral-50 animate-pulse" />
              ))}
            </div>
          ) : total === 0 ? (
            <div className="text-center py-16 text-neutral-600">Aucune paroisse trouvée.</div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {pageData.map((p) => (
                  <Link
                    key={p._id}
                    href={`/${locale}/paroisses/hub/${p._id}`}
                    className="rounded border border-neutral-200 bg-white hover:border-[#BE2722] group transition-colors p-4 flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-sm font-extrabold text-[#0F172A] group-hover:text-[#BE2722] line-clamp-2">{p.name}</h3>
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#BE2722] opacity-0 group-hover:opacity-100 transition-opacity"><path d="M9 18l6-6-6-6"/></svg>
                    </div>
                    {p.address && <p className="text-xs text-neutral-600 line-clamp-1">{p.address}</p>}
                    {p.pastoralZone && (
                      <p className="text-[11px] text-neutral-500">{zoneMap.get(p.pastoralZone) || "Zone inconnue"}</p>
                    )}
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-6 flex items-center justify-between bg-neutral-50 border border-neutral-200 rounded px-3 py-2">
                <p className="text-xs text-neutral-600">Affichage {startIndex + 1}-{endIndex} sur {total}</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => goto(safePage - 1)}
                    disabled={safePage <= 1}
                    className={`px-3 py-1.5 text-xs rounded border ${safePage <= 1 ? 'text-neutral-400 border-neutral-200' : 'text-neutral-700 border-neutral-300 hover:bg-neutral-100'}`}
                  >
                    Précédent
                  </button>
                  {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                    const base = Math.max(1, Math.min(safePage - 2, totalPages - 4));
                    const p = base + i;
                    const active = p === safePage;
                    return (
                      <button
                        key={p}
                        onClick={() => goto(p)}
                        className={`px-3 py-1.5 text-xs rounded border ${active ? 'bg-[#BE2722] text-white border-[#BE2722]' : 'text-neutral-700 border-neutral-300 hover:bg-neutral-100'}`}
                      >
                        {p}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => goto(safePage + 1)}
                    disabled={safePage >= totalPages}
                    className={`px-3 py-1.5 text-xs rounded border ${safePage >= totalPages ? 'text-neutral-400 border-neutral-200' : 'text-neutral-700 border-neutral-300 hover:bg-neutral-100'}`}
                  >
                    Suivant
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
   
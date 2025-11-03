'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Play } from 'lucide-react';

interface TVShow {
  _id: string;
  title: string;
  description: string;
  category: 'messe' | 'evenement' | 'enseignement' | 'autre';
  duration?: string; // ex: "1h05"
  imageUrl?: string;
  videoUrl?: string;
  host?: string;
  broadcastDate: string | Date;
}

export default function TelevisionPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const [shows, setShows] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Charger les émissions depuis l'API publique
    const fetchShows = async () => {
      try {
        const res = await fetch('/api/tv-shows');
        if (!res.ok) throw new Error('failed');
        const json = await res.json();
        const items: TVShow[] = Array.isArray(json) ? json : (json.data || json.shows || []);
        setShows(items);
      } catch (e) {
        console.error('Erreur chargement TV shows:', e);
        setShows([]);
      } finally {
        setLoading(false);
      }
    };
    fetchShows();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Lien retour */}
      <div className="container mx-auto px-4 pt-6">
        <Link href={`/${locale}`} className="text-[#BE2722] font-semibold hover:underline">Retour à l’accueil</Link>
      </div>

      {/* Bandeau Héros */}
      <section className="mt-4">
        <div className="container mx-auto px-4">
          <div className="rounded-xl overflow-hidden" style={{ background: 'linear-gradient(90deg, #BE2722 0%, #8C1B1B 70%)' }}>
            <div className="px-6 py-8 md:px-10 md:py-10 text-white">
              <h1 className="text-2xl md:text-3xl font-extrabold uppercase">TÉLÉVISION DIOCÉSAINE</h1>
              <p className="mt-2 text-white/90 max-w-3xl">Rediffusions des messes et des grands événements de l’Archidiocèse. Le direct sera disponible ici dès que possible.</p>
              <div className="mt-4 flex items-center gap-2 text-sm">
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                  En direct: prochainement
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bloc Direct inactif */}
      <section className="container mx-auto px-4 mt-6">
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm">
          <div className="px-6 py-12 md:px-10 md:py-16 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-neutral-200 flex items-center justify-center">
              <Play className="w-8 h-8 text-neutral-500" />
            </div>
            <h3 className="mt-6 font-semibold text-neutral-800">Aucun direct pour le moment</h3>
            <p className="text-neutral-500 mt-2">Revenez bientôt ou découvrez les rediffusions ci-dessous</p>
            <div className="mt-6">
              <Link href={`/${locale}/agenda`} className="inline-flex items-center rounded-md bg-neutral-900 text-white px-4 py-2 text-sm hover:bg-neutral-800">Voir les prochaines diffusions</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Rediffusions récentes */}
      <section className="container mx-auto px-4 mt-8 mb-16">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl font-bold">Rediffusions récentes</h2>
          <Link href={`/${locale}/medias`} className="text-sm text-[#BE2722] hover:underline">Tous les médias</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {shows.length === 0 ? (
            <div className="col-span-4 bg-white rounded-xl border border-neutral-200 p-8 text-center text-neutral-600">
              Aucune vidéo disponible pour le moment.
            </div>
          ) : (
            shows.map((show) => (
              <article key={show._id} className="rounded-xl border border-neutral-200 bg-white overflow-hidden">
                <div className="relative h-36 bg-neutral-100">
                  {show.duration && (
                    <span className="absolute top-2 left-2 text-[10px] font-semibold bg-black/80 text-white rounded px-1.5 py-0.5">{show.duration}</span>
                  )}
                  {show.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={show.imageUrl} alt={show.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-400">Aperçu</div>
                  )}
                </div>
                <div className="p-3">
                  <div className="text-[11px] text-neutral-500 flex items-center gap-2">
                    <span className="inline-block px-2 py-0.5 rounded bg-neutral-100 border border-neutral-200">{show.description}</span>
                    <span>•</span>
                    <span>{new Date(show.broadcastDate).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <h3 className="mt-1 font-semibold text-neutral-900 text-sm line-clamp-2">{show.title}</h3>
                  <div className="mt-1">
                    {show.videoUrl ? (
                      <a href={show.videoUrl} target="_blank" rel="noopener noreferrer" className="text-[#BE2722] text-sm hover:underline">Regarder</a>
                    ) : (
                      <span className="text-neutral-400 text-sm">Vidéo indisponible</span>
                    )}
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      {/* Footer placeholder spacing handled by layout */}
    </main>
  );
}

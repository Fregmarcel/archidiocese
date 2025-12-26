"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import SectionReveal from "./SectionReveal";
import NewsModal from "@/components/modals/NewsModal";

type Props = { locale: string };

type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  tags: string[];
  image: string;
  href: string;
};

const sample: NewsItem[] = [
  {
    id: "1",
    title: "Une nouvelle ère pour l’innovation et l’entrepreneuriat universitaire",
    excerpt:
      "Le vendredi 04 juillet 2025 marque une étape majeure dans l’histoire de l’Université Catholique d’Afrique Centrale...",
    date: "18 juillet 2025",
    tags: ["Conférences", "Incubateur UCAC"],
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1600&auto=format&fit=crop",
    href: "/actualites/innovation",
  },
  {
    id: "2",
    title:
      "Cours annuel de Droit de l’apatridie et de la nationalité pour les praticiens francophones",
    excerpt:
      "Cours annuel de Droit de l’apatridie et de la nationalité pour les praticiens francophones en Afrique...",
    date: "21 août 2025",
    tags: ["Conférences", "Formation continue"],
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1600&auto=format&fit=crop",
    href: "/actualites/droit-apatridie",
  },
  {
    id: "3",
    title:
      "Passation de service à la FSJP : le Rév. Père Dr Janvier Bertin NAMA succède au Rév. Père Dr Clément ABOUDI NOLA",
    excerpt:
      "Le jeudi 7 août 2025, s’est tenue, en salle des enseignants de la Faculté des Sciences Juridiques et Politiques...",
    date: "8 août 2025",
    tags: ["FSJP", "Rectorat"],
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop",
    href: "/actualites/fsjp-passation",
  },
  {
    id: "4",
    title: "Cérémonie de remise des diplômes – Promotion 2025",
    excerpt:
      "Un moment fort pour nos étudiants et leurs familles, célébrant l’excellence académique et humaine...",
    date: "1 août 2025",
    tags: ["Cérémonies"],
    image:
      "https://images.unsplash.com/photo-1596495578065-8a2a06d1a3d5?q=80&w=1600&auto=format&fit=crop",
    href: "/actualites/remise-diplomes",
  },
  {
    id: "5",
    title: "Séminaire de recherche interfacultaire",
    excerpt:
      "Une journée d’échanges autour des avancées et défis de la recherche au sein de l’Archidiocèse...",
    date: "29 juillet 2025",
    tags: ["Recherche"],
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1600&auto=format&fit=crop",
    href: "/actualites/seminaire-recherche",
  },
  {
    id: "6",
    title: "Forum des vocations 2025",
    excerpt:
      "Rencontres, témoignages, ateliers et prières pour discerner l’appel du Seigneur au service de l’Église...",
    date: "20 juillet 2025",
    tags: ["Vocations", "Pastorale"],
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1600&auto=format&fit=crop",
    href: "/actualites/forum-vocations",
  },
];

export default function NewsCarousel({ locale }: Props) {
  const [apiItems, setApiItems] = useState<NewsItem[] | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetch(`/api/news?locale=${locale}`).then(async (r) => {
      if (!mounted) return;
      if (r.ok) {
        const json = await r.json();
        const list = Array.isArray(json?.data) ? json.data : [];
        const mapped: NewsItem[] = list.map((n: any) => ({
          id: n._id,
          title: n.title,
          excerpt: n.excerpt || '',
          content: n.content || '',
          date: n.publishedAt ? new Date(n.publishedAt).toLocaleDateString(locale) : '',
          tags: n.tags || [],
          image: n.image || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1600&auto=format&fit=crop',
          href: `/${locale}/actualites/${n.slug}`,
        }));
        setApiItems(mapped);
      } else {
        setApiItems([]);
      }
    }).catch(() => setApiItems([]));
    return () => { mounted = false; };
  }, [locale]);

  const openModal = (article: NewsItem) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedArticle(null), 300);
  };

  const source = apiItems && apiItems.length > 0 ? apiItems : null;
  const items = useMemo(() => (source || sample).map((n) => ({ ...n, href: `/${locale}${n.href.replace(`/${locale}`, '')}`, tags: Array.from(new Set([...(n.tags||[]), 'Images', 'Vidéo'])) })), [locale, source]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", skipSnaps: true });
  const [selected, setSelected] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelected(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    const api = emblaApi;
    if (!api) return;
    api.on("select", () => onSelect(api));
    onSelect(api);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const api = emblaApi;
    if (!api) return;
    const start = () => {
      stop();
      autoplayRef.current = setInterval(() => {
        const current = api.selectedScrollSnap();
        const snaps = api.scrollSnapList().length;
        api.scrollTo((current + 3) % snaps);
      }, 5000);
    };
    const stop = () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    };
    start();
    const viewport = viewportRef.current;
    viewport?.addEventListener("pointerenter", stop);
    viewport?.addEventListener("pointerleave", start);
    return () => {
      stop();
      viewport?.removeEventListener("pointerenter", stop);
      viewport?.removeEventListener("pointerleave", start);
    };
  }, [emblaApi]);

  return (
    <SectionReveal className="bg-white">
      <div className="container mx-auto px-4 py-10">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold uppercase text-[#25282E]">Actualités</h2>
          <p className="text-neutral-500 text-sm md:text-base mt-1">
            Retrouvez toutes les informations et activités en temps réel
          </p>
          <div className="relative my-4 flex items-center justify-center">
            <span className="h-px w-24 bg-neutral-200" />
            <span className="mx-3 grid place-items-center w-8 h-8 rounded bg-[#BE2722] text-white">
              {/* icon */}
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16v16H4z" />
                <path d="M4 9h16" />
                <path d="M8 13h8" />
              </svg>
            </span>
            <span className="h-px w-24 bg-neutral-200" />
          </div>
        </div>

        {/* Message si aucune donnée */}
        {apiItems && apiItems.length === 0 && (
          <div className="mt-6 bg-neutral-50 border border-neutral-200 rounded-lg p-6 text-center">
            <p className="text-neutral-700">Aucune actualité publiée pour le moment. Revenez bientôt.</p>
          </div>
        )}

        {/* Carousel */}
        {apiItems && apiItems.length > 0 && (
          <div className="relative">
            <div ref={viewportRef} className="overflow-hidden" aria-roledescription="carousel">
              <div className="flex" ref={emblaRef}>
                {items.map((n) => (
                  <div key={n.id} className="basis-full sm:basis-1/2 lg:basis-1/3 shrink-0 px-2 md:px-3">
                    <article className="group border border-neutral-200 rounded bg-white overflow-hidden h-full flex flex-col">
                      {/* media */}
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image src={n.image} alt={n.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" />
                        {/* badges */}
                        <div className="absolute left-2 bottom-2 flex flex-wrap gap-2">
                          {n.tags.map((t) => (
                            <span key={t} className="bg-[#2E9B51] text-white text-[10px] font-bold uppercase px-2 py-1 rounded">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      {/* body */}
                      <div className="p-3 md:p-4 flex-1 flex flex-col">
                        <h3 className="text-[15px] md:text-base font-extrabold text-[#0F172A] leading-snug">
                          <Link href={n.href} className="hover:underline">
                            {n.title}
                          </Link>
                        </h3>
                        <p className="text-[12px] text-neutral-500 mt-1">{n.date}</p>
                        <p className="text-sm text-neutral-600 mt-2 line-clamp-3">{n.excerpt}</p>
                        <div className="mt-auto pt-3">
                          <button
                            onClick={() => openModal(n)}
                            className="inline-flex items-center border border-neutral-300 rounded px-3 py-1.5 text-sm text-neutral-800 hover:bg-neutral-50 transition-colors"
                          >
                            Lire plus
                          </button>
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>

            {/* Arrows */}
            <button
              type="button"
              aria-label="Précédent"
              onClick={() => {
                const api = emblaApi; if (!api) return; const snaps = api.scrollSnapList().length; const next = (api.selectedScrollSnap() - 3 + snaps) % snaps; api.scrollTo(next);
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 ml-1 md:ml-2 grid place-items-center w-8 h-8 rounded-full bg-white/95 text-[#0F172A] shadow hover:bg-white z-10"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button
              type="button"
              aria-label="Suivant"
              onClick={() => {
                const api = emblaApi; if (!api) return; const snaps = api.scrollSnapList().length; const next = (api.selectedScrollSnap() + 3) % snaps; api.scrollTo(next);
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 mr-1 md:mr-2 grid place-items-center w-8 h-8 rounded-full bg-white/95 text-[#0F172A] shadow hover:bg-white z-10"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>

            {/* Dots */}
            <div className="mt-4 flex items-center justify-center gap-2">
              {Array.from({ length: Math.ceil(items.length / 3) }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => emblaApi?.scrollTo(i * 3)}
                  className={`h-2 w-2 rounded-full ${i === Math.floor(selected / 3) ? "bg-[#BE2722]" : "bg-neutral-300"}`}
                  aria-label={`Aller à la page ${i + 1}`}
                />
              ))}
            </div>
          </div>
        )}
        {/* CTA sous la section - masqués temporairement
        <div className="mt-6 md:mt-8">
          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            {[
              { label: 'Toutes les actualités', href: `/${locale}/actualites`, color: '#BE2722' },
              { label: 'Agenda', href: `/${locale}/agenda`, color: '#2E9B51' },
              { label: 'Communiqués', href: `/${locale}/medias`, color: '#0284C7' },
            ].map((b) => (
              <Link key={b.label} href={b.href} style={{ color: b.color, borderColor: b.color }} className="bg-white border-2 rounded-md py-2 font-semibold">
                {b.label}
              </Link>
            ))}
          </div>
        </div>
        */}
      </div>

      <NewsModal
        article={selectedArticle}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </SectionReveal>
  );
}

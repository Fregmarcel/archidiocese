"use client";

import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import { useEffect, useMemo, useState, useCallback } from "react";
import SectionReveal from "./SectionReveal";
import EventModal from "@/components/modals/EventModal";
import CalendarModal from "@/components/modals/CalendarModal";

type Props = { locale: string };

type EventItem = {
  id: string;
  title: string;
  image: string;
  date: Date;
  href: string;
  location?: string;
  excerpt?: string;
  content?: string;
  tags?: string[];
};

const sample: Omit<EventItem, "href">[] = [
  { id: "e1", title: "Agenda académique — Calendrier universitaire", image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1600&auto=format&fit=crop", date: new Date(2025, 0, 29) },
  { id: "e2", title: "Concours d'entrée à l'UCAC 2025–2026", image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1600&auto=format&fit=crop", date: new Date(2025, 0, 29) },
  { id: "e3", title: "Appel à candidature — Gestion des déchets solides urbains", image: "https://images.unsplash.com/photo-1520975661595-6453be3f7070?q=80&w=1600&auto=format&fit=crop", date: new Date(2025, 9, 8) },
  { id: "e4", title: "Retraite spirituelle des finalistes", image: "https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=1600&auto=format&fit=crop", date: new Date(2025, 10, 12) },
  { id: "e5", title: "Journée sportive inter-facultés", image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1600&auto=format&fit=crop", date: new Date(2025, 2, 3) },
  { id: "e6", title: "Colloque international de recherche", image: "https://images.unsplash.com/photo-1542626991-58b8fb1b2b98?q=80&w=1600&auto=format&fit=crop", date: new Date(2025, 5, 21) },
];

function monthShortFr(d: Date) {
  return d.toLocaleDateString("fr-FR", { month: "short" }).toUpperCase();
}

export default function EventsAgendaDynamic({ locale }: Props) {
  const [apiItems, setApiItems] = useState<EventItem[] | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetch(`/api/events?locale=${locale}`)
      .then(async (r) => {
        if (!mounted) return;
        if (!r.ok) { setApiItems([]); return; }
        const json = await r.json();
        const list = Array.isArray(json?.data) ? json.data : [];
        const mapped: EventItem[] = list.map((e: any) => ({
          id: e._id,
          title: e.title,
          image: e.image || "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1600&auto=format&fit=crop",
          date: e.date ? new Date(e.date) : new Date(),
          href: `/${locale}/agenda/${e.slug}`,
          location: e.location || "",
          excerpt: e.excerpt || "",
          content: e.content || "",
          tags: e.tags || [],
        }));
        setApiItems(mapped);
      })
      .catch(() => setApiItems([]));
    return () => { mounted = false; };
  }, [locale]);

  const openModal = (ev: EventItem) => { setSelectedEvent(ev); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setTimeout(()=>setSelectedEvent(null), 300); };

  const items: EventItem[] = useMemo(() => {
    if (apiItems && apiItems.length > 0) return apiItems;
    return sample.map((s) => ({ ...s, href: `/${locale}/agenda` }));
  }, [apiItems, locale]);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", skipSnaps: true });
  const [selected, setSelected] = useState(0);
  const onSelect = useCallback((api: EmblaCarouselType) => setSelected(api.selectedScrollSnap()), []);

  useEffect(() => {
    const api = emblaApi; if (!api) return; api.on("select", () => onSelect(api)); onSelect(api);
  }, [emblaApi, onSelect]);

  return (
    <SectionReveal className="bg-white">
      <div className="container mx-auto px-4 py-10">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold uppercase text-[#25282E]">Évènements & Agenda</h2>
          <p className="text-neutral-500 text-sm md:text-base mt-1">Toutes les activités académiques, socio‑culturelles, religieuses et sportives programmées.</p>
          <div className="relative my-4 flex items-center justify-center">
            <span className="h-px w-24 bg-neutral-200" />
            <span className="mx-3 grid place-items-center w-8 h-8 rounded bg-[#BE2722] text-white">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18"/></svg>
            </span>
            <span className="h-px w-24 bg-neutral-200" />
          </div>
        </div>

        {apiItems && apiItems.length === 0 && (
          <div className="mt-6 bg-neutral-50 border border-neutral-200 rounded-lg p-6 text-center">
            <p className="text-neutral-700">Aucun évènement à venir pour le moment. Revenez bientôt.</p>
          </div>
        )}

        {(!apiItems || apiItems.length > 0) && (
          <div className="relative">
            <div className="overflow-hidden" aria-roledescription="carousel">
              <div className="flex" ref={emblaRef}>
                {items.map((e, idx) => (
                  <div key={e.id} className="basis-full sm:basis-1/2 lg:basis-1/3 shrink-0 px-2 md:px-3">
                    <figure className={`group relative overflow-hidden rounded ${idx % 3 === 0 ? 'border-4 border-[#BE2722]' : 'border border-transparent'} bg-white`}>
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image src={e.image} alt={e.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105 group-focus-within:scale-105" sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" />
                        <div className="absolute left-2 top-2 bg-[#BE2722] text-white rounded px-2 py-1 leading-tight text-center">
                          <div className="text-[12px] font-extrabold">{String(e.date.getDate()).padStart(2, '0')}</div>
                          <div className="text-[10px] font-bold">{monthShortFr(e.date)}</div>
                        </div>
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300" />
                        <figcaption className="absolute left-0 right-0 bottom-0 p-4 text-white translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 transition-all duration-300">
                          <h3 className="uppercase font-extrabold text-[13px] md:text-sm tracking-tight drop-shadow">{e.title}</h3>
                          <div className="mt-2">
                            <button onClick={() => openModal(e)} className="inline-flex items-center bg-white text-[#0F172A] rounded px-3 py-1 text-xs font-semibold hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" aria-label={`Plus d'informations sur: ${e.title}`}>Plus d'informations</button>
                          </div>
                        </figcaption>
                      </div>
                    </figure>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center gap-2">
              {Array.from({ length: Math.ceil(items.length / 3) }).map((_, i) => (
                <button key={i} onClick={() => emblaApi?.scrollTo(i * 3)} className={`h-2 w-2 rounded-full ${i === Math.floor(selected / 3) ? 'bg-[#BE2722]' : 'bg-neutral-300'}`} aria-label={`Aller à la page ${i + 1}`} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <Link href={`/${locale}/agenda/pdfs`} className="inline-flex items-center gap-2 bg-white border-2 border-neutral-300 text-neutral-800 rounded px-3 py-2 text-sm font-semibold hover:bg-neutral-50">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
              Télécharger les PDFs
            </Link>
            <Link href={`/${locale}/agenda/affiches`} className="inline-flex items-center gap-2 bg-white border-2 border-neutral-300 text-neutral-800 rounded px-3 py-2 text-sm font-semibold hover:bg-neutral-50">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M7 8h10M7 12h10M7 16h6"/></svg>
              Affiches / Posters
            </Link>
            <Link href={`/${locale}/agenda/videos`} className="inline-flex items-center gap-2 bg-white border-2 border-neutral-300 text-neutral-800 rounded px-3 py-2 text-sm font-semibold hover:bg-neutral-50">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="18" height="12" rx="3"/><path d="M10 9l5 3-5 3z" fill="currentColor" stroke="none"/></svg>
              Vidéos
            </Link>
          </div>
          <div className="text-right">
            <button 
              onClick={() => setIsCalendarOpen(true)} 
              className="inline-flex items-center gap-2 bg-white border-2 border-[#2E9B51] text-[#2E9B51] rounded px-3 py-2 text-sm font-semibold hover:bg-[#2E9B51]/5 transition-colors"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18"/></svg>
              Consulter l'agenda
            </button>
          </div>
        </div>
      </div>

      <EventModal event={selectedEvent} isOpen={isModalOpen} onClose={closeModal} />
      <CalendarModal isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} events={items} locale={locale} />
    </SectionReveal>
  );
}

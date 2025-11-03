"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import SectionReveal from "./SectionReveal";

export type Testimonial = {
  id: string;
  name: string;
  title?: string;
  avatar: string;
  text: string;
};

const sample: Testimonial[] = [
  {
    id: "a1",
    name: "Nzekwa - Ancien UCAC",
    avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=400&auto=format&fit=crop",
    text:
      "J’étais tellement motivée par le contenu de cette formation que je me suis lancée sans hésiter. C’est une formation nourrissante sur le plan intellectuel, émotionnel et humain.",
  },
  {
    id: "a2",
    name: "Mireille - Étudiante",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
    text:
      "Une expérience humaine et académique exceptionnelle, des enseignants disponibles et une communauté fraternelle.",
  },
  {
    id: "a3",
    name: "Jean - Alumni",
    avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=400&auto=format&fit=crop",
    text:
      "Les compétences acquises m’ont ouvert des portes professionnelles, tout en fortifiant ma foi et mes valeurs.",
  },
];

export default function Testimonials() {
  const items = useMemo(() => sample, []);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selected, setSelected] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelected(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    const api = emblaApi; if (!api) return; api.on("select", () => onSelect(api)); onSelect(api);
  }, [emblaApi, onSelect]);

  // Autoplay with pause on hover/focus over the whole slider area
  useEffect(() => {
    const api = emblaApi; if (!api) return;
    const start = () => {
      stop();
      autoplayRef.current = setInterval(() => api.scrollNext(), 6000);
    };
    const stop = () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    };
    start();
    const el = containerRef.current;
    el?.addEventListener("pointerenter", stop);
    el?.addEventListener("pointerleave", start);
    el?.addEventListener("focusin", stop);
    el?.addEventListener("focusout", start);
    return () => {
      stop();
      el?.removeEventListener("pointerenter", stop);
      el?.removeEventListener("pointerleave", start);
      el?.removeEventListener("focusin", stop);
      el?.removeEventListener("focusout", start);
    };
  }, [emblaApi]);

  return (
    <SectionReveal className="bg-white">
      <div className="container mx-auto px-4 py-14">
        <div className="relative" ref={containerRef}>
          <div className="overflow-hidden" aria-roledescription="carousel">
            <div className="flex items-stretch" ref={emblaRef}>
              {items.map((t, idx) => {
                const isActive = selected === idx;
                return (
                  <div key={t.id} className="basis-full shrink-0 px-4">
                    <motion.figure
                      className="max-w-3xl mx-auto text-center"
                      initial={{ opacity: 0.6, y: 4 }}
                      animate={{ opacity: isActive ? 1 : 0.6, y: isActive ? 0 : 4 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                    <div className="relative inline-block">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden ring-2 ring-neutral-200 inline-block">
                        <Image src={t.avatar} alt={t.name} width={64} height={64} className="h-full w-full object-cover" />
                      </div>
                    </div>
                    <figcaption className="mt-2 text-[11px] uppercase tracking-wide text-neutral-500">{t.name}</figcaption>
                    <blockquote className="mt-5 text-center text-[#25282E] max-w-4xl mx-auto">
                      <p className="text-[15px] md:text-base leading-7 md:leading-8">« {t.text} »</p>
                    </blockquote>
                    </motion.figure>
                  </div>
                );
              })}
            </div>
          </div>
          {/* arrows under avatar to avoid overlap */}
          <div className="mt-3 flex justify-center gap-3">
            <button aria-label="Précédent" onClick={() => emblaApi?.scrollPrev()} className="grid place-items-center w-7 h-7 rounded bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button aria-label="Suivant" onClick={() => emblaApi?.scrollNext()} className="grid place-items-center w-7 h-7 rounded bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
          {/* dots */}
          <div className="mt-3 flex justify-center gap-2">
            {items.map((_, i) => (
              <button key={i} onClick={() => emblaApi?.scrollTo(i)} className={`h-1.5 w-1.5 rounded-full ${i === selected ? 'bg-[#BE2722]' : 'bg-neutral-300'}`} aria-label={`Aller au témoignage ${i+1}`} />
            ))}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

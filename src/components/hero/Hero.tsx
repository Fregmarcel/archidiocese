'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BannerOverlay } from './BannerOverlay';

type HeroProps = {
  locale: string;
  className?: string;
};

type Slide = {
  id: number;
  src: string;
  alt: string;
  overlay?: boolean;
};

const SLIDES: Slide[] = [
  { id: 1, src: '/c1.jpg', alt: "Paroisse Notre Dame des 7 douleurs d'AKONO", overlay: true },
  { id: 2, src: '/c2.jpg', alt: 'Cathédrale Notre Dame des Victoires de Yaoundé', overlay: true },
  { id: 3, src: '/c3.jpg', alt: 'Basilique Mineure de Yaoundé', overlay: true },
  { id: 4, src: '/c4.jpg', alt: 'Paroisse Saint Esprit de MVOLYE', overlay: true },
];

const viewportId = 'hero-viewport';

export default function Hero({ locale, className = '' }: HeroProps) {
  const [viewportRef, api] = useEmblaCarousel({ align: 'center', loop: true, dragFree: false });
  const [index, setIndex] = useState(0);
  const [hoverDir, setHoverDir] = useState<'prev' | 'next' | null>(null);
  const regionRef = useRef<HTMLDivElement | null>(null);
  const isPausedRef = useRef(false);

  const onSelect = useCallback(() => {
    if (!api) return;
    setIndex(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on('select', onSelect);
  }, [api, onSelect]);

  const prev = useCallback(() => api && api.scrollPrev(), [api]);
  const next = useCallback(() => api && api.scrollNext(), [api]);

  const prevIdx = useMemo(() => (index - 1 + SLIDES.length) % SLIDES.length, [index]);
  const nextIdx = useMemo(() => (index + 1) % SLIDES.length, [index]);

  useEffect(() => {
    const el = regionRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, [prev, next]);

  // autoplay every 5s, pause on hover/focus
  useEffect(() => {
    if (!api) return;
    const id = setInterval(() => {
      if (!isPausedRef.current) api.scrollNext();
    }, 5000);
    return () => clearInterval(id);
  }, [api]);

  const setPaused = (v: boolean) => {
    isPausedRef.current = v;
  };

  return (
    <section
      ref={regionRef}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Hero"
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
  className={`relative isolate w-full max-w-none mt-0 pt-0 overflow-hidden ${className}`}
    >
      <div
        className="overflow-hidden"
        ref={viewportRef}
        id={viewportId}
        aria-live="off"
      >
        <div className="flex touch-pan-y select-none">
          {SLIDES.map((s, i) => (
            <div
              key={s.id}
              className="relative min-w-0 flex-[0_0_100%]"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${SLIDES.length}`}
            >
        <div className="relative min-h-[60vh] md:min-h-[75vh]">
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="100vw"
          className="object-cover object-center"
                />
                <AnimatePresence>
                  {s.overlay && i === index && (
                    <motion.div
                      key={`overlay-${s.id}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <BannerOverlay locale={locale} title={s.alt} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        aria-controls={viewportId}
        aria-label="Slide précédent"
        onClick={prev}
        onMouseEnter={() => setHoverDir('prev')}
        onMouseLeave={() => setHoverDir(null)}
        className="group absolute left-2 top-1/2 -translate-y-1/2 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <span aria-hidden>‹</span>
        <AnimatePresence>
          {hoverDir === 'prev' && (
            <motion.div
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.18 }}
              className="absolute left-12 top-1/2 -translate-y-1/2 hidden sm:block"
            >
              <div className="relative h-16 w-24 overflow-hidden rounded border border-white/20 shadow-lg">
                <Image
                  src={SLIDES[prevIdx].src}
                  alt="Aperçu précédent"
                  fill
                  sizes="192px"
                  className="object-cover"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <button
        type="button"
        aria-controls={viewportId}
        aria-label="Slide suivant"
        onClick={next}
        onMouseEnter={() => setHoverDir('next')}
        onMouseLeave={() => setHoverDir(null)}
        className="group absolute right-2 top-1/2 -translate-y-1/2 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <span aria-hidden>›</span>
        <AnimatePresence>
          {hoverDir === 'next' && (
            <motion.div
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              transition={{ duration: 0.18 }}
              className="absolute right-12 top-1/2 -translate-y-1/2 hidden sm:block"
            >
              <div className="relative h-16 w-24 overflow-hidden rounded border border-white/20 shadow-lg">
                <Image
                  src={SLIDES[nextIdx].src}
                  alt="Aperçu suivant"
                  fill
                  sizes="192px"
                  className="object-cover"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <div className="pointer-events-none absolute inset-x-0 bottom-3 flex items-center justify-center gap-2">
        {SLIDES.map((s, i) => {
          const active = i === index;
          return (
            <button
              key={s.id}
              type="button"
              aria-label={`Aller au slide ${i + 1}`}
              aria-controls={viewportId}
              onClick={() => api?.scrollTo(i)}
              className={`pointer-events-auto h-2 w-2 rounded-full transition ${active ? 'bg-white' : 'bg-white/50 hover:bg-white/80'}`}
            />
          );
        })}
      </div>
    </section>
  );
}

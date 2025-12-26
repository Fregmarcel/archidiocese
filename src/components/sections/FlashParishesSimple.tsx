'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import SectionReveal from './SectionReveal';
import { useEffect, useState } from 'react';

type Props = { locale: string };

interface FlashInfoItem {
  id: string;
  title: string;
  content: string;
  url?: string;
}

export default function FlashParishes({ locale }: Props) {
  const prefersReduced = useReducedMotion();
  const [flashItems, setFlashItems] = useState<FlashInfoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Charger les flash infos depuis l'API
  useEffect(() => {
    const fetchFlashInfos = async () => {
      try {
        const response = await fetch('/api/flash-infos');
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          setFlashItems(data.data);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des flash infos:', error);
        setFlashItems([
          { id: '1', title: 'Flash Info', content: 'Bienvenue sur le site de l\'Archidiocèse de Yaoundé' }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFlashInfos();
  }, []);

  return (
    <SectionReveal className="bg-white">
      {/* Flash infos (style maquette) */}
      <div>
        <div className="container mx-auto px-4">
          <div className="flex items-stretch h-9 text-sm border-b border-[#E0A62B]">
            {/* Label avec encoche */}
            <span
              className="relative select-none inline-flex items-center px-3 bg-[#E0A62B] text-black font-semibold"
              aria-hidden
            >
              Flash Infos
              <span
                className="absolute top-0 -right-2 h-0 w-0 border-y-[18px] border-y-transparent border-l-[8px] border-l-[#E0A62B]"
              />
            </span>
            {/* Zone ticker + contrôles */}
            <div className="min-w-0 flex-1 bg-white flex items-center overflow-hidden">
              <div className="relative flex-1 overflow-hidden">
                {isLoading ? (
                  <div className="whitespace-nowrap text-neutral-900">
                    <span className="inline-block mr-8">Chargement des informations...</span>
                  </div>
                ) : flashItems.length > 0 ? (
                  <motion.div
                    className="whitespace-nowrap will-change-transform"
                    animate={prefersReduced ? {} : { x: ["100%", "-100%"] }}
                    transition={{ duration: 25, ease: "linear", repeat: Infinity }}
                  >
                    {[...flashItems, ...flashItems].map((item, i) => (
                      <span key={i} className="inline-block mr-8 text-neutral-900">
                        {item.url ? (
                          <Link href={item.url} className="hover:text-[#BE2722] transition-colors">
                            {item.content}
                          </Link>
                        ) : (
                          item.content
                        )}
                      </span>
                    ))}
                  </motion.div>
                ) : (
                  <div className="whitespace-nowrap text-neutral-500">
                    <span className="inline-block mr-8">Aucune information flash disponible</span>
                  </div>
                )}
              </div>
              {/* Flèches décoratives à droite */}
              <div className="flex items-center divide-x divide-neutral-200 bg-neutral-100">
                <button type="button" aria-label="Précédent" className="w-8 h-9 grid place-items-center text-neutral-500 hover:text-neutral-700">‹</button>
                <button type="button" aria-label="Suivant" className="w-8 h-9 grid place-items-center text-neutral-500 hover:text-neutral-700">›</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bandeau Rejoignez-nous */}
      <div className="bg-white">
        <div className="container mx-auto px-4 pt-0 pb-2 md:pb-3 md:pt-0">
          <div className="bg-[#BE2722] text-white rounded md:rounded-md px-3 md:px-4 py-3 md:py-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 md:gap-3">
              {/* Chapel icon */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 2v4" />
                <path d="M9 6h6" />
                <path d="M4 22h16" />
                <path d="M6 22V12l6-4 6 4v10" />
                <path d="M10 22v-4a2 2 0 0 1 4 0v4" />
              </svg>
              <p className="text-base md:text-xl font-bold">Rejoignez-nous</p>
            </div>
            <Link href={`/${locale}/newsletter`} className="shrink-0 inline-flex items-center justify-center rounded bg-white text-black font-semibold px-3 py-1.5 hover:brightness-95 text-sm">
              S'abonner à notre newsletter
            </Link>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

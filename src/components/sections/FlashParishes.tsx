'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useAnimation, useReducedMotion } from 'framer-motion';
import SectionReveal from './SectionReveal';
import { useEffect, useState } from 'react';

type Props = { locale: string };

interface FlashInfoItem {
  id: string;
  title: string;
  content: string;
  url?: string;
}

const parishes = [
  { title: 'FACULTE DE SCIENCES SOCIALES ET DE GESTION', src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop' },
  { title: 'FACULTE DE SCIENCES JURIDIQUES ET POLITIQUES', src: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=1200&auto=format&fit=crop' },
  { title: 'FACULTE DE THEOLOGIE', src: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1200&auto=format&fit=crop' },
  { title: 'FACULTE DE PHILOSOPHIE', src: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1200&auto=format&fit=crop' },
  { title: 'DEPARTEMENT DE DROIT CANONIQUE', src: 'https://images.unsplash.com/photo-1491308056676-205b7c9a7dc1?q=80&w=1200&auto=format&fit=crop' },
  { title: "INSTITUT UCAC-ICAM ECOLE D'INGENIEURS", src: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop' },
  { title: 'ECOLE DES SCIENCES DE LA SANTE', src: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200&auto=format&fit=crop' },
  { title: "INSTITUT SUPERIEUR D'AGRONOMIE", src: 'https://images.unsplash.com/photo-1527960471264-932f39eb5840?q=80&w=1200&auto=format&fit=crop' },
];

export default function FlashParishes({ locale }: Props) {
  const prefersReduced = useReducedMotion();
  const controls = useAnimation();
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
        // Fallback vers des données statiques en cas d'erreur
        setFlashItems([
          { id: '1', title: 'Flash Info', content: 'Bienvenue sur le site de l\'Archidiocèse de Yaoundé' }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFlashInfos();
  }, []);

  useEffect(() => {
    if (prefersReduced) return;
    controls.start({ y: ["0%", "-50%"], transition: { duration: 20, ease: 'linear', repeat: Infinity } });
  }, [controls, prefersReduced]);

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
                    animate={{ x: ["100%", "-100%"] }}
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

  {/* Bandeau Rejoignez-nous — aligné à la largeur des cartes */}
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
              S’abonner à notre newsletter
            </Link>
          </div>
        </div>
      </div>

      {/* Grille 8 cartes */}
  <div className="container mx-auto px-4 pt-2 md:pt-3 pb-4 md:pb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[ 
            { title: 'Zones pastorales', src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop' },
            { title: 'Les paroisses', src: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=1200&auto=format&fit=crop' },
            { title: 'Les services diocésains', src: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1200&auto=format&fit=crop' },
            { title: 'Les commissions diocésaines', src: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1200&auto=format&fit=crop' },
            { title: 'Le SEDY', src: 'https://images.unsplash.com/photo-1491308056676-205b7c9a7dc1?q=80&w=1200&auto=format&fit=crop' },
            { title: 'Aumônerie diocésaine', src: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop' },
            { title: 'Universités – Grandes écoles', src: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200&auto=format&fit=crop' },
            { title: 'Instituts religieux', src: 'https://images.unsplash.com/photo-1527960471264-932f39eb5840?q=80&w=1200&auto=format&fit=crop' },
          ].map((p, idx) => {
            let href = '#';
            if (p.title === 'Les paroisses') {
              href = `/${locale}/paroisses`;
            } else if (p.title === 'Zones pastorales') {
              href = `/${locale}/zones-pastorales`;
            } else if (p.title === 'Les commissions diocésaines') {
              href = `/${locale}/commissions-diocesaines`;
            } else if (p.title === 'Le SEDY') {
              href = `/${locale}/services-diocesains/sedi`;
            } else if (p.title === 'services diocésains') {
              href = `/${locale}/services-diocesains`;
            } else if (p.title === 'Universités – Grandes écoles') {
              href = `/${locale}/oeuvres-missionnaires`;
            } else if (p.title === 'Aumônerie diocésaine') {
              href = `/${locale}/services`;
            } else if (p.title === 'Instituts religieux') {
              href = `/${locale}/administration`;
            }
            return (
            <Link key={idx} href={href} prefetch={false} className="relative h-16 md:h-20 rounded overflow-hidden group">
              <Image src={p.src} alt={p.title} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#2E9B51]/90 to-[#2E9B51]/70 group-hover:from-[#2E9B51]/95 group-hover:to-[#2E9B51]/80 transition" />
              <div className="absolute inset-0 p-3 flex items-center">
                <h3 className="text-white font-extrabold text-[9px] md:text-[10px] leading-tight uppercase drop-shadow">
                  {p.title}
                </h3>
              </div>
            </Link>
          )})}
        </div>
      </div>

      {/* Boutons bleus avec hover vert */}
      <div className="container mx-auto px-4 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link href={`/${locale}/priere`} className="w-full inline-flex items-center justify-center rounded border-2 border-blue-600 bg-blue-600 text-white px-3 py-2 text-sm font-semibold hover:bg-[#2E9B51] hover:border-[#2E9B51] transition-colors">Prière catholique</Link>
          <Link href={`/${locale}/homelies`} className="w-full inline-flex items-center justify-center rounded border-2 border-blue-600 bg-blue-600 text-white px-3 py-2 text-sm font-semibold hover:bg-[#2E9B51] hover:border-[#2E9B51] transition-colors">Homélies et enseignements</Link>
          <Link href={`/${locale}/reflexion`} className="w-full inline-flex items-center justify-center rounded border-2 border-blue-600 bg-blue-600 text-white px-3 py-2 text-sm font-semibold hover:bg-[#2E9B51] hover:border-[#2E9B51] transition-colors">Réflexion théologique</Link>
          <Link href={`/${locale}/bibliotheque`} className="w-full inline-flex items-center justify-center rounded border-2 border-blue-600 bg-blue-600 text-white px-3 py-2 text-sm font-semibold hover:bg-[#2E9B51] hover:border-[#2E9B51] transition-colors">Bibliothèque</Link>
        </div>
      </div>
    </SectionReveal>
  );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';
import SectionReveal from './SectionReveal';

type Props = { locale: string };

export default function StructureOrganisation({ locale }: Props) {
  return (
    <SectionReveal className="bg-white">
      {/* Titre de la section avec bordure - centré */}
      <div className="container mx-auto px-4 py-6 text-center">
        <div className="border-2 border-[#BE2722] rounded-lg px-6 py-3 inline-block">
          <h2 className="text-xl md:text-2xl font-bold text-[#BE2722]">
            Structure et Organisation
          </h2>
        </div>
      </div>

      {/* Grille 8 cartes */}
      <div className="container mx-auto px-4 pt-2 md:pt-3 pb-4 md:pb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[ 
            { title: 'Zones pastorales', href: 'zones-pastorales' },
            { title: 'Les paroisses', href: 'paroisses' },
            { title: 'Services diocésains', href: 'services-diocesains' },
            { title: 'Les commissions diocésaines', href: 'commissions-diocesaines' },
            { title: 'Le SEDY', href: 'services-diocesains/sedi' },
            { title: 'Aumônerie diocésaine', href: 'services' },
            { title: 'Universités – Grandes écoles', href: 'oeuvres-missionnaires' },
            { title: 'Instituts religieux', href: 'administration' },
          ].map((p, idx) => (
            <Link 
              key={idx} 
              href={`/${locale}/${p.href}`} 
              prefetch={false} 
              className="relative h-16 md:h-20 rounded overflow-hidden group"
            >
              <Image src="/logo.jpeg" alt={p.title} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-contain bg-white" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-600/70 group-hover:from-[#2E9B51]/95 group-hover:to-[#2E9B51]/80 transition" />
              <div className="absolute inset-0 p-3 flex items-center">
                <h3 className="text-white font-extrabold text-[9px] md:text-[10px] leading-tight uppercase drop-shadow">
                  {p.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}

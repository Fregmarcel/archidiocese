"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import PartnersModal from "@/components/modals/PartnersModal";

type Props = { locale: string };
type PartnerCategory = 'universites' | 'recherche' | 'entreprises' | 'etranger' | 'emploi';

const bgUrl = "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=2000&auto=format&fit=crop";

const tiles = [
  { key: "universites" as PartnerCategory, label: "Partenaires universitaires", icon: "uni" },
  { key: "recherche" as PartnerCategory, label: "Recherche scientifique", icon: "lab" },
  { key: "entreprises" as PartnerCategory, label: "Partenaires entreprises", icon: "building" },
  { key: "etranger" as PartnerCategory, label: "Étudier à l'étranger", icon: "globe" },
  { key: "emploi" as PartnerCategory, label: "Partenaire pour l'emploi", icon: "doc" },
] as const;

function Icon({ name }: { name: typeof tiles[number]["icon"] }) {
  const common = {
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none",
  };
  switch (name) {
    case "uni":
      return (
        <svg viewBox="0 0 24 24" className="w-10 h-10" {...common}>
          <path d="M12 3 3 7l9 4 9-4-9-4Z" />
          <path d="M5 10v6a7 7 0 0 0 14 0v-6" />
          <path d="M12 12v8" />
        </svg>
      );
    case "lab":
      return (
        <svg viewBox="0 0 24 24" className="w-10 h-10" {...common}>
          <path d="M9 3v6l-4.5 7.5A3 3 0 0 0 7 21h10a3 3 0 0 0 2.5-4.5L15 9V3" />
          <path d="M9 3h6" />
        </svg>
      );
    case "building":
      return (
        <svg viewBox="0 0 24 24" className="w-10 h-10" {...common}>
          <path d="M3 21h18" />
          <path d="M6 21V8h6v13" />
          <path d="M12 21V3h6v18" />
          <path d="M8 12h2M8 16h2M14 7h2M14 11h2M14 15h2" />
        </svg>
      );
    case "globe":
      return (
        <svg viewBox="0 0 24 24" className="w-10 h-10" {...common}>
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z" />
          <path d="M2 12h20" />
          <path d="M12 2c3 3.5 3 16.5 0 20" />
        </svg>
      );
    case "doc":
      return (
        <svg viewBox="0 0 24 24" className="w-10 h-10" {...common}>
          <path d="M6 2h9l5 5v15H6z" />
          <path d="M14 2v6h6" />
          <path d="M8 13h8M8 17h8" />
        </svg>
      );
  }
}

export default function PartnersNetworks({ locale }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const translateY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const [selectedCategory, setSelectedCategory] = useState<PartnerCategory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTileClick = (category: PartnerCategory) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  return (
    <section ref={ref} className="relative isolate">
      {/* Parallax background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div style={{ y: translateY }} className="absolute inset-0">
          <Image src={bgUrl} alt="Réseaux & partenaires" fill priority className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-[#BE2722]/92" />
      </div>

      <div className="container mx-auto px-4 py-14 md:py-20 text-center">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-extrabold uppercase text-white">Réseaux & Partenaires</h2>
        <div className="relative my-4 flex items-center justify-center text-white/90">
          <span className="h-px w-24 bg-white/40" />
          <span className="mx-3 grid place-items-center w-8 h-8 rounded bg-white/10">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M12 1v22" />
              <path d="M5 5h14" />
            </svg>
          </span>
          <span className="h-px w-24 bg-white/40" />
        </div>

        {/* Tiles */}
        <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
          {tiles.map((t) => (
            <button
              key={t.key}
              onClick={() => handleTileClick(t.key)}
              className="group relative isolate overflow-hidden rounded bg-[#BE2722] text-white px-5 py-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)] transition-all duration-300 hover:bg-[#d63a34] focus-visible:outline-2 focus-visible:outline-white"
            >
              {/* Vertical separators suggestive effect */}
              <div className="pointer-events-none absolute left-0 top-0 h-full w-1 bg-black/15" aria-hidden />
              <div className="pointer-events-none absolute right-0 top-0 h-full w-1 bg-black/15" aria-hidden />

              <div className="grid place-items-center">
                <div className="text-white/95 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-0.5">
                  <Icon name={t.icon} />
                </div>
                <p className="mt-3 text-[12px] md:text-sm font-extrabold uppercase leading-tight tracking-tight">
                  {t.label}
                </p>
              </div>

              {/* subtle bottom highlight on hover */}
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-white/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>
          ))}
        </div>
      </div>

      <PartnersModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} category={selectedCategory} locale={locale} />
    </section>
  );
}

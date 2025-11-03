"use client";

import { useState } from "react";
import SectionReveal from "./SectionReveal";
import NewsletterModal from "@/components/modals/NewsletterModal";

type Props = { locale: string };

export default function NewsletterBand({ locale }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <SectionReveal className="bg-neutral-50">
        <div className="container mx-auto px-4 py-10">
          <div className="grid items-center gap-6 md:grid-cols-[80px_1fr_auto]">
            <div className="hidden md:flex items-center justify-center w-16 h-16 border-2 border-neutral-300 rounded">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-500">
                <path d="M4 4h16v16H4z" />
                <path d="m22 6-10 7L2 6" />
              </svg>
            </div>
            <div>
              <h3 className="uppercase text-sm md:text-base font-extrabold tracking-wide text-[#25282E]">
                S'abonner à la newsletter de l'Archidiocèse
              </h3>
              <p className="text-neutral-600 text-sm mt-1">
                Soyez à la page et recevez régulièrement l'actualité de l'Archidiocèse, l'agenda des évènements, les annonces et les nouvelles formations…
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-[#BE2722] text-white px-6 py-3 rounded text-sm font-extrabold uppercase hover:bg-[#a51f1a] transition-colors w-full md:w-auto"
              >
                S'abonner
              </button>
            </div>
          </div>
        </div>
      </SectionReveal>
      
      <NewsletterModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}

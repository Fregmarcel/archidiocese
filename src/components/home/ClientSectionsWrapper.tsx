"use client";
import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/hero/Hero"), { 
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-100 h-96"></div>
});

const StructureOrganisation = dynamic(() => import("@/components/sections/StructureOrganisation"), { 
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-100 h-48"></div>
});

const NewsCarousel = dynamic(() => import("@/components/sections/NewsCarousel"), { 
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-100 h-64"></div>
});

const FlashParishesSimple = dynamic(() => import("@/components/sections/FlashParishesSimple"), { 
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-100 h-24"></div>
});

const EventsAgenda = dynamic(() => import("@/components/sections/EventsAgendaDynamic"), { 
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-100 h-64"></div>
});

const PartnersNetworks = dynamic(() => import("@/components/sections/PartnersNetworks"), { 
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-100 h-32"></div>
});

const NewsletterBandModal = dynamic(() => import("@/components/sections/NewsletterBandModal"), { 
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-100 h-16"></div>
});

export default function ClientSectionsWrapper({ locale }: { locale: string }) {
  return (
    <>
      <Hero locale={locale} />
      <StructureOrganisation locale={locale} />
      <NewsCarousel locale={locale} />
      <FlashParishesSimple locale={locale} />
      <EventsAgenda locale={locale} />
      <PartnersNetworks locale={locale} />
      <NewsletterBandModal locale={locale} />
    </>
  );
}

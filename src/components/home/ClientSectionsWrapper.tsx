"use client";
import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/hero/Hero"), { 
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-100 h-96"></div>
});

const FlashParishes = dynamic(() => import("@/components/sections/FlashParishes"), { 
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-100 h-24"></div>
});

const NewsCarousel = dynamic(() => import("@/components/sections/NewsCarousel"), { 
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-100 h-64"></div>
});

const EventsAgenda = dynamic(() => import("@/components/sections/EventsAgendaDynamic"), { 
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-100 h-64"></div>
});

const PartnersNetworks = dynamic(() => import("@/components/sections/PartnersNetworks"), { 
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-100 h-32"></div>
});

const MesRealisationsCarousel = dynamic(() => import("@/components/sections/MesRealisationsCarousel"), { 
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-100 h-64"></div>
});

const NewsletterBandModal = dynamic(() => import("@/components/sections/NewsletterBandModal"), { 
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-100 h-16"></div>
});

const Testimonials = dynamic(() => import("@/components/sections/Testimonials"), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-100 h-56"></div>
});

export default function ClientSectionsWrapper({ locale }: { locale: string }) {
  return (
    <>
      <Hero locale={locale} />
      <FlashParishes locale={locale} />
      <NewsCarousel locale={locale} />
      <EventsAgenda locale={locale} />
      <PartnersNetworks locale={locale} />
      <MesRealisationsCarousel />
      <NewsletterBandModal locale={locale} />
      <Testimonials />
    </>
  );
}

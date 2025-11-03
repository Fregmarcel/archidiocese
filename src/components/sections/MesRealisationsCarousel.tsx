"use client";
import Image from "next/image";
import SectionReveal from "./SectionReveal";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useRef, useState } from "react";

const items = [
  { id: 1, title: "Inauguration du centre", src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop" },
  { id: 2, title: "Cérémonie de remise de diplômes", src: "https://images.unsplash.com/photo-1596495578065-8a2a06d1a3d5?q=80&w=600&auto=format&fit=crop" },
  { id: 3, title: "Forum des vocations", src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop" },
  { id: 4, title: "Séminaire de recherche", src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop" },
  { id: 5, title: "Journée de prière", src: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=600&auto=format&fit=crop" },
  { id: 6, title: "Rencontre des enseignants", src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=600&auto=format&fit=crop" },
  { id: 7, title: "Atelier de formation", src: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=600&auto=format&fit=crop" },
  { id: 8, title: "Concours d'entrée", src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop" },
  { id: 9, title: "Exposition artistique", src: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=600&auto=format&fit=crop" },
];

export default function MesRealisationsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", skipSnaps: true });
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    const start = () => {
      stop();
      autoplayRef.current = setInterval(() => {
        emblaApi.scrollNext();
      }, 10000);
    };
    const stop = () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    };
    emblaApi.on("select", onSelect);
    onSelect();
    start();
    emblaApi.on("pointerDown", stop);
    emblaApi.on("pointerUp", start);
    return () => {
      stop();
      emblaApi?.off("select", onSelect);
      emblaApi?.off("pointerDown", stop);
      emblaApi?.off("pointerUp", start);
    };
  }, [emblaApi]);

  return (
    <SectionReveal className="bg-white">
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-extrabold uppercase text-[#25282E] mb-4 text-center">Mes réalisations</h2>
        <div className="relative">
          <div ref={emblaRef} className="overflow-hidden" aria-roledescription="carousel">
            <div className="flex">
              {items.map((item) => (
                <div key={item.id} className="basis-full sm:basis-1/2 lg:basis-1/3 shrink-0 px-2 md:px-3">
                  <div className="border rounded bg-white overflow-hidden flex flex-col">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={item.src} alt={item.title} fill className="object-cover" sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" />
                    </div>
                    <div className="p-2 text-center text-sm font-semibold text-neutral-800">
                      {item.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Dots */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {Array.from({ length: Math.ceil(items.length / 3) }).map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i * 3)}
                className={`h-2 w-2 rounded-full ${i === Math.floor(selected / 3) ? "bg-[#BE2722]" : "bg-neutral-300"}`}
                aria-label={`Aller à la page ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

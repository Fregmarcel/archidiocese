"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface HistoryEvent {
  id: string;
  year: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

const categoryColors = {
  creation: 'bg-green-500',
  construction: 'bg-blue-500', 
  nomination: 'bg-purple-500',
  modernisation: 'bg-red-500',
  other: 'bg-gray-500'
};

export default function Historique() {
  const [historyEvents, setHistoryEvents] = useState<HistoryEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistoryEvents = async () => {
      try {
        const response = await fetch('/api/history-events');
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          setHistoryEvents(data.data);
        } else {
          setHistoryEvents([]);
        }
      } catch (error) {
        console.error('Erreur lors du chargement:', error);
        setHistoryEvents([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistoryEvents();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#BE2722]"></div>
          <p className="mt-4 text-neutral-600">Chargement de l'historique...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#25282E] mb-4">
              Notre Historique
            </h1>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Découvrez les moments marquants qui ont façonné l'Archidiocèse de Yaoundé depuis sa création.
            </p>
          </div>
        </div>
      </section>

      {/* Empty state when no data */}
      {historyEvents.length === 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl p-10 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-[#BE2722]/10 text-[#BE2722] grid place-items-center mb-4">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 21h8" />
                  <path d="M12 17v4" />
                  <path d="M7 8v5a5 5 0 0 0 10 0V8" />
                  <path d="M5 8h14" />
                  <path d="M8 12h8" />
                  <path d="M7 8V7a5 5 0 1 1 10 0v1" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#25282E]">Historique en cours de construction</h2>
              <p className="text-neutral-600 mt-2">Aucun évènement n'est encore disponible. Revenez bientôt ou abonnez‑vous à notre newsletter pour être informé des mises à jour.</p>
            </div>
          </div>
        </section>
      )}

      {/* Timeline */}
      {historyEvents.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#25282E]">
              Chronologie des Événements Marquants
            </h2>

            <div className="space-y-12">
              {historyEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="md:flex">
                    <div className="md:w-1/2">
                      <div className="relative h-64 md:h-80">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full text-white font-bold text-xl mb-4 ${
                        (categoryColors as any)[event.category] || categoryColors.other
                      }`}>
                        {event.year}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-[#25282E] mb-4">
                        {event.title}
                      </h3>
                      <p className="text-neutral-600 leading-relaxed text-lg">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {historyEvents.length > 0 && (
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#25282E] mb-4">
                Galerie Historique
              </h2>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                Une sélection d'images qui racontent l'histoire de notre Archidiocèse
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {historyEvents.slice(0, 6).map((event, index) => (
                <motion.div
                  key={`gallery-${event.id}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`inline-block w-3 h-3 rounded-full ${
                          (categoryColors as any)[event.category] || categoryColors.other
                        }`}></span>
                        <span className="text-sm font-semibold text-neutral-600">{event.year}</span>
                      </div>
                      <h4 className="font-semibold text-[#25282E] text-sm mb-1">
                        {event.title}
                      </h4>
                      <p className="text-xs text-neutral-600 line-clamp-2">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
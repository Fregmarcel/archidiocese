"use client";

import { useEffect, useState } from 'react';
import { X, ExternalLink, Globe, Briefcase, GraduationCap, FlaskConical, Plane } from 'lucide-react';

type PartnerCategory = 'universites' | 'recherche' | 'entreprises' | 'etranger' | 'emploi';

interface Partner {
  _id?: string;
  id?: string;
  name: string;
  url?: string;
  description?: string;
  logo?: string;
}

interface CategoryData {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const categoryData: Record<PartnerCategory, CategoryData> = {
  universites: {
    title: 'Partenaires Universitaires',
    description: "L'archidiocèse collabore avec plusieurs institutions universitaires prestigieuses pour promouvoir l'excellence académique, les échanges interculturels et la formation continue.",
    icon: GraduationCap,
  },
  recherche: {
    title: 'Recherche Scientifique',
    description: "La recherche scientifique au sein de l'archidiocèse s'articule autour de plusieurs axes: théologie, philosophie, sciences sociales et développement durable. Nous encourageons la publication, les colloques internationaux et les partenariats avec des centres de recherche reconnus.",
    icon: FlaskConical,
  },
  entreprises: {
    title: 'Partenaires Entreprises',
    description: "L'archidiocèse entretient des relations privilégiées avec le monde de l'entreprise pour faciliter l'insertion professionnelle de nos fidèles et soutenir l'entrepreneuriat chrétien.",
    icon: Briefcase,
  },
  etranger: {
    title: "Études à l'Étranger",
    description: "Nous accompagnons les étudiants désireux de poursuivre leurs études à l'étranger grâce à des programmes de bourses, des conventions avec des universités partenaires et un service d'orientation personnalisé.",
    icon: Plane,
  },
  emploi: {
    title: "Partenaires pour l'Emploi",
    description: "Notre réseau de partenaires pour l'emploi facilite l'accès au marché du travail grâce à des forums de recrutement, des ateliers de renforcement des compétences et des plateformes dédiées.",
    icon: Globe,
  },
};

interface PartnersModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: PartnerCategory | null;
  locale: string;
}

export default function PartnersModal({ isOpen, onClose, category, locale }: PartnersModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      const t = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) { window.addEventListener('keydown', handleEscape); return () => window.removeEventListener('keydown', handleEscape); }
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !category) return;
    setLoading(true);
    setError(null);
    setPartners([]);
    const controller = new AbortController();
    const fetchPartners = async () => {
      try {
        const res = await fetch(`/api/partners?locale=${encodeURIComponent(locale)}&category=${encodeURIComponent(category)}`, { signal: controller.signal });
        if (!res.ok) throw new Error('Erreur réseau');
        const json = await res.json();
        setPartners(Array.isArray(json?.data) ? json.data : []);
      } catch (e: any) {
        if (e.name !== 'AbortError') setError("Impossible de charger les partenaires");
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
    return () => controller.abort();
  }, [isOpen, category, locale]);

  if (!isVisible || !category) return null;

  const data = categoryData[category];
  const Icon = data.icon;
  const hasPartners = partners.length > 0;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div onClick={(e) => e.stopPropagation()} className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden transform transition-all duration-300 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#BE2722] to-[#d63a34] px-6 py-6">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all group" aria-label="Fermer">
            <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
          </button>
          <div className="flex items-center gap-4 text-white">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
              <Icon className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{data.title}</h2>
              <p className="text-red-100 text-sm mt-1">Réseau & Partenaires</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6">
            {/* Description */}
            <div className="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 rounded-r-lg">
              <p className="text-gray-700 leading-relaxed">{data.description}</p>
            </div>

            {/* Loading / Error states */}
            {loading && (
              <div className="py-10 text-center text-gray-500">Chargement…</div>
            )}
            {error && !loading && (
              <div className="py-10 text-center text-red-600">{error}</div>
            )}

            {/* Partners List */}
            {!loading && !error && hasPartners ? (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-[#BE2722] rounded" />
                  Nos Partenaires
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {partners.map((partner) => (
                    <div key={partner._id || partner.id || partner.name} className="group border-2 border-gray-200 rounded-xl p-5 hover:border-[#BE2722] hover:shadow-lg transition-all duration-300 bg-white">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {partner.logo ? (
                            <img src={partner.logo} alt="" className="w-10 h-10 rounded border object-cover" />
                          ) : (
                            <div className="w-10 h-10 rounded border bg-gray-50" />
                          )}
                          <h4 className="font-bold text-gray-900 group-hover:text-[#BE2722] transition-colors leading-tight truncate">
                            {partner.name}
                          </h4>
                        </div>
                        {partner.url && partner.url !== '#' && (
                          <a
                            href={partner.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 p-2 rounded-lg bg-gray-100 group-hover:bg-[#BE2722] transition-all"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                          </a>
                        )}
                      </div>
                      {partner.description && (
                        <p className="text-sm text-gray-600 leading-relaxed">{partner.description}</p>
                      )}
                      {partner.url && partner.url !== '#' && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <a
                            href={partner.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Globe className="w-3 h-3" />
                            <span className="truncate">{partner.url.replace(/^https?:\/\//, '')}</span>
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (!loading && !error && (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 mb-4">
                  <Icon className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Informations disponibles prochainement</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Nous mettons actuellement à jour les informations concernant cette catégorie. Revenez bientôt pour découvrir nos partenaires et opportunités.
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {hasPartners ? `${partners.length} partenaire${partners.length > 1 ? 's' : ''}` : 'En cours de mise à jour'}
          </p>
          <button onClick={onClose} className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105">
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { 
  Cross, 
  Heart, 
  Users,
  Globe,
  BookOpen,
  Sparkles,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Calendar
} from 'lucide-react';

const instituts = [
  {
    id: 'bamileke',
    name: 'Sœurs de la Sainte-Famille de Bamiléké',
    abbreviation: 'SSFB',
    description: 'Congrégation féminine dédiée à l\'éducation, la santé et l\'évangélisation. Fondée au Cameroun pour le service des familles.',
    spiritualite: 'Spiritualité familiale ignatienne',
    fondation: '1960',
    charisme: 'Service des familles et éducation',
    activities: ['Éducation', 'Santé', 'Catéchèse', 'Pastoral'],
    contact: '+237 699 XX XX XX',
    email: 'ssfb@archidiocese-yaounde.org'
  },
  {
    id: 'clarisses',
    name: 'Clarisses de Yaoundé',
    abbreviation: 'OSC',
    description: 'Monastère de vie contemplative selon la règle de Sainte Claire. Vie de prière et d\'adoration au cœur de la ville.',
    spiritualite: 'Spiritualité franciscaine',
    fondation: '1985',
    charisme: 'Vie contemplative et prière',
    activities: ['Prière', 'Adoration', 'Retraites', 'Accueil'],
    contact: '+237 699 XX XX XX',
    email: 'clarisses@archidiocese-yaounde.org'
  },
  {
    id: 'salesiens',
    name: 'Salésiens de Don Bosco',
    abbreviation: 'SDB',
    description: 'Congrégation masculine dédiée à l\'éducation de la jeunesse selon la méthode préventive de Saint Jean Bosco.',
    spiritualite: 'Spiritualité salésienne',
    fondation: '1967',
    charisme: 'Éducation des jeunes',
    activities: ['Formation professionnelle', 'Éducation', 'Oratoire', 'Paroisse'],
    contact: '+237 699 XX XX XX',
    email: 'salesiens@archidiocese-yaounde.org'
  },
  {
    id: 'spiritains',
    name: 'Spiritains - Congrégation du Saint-Esprit',
    abbreviation: 'CSSp',
    description: 'Congrégation missionnaire présente au Cameroun depuis les débuts de l\'évangélisation. Engagement pour les plus pauvres.',
    spiritualite: 'Spiritualité missionnaire',
    fondation: '1890',
    charisme: 'Mission et service des pauvres',
    activities: ['Mission', 'Paroisse', 'Éducation', 'Développement'],
    contact: '+237 699 XX XX XX',
    email: 'spiritains@archidiocese-yaounde.org'
  },
  {
    id: 'carmelites',
    name: 'Carmélites de Yaoundé',
    abbreviation: 'OCD',
    description: 'Monastère de vie contemplative selon la spiritualité du Carmel. Vie de prière intense et de silence.',
    spiritualite: 'Spiritualité carmélitaine',
    fondation: '1990',
    charisme: 'Vie contemplative',
    activities: ['Prière', 'Adoration', 'Retraites'],
    contact: '+237 699 XX XX XX',
    email: 'carmel@archidiocese-yaounde.org'
  },
  {
    id: 'tertiaires',
    name: 'Sœurs Tertiaires de Saint-François',
    abbreviation: 'STSF',
    description: 'Congrégation féminine d\'inspiration franciscaine, engagée dans le service social et l\'éducation.',
    spiritualite: 'Spiritualité franciscaine',
    fondation: '1975',
    charisme: 'Service social et éducation',
    activities: ['Éducation', 'Santé', 'Action sociale'],
    contact: '+237 699 XX XX XX',
    email: 'tertiaires@archidiocese-yaounde.org'
  }
];

const communautesNouvelles = [
  {
    name: 'Communauté de l\'Emmanuel',
    type: 'Communauté nouvelle',
    charisme: 'Évangélisation et adoration'
  },
  {
    name: 'Chemin Néocatéchuménal',
    type: 'Itinéraire de foi',
    charisme: 'Formation chrétienne des adultes'
  },
  {
    name: 'Renouveau Charismatique',
    type: 'Mouvement',
    charisme: 'Effusion de l\'Esprit Saint'
  }
];

export default function InstitutsReligieuxPage() {
  const params = useParams();
  const locale = params?.locale as string || 'fr';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#7c3aed] to-[#a855f7] text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 relative z-10">
          <nav className="text-sm mb-6 text-white/80">
            <Link href={`/${locale}`} className="hover:text-white">Accueil</Link>
            <ChevronRight className="inline w-4 h-4 mx-2" />
            <span>Instituts Religieux</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Instituts Religieux</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl">
            Découvrez les congrégations religieuses et instituts de vie consacrée 
            présents dans l&apos;Archidiocèse de Yaoundé.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Cross className="w-12 h-12 text-[#7c3aed] mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              La vie consacrée au service de l&apos;Église
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Les instituts religieux sont des témoins vivants de l&apos;Évangile. Par leurs différents 
              charismes, ils enrichissent la vie de l&apos;Église locale et participent à sa mission 
              d&apos;évangélisation, d&apos;éducation et de service des plus pauvres.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-gradient-to-r from-[#7c3aed] to-[#a855f7]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            <div>
              <div className="text-3xl font-bold">20+</div>
              <div className="text-sm text-white/80">Congrégations</div>
            </div>
            <div>
              <div className="text-3xl font-bold">500+</div>
              <div className="text-sm text-white/80">Religieux(ses)</div>
            </div>
            <div>
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm text-white/80">Communautés</div>
            </div>
            <div>
              <div className="text-3xl font-bold">100+</div>
              <div className="text-sm text-white/80">Années de présence</div>
            </div>
          </div>
        </div>
      </section>

      {/* Instituts Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Heart className="w-8 h-8 text-[#7c3aed]" />
            Congrégations et Monastères
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {instituts.map((institut) => (
              <div key={institut.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-r from-[#7c3aed] to-[#a855f7] p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded">
                        {institut.abbreviation}
                      </span>
                      <h3 className="text-lg font-bold mt-2">{institut.name}</h3>
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Cross className="w-6 h-6" />
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4">{institut.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Sparkles className="w-4 h-4 text-[#7c3aed]" />
                      <span className="text-gray-600">{institut.spiritualite}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <BookOpen className="w-4 h-4 text-[#7c3aed]" />
                      <span className="text-gray-600">{institut.charisme}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-[#7c3aed]" />
                      <span className="text-gray-600">Fondé en {institut.fondation}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-500 mb-2">Apostolats:</p>
                    <div className="flex flex-wrap gap-1">
                      {institut.activities.map((activity) => (
                        <span key={activity} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-4 text-sm">
                    <a href={`tel:${institut.contact}`} className="flex items-center gap-1 text-[#7c3aed] hover:underline">
                      <Phone className="w-3 h-3" />
                      {institut.contact}
                    </a>
                    <a href={`mailto:${institut.email}`} className="flex items-center gap-1 text-[#7c3aed] hover:underline">
                      <Mail className="w-3 h-3" />
                      Contact
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Communautés Nouvelles */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Globe className="w-8 h-8 text-[#7c3aed]" />
            Mouvements et Communautés Nouvelles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {communautesNouvelles.map((comm, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-purple-100">
                <div className="w-10 h-10 bg-[#7c3aed] rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-medium text-[#7c3aed]">{comm.type}</span>
                <h3 className="text-lg font-bold text-gray-900 mt-1 mb-2">{comm.name}</h3>
                <p className="text-sm text-gray-600">{comm.charisme}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vocation CTA */}
      <section className="py-12 bg-gradient-to-r from-[#7c3aed] to-[#a855f7] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Vous sentez-vous appelé(e) ?
          </h2>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            Si vous ressentez un appel à la vie consacrée, n&apos;hésitez pas à contacter 
            le Service des Vocations ou l&apos;une des congrégations présentes dans notre diocèse.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#7c3aed] font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contacter le Service des Vocations
            </Link>
            <Link
              href={`/${locale}/services-diocesains`}
              className="inline-flex items-center justify-center px-6 py-3 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white/10 transition-colors"
            >
              Voir les services
              <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

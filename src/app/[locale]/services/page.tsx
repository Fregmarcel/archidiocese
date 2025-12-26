'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { 
  GraduationCap, 
  Stethoscope, 
  Shield, 
  Briefcase,
  Users,
  Heart,
  ChevronRight,
  Phone,
  Mail,
  Clock,
  MapPin
} from 'lucide-react';

const aumoneries = [
  {
    id: 'sante',
    name: 'Aumônerie des Hôpitaux',
    description: 'Accompagnement spirituel des malades et du personnel soignant dans les établissements de santé.',
    icon: Stethoscope,
    image: '/images/aumonerie-sante.jpg',
    responsable: 'Père Jean-Marie NKODO',
    contact: '+237 699 XX XX XX',
    email: 'aumonerie.sante@archidiocese-yaounde.org',
    horaires: 'Lun-Sam: 8h-17h'
  },
  {
    id: 'militaire',
    name: 'Aumônerie Militaire',
    description: 'Soutien spirituel aux forces armées et à leurs familles. Célébrations et accompagnement pastoral.',
    icon: Shield,
    image: '/images/aumonerie-militaire.jpg',
    responsable: 'Père Emmanuel MBARGA',
    contact: '+237 699 XX XX XX',
    email: 'aumonerie.militaire@archidiocese-yaounde.org',
    horaires: 'Lun-Ven: 9h-16h'
  },
  {
    id: 'prisons',
    name: 'Aumônerie des Prisons',
    description: 'Accompagnement des détenus et de leurs proches. Réinsertion sociale et spirituelle.',
    icon: Heart,
    image: '/images/aumonerie-prisons.jpg',
    responsable: 'Père Paul ATANGANA',
    contact: '+237 699 XX XX XX',
    email: 'aumonerie.prisons@archidiocese-yaounde.org',
    horaires: 'Mar-Sam: 9h-15h'
  },
  {
    id: 'travail',
    name: 'Aumônerie du Monde du Travail',
    description: 'Évangélisation en milieu professionnel, accompagnement des travailleurs chrétiens.',
    icon: Briefcase,
    image: '/images/aumonerie-travail.jpg',
    responsable: 'Père Martin ESSOMBA',
    contact: '+237 699 XX XX XX',
    email: 'aumonerie.travail@archidiocese-yaounde.org',
    horaires: 'Lun-Ven: 10h-18h'
  },
  {
    id: 'education',
    name: 'Aumônerie des Établissements Scolaires',
    description: 'Formation spirituelle des élèves et étudiants, animation de groupes de prière.',
    icon: GraduationCap,
    image: '/images/aumonerie-education.jpg',
    responsable: 'Père Joseph MVONDO',
    contact: '+237 699 XX XX XX',
    email: 'aumonerie.education@archidiocese-yaounde.org',
    horaires: 'Lun-Ven: 8h-17h'
  },
  {
    id: 'mouvements',
    name: 'Aumônerie des Mouvements',
    description: 'Coordination des mouvements d\'action catholique et associations de fidèles.',
    icon: Users,
    image: '/images/aumonerie-mouvements.jpg',
    responsable: 'Père André NANGA',
    contact: '+237 699 XX XX XX',
    email: 'aumonerie.mouvements@archidiocese-yaounde.org',
    horaires: 'Lun-Sam: 9h-17h'
  }
];

export default function AumonerieDiocesainePage() {
  const params = useParams();
  const locale = params?.locale as string || 'fr';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <nav className="text-sm mb-6 text-white/80">
            <Link href={`/${locale}`} className="hover:text-white">Accueil</Link>
            <ChevronRight className="inline w-4 h-4 mx-2" />
            <span>Aumôneries Diocésaines</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Aumôneries Diocésaines</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl">
            L&apos;Église au service de tous les milieux de vie. Découvrez nos différentes 
            aumôneries dédiées à l&apos;accompagnement spirituel spécialisé.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Une présence auprès de chacun
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Les aumôneries de l&apos;Archidiocèse de Yaoundé sont présentes dans les différents 
              milieux de vie pour apporter soutien spirituel, écoute et accompagnement à tous 
              ceux qui en ont besoin. Chaque aumônerie est adaptée aux réalités spécifiques 
              de son environnement.
            </p>
          </div>
        </div>
      </section>

      {/* Aumôneries List */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {aumoneries.map((aumonerie, index) => {
              const Icon = aumonerie.icon;
              const isReversed = index % 2 === 1;
              
              return (
                <div
                  key={aumonerie.id}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col ${
                    isReversed ? 'md:flex-row-reverse' : 'md:flex-row'
                  }`}
                >
                  {/* Image/Icon Section */}
                  <div className="md:w-1/3 bg-gradient-to-br from-blue-600 to-blue-800 p-8 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-10 h-10" />
                      </div>
                      <h3 className="text-xl font-bold">{aumonerie.name}</h3>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="md:w-2/3 p-6 md:p-8">
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {aumonerie.description}
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Responsable</p>
                          <p className="font-medium text-gray-900">{aumonerie.responsable}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Téléphone</p>
                          <p className="font-medium text-gray-900">{aumonerie.contact}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium text-gray-900 text-sm">{aumonerie.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Horaires</p>
                          <p className="font-medium text-gray-900">{aumonerie.horaires}</p>
                        </div>
                      </div>
                    </div>
                    
                    <button className="text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-1 transition-colors">
                      Contacter cette aumônerie
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Vous souhaitez vous engager ?
          </h2>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            Rejoignez nos équipes de bénévoles et participez à la mission de 
            l&apos;Église auprès des personnes dans le besoin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Mail className="w-5 h-5 mr-2" />
              Nous contacter
            </Link>
            <Link
              href={`/${locale}/inscription`}
              className="inline-flex items-center justify-center px-6 py-3 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white/10 transition-colors"
            >
              <Users className="w-5 h-5 mr-2" />
              Devenir bénévole
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

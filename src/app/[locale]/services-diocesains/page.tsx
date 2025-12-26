'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Users, 
  Heart, 
  BookOpen, 
  Music, 
  Cross,
  Building2,
  HandHeart,
  Globe,
  ChevronRight,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

const services = [
  {
    id: 'pastorale-familiale',
    name: 'Pastorale Familiale',
    description: 'Accompagnement des familles dans leur vie de foi, préparation au mariage, soutien aux couples.',
    icon: Heart,
    color: 'bg-rose-500',
    contact: {
      phone: '+237 222 XX XX XX',
      email: 'famille@archidiocese-yaounde.org'
    }
  },
  {
    id: 'catechese',
    name: 'Catéchèse',
    description: 'Formation chrétienne pour les enfants, jeunes et adultes. Préparation aux sacrements.',
    icon: BookOpen,
    color: 'bg-blue-500',
    contact: {
      phone: '+237 222 XX XX XX',
      email: 'catechese@archidiocese-yaounde.org'
    }
  },
  {
    id: 'liturgie',
    name: 'Commission Liturgique',
    description: 'Organisation et animation des célébrations liturgiques, formation des servants d\'autel.',
    icon: Cross,
    color: 'bg-purple-500',
    contact: {
      phone: '+237 222 XX XX XX',
      email: 'liturgie@archidiocese-yaounde.org'
    }
  },
  {
    id: 'caritas',
    name: 'Caritas Diocésaine',
    description: 'Action sociale et caritative, aide aux personnes vulnérables, projets de développement.',
    icon: HandHeart,
    color: 'bg-green-500',
    contact: {
      phone: '+237 222 XX XX XX',
      email: 'caritas@archidiocese-yaounde.org'
    }
  },
  {
    id: 'jeunesse',
    name: 'Pastorale des Jeunes',
    description: 'Accompagnement spirituel des jeunes, mouvements de jeunesse, camps et retraites.',
    icon: Users,
    color: 'bg-orange-500',
    contact: {
      phone: '+237 222 XX XX XX',
      email: 'jeunesse@archidiocese-yaounde.org'
    }
  },
  {
    id: 'communications',
    name: 'Communications Sociales',
    description: 'Médias diocésains, radio, télévision, presse écrite et présence numérique.',
    icon: Globe,
    color: 'bg-cyan-500',
    contact: {
      phone: '+237 222 XX XX XX',
      email: 'communication@archidiocese-yaounde.org'
    }
  },
  {
    id: 'musique-sacree',
    name: 'Musique Sacrée',
    description: 'Formation des chorales, promotion de la musique liturgique et du chant sacré.',
    icon: Music,
    color: 'bg-indigo-500',
    contact: {
      phone: '+237 222 XX XX XX',
      email: 'musique@archidiocese-yaounde.org'
    }
  },
  {
    id: 'vocations',
    name: 'Service des Vocations',
    description: 'Accompagnement des vocations sacerdotales et religieuses, discernement vocationnel.',
    icon: Building2,
    color: 'bg-amber-500',
    contact: {
      phone: '+237 222 XX XX XX',
      email: 'vocations@archidiocese-yaounde.org'
    }
  }
];

export default function ServicesDiocesainsPage() {
  const params = useParams();
  const locale = params?.locale as string || 'fr';
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-[#BE2722] text-white py-16 md:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("/logo.jpeg")',
            backgroundSize: '200px',
            backgroundRepeat: 'repeat',
            opacity: 0.1
          }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <nav className="text-sm mb-6 text-white/80">
            <Link href={`/${locale}`} className="hover:text-white">Accueil</Link>
            <ChevronRight className="inline w-4 h-4 mx-2" />
            <span>Services Diocésains</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Services Diocésains</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl">
            Découvrez les différents services au sein de l&apos;Archidiocèse de Yaoundé, 
            dédiés à l&apos;accompagnement spirituel et au service de la communauté.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              const isSelected = selectedService === service.id;
              
              return (
                <div
                  key={service.id}
                  className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1 ${
                    isSelected ? 'ring-2 ring-[#BE2722]' : ''
                  }`}
                  onClick={() => setSelectedService(isSelected ? null : service.id)}
                >
                  <div className={`${service.color} p-4 flex items-center gap-3`}>
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{service.name}</h3>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                    
                    {isSelected && (
                      <div className="pt-4 border-t border-gray-100 space-y-2 animate-fadeIn">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Phone className="w-4 h-4 text-[#BE2722]" />
                          <span>{service.contact.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Mail className="w-4 h-4 text-[#BE2722]" />
                          <span>{service.contact.email}</span>
                        </div>
                      </div>
                    )}
                    
                    <button className="mt-3 text-[#BE2722] text-sm font-semibold hover:underline flex items-center gap-1">
                      {isSelected ? 'Masquer' : 'En savoir plus'}
                      <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-90' : ''}`} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Besoin d&apos;un accompagnement ?
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            N&apos;hésitez pas à contacter le service concerné ou à vous rendre à l&apos;Archevêché 
            pour plus d&apos;informations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center px-6 py-3 bg-[#BE2722] text-white font-semibold rounded-lg hover:bg-[#a02020] transition-colors"
            >
              <Mail className="w-5 h-5 mr-2" />
              Nous contacter
            </Link>
            <Link
              href={`/${locale}/paroisses`}
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Trouver une paroisse
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

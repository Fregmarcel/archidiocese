'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  GraduationCap, 
  Building2, 
  BookOpen,
  Users,
  Globe,
  Award,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Calendar
} from 'lucide-react';

const universities = [
  {
    id: 'ucac',
    name: 'Université Catholique d\'Afrique Centrale (UCAC)',
    description: 'Première université catholique d\'Afrique Centrale, offrant des formations en droit, économie, sciences sociales et théologie.',
    type: 'Université',
    location: 'Nkolbisson, Yaoundé',
    founded: '1989',
    students: '5000+',
    programs: ['Droit', 'Économie', 'Philosophie', 'Théologie', 'Sciences Sociales'],
    website: 'www.ucac-icy.net',
    contact: '+237 222 30 50 00',
    email: 'info@ucac-icy.net'
  },
  {
    id: 'icy',
    name: 'Institut Catholique de Yaoundé',
    description: 'Centre d\'excellence pour la formation théologique et philosophique des futurs prêtres et religieux.',
    type: 'Institut Supérieur',
    location: 'Mvolyé, Yaoundé',
    founded: '1968',
    students: '800+',
    programs: ['Théologie', 'Philosophie', 'Sciences Religieuses'],
    website: 'www.icy.cm',
    contact: '+237 222 31 XX XX',
    email: 'info@icy.cm'
  }
];

const grandesEcoles = [
  {
    id: 'isseg',
    name: 'ISSEG - Institut Supérieur des Sciences de l\'Éducation et de Gestion',
    description: 'Formation de cadres en sciences de l\'éducation et en gestion des organisations.',
    type: 'Grande École',
    location: 'Yaoundé',
    programs: ['Sciences de l\'Éducation', 'Gestion', 'Management']
  },
  {
    id: 'catho-nursing',
    name: 'École Catholique d\'Infirmiers',
    description: 'Formation d\'infirmiers et d\'aides-soignants selon les valeurs chrétiennes du service.',
    type: 'École Professionnelle',
    location: 'Yaoundé',
    programs: ['Infirmerie', 'Aide-Soignant', 'Santé Communautaire']
  },
  {
    id: 'seminaire',
    name: 'Grand Séminaire de Nkolbisson',
    description: 'Formation des futurs prêtres diocésains et religieux pour l\'Archidiocèse et au-delà.',
    type: 'Séminaire',
    location: 'Nkolbisson, Yaoundé',
    programs: ['Théologie', 'Philosophie', 'Formation Spirituelle']
  }
];

const aumoneriesUniversitaires = [
  {
    name: 'Aumônerie Université de Yaoundé I',
    chaplain: 'Père Michel ONANA',
    location: 'Campus de Ngoa-Ekélé'
  },
  {
    name: 'Aumônerie Université de Yaoundé II',
    chaplain: 'Père Jacques MANGA',
    location: 'Campus de Soa'
  },
  {
    name: 'Aumônerie École Polytechnique',
    chaplain: 'Père Samuel BELINGA',
    location: 'Campus Polytechnique'
  }
];

export default function UniversitesGrandesEcolesPage() {
  const params = useParams();
  const locale = params?.locale as string || 'fr';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#059669] to-[#10b981] text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 relative z-10">
          <nav className="text-sm mb-6 text-white/80">
            <Link href={`/${locale}`} className="hover:text-white">Accueil</Link>
            <ChevronRight className="inline w-4 h-4 mx-2" />
            <span>Universités & Grandes Écoles</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Universités & Grandes Écoles</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl">
            L&apos;enseignement catholique supérieur au service de l&apos;excellence 
            académique et de la formation intégrale de la personne.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-[#059669]">5+</div>
              <div className="text-sm text-gray-600">Établissements</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#059669]">6000+</div>
              <div className="text-sm text-gray-600">Étudiants</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#059669]">50+</div>
              <div className="text-sm text-gray-600">Programmes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#059669]">35+</div>
              <div className="text-sm text-gray-600">Années d&apos;excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* Universities Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-[#059669]" />
            Universités Catholiques
          </h2>
          
          <div className="space-y-8">
            {universities.map((uni) => (
              <div key={uni.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-gradient-to-br from-[#059669] to-[#047857] p-8 text-white flex flex-col justify-center">
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                      <Building2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{uni.name}</h3>
                    <p className="text-white/80 text-sm">{uni.type}</p>
                  </div>
                  
                  <div className="md:w-2/3 p-6 md:p-8">
                    <p className="text-gray-600 mb-6">{uni.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#059669]" />
                        <span className="text-sm text-gray-600">{uni.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#059669]" />
                        <span className="text-sm text-gray-600">Fondée en {uni.founded}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#059669]" />
                        <span className="text-sm text-gray-600">{uni.students} étudiants</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-[#059669]" />
                        <span className="text-sm text-gray-600">{uni.website}</span>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-sm font-medium text-gray-700 mb-2">Programmes offerts:</p>
                      <div className="flex flex-wrap gap-2">
                        {uni.programs.map((program) => (
                          <span key={program} className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                            {program}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      <a href={`tel:${uni.contact}`} className="flex items-center gap-2 text-[#059669] hover:underline">
                        <Phone className="w-4 h-4" />
                        {uni.contact}
                      </a>
                      <a href={`mailto:${uni.email}`} className="flex items-center gap-2 text-[#059669] hover:underline">
                        <Mail className="w-4 h-4" />
                        {uni.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grandes Écoles Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Award className="w-8 h-8 text-[#059669]" />
            Grandes Écoles & Instituts
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {grandesEcoles.map((ecole) => (
              <div key={ecole.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-[#059669] rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium text-[#059669] bg-green-100 px-2 py-1 rounded">
                  {ecole.type}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2">{ecole.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{ecole.description}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <MapPin className="w-4 h-4" />
                  {ecole.location}
                </div>
                <div className="flex flex-wrap gap-1">
                  {ecole.programs.map((program) => (
                    <span key={program} className="text-xs text-gray-500">
                      • {program}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aumôneries Universitaires */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Users className="w-8 h-8 text-[#059669]" />
            Aumôneries Universitaires
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aumoneriesUniversitaires.map((aum, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md border-l-4 border-[#059669]">
                <h3 className="font-bold text-gray-900 mb-2">{aum.name}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Aumônier:</span> {aum.chaplain}
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {aum.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-[#059669] to-[#10b981] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Intéressé par nos formations ?
          </h2>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            Découvrez les programmes académiques et les opportunités offertes 
            par l&apos;enseignement catholique supérieur.
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#059669] font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Mail className="w-5 h-5 mr-2" />
            Demander des informations
          </Link>
        </div>
      </section>
    </div>
  );
}

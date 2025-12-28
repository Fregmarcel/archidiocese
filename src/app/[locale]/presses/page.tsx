'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { 
  Newspaper, 
  BookOpen, 
  FileText, 
  Calendar, 
  Download, 
  ExternalLink,
  ChevronRight,
  Mail,
  Phone
} from 'lucide-react';

const publications = [
  {
    id: 'effort-camerounais',
    name: "L'Effort Camerounais",
    description: "Journal catholique hebdomadaire, voix de l'Église au Cameroun depuis 1955. Actualités religieuses, sociales et culturelles.",
    type: 'Journal hebdomadaire',
    frequency: 'Hebdomadaire',
    founded: '1955',
    image: '/images/effort-camerounais.jpg',
    color: 'bg-blue-600',
    website: '#',
    featured: true
  },
  {
    id: 'annales-yde',
    name: 'Annales de Yaoundé',
    description: "Publication annuelle de l'Archidiocèse présentant les statistiques, nominations et événements majeurs de l'année écoulée.",
    type: 'Publication annuelle',
    frequency: 'Annuelle',
    founded: '1970',
    image: '/images/annales.jpg',
    color: 'bg-[#BE2722]',
    website: '#',
    featured: true
  },
  {
    id: 'bulletin-diocesain',
    name: 'Bulletin Diocésain',
    description: "Communication officielle de l'Archevêché : nominations, décrets, lettres pastorales et annonces importantes.",
    type: 'Bulletin officiel',
    frequency: 'Mensuel',
    founded: '1960',
    image: '/images/bulletin.jpg',
    color: 'bg-green-600',
    website: '#',
    featured: false
  }
];

const recentArticles = [
  {
    title: "Message de Noël de Mgr l'Archevêque",
    date: '2024-12-25',
    source: "L'Effort Camerounais",
    excerpt: "Le message de paix et d'espérance de notre pasteur pour la fête de la Nativité..."
  },
  {
    title: "Ordinations sacerdotales 2024",
    date: '2024-12-15',
    source: 'Annales de Yaoundé',
    excerpt: "Retour sur les ordinations de cette année et présentation des nouveaux prêtres..."
  },
  {
    title: "Nominations dans les paroisses",
    date: '2024-12-01',
    source: 'Bulletin Diocésain',
    excerpt: "Les dernières nominations et mutations dans l'Archidiocèse..."
  }
];

export default function PresseDiocesainePage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'fr';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0891B2] to-[#06B6D4] text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 relative z-10">
          <nav className="text-sm mb-6 text-white/80">
            <Link href={`/${locale}`} className="hover:text-white">Accueil</Link>
            <ChevronRight className="inline w-4 h-4 mx-2" />
            <span>Presse Diocésaine</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Presse Diocésaine</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl">
            Découvrez les publications officielles de l&apos;Archidiocèse de Yaoundé : 
            journaux, bulletins et annales pour rester informé de la vie de l&apos;Église.
          </p>
        </div>
      </section>

      {/* Publications principales */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Newspaper className="w-8 h-8 text-[#0891B2]" />
            Nos Publications
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publications.map((pub) => (
              <div 
                key={pub.id} 
                className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${
                  pub.featured ? 'ring-2 ring-[#0891B2]' : ''
                }`}
              >
                <div className={`${pub.color} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                      <Newspaper className="w-7 h-7" />
                    </div>
                    {pub.featured && (
                      <span className="bg-white/20 text-xs font-medium px-3 py-1 rounded-full">
                        À la Une
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-1">{pub.name}</h3>
                  <p className="text-white/80 text-sm">{pub.type}</p>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {pub.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Calendar className="w-4 h-4 text-[#0891B2]" />
                      <span>{pub.frequency}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <BookOpen className="w-4 h-4 text-[#0891B2]" />
                      <span>Depuis {pub.founded}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#0891B2] text-white text-sm font-medium rounded-lg hover:bg-[#0e7490] transition-colors">
                      <FileText className="w-4 h-4" />
                      Lire
                    </button>
                    <button className="inline-flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles récents */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <FileText className="w-8 h-8 text-[#0891B2]" />
            Articles Récents
          </h2>
          
          <div className="space-y-4">
            {recentArticles.map((article, index) => (
              <article 
                key={index}
                className="bg-gray-50 rounded-xl p-5 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-[#0891B2] bg-cyan-100 px-2 py-1 rounded">
                        {article.source}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(article.date)}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {article.excerpt}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 hidden md:block" />
                </div>
              </article>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link
              href={`/${locale}/actualites`}
              className="inline-flex items-center gap-2 text-[#0891B2] font-semibold hover:underline"
            >
              Voir toutes les actualités
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Archives et abonnement */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Archives */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-white">
              <BookOpen className="w-12 h-12 mb-4 text-cyan-400" />
              <h3 className="text-xl font-bold mb-2">Archives</h3>
              <p className="text-gray-300 mb-6">
                Consultez les anciens numéros de nos publications. 
                Des décennies d&apos;histoire de l&apos;Église au Cameroun à portée de clic.
              </p>
              <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                <ExternalLink className="w-4 h-4" />
                Accéder aux archives
              </button>
            </div>
            
            {/* Abonnement */}
            <div className="bg-gradient-to-br from-[#0891B2] to-[#0e7490] rounded-2xl p-8 text-white">
              <Mail className="w-12 h-12 mb-4 text-cyan-200" />
              <h3 className="text-xl font-bold mb-2">Abonnement</h3>
              <p className="text-cyan-100 mb-6">
                Recevez nos publications directement chez vous. 
                Abonnez-vous à L&apos;Effort Camerounais ou au Bulletin Diocésain.
              </p>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#0891B2] font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact rédaction */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Contribuer à nos publications
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Vous avez une information à partager, un témoignage ou un article à proposer ? 
            Contactez notre équipe de rédaction.
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center px-6 py-3 bg-[#0891B2] text-white font-semibold rounded-lg hover:bg-[#0e7490] transition-colors"
          >
            <Mail className="w-5 h-5 mr-2" />
            Contacter la rédaction
          </Link>
        </div>
      </section>
    </div>
  );
}

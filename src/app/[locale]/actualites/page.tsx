'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { 
  Calendar,
  Clock,
  ChevronRight,
  Search,
  Filter,
  Tag,
  ArrowRight,
  Loader2,
  Newspaper,
  Eye
} from 'lucide-react';

interface NewsItem {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  publishedAt: string;
  createdAt: string;
  featured: boolean;
  views?: number;
}

const categories = [
  { id: 'all', name: 'Toutes', color: 'bg-gray-500' },
  { id: 'archeveque', name: 'Archevêque', color: 'bg-[#BE2722]' },
  { id: 'diocese', name: 'Diocèse', color: 'bg-blue-500' },
  { id: 'paroisses', name: 'Paroisses', color: 'bg-green-500' },
  { id: 'evenements', name: 'Événements', color: 'bg-purple-500' },
  { id: 'annonces', name: 'Annonces', color: 'bg-orange-500' }
];

export default function ActualitesPage() {
  const params = useParams();
  const locale = params?.locale as string || 'fr';
  
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        const response = await fetch('/api/news');
        if (response.ok) {
          const result = await response.json();
          // L'API retourne { data: [...] }
          setNews(Array.isArray(result) ? result : (result.data || []));
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  // Filter news based on search and category
  const filteredNews = news.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Featured news (first 3 featured or most recent)
  const featuredNews = news.filter(n => n.featured).slice(0, 3);
  const displayFeatured = featuredNews.length > 0 ? featuredNews : news.slice(0, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.color || 'bg-gray-500';
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.name || categoryId;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-[#BE2722] text-white py-16 md:py-20">
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
            <span>Actualités</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Toute l&apos;Actualité</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl">
            Restez informés des dernières nouvelles de l&apos;Archidiocèse de Yaoundé, 
            des événements paroissiaux et des annonces officielles.
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-6 bg-white shadow-sm sticky top-0 z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une actualité..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BE2722] focus:border-transparent outline-none"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-[#BE2722] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured News */}
      {selectedCategory === 'all' && searchQuery === '' && displayFeatured.length > 0 && (
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-[#BE2722]" />
              À la Une
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Featured */}
              {displayFeatured[0] && (
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden group">
                  <div className="relative h-64 md:h-80">
                    <Image
                      src={displayFeatured[0].image || '/images/placeholder-news.jpg'}
                      alt={displayFeatured[0].title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <span className={`inline-block px-3 py-1 ${getCategoryColor(displayFeatured[0].category)} text-xs font-medium rounded-full mb-3`}>
                        {getCategoryName(displayFeatured[0].category)}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold mb-2 line-clamp-2">
                        {displayFeatured[0].title}
                      </h3>
                      <p className="text-white/80 text-sm line-clamp-2 mb-3">
                        {displayFeatured[0].excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-white/70">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(displayFeatured[0].publishedAt || displayFeatured[0].createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/${locale}/actualites/${displayFeatured[0].slug || displayFeatured[0]._id}`}
                    className="block p-4 text-[#BE2722] font-semibold hover:bg-gray-50 flex items-center gap-2"
                  >
                    Lire la suite
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
              
              {/* Secondary Featured */}
              <div className="space-y-4">
                {displayFeatured.slice(1, 3).map((item) => (
                  <div key={item._id} className="bg-white rounded-xl shadow-md overflow-hidden group">
                    <div className="flex">
                      <div className="relative w-32 h-28 flex-shrink-0">
                        <Image
                          src={item.image || '/images/placeholder-news.jpg'}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 flex-1">
                        <span className={`inline-block px-2 py-0.5 ${getCategoryColor(item.category)} text-xs text-white font-medium rounded mb-2`}>
                          {getCategoryName(item.category)}
                        </span>
                        <h4 className="font-bold text-gray-900 text-sm line-clamp-2 mb-1">
                          {item.title}
                        </h4>
                        <span className="text-xs text-gray-500">
                          {formatDate(item.publishedAt || item.createdAt)}
                        </span>
                      </div>
                    </div>
                    <Link
                      href={`/${locale}/actualites/${item.slug || item._id}`}
                      className="block px-4 py-2 text-sm text-[#BE2722] font-medium hover:bg-gray-50 border-t"
                    >
                      Lire →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* News Grid */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {selectedCategory === 'all' ? 'Toutes les actualités' : getCategoryName(selectedCategory)}
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({filteredNews.length} article{filteredNews.length > 1 ? 's' : ''})
              </span>
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-[#BE2722] animate-spin" />
              <span className="ml-3 text-gray-600">Chargement des actualités...</span>
            </div>
          ) : paginatedNews.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl">
              <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">Aucune actualité trouvée</h3>
              <p className="text-gray-500">
                {searchQuery 
                  ? "Essayez avec d'autres termes de recherche"
                  : "Il n'y a pas encore d'actualité dans cette catégorie"
                }
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedNews.map((item) => (
                  <article key={item._id} className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={item.image || '/images/placeholder-news.jpg'}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`px-3 py-1 ${getCategoryColor(item.category)} text-xs text-white font-medium rounded-full`}>
                          {getCategoryName(item.category)}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(item.publishedAt || item.createdAt)}
                        </span>
                        {item.views && (
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {item.views}
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#BE2722] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                        {item.excerpt}
                      </p>
                      <Link
                        href={`/${locale}/actualites/${item.slug || item._id}`}
                        className="inline-flex items-center text-[#BE2722] font-semibold text-sm hover:underline"
                      >
                        Lire la suite
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-10">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Précédent
                  </button>
                  
                  <div className="flex gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-10 h-10 rounded-lg font-medium ${
                            currentPage === pageNum
                              ? 'bg-[#BE2722] text-white'
                              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Suivant
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-12 bg-[#BE2722] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ne manquez aucune actualité
          </h2>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            Inscrivez-vous à notre newsletter pour recevoir les dernières nouvelles 
            de l&apos;Archidiocèse directement dans votre boîte mail.
          </p>
          <Link
            href={`/${locale}/newsletter`}
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#BE2722] font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            S&apos;inscrire à la newsletter
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Search, Heart, Phone, Clock, ChevronRight, Users } from 'lucide-react';

interface Chaplaincy {
  _id: string;
  name: string;
  description: string;
  type?: string;
  chaplain?: string;
  chaplainPhone?: string;
  massSchedule?: string;
  slug?: string;
}

export default function AumoneriesPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'fr';
  const [chaplaincies, setChaplaincies] = useState<Chaplaincy[]>([]);
  const [filteredChaplaincies, setFilteredChaplaincies] = useState<Chaplaincy[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchChaplaincies();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = chaplaincies.filter(chaplaincy =>
        chaplaincy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chaplaincy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chaplaincy.type?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredChaplaincies(filtered);
    } else {
      setFilteredChaplaincies(chaplaincies);
    }
  }, [searchTerm, chaplaincies]);

  const fetchChaplaincies = async () => {
    try {
      const response = await fetch('/api/chaplaincies');
      const data = await response.json();
      if (data.success) {
        setChaplaincies(data.data);
        setFilteredChaplaincies(data.data);
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white py-16">
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-6 text-white/80">
            <Link href={`/${locale}`} className="hover:text-white">Accueil</Link>
            <ChevronRight className="inline w-4 h-4 mx-2" />
            <span>Aumôneries Diocésaines</span>
          </nav>
          <h1 className="text-4xl lg:text-5xl font-bold text-center">Aumôneries Diocésaines</h1>
          <p className="text-center mt-4 text-white/90 max-w-2xl mx-auto">
            Découvrez les différentes aumôneries au service des fidèles dans divers milieux de vie
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher une aumônerie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#8B5CF6] focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-[#8B5CF6] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredChaplaincies.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">Aucune aumônerie disponible</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChaplaincies.map((chaplaincy) => (
                <Link
                  key={chaplaincy._id}
                  href={`/${locale}/aumoneries/${chaplaincy.slug}`}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] rounded-xl flex items-center justify-center">
                      <Heart className="w-7 h-7 text-white" />
                    </div>
                    {chaplaincy.type && (
                      <span className="text-xs font-medium text-[#8B5CF6] bg-purple-50 px-3 py-1 rounded-full">
                        {chaplaincy.type}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#8B5CF6] transition-colors">
                    {chaplaincy.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {chaplaincy.description}
                  </p>

                  {chaplaincy.chaplain && (
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <Users className="w-4 h-4" />
                      <span>{chaplaincy.chaplain}</span>
                    </div>
                  )}
                  
                  <div className="mt-4 pt-4 border-t flex items-center justify-between">
                    <span className="text-[#8B5CF6] font-semibold text-sm">Voir les détails</span>
                    <ChevronRight className="w-5 h-5 text-[#8B5CF6] group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

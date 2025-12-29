'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Search, GraduationCap, Phone, Clock, ChevronRight, Users, BookOpen } from 'lucide-react';

interface University {
  _id: string;
  name: string;
  description: string;
  type?: string;
  chaplain?: string;
  chaplainPhone?: string;
  massSchedule?: string;
  activities?: string[];
  slug?: string;
}

export default function UniversitesPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'fr';
  const [universities, setUniversities] = useState<University[]>([]);
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUniversities();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = universities.filter(university =>
        university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        university.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        university.type?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUniversities(filtered);
    } else {
      setFilteredUniversities(universities);
    }
  }, [searchTerm, universities]);

  const fetchUniversities = async () => {
    try {
      const response = await fetch('/api/universities');
      const data = await response.json();
      if (data.success) {
        setUniversities(data.data);
        setFilteredUniversities(data.data);
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
      <section className="bg-gradient-to-r from-[#0891B2] to-[#0E7490] text-white py-16">
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-6 text-white/80">
            <Link href={`/${locale}`} className="hover:text-white">Accueil</Link>
            <ChevronRight className="inline w-4 h-4 mx-2" />
            <span>Universités & Grandes Écoles</span>
          </nav>
          <h1 className="text-4xl lg:text-5xl font-bold text-center">Universités & Grandes Écoles</h1>
          <p className="text-center mt-4 text-white/90 max-w-2xl mx-auto">
            Aumôneries universitaires accompagnant les étudiants dans leur vie de foi
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
              placeholder="Rechercher une université..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-[#0891B2] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredUniversities.length === 0 ? (
            <div className="text-center py-12">
              <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">Aucune université disponible</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUniversities.map((university) => (
                <Link
                  key={university._id}
                  href={`/${locale}/universites/${university.slug}`}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#0891B2] to-[#0E7490] rounded-xl flex items-center justify-center">
                      <GraduationCap className="w-7 h-7 text-white" />
                    </div>
                    {university.type && (
                      <span className="text-xs font-medium text-[#0891B2] bg-cyan-50 px-3 py-1 rounded-full">
                        {university.type}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#0891B2] transition-colors">
                    {university.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {university.description}
                  </p>

                  {university.chaplain && (
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <Users className="w-4 h-4" />
                      <span>{university.chaplain}</span>
                    </div>
                  )}

                  {university.activities && university.activities.length > 0 && (
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <BookOpen className="w-4 h-4" />
                      <span>{university.activities.length} activités</span>
                    </div>
                  )}
                  
                  <div className="mt-4 pt-4 border-t flex items-center justify-between">
                    <span className="text-[#0891B2] font-semibold text-sm">Voir les détails</span>
                    <ChevronRight className="w-5 h-5 text-[#0891B2] group-hover:translate-x-1 transition-transform" />
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

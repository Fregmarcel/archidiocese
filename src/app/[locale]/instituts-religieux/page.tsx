'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Search, Church, Phone, ChevronRight, Users, Calendar } from 'lucide-react';

interface ReligiousInstitute {
  _id: string;
  name: string;
  description: string;
  type?: string;
  gender?: string;
  superior?: string;
  superiorPhone?: string;
  foundedYear?: number;
  numberOfMembers?: number;
  charism?: string;
  slug?: string;
}

export default function InstitutsReligieuxPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'fr';
  const [institutes, setInstitutes] = useState<ReligiousInstitute[]>([]);
  const [filteredInstitutes, setFilteredInstitutes] = useState<ReligiousInstitute[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchInstitutes();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = institutes.filter(institute =>
        institute.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        institute.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        institute.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        institute.charism?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredInstitutes(filtered);
    } else {
      setFilteredInstitutes(institutes);
    }
  }, [searchTerm, institutes]);

  const fetchInstitutes = async () => {
    try {
      const response = await fetch('/api/religious-institutes');
      const data = await response.json();
      if (data.success) {
        setInstitutes(data.data);
        setFilteredInstitutes(data.data);
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getGenderLabel = (gender?: string) => {
    switch (gender) {
      case 'masculin': return 'Masculin';
      case 'feminin': return 'Féminin';
      case 'mixte': return 'Mixte';
      default: return gender;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#B45309] to-[#D97706] text-white py-16">
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-6 text-white/80">
            <Link href={`/${locale}`} className="hover:text-white">Accueil</Link>
            <ChevronRight className="inline w-4 h-4 mx-2" />
            <span>Instituts Religieux</span>
          </nav>
          <h1 className="text-4xl lg:text-5xl font-bold text-center">Instituts Religieux</h1>
          <p className="text-center mt-4 text-white/90 max-w-2xl mx-auto">
            Congrégations et instituts de vie consacrée présents dans l&apos;Archidiocèse
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
              placeholder="Rechercher un institut..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#B45309] focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-[#B45309] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredInstitutes.length === 0 ? (
            <div className="text-center py-12">
              <Church className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">Aucun institut disponible</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInstitutes.map((institute) => (
                <Link
                  key={institute._id}
                  href={`/${locale}/instituts-religieux/${institute.slug}`}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#B45309] to-[#D97706] rounded-xl flex items-center justify-center">
                      <Church className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {institute.type && (
                        <span className="text-xs font-medium text-[#B45309] bg-amber-50 px-3 py-1 rounded-full">
                          {institute.type}
                        </span>
                      )}
                      {institute.gender && (
                        <span className="text-xs text-gray-500">
                          {getGenderLabel(institute.gender)}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#B45309] transition-colors">
                    {institute.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {institute.description}
                  </p>

                  <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-4">
                    {institute.foundedYear && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Fondé en {institute.foundedYear}</span>
                      </div>
                    )}
                    {institute.numberOfMembers && (
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{institute.numberOfMembers} membres</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t flex items-center justify-between">
                    <span className="text-[#B45309] font-semibold text-sm">Voir les détails</span>
                    <ChevronRight className="w-5 h-5 text-[#B45309] group-hover:translate-x-1 transition-transform" />
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

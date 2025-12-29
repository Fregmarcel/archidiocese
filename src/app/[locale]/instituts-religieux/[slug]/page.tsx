'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChevronRight, Church, Phone, Mail, MapPin, ArrowLeft, Users, Calendar, Sparkles } from 'lucide-react';

interface ReligiousInstitute {
  _id: string;
  name: string;
  description: string;
  type?: string;
  gender?: string;
  superior?: string;
  superiorPhone?: string;
  superiorEmail?: string;
  address?: string;
  foundedYear?: number;
  numberOfMembers?: number;
  charism?: string;
}

export default function InstituteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const routeParams = useParams();
  const locale = (routeParams?.locale as string) || 'fr';
  const [institute, setInstitute] = useState<ReligiousInstitute | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInstitute = async () => {
      try {
        const response = await fetch(`/api/religious-institutes?slug=${slug}`);
        const data = await response.json();
        
        if (data.success) {
          setInstitute(data.data);
        }
      } catch (error) {
        console.error('Erreur lors du chargement de l\'institut:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstitute();
  }, [slug]);

  const getGenderLabel = (gender?: string) => {
    switch (gender) {
      case 'masculin': return 'Institut masculin';
      case 'feminin': return 'Institut féminin';
      case 'mixte': return 'Institut mixte';
      default: return gender;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-[#B45309] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!institute) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Church className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Institut introuvable</h2>
          <p className="text-gray-600 mb-6">Cet institut n&apos;existe pas ou a été supprimé</p>
          <Link
            href={`/${locale}/instituts-religieux`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#B45309] text-white rounded-lg hover:bg-[#D97706] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux instituts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#B45309] to-[#D97706] text-white py-16">
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-6 text-white/80">
            <Link href={`/${locale}`} className="hover:text-white">Accueil</Link>
            <ChevronRight className="inline w-4 h-4 mx-2" />
            <Link href={`/${locale}/instituts-religieux`} className="hover:text-white">Instituts Religieux</Link>
            <ChevronRight className="inline w-4 h-4 mx-2" />
            <span>{institute.name}</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <Link
              href={`/${locale}/instituts-religieux`}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
              Retour
            </Link>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold">{institute.name}</h1>
          <div className="flex flex-wrap gap-3 mt-4">
            {institute.type && (
              <span className="text-sm font-medium bg-white/20 px-4 py-2 rounded-full">
                {institute.type}
              </span>
            )}
            {institute.gender && (
              <span className="text-sm font-medium bg-white/20 px-4 py-2 rounded-full">
                {getGenderLabel(institute.gender)}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Présentation</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {institute.description}
                </p>
              </div>

              {/* Charism */}
              {institute.charism && (
                <div className="bg-white rounded-xl shadow-md p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#B45309]" />
                    Charisme
                  </h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {institute.charism}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Info Card */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Informations</h3>
                <div className="space-y-4">
                  {institute.foundedYear && (
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Calendar className="w-4 h-4 text-[#B45309]" />
                        <span className="text-sm font-medium">Année de fondation</span>
                      </div>
                      <p className="text-gray-900 font-semibold">{institute.foundedYear}</p>
                    </div>
                  )}
                  {institute.numberOfMembers && (
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Users className="w-4 h-4 text-[#B45309]" />
                        <span className="text-sm font-medium">Nombre de membres</span>
                      </div>
                      <p className="text-gray-900 font-semibold">{institute.numberOfMembers}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Contact</h3>
                <div className="space-y-4">
                  {institute.superior && (
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Users className="w-4 h-4 text-[#B45309]" />
                        <span className="text-sm font-medium">Supérieur(e)</span>
                      </div>
                      <p className="text-gray-900 font-semibold">{institute.superior}</p>
                    </div>
                  )}
                  {institute.superiorPhone && (
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Phone className="w-4 h-4 text-[#B45309]" />
                        <span className="text-sm font-medium">Téléphone</span>
                      </div>
                      <a href={`tel:${institute.superiorPhone}`} className="text-gray-900 hover:text-[#B45309]">
                        {institute.superiorPhone}
                      </a>
                    </div>
                  )}
                  {institute.superiorEmail && (
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Mail className="w-4 h-4 text-[#B45309]" />
                        <span className="text-sm font-medium">Email</span>
                      </div>
                      <a href={`mailto:${institute.superiorEmail}`} className="text-gray-900 hover:text-[#B45309] break-all">
                        {institute.superiorEmail}
                      </a>
                    </div>
                  )}
                  {institute.address && (
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <MapPin className="w-4 h-4 text-[#B45309]" />
                        <span className="text-sm font-medium">Adresse</span>
                      </div>
                      <p className="text-gray-900">{institute.address}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChevronRight, GraduationCap, Phone, Mail, MapPin, Clock, ArrowLeft, Users, BookOpen, CheckCircle } from 'lucide-react';

interface University {
  _id: string;
  name: string;
  description: string;
  type?: string;
  chaplain?: string;
  chaplainPhone?: string;
  chaplainEmail?: string;
  address?: string;
  massSchedule?: string;
  activities?: string[];
}

export default function UniversityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const routeParams = useParams();
  const locale = (routeParams?.locale as string) || 'fr';
  const [university, setUniversity] = useState<University | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        const response = await fetch(`/api/universities?slug=${slug}`);
        const data = await response.json();
        
        if (data.success) {
          setUniversity(data.data);
        }
      } catch (error) {
        console.error('Erreur lors du chargement de l\'université:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUniversity();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-[#0891B2] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!university) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Université introuvable</h2>
          <p className="text-gray-600 mb-6">Cette université n&apos;existe pas ou a été supprimée</p>
          <Link
            href={`/${locale}/universites`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0891B2] text-white rounded-lg hover:bg-[#0E7490] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux universités
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#0891B2] to-[#0E7490] text-white py-16">
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-6 text-white/80">
            <Link href={`/${locale}`} className="hover:text-white">Accueil</Link>
            <ChevronRight className="inline w-4 h-4 mx-2" />
            <Link href={`/${locale}/universites`} className="hover:text-white">Universités</Link>
            <ChevronRight className="inline w-4 h-4 mx-2" />
            <span>{university.name}</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <Link
              href={`/${locale}/universites`}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
              Retour
            </Link>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold">{university.name}</h1>
          {university.type && (
            <span className="inline-block mt-4 text-sm font-medium bg-white/20 px-4 py-2 rounded-full">
              {university.type}
            </span>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {university.description}
                </p>
              </div>

              {/* Activities */}
              {university.activities && university.activities.length > 0 && (
                <div className="bg-white rounded-xl shadow-md p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#0891B2]" />
                    Activités
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {university.activities.map((activity, index) => (
                      <div key={index} className="flex items-center gap-2 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-[#0891B2]" />
                        <span>{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Contact</h3>
                <div className="space-y-4">
                  {university.chaplain && (
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Users className="w-4 h-4 text-[#0891B2]" />
                        <span className="text-sm font-medium">Aumônier</span>
                      </div>
                      <p className="text-gray-900 font-semibold">{university.chaplain}</p>
                    </div>
                  )}
                  {university.chaplainPhone && (
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Phone className="w-4 h-4 text-[#0891B2]" />
                        <span className="text-sm font-medium">Téléphone</span>
                      </div>
                      <a href={`tel:${university.chaplainPhone}`} className="text-gray-900 hover:text-[#0891B2]">
                        {university.chaplainPhone}
                      </a>
                    </div>
                  )}
                  {university.chaplainEmail && (
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Mail className="w-4 h-4 text-[#0891B2]" />
                        <span className="text-sm font-medium">Email</span>
                      </div>
                      <a href={`mailto:${university.chaplainEmail}`} className="text-gray-900 hover:text-[#0891B2] break-all">
                        {university.chaplainEmail}
                      </a>
                    </div>
                  )}
                  {university.address && (
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <MapPin className="w-4 h-4 text-[#0891B2]" />
                        <span className="text-sm font-medium">Adresse</span>
                      </div>
                      <p className="text-gray-900">{university.address}</p>
                    </div>
                  )}
                  {university.massSchedule && (
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Clock className="w-4 h-4 text-[#0891B2]" />
                        <span className="text-sm font-medium">Horaires des messes</span>
                      </div>
                      <p className="text-gray-900 whitespace-pre-line">{university.massSchedule}</p>
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

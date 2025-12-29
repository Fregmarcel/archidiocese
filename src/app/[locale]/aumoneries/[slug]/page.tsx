'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChevronRight, Heart, Phone, Mail, MapPin, Clock, ArrowLeft, Users } from 'lucide-react';

interface Chaplaincy {
  _id: string;
  name: string;
  description: string;
  type?: string;
  chaplain?: string;
  chaplainPhone?: string;
  chaplainEmail?: string;
  address?: string;
  massSchedule?: string;
}

export default function ChaplaincyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const routeParams = useParams();
  const locale = (routeParams?.locale as string) || 'fr';
  const [chaplaincy, setChaplaincy] = useState<Chaplaincy | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChaplaincy = async () => {
      try {
        const response = await fetch(`/api/chaplaincies?slug=${slug}`);
        const data = await response.json();
        
        if (data.success) {
          setChaplaincy(data.data);
        }
      } catch (error) {
        console.error('Erreur lors du chargement de l\'aumônerie:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChaplaincy();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-[#8B5CF6] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!chaplaincy) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Aumônerie introuvable</h2>
          <p className="text-gray-600 mb-6">Cette aumônerie n&apos;existe pas ou a été supprimée</p>
          <Link
            href={`/${locale}/aumoneries`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7C3AED] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux aumôneries
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white py-16">
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-6 text-white/80">
            <Link href={`/${locale}`} className="hover:text-white">Accueil</Link>
            <ChevronRight className="inline w-4 h-4 mx-2" />
            <Link href={`/${locale}/aumoneries`} className="hover:text-white">Aumôneries</Link>
            <ChevronRight className="inline w-4 h-4 mx-2" />
            <span>{chaplaincy.name}</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <Link
              href={`/${locale}/aumoneries`}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
              Retour
            </Link>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold">{chaplaincy.name}</h1>
          {chaplaincy.type && (
            <span className="inline-block mt-4 text-sm font-medium bg-white/20 px-4 py-2 rounded-full">
              {chaplaincy.type}
            </span>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {chaplaincy.description}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Contact</h3>
                <div className="space-y-4">
                  {chaplaincy.chaplain && (
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Users className="w-4 h-4 text-[#8B5CF6]" />
                        <span className="text-sm font-medium">Aumônier</span>
                      </div>
                      <p className="text-gray-900 font-semibold">{chaplaincy.chaplain}</p>
                    </div>
                  )}
                  {chaplaincy.chaplainPhone && (
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Phone className="w-4 h-4 text-[#8B5CF6]" />
                        <span className="text-sm font-medium">Téléphone</span>
                      </div>
                      <a href={`tel:${chaplaincy.chaplainPhone}`} className="text-gray-900 hover:text-[#8B5CF6]">
                        {chaplaincy.chaplainPhone}
                      </a>
                    </div>
                  )}
                  {chaplaincy.chaplainEmail && (
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Mail className="w-4 h-4 text-[#8B5CF6]" />
                        <span className="text-sm font-medium">Email</span>
                      </div>
                      <a href={`mailto:${chaplaincy.chaplainEmail}`} className="text-gray-900 hover:text-[#8B5CF6] break-all">
                        {chaplaincy.chaplainEmail}
                      </a>
                    </div>
                  )}
                  {chaplaincy.address && (
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <MapPin className="w-4 h-4 text-[#8B5CF6]" />
                        <span className="text-sm font-medium">Adresse</span>
                      </div>
                      <p className="text-gray-900">{chaplaincy.address}</p>
                    </div>
                  )}
                  {chaplaincy.massSchedule && (
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Clock className="w-4 h-4 text-[#8B5CF6]" />
                        <span className="text-sm font-medium">Horaires des messes</span>
                      </div>
                      <p className="text-gray-900 whitespace-pre-line">{chaplaincy.massSchedule}</p>
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

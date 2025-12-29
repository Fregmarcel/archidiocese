'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChevronRight, Users, Phone, Mail, MapPin, Clock, ArrowLeft } from 'lucide-react';

interface DiocesanService {
  _id: string;
  name: string;
  description: string;
  category?: string;
  coordinator?: string;
  coordinatorPhone?: string;
  coordinatorEmail?: string;
  address?: string;
  schedule?: string;
  leaders?: Array<{
    name: string;
    role: string;
    phone?: string;
    email?: string;
  }>;
}

export default function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const routeParams = useParams();
  const locale = (routeParams?.locale as string) || 'fr';
  const [service, setService] = useState<DiocesanService | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`/api/diocesan-services?slug=${slug}`);
        const data = await response.json();
        
        if (data.success) {
          setService(data.data);
        }
      } catch (error) {
        console.error('Erreur lors du chargement du service:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchService();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-[#2E9B51] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Service introuvable</h2>
          <p className="text-gray-600 mb-6">Ce service n&apos;existe pas ou a été supprimé</p>
          <Link
            href={`/${locale}/services-diocesains`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#2E9B51] text-white rounded-lg hover:bg-[#059669] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#2E9B51] to-[#059669] text-white py-16">
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-6 text-white/80">
            <Link href={`/${locale}`} className="hover:text-white">Accueil</Link>
            <ChevronRight className="inline w-4 h-4 mx-2" />
            <Link href={`/${locale}/services-diocesains`} className="hover:text-white">Services Diocésains</Link>
            <ChevronRight className="inline w-4 h-4 mx-2" />
            <span>{service.name}</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <Link
              href={`/${locale}/services-diocesains`}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
              Retour
            </Link>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold">{service.name}</h1>
          {service.category && (
            <span className="inline-block mt-4 text-sm font-medium bg-white/20 px-4 py-2 rounded-full">
              {service.category}
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
                  {service.description}
                </p>

                {service.leaders && service.leaders.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Équipe</h3>
                    <div className="space-y-4">
                      {service.leaders.map((leader, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                          <div className="font-semibold text-gray-900">{leader.name}</div>
                          <div className="text-sm text-gray-600">{leader.role}</div>
                          {leader.phone && (
                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                              <Phone className="w-4 h-4" />
                              <span>{leader.phone}</span>
                            </div>
                          )}
                          {leader.email && (
                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                              <Mail className="w-4 h-4" />
                              <a href={`mailto:${leader.email}`} className="hover:text-[#2E9B51]">
                                {leader.email}
                              </a>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Contact</h3>
                <div className="space-y-4">
                  {service.coordinator && (
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Users className="w-4 h-4 text-[#2E9B51]" />
                        <span className="text-sm font-medium">Coordinateur</span>
                      </div>
                      <p className="text-gray-900 font-semibold">{service.coordinator}</p>
                    </div>
                  )}
                  {service.coordinatorPhone && (
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Phone className="w-4 h-4 text-[#2E9B51]" />
                        <span className="text-sm font-medium">Téléphone</span>
                      </div>
                      <a href={`tel:${service.coordinatorPhone}`} className="text-gray-900 hover:text-[#2E9B51]">
                        {service.coordinatorPhone}
                      </a>
                    </div>
                  )}
                  {service.coordinatorEmail && (
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Mail className="w-4 h-4 text-[#2E9B51]" />
                        <span className="text-sm font-medium">Email</span>
                      </div>
                      <a href={`mailto:${service.coordinatorEmail}`} className="text-gray-900 hover:text-[#2E9B51] break-all">
                        {service.coordinatorEmail}
                      </a>
                    </div>
                  )}
                  {service.address && (
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <MapPin className="w-4 h-4 text-[#2E9B51]" />
                        <span className="text-sm font-medium">Adresse</span>
                      </div>
                      <p className="text-gray-900">{service.address}</p>
                    </div>
                  )}
                  {service.schedule && (
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Clock className="w-4 h-4 text-[#2E9B51]" />
                        <span className="text-sm font-medium">Horaires</span>
                      </div>
                      <p className="text-gray-900">{service.schedule}</p>
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

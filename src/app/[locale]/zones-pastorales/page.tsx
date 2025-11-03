"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Search, MapPin, Users, Phone, Mail } from 'lucide-react';
import ParishesModal from '@/components/modals/ParishesModal';

interface PastoralZone {
  _id: string;
  name: string;
  description: string;
  numberOfParishes: number;
  coordinator?: string;
  coordinatorPhone?: string;
  coordinatorEmail?: string;
  address?: string;
}

export default function ZonesPastoralesPage() {
  const params = useParams<{ locale: string }>();
  const locale = (params?.locale as string) || 'fr';
  const [zones, setZones] = useState<PastoralZone[]>([]);
  const [filteredZones, setFilteredZones] = useState<PastoralZone[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedZone, setSelectedZone] = useState<PastoralZone | null>(null);
  const [isParishesModalOpen, setIsParishesModalOpen] = useState(false);

  useEffect(() => {
    fetchZones();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = zones.filter(zone =>
        zone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        zone.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        zone.coordinator?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredZones(filtered);
    } else {
      setFilteredZones(zones);
    }
  }, [searchTerm, zones]);

  const fetchZones = async () => {
    try {
      const response = await fetch('/api/pastoral-zones');
      const data = await response.json();
      
      if (data.success) {
        setZones(data.data);
        setFilteredZones(data.data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des zones pastorales:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleZoneClick = (zone: PastoralZone) => {
    setSelectedZone(zone);
    setIsParishesModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-[#BE2722] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Zones Pastorales & Paroisses
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Consultez les paroisses organisées par zones pastorales
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="bg-white py-8 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher une zone pastorale..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BE2722] focus:border-transparent text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Zones Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-md animate-pulse">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : filteredZones.length === 0 ? (
            <div className="text-center py-16">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {searchTerm ? 'Aucune zone trouvée' : 'Aucune zone pastorale'}
              </h3>
              <p className="text-gray-500">
                {searchTerm 
                  ? 'Essayez avec un autre terme de recherche'
                  : 'Les zones pastorales seront bientôt disponibles'
                }
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <p className="text-gray-600">
                  {filteredZones.length} zone{filteredZones.length > 1 ? 's' : ''} pastorale{filteredZones.length > 1 ? 's' : ''} trouvée{filteredZones.length > 1 ? 's' : ''}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredZones.map((zone) => (
                  <div
                    key={zone._id}
                    onClick={() => handleZoneClick(zone)}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer group border border-gray-200 hover:border-[#BE2722]"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#BE2722] transition-colors mb-2">
                          {zone.name}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-3">
                          {zone.description}
                        </p>
                      </div>
                      <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="text-[#BE2722]">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Users className="w-4 h-4" />
                        <span>{zone.numberOfParishes} paroisse{zone.numberOfParishes > 1 ? 's' : ''}</span>
                      </div>
                      
                      {zone.coordinator && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span className="font-medium">Coordinateur:</span>
                          <span>{zone.coordinator}</span>
                        </div>
                      )}
                      
                      {zone.coordinatorPhone && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Phone className="w-4 h-4" />
                          <span>{zone.coordinatorPhone}</span>
                        </div>
                      )}
                      
                      {zone.coordinatorEmail && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Mail className="w-4 h-4" />
                          <span>{zone.coordinatorEmail}</span>
                        </div>
                      )}
                      
                      {zone.address && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <MapPin className="w-4 h-4" />
                          <span>{zone.address}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="text-[#BE2722] text-sm font-medium group-hover:text-[#a51f1a] transition-colors">
                        Voir les paroisses →
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Parishes Modal */}
      {selectedZone && (
        <ParishesModal
          isOpen={isParishesModalOpen}
          onClose={() => {
            setIsParishesModalOpen(false);
            setSelectedZone(null);
          }}
          zoneId={selectedZone._id}
          zoneName={selectedZone.name}
          locale={locale}
        />
      )}
    </main>
  );
}

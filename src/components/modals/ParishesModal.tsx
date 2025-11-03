"use client";

import { useState, useEffect } from 'react';
import { Search, X, MapPin, Phone, Mail, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface Parish {
  _id: string;
  name: string;
  description: string;
  address: string;
  pastor?: string;
  phone?: string;
  email?: string;
  staff?: { name: string; role: string; congregation?: string; notes?: string }[];
}

interface ParishesModalProps {
  isOpen: boolean;
  onClose: () => void;
  zoneId: string;
  zoneName: string;
  locale: string;
}

export default function ParishesModal({ isOpen, onClose, zoneId, zoneName, locale }: ParishesModalProps) {
  const [parishes, setParishes] = useState<Parish[]>([]);
  const [filteredParishes, setFilteredParishes] = useState<Parish[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isOpen && zoneId) {
      fetchParishes();
    }
  }, [isOpen, zoneId]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = parishes.filter(parish =>
        parish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        parish.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        parish.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredParishes(filtered);
    } else {
      setFilteredParishes(parishes);
    }
  }, [searchTerm, parishes]);

  const fetchParishes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/pastoral-zones/${zoneId}/parishes`);
      const data = await response.json();
      
      if (data.success) {
        setParishes(data.data);
        setFilteredParishes(data.data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des paroisses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleParishClick = (parishId: string) => {
    router.push(`/${locale}/paroisses/hub/${parishId}`);
    onClose();
  };

  const handleClose = () => {
    onClose();
    setSearchTerm('');
    setParishes([]);
    setFilteredParishes([]);
  };

  const getLeader = (p: Parish) => {
    const leader = (p.staff || []).find(s => /Curé|Administrateur|Recteur|Directeur/i.test(s.role));
    return leader?.name || p.pastor;
  };

  const getVicars = (p: Parish) => (p.staff || []).filter(s => /Vicaire/i.test(s.role)).map(v => v.name);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={handleClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-[#BE2722] text-white">
                <div>
                  <h2 className="text-xl font-bold">
                    Paroisses de {zoneName}
                  </h2>
                  <p className="text-white/90 text-sm">
                    {filteredParishes.length} paroisse{filteredParishes.length > 1 ? 's' : ''} trouvée{filteredParishes.length > 1 ? 's' : ''}
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search */}
              <div className="p-6 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Rechercher une paroisse..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BE2722] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-96">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#BE2722]"></div>
                  </div>
                ) : filteredParishes.length === 0 ? (
                  <div className="text-center py-12">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      {searchTerm ? 'Aucune paroisse trouvée pour cette recherche' : 'Aucune paroisse trouvée dans cette zone'}
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {filteredParishes.map((parish) => (
                      <div
                        key={parish._id}
                        onClick={() => handleParishClick(parish._id)}
                        className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-[#BE2722] transition-colors cursor-pointer group"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 group-hover:text-[#BE2722] transition-colors">
                              {parish.name}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {parish.description}
                            </p>
                            
                            <div className="mt-3 space-y-1">
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <MapPin className="w-4 h-4" />
                                <span>{parish.address}</span>
                              </div>
                              
                              {(getLeader(parish)) && (
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <Users className="w-4 h-4" />
                                  <span className="font-medium">Responsable:</span>
                                  <span>{getLeader(parish)}</span>
                                </div>
                              )}
                              
                              {getVicars(parish).length > 0 && (
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <span className="font-medium">Vicaire(s):</span>
                                  <span>{getVicars(parish).join(', ')}</span>
                                </div>
                              )}
                              
                              {parish.phone && (
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <Phone className="w-4 h-4" />
                                  <span>{parish.phone}</span>
                                </div>
                              )}
                              
                              {parish.email && (
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <Mail className="w-4 h-4" />
                                  <span>{parish.email}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="text-[#BE2722]">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Radio, Calendar, Search } from 'lucide-react';
import RadioShowCard from '@/components/radio/RadioShowCard';

interface RadioShow {
  _id: string;
  title: string;
  description: string;
  type: 'live' | 'recorded';
  category: 'messe' | 'predication' | 'magazine' | 'temoignage' | 'autre';
  duration: string;
  imageUrl?: string;
  audioUrl?: string;
  host: string;
  recordedAt?: Date;
  broadcastDate: Date;
  tags: string[];
  listenCount: number;
  isLive: boolean;
}

export default function RadioPage() {
  const [shows, setShows] = useState<RadioShow[]>([]);
  const [filteredShows, setFilteredShows] = useState<RadioShow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);

  const categories = [
    { key: 'all', label: 'Toutes les émissions' },
    { key: 'messe', label: 'Messes' },
    { key: 'predication', label: 'Prédications' },
    { key: 'magazine', label: 'Magazines' },
    { key: 'temoignage', label: 'Témoignages' },
    { key: 'autre', label: 'Autres' }
  ];

  useEffect(() => {
    fetchShows();
  }, []);

  useEffect(() => {
    filterShows();
  }, [shows, selectedCategory, searchTerm]);

  const fetchShows = async () => {
    try {
      const response = await fetch('/api/radio-shows');
      if (response.ok) {
        const data = await response.json();
        setShows(data.shows || []);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des émissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterShows = () => {
    let filtered = [...shows];

    // Filtrer par catégorie
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(show => show.category === selectedCategory);
    }

    // Filtrer par terme de recherche
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(show => 
        show.title.toLowerCase().includes(searchLower) ||
        show.description.toLowerCase().includes(searchLower) ||
        show.host.toLowerCase().includes(searchLower) ||
        show.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    setFilteredShows(filtered);
  };

  const handlePlayShow = (show: RadioShow) => {
    if (show.audioUrl) {
      setCurrentAudio(show.audioUrl);
      console.log('Lecture de:', show.title);
    } else {
      alert('Audio non disponible pour cette émission');
    }
  };

  const isLiveActive = shows.some(show => show.isLive);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="flex justify-center items-center gap-3 mb-4">
              <Radio className="w-12 h-12" />
              <h1 className="text-4xl md:text-5xl font-bold">Radio Diocésaine</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Écoutez les messes, prédications et programmes spirituels de l'Archidiocèse de Yaoundé
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Section Direct */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            Direct
          </h2>
          
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            {isLiveActive ? (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-red-500 rounded-full mx-auto flex items-center justify-center">
                  <Radio className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Émission en cours
                </h3>
                <p className="text-gray-600">
                  Une émission est actuellement diffusée en direct
                </p>
                <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors">
                  Écouter le direct
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto flex items-center justify-center">
                  <Radio className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700">
                  Aucun direct pour le moment
                </h3>
                <p className="text-gray-500">
                  Consultez notre programme ou écoutez nos rediffusions
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Filtres et Recherche */}
        <div className="mb-8 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher une émission..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full lg:w-80"
            />
          </div>
        </div>

        {/* Section Rediffusions */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            Rediffusions audio ({filteredShows.length})
          </h2>

          {filteredShows.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Aucune émission trouvée
              </h3>
              <p className="text-gray-500">
                Essayez de modifier vos critères de recherche ou de filtrage
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredShows.map((show) => (
                <RadioShowCard
                  key={show._id}
                  title={show.title}
                  description={show.description}
                  duration={show.duration}
                  imageUrl={show.imageUrl}
                  host={show.host}
                  date={show.broadcastDate}
                  onPlay={() => handlePlayShow(show)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

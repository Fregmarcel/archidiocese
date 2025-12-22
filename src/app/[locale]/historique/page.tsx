"use client";
import { useEffect, useState } from "react";
import { 
  Calendar, 
  Users, 
  Church, 
  MapPin, 
  Globe, 
  TrendingUp,
  BookOpen,
  Award,
  Building
} from "lucide-react";

interface HistoryData {
  missionPresence: string;
  apostolicVicariate: string;
  archdiocesisErection: string;
  baptizedCatholics: number;
  nonCatholicChristians: number;
  muslims: number;
  totalPopulation: number;
  diocesanPriests: number;
  catechists: number;
  geographicSituation: string;
  strategicSituation: string;
  spokenLanguages: string;
  migrationIssue: string;
  landHeritage: string;
  infrastructures: string;
  conclusion: string;
}

export default function HistoriquePage({ params }: { params: Promise<{ locale: string }> }) {
  const [historyData, setHistoryData] = useState<HistoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [locale, setLocale] = useState<string>("");

  useEffect(() => {
    params.then(p => setLocale(p.locale));
  }, [params]);

  useEffect(() => {
    if (!locale) return;
    
    const fetchHistoryData = async () => {
      try {
        const response = await fetch(`/api/history/${locale}`);
        if (response.ok) {
          const result = await response.json();
          if (result.doc) {
            setHistoryData(result.doc);
            return;
          }
        } else {
          console.error('API history response not OK:', response.status);
        }

        // Fallback: if no data for current locale, try French default
        if (locale !== 'fr') {
          const frResp = await fetch(`/api/history/fr`);
          if (frResp.ok) {
            const frResult = await frResp.json();
            if (frResult.doc) {
              setHistoryData(frResult.doc);
              return;
            }
          }
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données historiques:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoryData();
  }, [locale]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <p className="text-gray-600">Chargement...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!historyData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <p className="text-gray-600">Aucune donnée disponible</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#BE2722] to-[#9d1f1b] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            L'Archidiocèse de Yaoundé
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            Ses Ressources, Ses Défis et Son Plan Pastoral
          </p>
        </div>
      </div>

      {/* Section I - Présentation Générale */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          Présentation Générale
        </h2>

        {/* Dates clés */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#BE2722]">
            <Calendar className="w-12 h-12 text-[#BE2722] mb-4" />
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              Présence missionnaire
            </h3>
            <p className="text-3xl font-bold text-[#BE2722]">{historyData.missionPresence}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#BE2722]">
            <Church className="w-12 h-12 text-[#BE2722] mb-4" />
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              Vicariat Apostolique
            </h3>
            <p className="text-3xl font-bold text-[#BE2722]">{historyData.apostolicVicariate}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#BE2722]">
            <Award className="w-12 h-12 text-[#BE2722] mb-4" />
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              Érection en Archidiocèse
            </h3>
            <p className="text-2xl font-bold text-[#BE2722]">{historyData.archdiocesisErection}</p>
          </div>
        </div>

        {/* Statistiques */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h3 className="text-2xl font-bold text-neutral-900 mb-6">
            Données Sociodémographiques
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <Users className="w-10 h-10 text-[#BE2722] mx-auto mb-2" />
              <p className="text-3xl font-bold text-neutral-900">
                {historyData.baptizedCatholics.toLocaleString()}
              </p>
              <p className="text-sm text-neutral-600">Catholiques baptisés</p>
            </div>
            <div className="text-center">
              <Users className="w-10 h-10 text-neutral-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-neutral-900">
                {historyData.nonCatholicChristians.toLocaleString()}
              </p>
              <p className="text-sm text-neutral-600">Chrétiens non-catholiques</p>
            </div>
            <div className="text-center">
              <Users className="w-10 h-10 text-neutral-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-neutral-900">
                {historyData.muslims.toLocaleString()}
              </p>
              <p className="text-sm text-neutral-600">Musulmans</p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-10 h-10 text-[#2E9B51] mx-auto mb-2" />
              <p className="text-3xl font-bold text-neutral-900">
                {historyData.totalPopulation.toLocaleString()}
              </p>
              <p className="text-sm text-neutral-600">Population totale</p>
            </div>
          </div>
        </div>

        {/* Présence missionnaire */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h3 className="text-2xl font-bold text-neutral-900 mb-6">
            Présence Missionnaire
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 p-4 bg-neutral-50 rounded-lg">
              <Church className="w-12 h-12 text-[#BE2722]" />
              <div>
                <p className="text-2xl font-bold text-neutral-900">{historyData.diocesanPriests}</p>
                <p className="text-sm text-neutral-600">Prêtres diocésains</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-neutral-50 rounded-lg">
              <BookOpen className="w-12 h-12 text-[#BE2722]" />
              <div>
                <p className="text-2xl font-bold text-neutral-900">{historyData.catechists.toLocaleString()}</p>
                <p className="text-sm text-neutral-600">Catéchistes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Situation géographique */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-8 h-8 text-[#BE2722]" />
            <h3 className="text-2xl font-bold text-neutral-900">Situation Géographique</h3>
          </div>
          <p className="text-neutral-700 leading-relaxed">{historyData.geographicSituation}</p>
        </div>

        {/* Situation stratégique */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Building className="w-8 h-8 text-[#BE2722]" />
            <h3 className="text-2xl font-bold text-neutral-900">Situation Stratégique</h3>
          </div>
          <p className="text-neutral-700 leading-relaxed">{historyData.strategicSituation}</p>
        </div>

        {/* Langues parlées */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-8 h-8 text-[#BE2722]" />
            <h3 className="text-2xl font-bold text-neutral-900">Langues Parlées</h3>
          </div>
          <p className="text-neutral-700 leading-relaxed">{historyData.spokenLanguages}</p>
        </div>

        {/* Question migratoire */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-[#BE2722]" />
            <h3 className="text-2xl font-bold text-neutral-900">Question Migratoire</h3>
          </div>
          <p className="text-neutral-700 leading-relaxed">{historyData.migrationIssue}</p>
        </div>

        {/* Patrimoine */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h3 className="text-2xl font-bold text-neutral-900 mb-6">Le Patrimoine</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-neutral-900 mb-2">Foncier</h4>
              <p className="text-neutral-700">{historyData.landHeritage}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-neutral-900 mb-2">Infrastructurel</h4>
              <p className="text-neutral-700">{historyData.infrastructures}</p>
            </div>
          </div>
        </div>

        {/* Conclusion */}
        {historyData.conclusion && (
          <div className="bg-gradient-to-r from-[#BE2722]/5 to-[#2E9B51]/5 rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">Conclusion</h3>
            <p className="text-neutral-700 leading-relaxed italic text-lg">
              {historyData.conclusion}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
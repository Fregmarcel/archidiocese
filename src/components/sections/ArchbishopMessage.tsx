"use client";
import { useState, useEffect } from "react";
import { BookOpen, GraduationCap, Award, ChevronDown, ChevronUp } from "lucide-react";

type Props = { locale: string };

interface ArchbishopData {
  name: string;
  title: string;
  description: string;
  portraitUrl: string;
  publications: string[];
  bibliographyRich?: string;
}

export default function ArchbishopMessage({ locale }: Props) {
  const [activeTab, setActiveTab] = useState<"description" | "biographie" | "publications" | null>(null);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    primaire: false,
    secondaire: false,
    universitaire: false,
    parcours: false,
    distinctions: false
  });
  const [archbishopData, setArchbishopData] = useState<ArchbishopData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArchbishopData = async () => {
      try {
        const response = await fetch(`/api/archbishop/${locale}`);
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            setArchbishopData(result.data);
          }
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données de l\'archevêque:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArchbishopData();
  }, [locale]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Données par défaut si l'API ne répond pas
  const defaultData = {
    name: "Mgr Jean MBARGA",
    title: "Archevêque Métropolitain de Yaoundé",
    description: "Pasteur dévoué et théologien reconnu...",
    portraitUrl: "/images/archbishop.jpg",
    publications: []
  };

  const data = archbishopData || defaultData;

  if (loading) {
    return (
      <section className="bg-gradient-to-b from-white to-neutral-50">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center">
            <p className="text-gray-600">Chargement...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-b from-white to-neutral-50">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* En-tête avec photo */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Photo */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-xl border-4 border-white">
                <img
                  src={data.portraitUrl}
                  alt={`${data.name} - ${data.title}`}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Nom et titre toujours affichés sous la photo */}
              <div className="mt-4 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
                  {data.name}
                </h2>
                <p className="text-lg text-[#BE2722] font-semibold mt-1">
                  {data.title}
                </p>
              </div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-2">
            {/* Onglets */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setActiveTab("description")}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === "description"
                    ? "bg-[#BE2722] text-white shadow-md"
                    : "bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200"
                }`}
              >
                <Award className="w-5 h-5" />
                Présentation
              </button>
              <button
                onClick={() => setActiveTab("biographie")}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === "biographie"
                    ? "bg-[#BE2722] text-white shadow-md"
                    : "bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200"
                }`}
              >
                <GraduationCap className="w-5 h-5" />
                Biographie
              </button>
              <button
                onClick={() => setActiveTab("publications")}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === "publications"
                    ? "bg-[#BE2722] text-white shadow-md"
                    : "bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200"
                }`}
              >
                <BookOpen className="w-5 h-5" />
                Publications
              </button>
            </div>

            {/* Contenu des onglets */}
            {activeTab === null && (
              <div className="bg-white rounded-lg shadow-md border border-neutral-200 p-8">
                <div className="text-center">
                  <div className="max-w-2xl mx-auto">
                    <p className="text-lg text-neutral-600 italic mb-3">
                      « Ut Vitam habeant et abundantius habeant »
                    </p>
                    <p className="text-base text-neutral-500 mb-6">
                      « afin qu'ils aient la vie et qu'ils l'aient en abondance » (Jn 10,10)
                    </p>
                  </div>
                  <p className="text-neutral-600 mt-6">
                    Sélectionnez un onglet ci-dessus pour en savoir plus sur l'Archevêque.
                  </p>
                </div>
              </div>
            )}
            {activeTab === "description" && (
              <div className="bg-white rounded-lg shadow-md border border-neutral-200 p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                    {data.name}
                  </h2>
                  <p className="text-xl text-[#BE2722] font-semibold mb-6">
                    {data.title}
                  </p>
                  <div className="max-w-2xl mx-auto">
                    <p className="text-lg text-neutral-600 italic mb-3">
                      « Ut Vitam habeant et abundantius habeant »
                    </p>
                    <p className="text-base text-neutral-500">
                      « afin qu'ils aient la vie et qu'ils l'aient en abondance » (Jn 10,10)
                    </p>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none text-neutral-700 leading-relaxed">
                  {data.description.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-justify mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-200">
                  <p className="text-center text-sm text-neutral-600">
                    Pour en savoir plus sur son parcours complet, consultez sa <button onClick={() => setActiveTab("biographie")} className="text-[#BE2722] font-semibold hover:underline">biographie détaillée</button> et découvrez ses <button onClick={() => setActiveTab("publications")} className="text-[#BE2722] font-semibold hover:underline">publications</button>.
                  </p>
                </div>
              </div>
            )}
            
            {activeTab === "biographie" && (
              <div className="space-y-4">
                {/* Cursus Primaire */}
                <div className="bg-white rounded-lg shadow-md border border-neutral-200 overflow-hidden">
                  <button
                    onClick={() => toggleSection("primaire")}
                    className="w-full flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-bold text-neutral-900">Cursus Scolaire Primaire</h3>
                    </div>
                    {expandedSections.primaire ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                  {expandedSections.primaire && (
                    <div className="px-4 pb-4 pt-2 border-t border-neutral-100">
                      <p className="text-neutral-700"><strong>1961-1968 :</strong> École catholique de Nkol-Ewe; Nsimalen</p>
                      <p className="text-neutral-600 mt-1"><strong>Diplôme :</strong> C.E.P.E</p>
                    </div>
                  )}
                </div>

                {/* Cursus Secondaire */}
                <div className="bg-white rounded-lg shadow-md border border-neutral-200 overflow-hidden">
                  <button
                    onClick={() => toggleSection("secondaire")}
                    className="w-full flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-green-600" />
                      </div>
                      <h3 className="text-lg font-bold text-neutral-900">Cursus Scolaire Secondaire</h3>
                    </div>
                    {expandedSections.secondaire ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                  {expandedSections.secondaire && (
                    <div className="px-4 pb-4 pt-2 border-t border-neutral-100">
                      <p className="text-neutral-700"><strong>1968-1975 :</strong> Séminaire Saint Paul de Mbalmayo</p>
                      <p className="text-neutral-600 mt-1"><strong>Diplôme :</strong> Baccalauréat</p>
                    </div>
                  )}
                </div>

                {/* Cursus Universitaire */}
                <div className="bg-white rounded-lg shadow-md border border-neutral-200 overflow-hidden">
                  <button
                    onClick={() => toggleSection("universitaire")}
                    className="w-full flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-purple-600" />
                      </div>
                      <h3 className="text-lg font-bold text-neutral-900">Cursus Pastoral et Universitaire</h3>
                    </div>
                    {expandedSections.universitaire ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                  {expandedSections.universitaire && (
                    <div className="px-4 pb-4 pt-2 border-t border-neutral-100 space-y-2">
                      <p className="text-neutral-700"><strong>De 1975 :</strong> Grand Séminaire de Nkolbisson</p>
                      <p className="text-neutral-600"><strong>Diplômes :</strong> Baccalauréat Canonique en philosophie et en Théologie</p>
                      <div className="h-px bg-neutral-200 my-3" />
                      <p className="text-neutral-700"><strong>1989 :</strong> Institut Supérieur de Morale Alfonsianum, Rome</p>
                      <p className="text-neutral-700 mt-2"><strong>1992 :</strong></p>
                      <ul className="list-disc list-inside text-neutral-600 space-y-1 ml-4">
                        <li>Doctorat en Théologie Morale : L'engagement des Laïcs dans le temporel</li>
                        <li>Maîtrise en Droit Canonique à l'institut du Droit Canonique de Strasbourg</li>
                        <li>Diplôme en Bioéthique à Rome</li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Parcours Pastoral */}
                <div className="bg-white rounded-lg shadow-md border border-neutral-200 overflow-hidden">
                  <button
                    onClick={() => toggleSection("parcours")}
                    className="w-full flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                        <Award className="w-5 h-5 text-amber-600" />
                      </div>
                      <h3 className="text-lg font-bold text-neutral-900">Parcours Pastoral et Responsabilités</h3>
                    </div>
                    {expandedSections.parcours ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                  {expandedSections.parcours && (
                    <div className="px-4 pb-4 pt-2 border-t border-neutral-100">
                      <div className="space-y-3 text-sm text-neutral-700">
                        <div><strong>1981 :</strong> Vicaire de la paroisse Sacré-Cœur de Mokolo</div>
                        <div><strong>1982 :</strong> Vicaire de la paroisse d'Émana (Monatélé)</div>
                        <div><strong>1983-1985 :</strong> Aumônier diocésain des jeunes et des mouvements d'action catholique</div>
                        <div><strong>1985-1989 :</strong> Curé de la Paroisse de Mendong-Simbock</div>
                        <div><strong>1985-1989 :</strong> Aumônier Général des Laïcs à la CENC, Secrétaire National de la Commission Épiscopale de l'Apostolat des Laïcs</div>
                        <div><strong>1992-2002 :</strong> Recteur du Grand Séminaire de Nkolbisson, Secrétaire National de la Commission Épiscopale des Ouvriers Apostoliques, Enseignant à l'UCAC</div>
                        <div><strong>1999-2013 :</strong> Consulteur au Conseil Pontifical pour la Culture</div>
                        <div><strong>1999-2014 :</strong> Consulteur au Conseil Pontifical pour les Laïcs</div>
                        <div><strong>2002-2004 :</strong> Procureur (Économe) de l'Archidiocèse de Yaoundé</div>
                        <div><strong>Janvier 2004 :</strong> Vicaire Général de l'Archidiocèse de Yaoundé</div>
                        <div className="pt-2 border-t border-neutral-200">
                          <strong>15 octobre 2004 :</strong> Évêque nommé du Diocèse d'Ébolowa-Kribi
                        </div>
                        <div><strong>05 décembre 2004 :</strong> Ordination épiscopale : Évêque d'Ébolowa-Kribi</div>
                        <div><strong>2005 :</strong> Vice-Président de la Commission épiscopale pour la doctrine de la foi et de l'inculturation</div>
                        <div><strong>04-25 octobre 2009 :</strong> Père synodal de la deuxième Assemblée synodale du Pape Benoît XVI</div>
                        <div><strong>2013 :</strong> Administrateur Apostolique de l'Archidiocèse de Yaoundé</div>
                        <div className="pt-2 border-t border-neutral-200 font-bold text-[#BE2722]">
                          <strong>31 octobre 2014 :</strong> Archevêque de Yaoundé
                        </div>
                        <div className="mt-3 space-y-1">
                          <div>• Grand Chancelier de l'Université Catholique de l'Afrique Centrale (UCAC)</div>
                          <div>• Président de la Commission Épiscopale de la foi (CENC)</div>
                        </div>
                        <div><strong>Août 2017 :</strong> Fondation de l'Institut Universitaire Catholique Sainte Thérèse de Yaoundé (INUCASTY)</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Distinctions */}
                <div className="bg-white rounded-lg shadow-md border border-neutral-200 overflow-hidden">
                  <button
                    onClick={() => toggleSection("distinctions")}
                    className="w-full flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                        <Award className="w-5 h-5 text-red-600" />
                      </div>
                      <h3 className="text-lg font-bold text-neutral-900">Distinctions et Loisirs</h3>
                    </div>
                    {expandedSections.distinctions ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                  {expandedSections.distinctions && (
                    <div className="px-4 pb-4 pt-2 border-t border-neutral-100">
                      <p className="text-neutral-700 font-semibold mb-3">Distinctions Honorifiques</p>
                      <p className="text-neutral-600 mb-4">Chevalier de l'Ordre et de la Valeur</p>
                      <p className="text-neutral-700 font-semibold mb-2">Loisirs</p>
                      <ul className="list-disc list-inside text-neutral-600 space-y-1">
                        <li>La Musique religieuse</li>
                        <li>Les arts religieux</li>
                        <li>L'Eco tourisme</li>
                        <li>La marche sportive</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "publications" && (
              <div className="bg-white rounded-lg shadow-md border border-neutral-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#BE2722]/10 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-[#BE2722]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900">Publications</h3>
                    <p className="text-sm text-neutral-600">{data.publications.length} ouvrages et articles</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {data.publications.map((pub, index) => (
                    <div
                      key={index}
                      className="flex gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors border border-neutral-100"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#BE2722] text-white flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <p className="text-neutral-700 leading-relaxed">{pub}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}

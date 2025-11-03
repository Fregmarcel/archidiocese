"use client";
import { useState } from "react";
import { BookOpen, GraduationCap, Award, ChevronDown, ChevronUp } from "lucide-react";

type Props = { locale: string };

export default function ArchbishopMessage({ locale }: Props) {
  const [activeTab, setActiveTab] = useState<"biographie" | "publications">("biographie");
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    primaire: false,
    secondaire: false,
    universitaire: false,
    parcours: false,
    distinctions: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const publications = [
    "L'art oratoire et son pouvoir en Afrique, Publications Saint-Paul, Yaoundé, 1997.",
    "L'Afrique humaine, Ed. Groupe éthique, Yaoundé, 2005.",
    "« l'Évangile et vos valeurs traditionnelles africaines » in Percorsi culturali, 2005, Urbaniana University Press",
    "« Les conséquences éthiques sur la personne humaine d'une mondialisation sans Dieu » in Percorsi culturali, 2009, Urbaniana University Press",
    "Dons de vie, Ed. Groupe éthique, Ebolowa, 2011.",
    "Il nous a parlé par les prophètes Ed. Archidiocèse de Yaoundé, 2015.",
    "Ainsi parle le Seigneur, Ed. Archidiocèse de Yaoundé, 2015.",
    "Pour toujours ta parole, Ed. Archidiocèse de Yaoundé, 2016.",
    "Paroles d'espérance, Ed. Archidiocèse de Yaoundé, 2016.",
    "Paroles de salut, Ed. Archidiocèse de Yaoundé, Yaoundé, 2018.",
    "Selon ta parole, Ed. Archidiocèse de Yaoundé, 2019.",
    "La Nouvelle École africaine : structuration et pertinence pour une Afrique nouvelle, Éd. Nleb Bekristen, 2021.",
    "L'université Catholique d'Afrique Centrale : l'auréole de son œuvre, PUCAC, Yaoundé, 2021.",
    "Saint Joseph Notre Protecteur, Ed. Archidiocèse de Yaoundé, 2021.",
    "Paroles de salut, Ed. Archidiocèse de Yaoundé, 2021.",
    "Source de vie, Ed. Archidiocèse de Yaoundé, 2023.",
    "Le Savoir-vivre ensemble. Vers une humanité plus humaine, P.U.C.A.C, 2023",
    "L'Année de Prière 2024. Année en Prière, Message de Carême 2024, Ed. Les Presses Offsets, 2024"
  ];

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
                  src="/images/archbishop.jpg"
                  alt="Mgr Jean Mbarga - Archevêque de Yaoundé"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
                  Mgr Jean MBARGA
                </h2>
                <p className="text-lg text-[#BE2722] font-semibold mt-1">
                  Archevêque Métropolitain de Yaoundé
                </p>
                <p className="text-sm text-neutral-600 mt-2 italic">
                  « Ut Vitam habeant et abundantius habeant »
                </p>
                <p className="text-xs text-neutral-500">
                  « afin qu'ils aient la vie et qu'ils l'aient en abondance » (Jn 10,10)
                </p>
              </div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-2">
            {/* Onglets */}
            <div className="flex gap-2 mb-6">
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
                    <p className="text-sm text-neutral-600">{publications.length} ouvrages et articles</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {publications.map((pub, index) => (
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

            {/* Note galerie */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note :</strong> La galerie photo sera enrichie prochainement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

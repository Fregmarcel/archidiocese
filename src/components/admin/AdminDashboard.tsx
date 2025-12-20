"use client";

import { useState } from "react";
import { ArrowLeft, Home, History, Info, Mail, Settings, Users, Calendar, FileText, Megaphone, MapPinned, Church } from "lucide-react";
import ArchbishopForm from "./ArchbishopForm";
import CrudManager from "./CrudManager";
import { archbishopCrudConfig, ArchbishopData } from "./ArchbishopCrudConfig";
import { curieMemberCrudConfig, CurieMemberData } from "./CurieCrudConfig";
import { historyPageCrudConfig, HistoryPageData } from "./HistoryPageCrudConfig";
import { pastoralZoneCrudConfig, PastoralZoneData } from './PastoralZoneCrudConfig';
import { parishCrudConfig, ParishData } from './ParishCrudConfig';
import { newsCrudConfig, NewsData } from './NewsCrudConfig';
import { eventCrudConfig, EventData } from './EventCrudConfig';
import { partnerCrudConfig, PartnerData } from './PartnerCrudConfig';
import { historyCrudConfig, HistoryEventData } from './HistoryCrudConfig';
import { radioShowCrudConfig, RadioShowData } from './RadioShowCrudConfig';
import { tvShowCrudConfig, TVShowData } from './TVShowCrudConfig';

interface AdminDashboardProps {
  locale: string;
}

type MainSection = "overview" | "accueil" | "historique" | "apropos" | "contact";
type AccueilSubsection = "archbishop" | "curie" | "news" | "events" | "testimonials" | "partners" | "admissions" | "pastoralZones" | "parishes" | "radio" | "television";
type HistoriqueSubsection = "historiquePage";

export default function AdminDashboard({ locale }: AdminDashboardProps) {
  const [currentSection, setCurrentSection] = useState<MainSection>("overview");
  const [currentSubsection, setCurrentSubsection] = useState<AccueilSubsection | null>(null);
  const [currentHistoriqueSubsection, setCurrentHistoriqueSubsection] = useState<HistoriqueSubsection | null>(null);

  const mainSections = [
    {
      id: "accueil" as const,
      title: "Accueil",
      description: "Gérer le contenu de la page d'accueil",
      icon: Home,
      color: "bg-blue-50 border-blue-200 text-blue-900"
    },
    {
      id: "historique" as const,
      title: "Historique",
      description: "Gérer l'histoire de l'archidiocèse",
      icon: History,
      color: "bg-green-50 border-green-200 text-green-900"
    },
    {
      id: "apropos" as const,
      title: "À propos",
      description: "Gérer les informations générales",
      icon: Info,
      color: "bg-purple-50 border-purple-200 text-purple-900"
    },
    {
      id: "contact" as const,
      title: "Contact",
      description: "Gérer les informations de contact",
      icon: Mail,
      color: "bg-orange-50 border-orange-200 text-orange-900"
    }
  ];

  const accueilSubsections = [
    {
      id: "archbishop" as const,
      title: "Section Archevêque",
      description: "Gérer les informations de l'archevêque",
      icon: Users
    },
    {
      id: "curie" as const,
      title: "Curie Diocésaine",
      description: "Gérer les membres de la curie diocésaine",
      icon: Users
    },
    {
      id: "pastoralZones" as const,
      title: "Zones pastorales",
      description: "Gérer les zones pastorales (coordination, contacts, etc.)",
      icon: MapPinned
    },
    {
      id: "parishes" as const,
      title: "Paroisses",
      description: "Gérer les paroisses et leur rattachement à une zone",
      icon: Church
    },
    {
      id: "news" as const,
      title: "Actualités",
      description: "Gérer les articles d'actualité",
      icon: FileText
    },
    {
      id: "events" as const,
      title: "Agenda & Événements",
      description: "Gérer le calendrier des événements",
      icon: Calendar
    },
    {
      id: "testimonials" as const,
      title: "Témoignages",
      description: "Gérer les témoignages des fidèles",
      icon: Megaphone
    },
    {
      id: "partners" as const,
      title: "Partenaires",
      description: "Gérer les réseaux partenaires",
      icon: Settings
    },
    {
      id: "admissions" as const,
      title: "Admissions & Concours",
      description: "Gérer les informations d'admission",
      icon: FileText
    },
    {
      id: "radio" as const,
      title: "Radio Diocésaine",
      description: "Gérer les émissions radio (direct et rediffusions)",
      icon: Megaphone
    },
    {
      id: "television" as const,
      title: "Télévision Diocésaine",
      description: "Gérer les vidéos (directs & rediffusions)",
      icon: Settings
    }
  ];

  const renderBreadcrumb = () => {
    const items = [];
    
    if (currentSection === "overview") {
      items.push("Tableau de bord");
    } else {
      items.push(
        <button
          key="dashboard"
          onClick={() => {
            setCurrentSection("overview");
            setCurrentSubsection(null);
          }}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Tableau de bord
        </button>
      );

      const sectionTitle = mainSections.find(s => s.id === currentSection)?.title;
      if (currentSubsection) {
        items.push(
          <button
            key="section"
            onClick={() => setCurrentSubsection(null)}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            {sectionTitle}
          </button>
        );
        
        const subsectionTitle = accueilSubsections.find(s => s.id === currentSubsection)?.title;
        items.push(subsectionTitle);
      } else {
        items.push(sectionTitle);
      }
    }

    return (
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        {items.map((item, index) => (
          <span key={index} className="flex items-center">
            {index > 0 && <span className="mx-2">/</span>}
            {item}
          </span>
        ))}
      </nav>
    );
  };

  const renderOverview = () => (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Tableau de bord administrateur</h1>
      <p className="text-gray-600 mb-8">Sélectionnez une section pour commencer la gestion du contenu.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mainSections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setCurrentSection(section.id)}
              className={`${section.color} border rounded-lg p-6 text-left hover:shadow-md transition-all duration-200 hover:scale-[1.02]`}
            >
              <div className="flex items-center mb-4">
                <Icon className="w-8 h-8 mr-3" />
                <h2 className="text-xl font-semibold">{section.title}</h2>
              </div>
              <p className="text-sm opacity-80">{section.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderAccueilSubsections = () => (
    <div>
      <div className="flex items-center mb-6">
        <button
          onClick={() => setCurrentSection("overview")}
          className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Page d'Accueil</h1>
          <p className="text-gray-600">Gérez les différentes sections de la page d'accueil.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accueilSubsections.map((subsection) => {
          const Icon = subsection.icon;
          return (
            <button
              key={subsection.id}
              onClick={() => setCurrentSubsection(subsection.id)}
              className="bg-white border border-gray-200 rounded-lg p-6 text-left hover:shadow-md transition-all duration-200 hover:border-blue-300"
            >
              <div className="flex items-center mb-4">
                <Icon className="w-6 h-6 mr-3 text-blue-600" />
                <h3 className="text-lg font-semibold">{subsection.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{subsection.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderHistoriqueSubsections = () => (
    <div>
      <div className="flex items-center mb-6">
        <button
          onClick={() => setCurrentSection("overview")}
          className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Page Historique</h1>
          <p className="text-gray-600">Gérez le contenu de la page historique de l'Archidiocèse.</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <CrudManager<HistoryPageData>
          title={historyPageCrudConfig.title}
          apiEndpoint={historyPageCrudConfig.apiEndpoint}
          columns={historyPageCrudConfig.columns}
          FormComponent={historyPageCrudConfig.FormComponent}
          options={historyPageCrudConfig.options}
          messages={historyPageCrudConfig.messages}
          locale={locale}
        />
      </div>
    </div>
  );

  const renderSubsectionForm = () => {
    if (!currentSubsection) return null;

    const subsection = accueilSubsections.find(s => s.id === currentSubsection);
    if (!subsection) return null;

    return (
      <div>
        <div className="flex items-center mb-6">
          <button
            onClick={() => setCurrentSubsection(null)}
            className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{subsection.title}</h1>
            <p className="text-gray-600">{subsection.description}</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          {currentSubsection === "archbishop" ? (
            <CrudManager<ArchbishopData>
              title={archbishopCrudConfig.title}
              apiEndpoint={archbishopCrudConfig.apiEndpoint}
              columns={archbishopCrudConfig.columns}
              FormComponent={archbishopCrudConfig.FormComponent}
              options={archbishopCrudConfig.options}
              messages={archbishopCrudConfig.messages}
              locale={locale}
            />
          ) : currentSubsection === "curie" ? (
            <CrudManager<CurieMemberData>
              title={curieMemberCrudConfig.title}
              apiEndpoint={curieMemberCrudConfig.apiEndpoint}
              columns={curieMemberCrudConfig.columns}
              FormComponent={curieMemberCrudConfig.FormComponent}
              options={curieMemberCrudConfig.options}
              messages={curieMemberCrudConfig.messages}
              locale={locale}
            />
          ) : currentSubsection === 'pastoralZones' ? (
            <CrudManager<PastoralZoneData>
              title={pastoralZoneCrudConfig.title}
              apiEndpoint={pastoralZoneCrudConfig.apiEndpoint}
              columns={pastoralZoneCrudConfig.columns}
              FormComponent={pastoralZoneCrudConfig.FormComponent}
              options={pastoralZoneCrudConfig.options}
              messages={pastoralZoneCrudConfig.messages}
              locale={locale}
            />
          ) : currentSubsection === 'parishes' ? (
            <CrudManager<ParishData>
              title={parishCrudConfig.title}
              apiEndpoint={parishCrudConfig.apiEndpoint}
              columns={parishCrudConfig.columns}
              FormComponent={parishCrudConfig.FormComponent}
              options={parishCrudConfig.options}
              messages={parishCrudConfig.messages}
              locale={locale}
            />
          ) : currentSubsection === 'news' ? (
            <CrudManager<NewsData>
              title={newsCrudConfig.title}
              apiEndpoint={newsCrudConfig.apiEndpoint}
              columns={newsCrudConfig.columns}
              FormComponent={newsCrudConfig.FormComponent}
              options={newsCrudConfig.options}
              messages={newsCrudConfig.messages}
              locale={locale}
            />
          ) : currentSubsection === 'events' ? (
            <CrudManager<EventData>
              title={eventCrudConfig.title}
              apiEndpoint={eventCrudConfig.apiEndpoint}
              columns={eventCrudConfig.columns}
              FormComponent={eventCrudConfig.FormComponent}
              options={eventCrudConfig.options}
              messages={eventCrudConfig.messages}
              locale={locale}
            />
          ) : currentSubsection === 'partners' ? (
            <CrudManager<PartnerData>
              title={partnerCrudConfig.title}
              apiEndpoint={partnerCrudConfig.apiEndpoint}
              columns={partnerCrudConfig.columns}
              FormComponent={partnerCrudConfig.FormComponent}
              options={partnerCrudConfig.options}
              messages={partnerCrudConfig.messages}
              locale={locale}
            />
          ) : currentSubsection === 'radio' ? (
            <CrudManager<RadioShowData>
              title={radioShowCrudConfig.title}
              apiEndpoint={radioShowCrudConfig.apiEndpoint}
              columns={radioShowCrudConfig.columns}
              FormComponent={radioShowCrudConfig.FormComponent}
              options={radioShowCrudConfig.options}
              messages={radioShowCrudConfig.messages}
              locale={locale}
            />
          ) : currentSubsection === 'television' ? (
            <CrudManager<TVShowData>
              title={tvShowCrudConfig.title}
              apiEndpoint={tvShowCrudConfig.apiEndpoint}
              columns={tvShowCrudConfig.columns}
              FormComponent={tvShowCrudConfig.FormComponent}
              options={tvShowCrudConfig.options}
              messages={tvShowCrudConfig.messages}
              locale={locale}
            />
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Settings className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Formulaire en cours de développement
              </h3>
              <p className="text-gray-600">
                Cette section sera bientôt disponible pour la gestion du contenu.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderOtherSections = () => {
    const section = mainSections.find(s => s.id === currentSection);
    if (!section) return null;

    if (currentSection === 'historique') {
      return (
        <div>
          <div className="flex items-center mb-6">
            <button
              onClick={() => setCurrentSection("overview")}
              className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{section.title}</h1>
              <p className="text-gray-600">{section.description}</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <CrudManager<HistoryEventData>
              title={historyCrudConfig.title}
              apiEndpoint={historyCrudConfig.apiEndpoint}
              columns={historyCrudConfig.columns}
              FormComponent={historyCrudConfig.FormComponent}
              options={historyCrudConfig.options}
              messages={historyCrudConfig.messages}
            />
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="flex items-center mb-6">
          <button
            onClick={() => setCurrentSection("overview")}
            className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{section.title}</h1>
            <p className="text-gray-600">{section.description}</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <div className="text-gray-400 mb-4">
            <Settings className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Section en cours de développement
          </h3>
          <p className="text-gray-600">
            Cette section sera bientôt disponible pour la gestion du contenu.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-[70vh] container mx-auto px-4 py-8">
      {renderBreadcrumb()}
      
      {currentSection === "overview" && renderOverview()}
      
      {currentSection === "accueil" && !currentSubsection && renderAccueilSubsections()}
      
      {currentSection === "accueil" && currentSubsection && renderSubsectionForm()}
      
      {currentSection === "historique" && renderHistoriqueSubsections()}
      
      {currentSection !== "overview" && currentSection !== "accueil" && currentSection !== "historique" && renderOtherSections()}
    </div>
  );
}

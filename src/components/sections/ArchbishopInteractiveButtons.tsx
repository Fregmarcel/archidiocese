"use client";

import { useState } from "react";

interface ArchbishopInteractiveButtonsProps {
  bibliography: string[];
  publications: string[];
  gallery: string[];
  bibliographyRich?: string;
}

interface ModalContent {
  title: string;
  items: string[];
  type: 'bibliography' | 'publications' | 'gallery';
  richContent?: string;
}

export default function ArchbishopInteractiveButtons({ 
  bibliography, 
  publications, 
  gallery, 
  bibliographyRich 
}: ArchbishopInteractiveButtonsProps) {
  const [modal, setModal] = useState<ModalContent | null>(null);

  const openModal = (type: 'bibliography' | 'publications' | 'gallery') => {
    console.log('openModal called with type:', type);
    console.log('Bibliography:', bibliography);
    console.log('BibliographyRich:', bibliographyRich);
    console.log('Publications:', publications);
    console.log('Gallery:', gallery);
    
    let title = "";
    let items: string[] = [];
    let richContent: string | undefined;
    
    switch (type) {
      case 'bibliography':
        title = "Bibliographie";
        items = bibliography;
        richContent = bibliographyRich;
        break;
      case 'publications':
        title = "Publications";
        items = publications;
        break;
      case 'gallery':
        title = "Galerie Photo";
        items = gallery;
        break;
    }
    
    console.log('Setting modal:', { title, items, type, richContent });
    setModal({ title, items, type, richContent });
  };

  const closeModal = () => setModal(null);

  return (
    <>
      {/* Nouveaux boutons modaux avec grandes icônes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {/* Toujours afficher pour tester - on changera la logique plus tard */}
        <button 
          onClick={() => openModal('bibliography')}
          className="group bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-xl p-6 hover:from-red-100 hover:to-red-200 transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-500 rounded-full flex items-center justify-center group-hover:bg-red-600 transition-colors">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-red-900 mb-2">Bibliographie</h3>
            <p className="text-sm text-red-700 opacity-80">
              {bibliographyRich || bibliography.length > 0 ? 'Découvrez son parcours et ses écrits' : 'Pas encore de contenu'}
            </p>
          </div>
        </button>
        
        <button 
          onClick={() => openModal('publications')}
          className="group bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6 hover:from-green-100 hover:to-green-200 transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center group-hover:bg-green-600 transition-colors">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-green-900 mb-2">Publications</h3>
            <p className="text-sm text-green-700 opacity-80">
              {publications.length > 0 ? 'Consultez ses documents officiels' : 'Pas encore de contenu'}
            </p>
          </div>
        </button>
        
        <button 
          onClick={() => openModal('gallery')}
          className="group bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-blue-900 mb-2">Galerie</h3>
            <p className="text-sm text-blue-700 opacity-80">
              {gallery.length > 0 ? 'Parcourez la galerie photo' : 'Pas encore de contenu'}
            </p>
          </div>
        </button>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">{modal.title}</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {modal.type === 'bibliography' ? (
                modal.richContent ? (
                  <div 
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: modal.richContent }}
                  />
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Bibliographie</h3>
                    <p className="text-gray-600">Aucune bibliographie n'a encore été ajoutée.</p>
                    <p className="text-sm text-gray-500 mt-2">Les administrateurs peuvent ajouter du contenu via le panneau d'administration.</p>
                  </div>
                )
              ) : modal.type === 'gallery' ? (
                modal.items.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {modal.items.map((item, index) => (
                      <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img 
                          src={item} 
                          alt={`Image ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                          onClick={() => window.open(item, '_blank')}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Galerie Photo</h3>
                    <p className="text-gray-600">Aucune photo n'a encore été ajoutée à la galerie.</p>
                    <p className="text-sm text-gray-500 mt-2">Les administrateurs peuvent ajouter des images via le panneau d'administration.</p>
                  </div>
                )
              ) : modal.type === 'publications' ? (
                modal.items.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {modal.items.map((item, index) => {
                      const isPdf = item.toLowerCase().endsWith('.pdf');
                      const fileName = item.split('/').pop() || `Document ${index + 1}`;
                      
                      return (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          {isPdf ? (
                            <div className="text-center">
                              <div className="w-16 h-20 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <span className="text-red-600 text-2xl">📄</span>
                              </div>
                              <p className="text-sm font-medium text-gray-900 truncate" title={fileName}>
                                {fileName}
                              </p>
                              <button
                                onClick={() => window.open(item, '_blank')}
                                className="mt-2 px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                              >
                                Ouvrir PDF
                              </button>
                            </div>
                          ) : (
                            <div>
                              <img 
                                src={item} 
                                alt={fileName}
                                className="w-full h-32 object-cover rounded-lg mb-3 cursor-pointer hover:opacity-80 transition-opacity"
                                onClick={() => window.open(item, '_blank')}
                              />
                              <p className="text-xs text-gray-600 truncate" title={fileName}>
                                {fileName}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Publications</h3>
                    <p className="text-gray-600">Aucune publication n'a encore été ajoutée.</p>
                    <p className="text-sm text-gray-500 mt-2">Les administrateurs peuvent ajouter des documents via le panneau d'administration.</p>
                  </div>
                )
              ) : (
                <div className="space-y-3">
                  {modal.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">📄</span>
                      <a
                        href={item}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-blue-600 hover:text-blue-800 underline truncate"
                      >
                        {item}
                      </a>
                      <button
                        onClick={() => window.open(item, '_blank')}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        Ouvrir
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

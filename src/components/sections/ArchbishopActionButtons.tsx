"use client";

import { useState } from "react";

interface ActionButtonsProps {
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

export default function ArchbishopActionButtons({ bibliography, publications, gallery, bibliographyRich }: ActionButtonsProps) {
  const [modal, setModal] = useState<ModalContent | null>(null);

  const openModal = (type: 'bibliography' | 'publications' | 'gallery') => {
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
    
    setModal({ title, items, type, richContent });
  };

  const closeModal = () => setModal(null);

  return (
    <>
      <div className="flex flex-wrap gap-3 mt-4">
        {(bibliography.length > 0 || bibliographyRich) && (
          <button 
            onClick={() => openModal('bibliography')}
            className="px-4 py-2 rounded bg-[#BE2722] text-white font-bold text-sm hover:bg-[#a81f1a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BE2722] transition-colors"
          >
            Bibliographie
          </button>
        )}
        {publications.length > 0 && (
          <button 
            onClick={() => openModal('publications')}
            className="px-4 py-2 rounded bg-[#2E9B51] text-white font-bold text-sm hover:bg-[#217a3e] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E9B51] transition-colors"
          >
            Publications
          </button>
        )}
        {gallery.length > 0 && (
          <button 
            onClick={() => openModal('gallery')}
            className="px-4 py-2 rounded bg-[#0284C7] text-white font-bold text-sm hover:bg-[#02669c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] transition-colors"
          >
            Galerie
          </button>
        )}
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
              {modal.type === 'bibliography' && modal.richContent ? (
                <div 
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: modal.richContent }}
                />
              ) : modal.type === 'gallery' ? (
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
              ) : modal.type === 'publications' ? (
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

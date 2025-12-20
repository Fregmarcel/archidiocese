"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";
import { Eye, Users } from 'lucide-react';
import CurieModal from './CurieModal';

type Props = { locale: string };

interface CurieMemberDetailed {
  _id?: string;
  id: string;
  name: string;
  role: string;
  subtitle?: string;
  image: string;
  biography?: string;
  email?: string;
  phone?: string;
  address?: string;
  education?: string[];
  ministries?: string[];
  ordination?: string;
  publications?: string[];
  displayOrder?: number;
  isActive?: boolean;
}

export default function CurieDiocesaineEnhanced({ locale }: Props) {
  const [selectedMember, setSelectedMember] = useState<CurieMemberDetailed | undefined>();
  const [modalType, setModalType] = useState<'detail' | 'list'>('detail');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allCurieMembers, setAllCurieMembers] = useState<CurieMemberDetailed[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Charger les membres depuis l'API
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('/api/curie-members');
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          // Mapper les données de l'API vers le format attendu
          const members = data.data
            .filter((m: any) => m.isActive !== false)
            .sort((a: any, b: any) => (a.displayOrder || 999) - (b.displayOrder || 999))
            .map((m: any) => ({
              id: m._id || m.id,
              _id: m._id,
              name: m.name,
              role: m.role,
              subtitle: m.subtitle,
              image: m.image,
              biography: m.biography,
              email: m.email,
              phone: m.phone,
              address: m.address,
              education: m.education,
              ministries: m.ministries,
              ordination: m.ordination,
              publications: m.publications,
              displayOrder: m.displayOrder,
              isActive: m.isActive
            }));
          setAllCurieMembers(members);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des membres:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // Afficher les 5 premiers membres actifs
  const displayedMembers = allCurieMembers.slice(0, 5);
  const hasMoreMembers = allCurieMembers.length > 5;

  const openDetailModal = (member: CurieMemberDetailed) => {
    setSelectedMember(member);
    setModalType('detail');
    setIsModalOpen(true);
  };

  const openListModal = () => {
    setModalType('list');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(undefined);
  };

  const handleSelectFromList = (member: CurieMemberDetailed) => {
    setSelectedMember(member);
    setModalType('detail');
    // Garder le modal ouvert pour switcher vers le détail
  };

  return (
    <>
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold uppercase text-[#25282E] mb-4">
              Curie Diocésaine
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Découvrez les membres de la Curie Diocésaine qui œuvrent au service de l'Archidiocèse de Yaoundé
            </p>
            <div className="relative my-8 flex items-center justify-center">
              <span className="h-px w-24 bg-neutral-300" />
              <span className="mx-4 grid place-items-center w-10 h-10 rounded-full bg-[#BE2722] text-white">
                <Users size={20} />
              </span>
              <span className="h-px w-24 bg-neutral-300" />
            </div>
          </div>

          {/* Loading state */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#BE2722]"></div>
              <p className="mt-4 text-neutral-600">Chargement des membres...</p>
            </div>
          ) : displayedMembers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-600 text-lg">Aucun membre disponible pour le moment.</p>
            </div>
          ) : (
            <>
              {/* Grid des membres */}
              <div className={`grid gap-3 mb-12 ${
                displayedMembers.length === 1 ? 'grid-cols-1 md:grid-cols-1 max-w-sm mx-auto' :
                displayedMembers.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto' :
                displayedMembers.length === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto' :
                displayedMembers.length === 4 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto' :
                'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
              }`}>
            {displayedMembers.map((member) => (
              <div key={member.id} className="group cursor-pointer" onClick={() => openDetailModal(member)}>
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 h-72">
                  <div className="h-40 overflow-hidden relative">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Overlay au survol */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">Cliquer pour voir le profil</p>
                          </div>
                          <Eye size={20} className="opacity-80" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 h-32 flex flex-col">
                    <h3 className="font-bold text-[#25282E] text-sm mb-1 group-hover:text-[#BE2722] transition-colors leading-tight overflow-hidden" 
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical' as const,
                          textOverflow: 'ellipsis'
                        }}>
                      {member.name}
                    </h3>
                    <p className="text-[#BE2722] font-semibold text-xs uppercase tracking-wide mb-1 truncate">
                      {member.role}
                    </p>
                    {member.subtitle && (
                      <p className="text-neutral-600 text-xs truncate mt-auto">
                        {member.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bouton Voir Plus */}
          {hasMoreMembers && (
            <div className="text-center">
              <button
                onClick={openListModal}
                className="inline-flex items-center gap-3 bg-[#BE2722] text-white px-8 py-4 rounded-xl hover:bg-[#a51f1a] transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl"
              >
                <Users size={24} />
                Voir tous les membres ({allCurieMembers.length})
              </button>
            </div>
          )}
        </>
          )}
        </div>
      </section>

      {/* Modal */}
      <CurieModal
        isOpen={isModalOpen}
        onClose={closeModal}
        member={selectedMember}
        type={modalType}
        allMembers={allCurieMembers}
        onSelectMember={handleSelectFromList}
      />
    </>
  );
}

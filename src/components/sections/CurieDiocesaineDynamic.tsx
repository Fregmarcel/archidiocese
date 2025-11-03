"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";
import { Eye, Users } from 'lucide-react';
import CurieModal from './CurieModal';

type Props = { locale: string };

interface CurieMemberDetailed {
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
}

export default function CurieDiocesaineEnhanced({ locale }: Props) {
  const [allCurieMembers, setAllCurieMembers] = useState<CurieMemberDetailed[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<CurieMemberDetailed | undefined>();
  const [modalType, setModalType] = useState<'detail' | 'list'>('detail');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Charger les membres de la curie depuis l'API
  useEffect(() => {
    const fetchCurieMembers = async () => {
      try {
        const response = await fetch('/api/curie-members');
        const result = await response.json();
        
        if (result.success) {
          // Transformer les données pour correspondre à l'interface
          const transformedMembers = result.data.map((member: any) => ({
            id: member._id,
            name: member.name,
            role: member.role,
            subtitle: member.subtitle,
            image: member.image,
            biography: member.biography,
            email: member.email,
            phone: member.phone,
            address: member.address,
            ordination: member.ordination,
            education: member.education || [],
            ministries: member.ministries || [],
            publications: member.publications || []
          }));
          setAllCurieMembers(transformedMembers);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des membres de la curie:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurieMembers();
  }, []);

  // Afficher seulement les 5 premiers membres actifs avec de vraies photos
  const membersWithRealPhotos = allCurieMembers.filter(member => 
    member.image && !member.image.includes('unsplash.com') && !member.image.includes('placeholder')
  );
  const displayedMembers = membersWithRealPhotos.slice(0, 5);
  const hasMoreMembers = false;

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

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#25282E] mb-4">Curie Diocésaine</h2>
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden h-72">
                <div className="h-40 bg-gray-200 animate-pulse"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#25282E] mb-4">Curie Diocésaine</h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez les membres de la Curie Diocésaine de l'Archidiocèse de Yaoundé, 
            leurs responsabilités et leur engagement au service de l'Église locale.
          </p>
        </div>

        {/* Grille des membres */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 mb-12">
            {displayedMembers.map((member, index) => (
              <div 
                key={member.id}
                className="group cursor-pointer"
                onClick={() => openDetailModal(member)}
              >
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
        </div>
      </div>

      {/* Modal */}
      <CurieModal
        isOpen={isModalOpen}
        onClose={closeModal}
        member={selectedMember}
        type={modalType}
        allMembers={displayedMembers}
      />
    </section>
  );
}

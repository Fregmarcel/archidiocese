"use client";

import { useState, useEffect } from 'react';
import { X, Search, Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

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

interface CurieModalProps {
  isOpen: boolean;
  onClose: () => void;
  member?: CurieMemberDetailed;
  type: 'detail' | 'list';
  allMembers?: CurieMemberDetailed[];
  onSelectMember?: (member: CurieMemberDetailed) => void;
}

export default function CurieModal({ 
  isOpen, 
  onClose, 
  member, 
  type, 
  allMembers = [], 
  onSelectMember 
}: CurieModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMembers, setFilteredMembers] = useState(allMembers);

  useEffect(() => {
    if (type === 'list' && allMembers.length > 0) {
      const filtered = allMembers.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (m.subtitle?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
      );
      setFilteredMembers(filtered);
    }
  }, [searchTerm, allMembers, type]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (type === 'detail' && member) {
    return (
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="relative">
            <div className="aspect-[3/2] overflow-hidden rounded-t-2xl">
              <Image
                src={member.image}
                alt={member.name}
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{member.name}</h2>
                <p className="text-lg opacity-90">{member.role}</p>
                {member.subtitle && (
                  <p className="text-sm opacity-80">{member.subtitle}</p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Biography */}
            {member.biography && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Biographie</h3>
                <p className="text-gray-700 leading-relaxed">{member.biography}</p>
              </div>
            )}

            {/* Contact Info */}
            <div className="grid md:grid-cols-2 gap-4">
              {member.email && (
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <Mail size={18} className="text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-900">{member.email}</p>
                  </div>
                </div>
              )}

              {member.phone && (
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Phone size={18} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Téléphone</p>
                    <p className="text-gray-900">{member.phone}</p>
                  </div>
                </div>
              )}

              {member.address && (
                <div className="flex items-center space-x-3 md:col-span-2">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <MapPin size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Adresse</p>
                    <p className="text-gray-900">{member.address}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Ordination */}
            {member.ordination && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ordination</h3>
                <p className="text-gray-700">{member.ordination}</p>
              </div>
            )}

            {/* Education */}
            {member.education && member.education.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Formation</h3>
                <ul className="space-y-2">
                  {member.education.map((edu, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Ministries */}
            {member.ministries && member.ministries.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Ministères et Responsabilités</h3>
                <ul className="space-y-2">
                  {member.ministries.map((ministry, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{ministry}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Publications */}
            {member.publications && member.publications.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Publications</h3>
                <ul className="space-y-2">
                  {member.publications.map((publication, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700 italic">{publication}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Curie Diocésaine</h2>
              <p className="text-gray-600">Liste complète des membres</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Search */}
          <div className="p-6 border-b border-gray-200">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un membre par nom, rôle ou fonction..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              />
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  onClick={() => onSelectMember?.(member)}
                  className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate group-hover:text-red-600 transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-sm text-gray-600 truncate">{member.role}</p>
                      {member.subtitle && (
                        <p className="text-xs text-gray-500 truncate">{member.subtitle}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredMembers.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search size={48} className="mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun résultat trouvé</h3>
                <p className="text-gray-500">Essayez avec d'autres termes de recherche.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

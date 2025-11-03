"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { X, Calendar, Tag as TagIcon } from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  tags: string[];
  image: string;
}

interface NewsModalProps {
  article: NewsArticle | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function NewsModal({ article, isOpen, onClose }: NewsModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isVisible || !article) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={onClose}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden transform transition-all duration-300 ${
          isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        {/* Header avec image */}
        <div className="relative h-64 md:h-80">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 896px, 100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all group"
            aria-label="Fermer"
          >
            <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Tags */}
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-[#2E9B51] text-white text-xs font-bold uppercase rounded-full shadow-lg"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-20rem)] md:max-h-[calc(90vh-22rem)]">
          <div className="p-6 md:p-8">
            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-4">
              {article.title}
            </h2>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <TagIcon className="w-4 h-4" />
                <span>{article.tags.length} tag{article.tags.length > 1 ? 's' : ''}</span>
              </div>
            </div>

            {/* Excerpt */}
            {article.excerpt && (
              <div className="mb-6 p-4 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg">
                <p className="text-base text-gray-700 italic leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            )}

            {/* Content */}
            {article.content ? (
              <div
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-indigo-600 prose-strong:text-gray-900 prose-img:rounded-lg prose-img:shadow-md"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            ) : (
              <p className="text-gray-600 leading-relaxed">{article.excerpt}</p>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 md:px-8 py-6 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Publié le {article.date}
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

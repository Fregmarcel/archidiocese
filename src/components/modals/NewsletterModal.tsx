"use client";

import { useState } from 'react';
import { Mail, CheckCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setMessage(data.message);
        setFormData({ email: '', firstName: '', lastName: '' });
        // Fermer le modal après 3 secondes
        setTimeout(() => {
          onClose();
          setMessage('');
          setIsSuccess(false);
        }, 3000);
      } else {
        setIsSuccess(false);
        setMessage(data.message || 'Une erreur est survenue');
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage('Une erreur est survenue lors de l\'inscription');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleClose = () => {
    onClose();
    setMessage('');
    setIsSuccess(false);
    setFormData({ email: '', firstName: '', lastName: '' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={handleClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#BE2722] rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Newsletter
                  </h2>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-6">
                  Restez informé des dernières actualités et événements de l'Archidiocèse de Yaoundé
                </p>

                {message && (
                  <div className={`p-4 rounded-lg mb-6 flex items-center gap-3 ${
                    isSuccess 
                      ? 'bg-green-50 border border-green-200 text-green-800' 
                      : 'bg-red-50 border border-red-200 text-red-800'
                  }`}>
                    {isSuccess && <CheckCircle className="w-5 h-5 flex-shrink-0" />}
                    <p className="text-sm">{message}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="modal-firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        Prénom
                      </label>
                      <input
                        type="text"
                        id="modal-firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BE2722] focus:border-transparent text-sm"
                        placeholder="Votre prénom"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="modal-lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Nom
                      </label>
                      <input
                        type="text"
                        id="modal-lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BE2722] focus:border-transparent text-sm"
                        placeholder="Votre nom"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="modal-email" className="block text-sm font-medium text-gray-700 mb-1">
                      Adresse email *
                    </label>
                    <input
                      type="email"
                      id="modal-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BE2722] focus:border-transparent text-sm"
                      placeholder="votre.email@exemple.com"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#BE2722] text-white font-semibold py-3 px-4 rounded-md hover:bg-[#a51f1a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Inscription en cours...' : 'S\'abonner'}
                  </button>
                </form>

                <p className="text-xs text-gray-500 text-center mt-4">
                  En vous abonnant, vous acceptez de recevoir nos communications par email.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

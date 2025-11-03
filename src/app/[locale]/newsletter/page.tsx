"use client";

import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

export default function Newsletter() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#BE2722] rounded-full mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Newsletter de l'Archidiocèse
            </h1>
            <p className="text-lg text-gray-600">
              Restez informé des dernières actualités de l'Archidiocèse de Yaoundé
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8">
            {message && (
              <div className={`p-4 rounded-lg mb-6 flex items-center gap-3 ${
                isSuccess 
                  ? 'bg-green-50 border border-green-200 text-green-800' 
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
                {isSuccess && <CheckCircle className="w-5 h-5 flex-shrink-0" />}
                <p>{message}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    Prénom (optionnel)
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BE2722] focus:border-transparent"
                    placeholder="Votre prénom"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Nom (optionnel)
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BE2722] focus:border-transparent"
                    placeholder="Votre nom"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BE2722] focus:border-transparent"
                  placeholder="votre.email@exemple.com"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#BE2722] text-white font-semibold py-4 px-6 rounded-lg hover:bg-[#a51f1a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Inscription en cours...' : 'S\'abonner à la newsletter'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
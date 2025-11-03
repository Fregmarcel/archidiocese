"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitMessage('');

    // Simulation d'envoi
    setTimeout(() => {
      setSubmitMessage('Votre message a été envoyé avec succès !');
      setIsLoading(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        department: '',
        message: ''
      });
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const coordonnees = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Adresse",
      content: "BP 207 Yaoundé\nArchevêché de Yaoundé\nCameroun",
      color: "text-red-600"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Téléphone",
      content: "+237 222 23 32\n+237 677 89 10 11\n+237 699 23 45 67",
      color: "text-green-600"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      content: "contact@archidiocese-yaounde.org\narchevêque@archidiocese-yaounde.org\ninfo@archidiocese-yaounde.org",
      color: "text-purple-600"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Horaires de réception",
      content: "Lun - Ven: 08h00 - 17h00\nSam: 08h00 - 12h00\nDim: Fermé sauf urgences",
      color: "text-orange-600"
    }
  ];

  const departements = [
    {
      nom: "Secrétariat Général",
      responsable: "Mgr. Jean MBARGA",
      telephone: "+237 222 23 32 00",
      email: "secretariat@archidiocese-yaounde.org"
    },
    {
      nom: "Communication",
      responsable: "Abbé Paul NGUEMA",
      telephone: "+237 677 89 10 11",
      email: "communication@archidiocese-yaounde.org"
    },
    {
      nom: "Formation",
      responsable: "Sr. Marie ATANGANA",
      telephone: "+237 699 23 45 67",
      email: "formation@archidiocese-yaounde.org"
    },
    {
      nom: "Pastorale",
      responsable: "Abbé François OWONA",
      telephone: "+237 655 12 34 56",
      email: "pastorale@archidiocese-yaounde.org"
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* En-tête Hero */}
      <section className="bg-gradient-to-r from-gray-100 to-gray-200 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Contactez-Nous
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nous sommes à votre écoute. N'hésitez pas à nous faire part de vos questions,
            préoccupations ou demandes de renseignements.
          </p>
        </div>
      </section>

      {/* Section Nos Coordonnées */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Nos Coordonnées
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Retrouvez toutes les informations pour nous contacter facilement
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coordonnees.map((coord, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-white ${coord.color} mb-4 shadow-md`}>
                  {coord.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{coord.title}</h3>
                <div className="text-gray-600 whitespace-pre-line text-sm leading-relaxed">
                  {coord.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Formulaire et Départements */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Formulaire de Contact */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Envoyez-nous un Message
              </h2>
              
              {submitMessage && (
                <div className="mb-6 p-4 bg-green-100 border border-green-300 text-green-700 rounded-lg">
                  {submitMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BE2722] focus:border-transparent"
                      placeholder="Votre prénom"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BE2722] focus:border-transparent"
                      placeholder="Votre nom"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
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

                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                    Département concerné
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BE2722] focus:border-transparent"
                  >
                    <option value="">Sélectionnez un département</option>
                    <option value="secretariat">Secrétariat Général</option>
                    <option value="communication">Communication</option>
                    <option value="formation">Formation</option>
                    <option value="pastorale">Pastorale</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BE2722] focus:border-transparent resize-vertical"
                    placeholder="Votre message..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#BE2722] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#a51f1a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Envoi en cours...' : 'Envoyer le message'}
                </button>
              </form>
            </div>

            {/* Nos Départements */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Nos Départements
              </h2>
              
              <div className="space-y-6">
                {departements.map((dept, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{dept.nom}</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><span className="font-medium">Responsable:</span> {dept.responsable}</p>
                      <p><span className="font-medium">Téléphone:</span> {dept.telephone}</p>
                      <p><span className="font-medium">Email:</span> {dept.email}</p>
                    </div>
                  </div>
                ))}
                
                {/* Urgences Pastorales */}
                <div className="bg-[#BE2722] text-white p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">🚨 Urgences Pastorales</h3>
                  <p className="text-sm mb-2">
                    Pour toute urgence pastorale (derniers sacrements, situations d'urgence)
                  </p>
                  <p className="font-semibold">+237 699 00 00 00</p>
                  <p className="text-sm">Disponible 24h/24</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Localisation */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Nous Localiser
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Venez nous rendre visite à l'Archevêché situé dans la ville de Yaoundé
          </p>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-200 rounded-lg overflow-hidden" style={{ height: '400px' }}>
              {/* Carte placeholder - En production, vous pourriez utiliser Google Maps ou Mapbox */}
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Carte Interactive</h3>
                  <p className="text-gray-600">Archevêché de Yaoundé</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Intégration de carte à venir
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 bg-[#BE2722] text-white px-6 py-3 rounded-lg">
                <MapPin className="w-5 h-5" />
                <span className="font-semibold">Archevêché de Yaoundé, BP 207 Yaoundé, Cameroun</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

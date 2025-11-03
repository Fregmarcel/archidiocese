import Image from "next/image";

export default function AProposPage() {
  const stats = [
    { number: "85", label: "Paroisses", color: "text-blue-600" },
    { number: "120", label: "Prêtres", color: "text-green-600" },
    { number: "200+", label: "Religieux", color: "text-red-600" },
    { number: "2M+", label: "Fidèles", color: "text-purple-600" }
  ];

  const foundements = [
    {
      icon: "🙏",
      title: "Foi et Spiritualité",
      description: "L'Archidiocèse de Yaoundé place la foi et la spiritualité au cœur de sa mission, guidant les fidèles dans leur cheminement spirituel."
    },
    {
      icon: "❤️",
      title: "Service et Charité",
      description: "Nous nous engageons à servir les plus démunis et à promouvoir la charité chrétienne dans toutes nos actions."
    },
    {
      icon: "📚",
      title: "Éducation et Formation",
      description: "L'éducation est un pilier fondamental de notre mission, formant les jeunes et les adultes dans la foi et la connaissance."
    }
  ];

  const engagements = [
    {
      icon: "🏥",
      title: "Santé",
      description: "Gestion d'hôpitaux et centres de santé pour servir les communautés locales.",
      color: "bg-blue-100 text-blue-800"
    },
    {
      icon: "🎓",
      title: "Éducation",
      description: "Écoles, collèges et universités pour l'éducation de qualité accessible à tous.",
      color: "bg-green-100 text-green-800"
    },
    {
      icon: "🤝",
      title: "Action Sociale",
      description: "Programmes d'aide aux plus démunis et de développement communautaire.",
      color: "bg-purple-100 text-purple-800"
    }
  ];

  const gallery = [
    { id: 1, src: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=400&h=300&fit=crop", alt: "Cathédrale de Yaoundé" },
    { id: 2, src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop", alt: "Grand Séminaire" },
    { id: 3, src: "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=400&h=300&fit=crop", alt: "Vie paroissiale" },
    { id: 4, src: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=400&h=300&fit=crop", alt: "Groupe de jeunes" },
    { id: 5, src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop", alt: "Œuvre caritative" },
    { id: 6, src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop", alt: "Éducation catholique" }
  ];

  return (
    <main className="min-h-screen">
      {/* Section principale avec image et texte */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                À Propos de Nous
              </h1>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                L'Archidiocèse de Yaoundé est une circonscription ecclésiastique de l'Église catholique 
                au Cameroun, établie en 1955. Nous servons plus de 2 millions de fidèles à travers 
                85 paroisses dans la région du Centre.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Notre mission est d'annoncer l'Évangile, de célébrer les sacrements et de servir 
                les plus démunis dans l'esprit du Christ. Nous nous engageons dans l'éducation, 
                la santé et l'action sociale pour le développement intégral de l'homme.
              </p>
              <div className="flex gap-4">
                <button className="bg-[#BE2722] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#a51f1a] transition-colors">
                  Notre Histoire
                </button>
                <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Contact
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-[#BE2722] rounded-2xl p-8 relative">
                <Image
                  src="https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?w=400&h=500&fit=crop"
                  alt="Archevêque de Yaoundé"
                  width={400}
                  height={500}
                  className="rounded-lg object-cover w-full h-[500px]"
                />
                <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">En service depuis 1955</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section L'Archidiocèse en Chiffres */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            L'Archidiocèse en Chiffres
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-4xl lg:text-5xl font-bold ${stat.color} mb-2`}>
                  {stat.number}
                </div>
                <div className="text-gray-300 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Nos Fondements */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-4">
            Nos Fondements
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Les valeurs qui guident notre mission et notre engagement envers les fidèles
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {foundements.map((item, index) => (
              <div key={index} className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Galerie */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-4">
            Notre Archidiocèse en Images
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Découvrez la vie et les activités de notre archidiocèse
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((image) => (
              <div key={image.id} className="relative group cursor-pointer overflow-hidden rounded-lg">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={300}
                  className="object-cover w-full h-64 group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-semibold">{image.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Notre Organisation */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-12">
            Notre Organisation
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Direction Spirituelle</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Archevêque Métropolitain</li>
                  <li>• Évêques Auxiliaires</li>
                  <li>• Vicaires Généraux</li>
                  <li>• Conseil Presbytéral</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Services Diocésains</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Économat Général</li>
                  <li>• Tribunal Ecclésiastique</li>
                  <li>• Pastorale des Jeunes</li>
                  <li>• Action Caritas</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Nos Engagements Concrets */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-12">
            Nos Engagements Concrets
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {engagements.map((engagement, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${engagement.color} text-2xl mb-6`}>
                  {engagement.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{engagement.title}</h3>
                <p className="text-gray-600 leading-relaxed">{engagement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Rejoindre Notre Communauté */}
      <section className="bg-[#BE2722] py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Rejoindre Notre Communauté
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Venez découvrir la richesse de notre foi et participer à la vie de notre archidiocèse
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#BE2722] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Trouver une Paroisse
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#BE2722] transition-colors">
              Nous Contacter
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

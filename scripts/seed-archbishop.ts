/**
 * Script pour insérer les données de l'archevêque dans MongoDB
 * Exécuter avec: npx tsx scripts/seed-archbishop.ts
 */

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://archidiocese:archidiocese123456@cluster0.0av3uwn.mongodb.net';
const MONGODB_DB = process.env.MONGODB_DB || 'archidiocese';

// Schéma Archbishop
const archbishopSchema = new mongoose.Schema({
  locale: { type: String, required: true },
  name: { type: String, required: true },
  title: String,
  description: String,
  portraitUrl: String,
  bibliography: [String],
  bibliographyRich: String,
  publications: [String],
  gallery: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Archbishop = mongoose.models.Archbishop || mongoose.model('Archbishop', archbishopSchema);

async function seedArchbishop() {
  try {
    console.log('🔗 Connexion à MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      dbName: MONGODB_DB
    });
    console.log('✅ Connecté à MongoDB');

    // Données de l'archevêque (version française)
    const archbishopDataFr = {
      locale: 'fr',
      name: 'Mgr Jean MBARGA',
      title: 'Archevêque Métropolitain de Yaoundé',
      description: `Pasteur dévoué et théologien reconnu, Monseigneur Jean MBARGA guide l'Archidiocèse de Yaoundé depuis 2014 avec sagesse et engagement. Son parcours exceptionnel témoigne d'une vie consacrée au service de l'Église et à l'épanouissement spirituel des fidèles.

Docteur en Théologie Morale et titulaire d'une Maîtrise en Droit Canonique, il a marqué l'Église camerounaise par ses responsabilités successives : Recteur du Grand Séminaire de Nkolbisson, Évêque d'Ébolowa-Kribi, et aujourd'hui Archevêque Métropolitain de Yaoundé.

Sa vision pastorale se caractérise par une attention particulière portée à la formation des fidèles, à l'inculturation de la foi et au dialogue entre l'Évangile et les réalités africaines contemporaines. Grand Chancelier de l'Université Catholique d'Afrique Centrale (UCAC) et fondateur de l'Institut Universitaire Catholique Sainte Thérèse de Yaoundé (INUCASTY), il œuvre inlassablement pour l'éducation et la formation intégrale de la jeunesse.

Auteur prolifique, Monseigneur MBARGA a publié de nombreux ouvrages qui enrichissent la réflexion théologique et spirituelle en Afrique. Sa devise épiscopale, tirée de l'Évangile selon Saint Jean, résume sa mission : permettre à chacun d'avoir la vie en abondance.`,
      portraitUrl: '/images/archbishop.jpg',
      bibliography: [
        '1961-1968 : École catholique de Nkol-Ewe; Nsimalen | Diplôme : C.E.P.E',
        '1968-1975 : Séminaire Saint Paul de Mbalmayo | Diplôme : Baccalauréat',
        '1975-1979 : Grand Séminaire de Nkolbisson, Yaoundé | Diplôme : Licence en Philosophie',
        '1979-1985 : Université Pontificale du Latran, Rome | Diplôme : Doctorat en Théologie Morale',
        '1985-1986 : Université Pontificale Urbanienne, Rome | Diplôme : Maîtrise en Droit Canonique'
      ],
      bibliographyRich: `<h3>Cursus Scolaire Primaire</h3>
<p><strong>1961-1968 :</strong> École catholique de Nkol-Ewe; Nsimalen</p>
<p><strong>Diplôme :</strong> C.E.P.E</p>

<h3>Cursus Scolaire Secondaire</h3>
<p><strong>1968-1975 :</strong> Séminaire Saint Paul de Mbalmayo</p>
<p><strong>Diplôme :</strong> Baccalauréat</p>

<h3>Cursus Universitaire</h3>
<p><strong>1975-1979 :</strong> Grand Séminaire de Nkolbisson, Yaoundé</p>
<p><strong>Diplôme :</strong> Licence en Philosophie</p>
<p><strong>1979-1985 :</strong> Université Pontificale du Latran, Rome</p>
<p><strong>Diplôme :</strong> Doctorat en Théologie Morale</p>
<p><strong>1985-1986 :</strong> Université Pontificale Urbanienne, Rome</p>
<p><strong>Diplôme :</strong> Maîtrise en Droit Canonique</p>

<h3>Parcours Professionnel</h3>
<ul>
<li><strong>1979 :</strong> Ordination sacerdotale</li>
<li><strong>1986-1998 :</strong> Professeur au Grand Séminaire de Nkolbisson</li>
<li><strong>1998-2002 :</strong> Vicaire Général de l'Archidiocèse de Yaoundé</li>
<li><strong>2002-2006 :</strong> Recteur du Grand Séminaire de Nkolbisson</li>
<li><strong>2006 :</strong> Nomination comme Évêque d'Ébolowa-Kribi</li>
<li><strong>2014 :</strong> Nomination comme Archevêque Métropolitain de Yaoundé</li>
</ul>

<h3>Distinctions et Responsabilités</h3>
<ul>
<li>Grand Chancelier de l'Université Catholique d'Afrique Centrale (UCAC)</li>
<li>Fondateur de l'Institut Universitaire Catholique Sainte Thérèse de Yaoundé (INUCASTY)</li>
<li>Membre de plusieurs commissions épiscopales</li>
<li>Auteur de nombreux ouvrages théologiques</li>
</ul>`,
      publications: [
        "L'art oratoire et son pouvoir en Afrique, Publications Saint-Paul, Yaoundé, 1997.",
        "L'Afrique humaine, Ed. Groupe éthique, Yaoundé, 2005.",
        "« l'Évangile et vos valeurs traditionnelles africaines » in Percorsi culturali, 2005, Urbaniana University Press",
        "« Les conséquences éthiques sur la personne humaine d'une mondialisation sans Dieu » in Percorsi culturali, 2009, Urbaniana University Press",
        "Dons de vie, Ed. Groupe éthique, Ebolowa, 2011.",
        "Il nous a parlé par les prophètes Ed. Archidiocèse de Yaoundé, 2015.",
        "Ainsi parle le Seigneur, Ed. Archidiocèse de Yaoundé, 2015.",
        "Pour toujours ta parole, Ed. Archidiocèse de Yaoundé, 2016.",
        "Paroles d'espérance, Ed. Archidiocèse de Yaoundé, 2016.",
        "Paroles de salut, Ed. Archidiocèse de Yaoundé, Yaoundé, 2018.",
        "Selon ta parole, Ed. Archidiocèse de Yaoundé, 2019.",
        "La Nouvelle École africaine : structuration et pertinence pour une Afrique nouvelle, Éd. Nleb Bekristen, 2021.",
        "L'université Catholique d'Afrique Centrale : l'auréole de son œuvre, PUCAC, Yaoundé, 2021.",
        "Saint Joseph Notre Protecteur, Ed. Archidiocèse de Yaoundé, 2021.",
        "Paroles de salut, Ed. Archidiocèse de Yaoundé, 2021.",
        "Source de vie, Ed. Archidiocèse de Yaoundé, 2023.",
        "Le Savoir-vivre ensemble. Vers une humanité plus humaine, P.U.C.A.C, 2023",
        "L'Année de Prière 2024. Année en Prière, Message de Carême 2024, Ed. Les Presses Offsets, 2024"
      ],
      gallery: []
    };

    // Vérifier si l'archevêque existe déjà
    const existing = await Archbishop.findOne({ locale: 'fr' });
    
    if (existing) {
      console.log('⚠️  L\'archevêque existe déjà dans la base de données');
      console.log('🔄 Mise à jour des données...');
      await Archbishop.updateOne({ locale: 'fr' }, { $set: archbishopDataFr });
      console.log('✅ Données mises à jour avec succès !');
    } else {
      console.log('➕ Création de l\'archevêque...');
      await Archbishop.create(archbishopDataFr);
      console.log('✅ Archevêque créé avec succès !');
    }

    console.log('\n📊 Résumé des données insérées :');
    console.log(`  - Nom: ${archbishopDataFr.name}`);
    console.log(`  - Titre: ${archbishopDataFr.title}`);
    console.log(`  - Bibliographie: ${archbishopDataFr.bibliography.length} entrées`);
    console.log(`  - Publications: ${archbishopDataFr.publications.length} ouvrages`);
    console.log(`  - Description: ${archbishopDataFr.description.length} caractères`);

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Déconnecté de MongoDB');
  }
}

// Exécuter le script
seedArchbishop();

/**
 * Script pour vérifier les données de l'archevêque dans MongoDB
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

async function checkArchbishop() {
  try {
    console.log('🔗 Connexion à MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      dbName: MONGODB_DB
    });
    console.log('✅ Connecté à MongoDB');
    console.log('📍 Base de données:', MONGODB_DB);

    // Vérifier toutes les données
    const allData = await Archbishop.find({});
    console.log('\n📊 Nombre total de documents:', allData.length);
    
    if (allData.length > 0) {
      console.log('\n📝 Documents trouvés:');
      allData.forEach((doc, index) => {
        console.log(`\n${index + 1}. ${doc.name}`);
        console.log(`   - ID: ${doc._id}`);
        console.log(`   - Locale: ${doc.locale}`);
        console.log(`   - Titre: ${doc.title}`);
        console.log(`   - Description (${doc.description?.length || 0} caractères)`);
        console.log(`   - Publications: ${doc.publications?.length || 0}`);
        console.log(`   - Bibliographie: ${doc.bibliography?.length || 0}`);
      });
    } else {
      console.log('⚠️  Aucun document trouvé dans la collection Archbishop');
    }

    // Chercher spécifiquement le français
    const frDoc = await Archbishop.findOne({ locale: 'fr' });
    if (frDoc) {
      console.log('\n✅ Document français trouvé:');
      console.log(JSON.stringify(frDoc, null, 2));
    } else {
      console.log('\n❌ Aucun document français trouvé');
    }

    await mongoose.disconnect();
    console.log('\n🔌 Déconnecté de MongoDB');
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

checkArchbishop();

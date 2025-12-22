/**
 * Script pour tester la connexion et le modèle Archbishop
 */

import dotenv from 'dotenv';
import { resolve } from 'path';

// Charger les variables d'environnement depuis .env.local
dotenv.config({ path: resolve(__dirname, '../.env.local') });

import { connectToDatabase } from '../src/lib/db';
import { Archbishop } from '../src/models/Archbishop';

async function testConnection() {
  try {
    console.log('🔗 Connexion via lib/db...');
    await connectToDatabase();
    console.log('✅ Connecté à MongoDB');

    console.log('\n📊 Test de findOne({ locale: "fr" })...');
    const doc = await Archbishop.findOne({ locale: 'fr' }).lean();
    
    if (doc) {
      console.log('✅ Document trouvé:');
      console.log(`   - ID: ${String(doc._id)}`);
      console.log(`   - Nom: ${doc.name}`);
      console.log(`   - Titre: ${doc.title}`);
      console.log(`   - Locale: ${doc.locale}`);
    } else {
      console.log('❌ Aucun document trouvé');
    }

    console.log('\n📊 Test de find() pour voir tous les documents...');
    const allDocs = await Archbishop.find({}).lean();
    console.log(`   Nombre de documents: ${allDocs.length}`);
    allDocs.forEach(d => {
      console.log(`   - ${d.name} (locale: ${d.locale})`);
    });

  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

testConnection();

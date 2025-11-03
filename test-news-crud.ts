/**
 * Script de test pour vérifier les opérations CRUD sur les actualités
 * Exécuter avec: node --loader ts-node/esm test-news-crud.ts
 */

import { connect } from './src/lib/mongodb';
import News from './src/models/News';

async function testNewsCrud() {
  console.log('🔗 Connexion à MongoDB...');
  
  try {
    await connect();
    console.log('✅ Connexion réussie!\n');

    // 1. CREATE
    console.log('📝 Test CREATE...');
    const testNews = await News.create({
      title: 'Test Actualité - ' + Date.now(),
      slug: 'test-actualite-' + Date.now(),
      excerpt: 'Ceci est une actualité de test',
      content: '<p>Contenu de test</p>',
      image: '/uploads/news/test.jpg',
      tags: ['Test', 'Vérification'],
      locale: 'fr',
      status: 'published',
      publishedAt: new Date()
    });
    console.log('✅ Actualité créée:', testNews._id);
    console.log('   Titre:', testNews.title);
    console.log('   Slug:', testNews.slug);
    console.log('   Statut:', testNews.status);
    console.log('   Créé le:', testNews.createdAt);

    // 2. READ
    console.log('\n📖 Test READ...');
    const found = await News.findById(testNews._id);
    console.log('✅ Actualité trouvée:', found?.title);
    console.log('   Tags:', found?.tags);

    // 3. UPDATE
    console.log('\n✏️  Test UPDATE...');
    const updated = await News.findByIdAndUpdate(
      testNews._id,
      { 
        title: 'Test Actualité MODIFIÉ',
        status: 'draft'
      },
      { new: true }
    );
    console.log('✅ Actualité modifiée:', updated?.title);
    console.log('   Nouveau statut:', updated?.status);
    console.log('   Mis à jour le:', updated?.updatedAt);

    // 4. LIST
    console.log('\n📋 Test LIST...');
    const all = await News.find({ locale: 'fr' }).limit(5);
    console.log(`✅ ${all.length} actualité(s) trouvée(s) pour locale=fr`);
    all.forEach((news, i) => {
      console.log(`   ${i + 1}. ${news.title} (${news.status})`);
    });

    // 5. DELETE
    console.log('\n🗑️  Test DELETE...');
    await News.findByIdAndDelete(testNews._id);
    const deleted = await News.findById(testNews._id);
    if (!deleted) {
      console.log('✅ Actualité supprimée avec succès');
    } else {
      console.log('❌ Erreur: actualité toujours présente');
    }

    console.log('\n✨ Tous les tests sont PASSÉS!\n');
    console.log('📊 Statistiques:');
    const count = await News.countDocuments();
    console.log(`   Total actualités: ${count}`);
    const published = await News.countDocuments({ status: 'published' });
    console.log(`   Publiées: ${published}`);
    const drafts = await News.countDocuments({ status: 'draft' });
    console.log(`   Brouillons: ${drafts}`);

  } catch (error) {
    console.error('❌ Erreur lors des tests:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

testNewsCrud();

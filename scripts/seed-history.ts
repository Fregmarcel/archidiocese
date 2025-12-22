/**
 * Script pour insérer les données historiques dans MongoDB
 * Exécuter avec: npx tsx scripts/seed-history.ts
 */

import dotenv from 'dotenv';
import { resolve } from 'path';

// Charger les variables d'environnement
dotenv.config({ path: resolve(__dirname, '../.env.local') });

import { connectToDatabase } from '../src/lib/db';
import mongoose from 'mongoose';

async function seedHistory() {
  try {
    console.log('🔗 Connexion à MongoDB...');
    await connectToDatabase();
    const cn = mongoose.connection;
    console.log('✅ Connecté à MongoDB');
    console.log(`   ↳ Host: ${cn.host}`);
    console.log(`   ↳ DB:   ${cn.name}`);

    const collection = mongoose.connection.db?.collection('historypages');
    
    if (!collection) {
      throw new Error('Impossible de se connecter à la collection historypages');
    }

    const historyDataFr = {
      locale: 'fr',
      
      // Section I - Présentation générale - Repères historiques
      missionPresence: "1890",
      apostolicVicariate: "1931",
      archdiocesisErection: "04 septembre 1955",
      
      // I.2.2 Répartition de la population par obédience religieuse
      baptizedCatholics: 2371213,
      nonCatholicChristians: 656961,
      muslims: 122026,
      totalPopulation: 4285042,
      
      // I.1.3 Présence missionnaire
      diocesanPriests: 298,
      catechists: 3338,
      
      // I.3 Situation géographique
      geographicSituation: `L'Archidiocèse de Yaoundé est localisé dans la Région du Centre, l'une des dix Régions que compte le Cameroun. Il couvre trois (03) circonscriptions administratives : Mfoundi, Mefou-Akono et Mefou-Afamba ; lesquelles circonscriptions, appelées Départements, sont administrées par un Préfet. Chaque département est subdivisé en arrondissements. Un Maire issu des votes populaires assure la gestion de l'Arrondissement.`,
      
      // I.4 Situation stratégique
      strategicSituation: `Le Mfoundi, l'un des départements que compte l'Archidiocèse abrite la Capitale du Cameroun. Le fait du siège des institutions républicaines fait de Yaoundé un Diocèse phare au Cameroun et dans la Sous-Région de l'Afrique Centrale. La forte densité de sa population, majoritairement catholique, ajoute à ce Diocèse un poids, une responsabilité et un rôle déterminant quant à son activité pastorale et à son rayonnement à l'échelle nationale. La présence ecclésiale qu'il assure auprès des instances décisionnelles de l'État n'est pas à démontrer. Au moins une fois par an, l'Archidiocèse de Yaoundé accueille les Évêques du Cameroun dans le cadre de l'Assemblée plénière de la Conférence Épiscopale Nationale du Cameroun (CENC). En effet, le Siège de la CENC se trouve sur le territoire de l'Archidiocèse.`,
      
      // I.5 Les langues parlées
      spokenLanguages: `Les langues les plus parlées sont le français et l'anglais, preuves du caractère cosmopolite qui le définit. Cependant la population autochtone est majoritaire (Beti). La langue nationale la plus parlée reste l'Ewondo.`,
      
      // I.6 La question migratoire
      migrationIssue: `Les migrations pour le travail (Administration publique) sont les plus courantes. L'exode rural des populations venant des départements de la Mefou-Akono et de la Mefou-Afamba et d'autres déplacements sont aussi à souligner. La présence de nombreux déplacés internes venant des régions du Nord-Ouest et du Sud-Ouest du Cameroun, en raison de la crise anglophone, reste tangible. Signalons également les mouvements des populations de l'Extrême-Nord menacées par l'activité terroriste de la secte djihadiste BOKO HARAM et les déplacements venant de la partie Est du Cameroun. Un flux important d'immigrants Tchadiens et Centrafricains teinte davantage le caractère cosmopolite de Yaoundé. Les récentes inondations dans la partie septentrionale du pays ont incrémenté le chiffre des déplacés internes. Soit 63 809 déplacés internes à Yaoundé, d'après les estimations du 30 novembre 2023 (https://data.unhcr.org/fr/country/cmr). Ces différents mouvements migratoires font des paroisses de l'Archidiocèse des centres multiculturels et interculturels.`,
      
      // I.7 Le Patrimoine
      landHeritage: `Près de mille six cents (1 600 ha) hectares constituent le patrimoine foncier de l'Archidiocèse.`,
      
      infrastructures: `Le patrimoine infrastructurel comprend : 189 paroisses et centres eucharistiques pour la sanctification, l'enseignement et le gouvernement ; 75 écoles maternelles, 71 écoles primaires, 36 collèges, 02 instituts supérieurs catholiques (dont l'Institut Universitaire catholique Sainte Thérèse de Yaoundé - INUCASTY avec près de 2 700 étudiants), 03 orphelinats pour l'éducation ; 04 maisons de repos, 22 dispensaires et Centres VIH, 07 formations sanitaires pour les soins ; 03 écoles catéchétiques pour la formation des catéchistes, 01 école cathédrale pour la formation des laïcs, la Maison Nazareth pour la pastorale du mariage et de la famille. L'Archidiocèse dénombre également 9 Sanctuaires et 65 associations des laïcs et mouvements d'action catholique.`,
      
      // Conclusion
      conclusion: `La dynamique impulsée dans le Diocèse fait de ce dernier un champ de mission permanente ; faisant de son responsable et ses collaborateurs, des ouvriers très actifs pour la Vigne du Seigneur. Au regard du travail considérable réalisé jusque-là, et de ce qui est encore à accomplir, un seul constat se dégage, celui que fit le Christ lui-même : « la moisson est abondante mais les ouvriers peu nombreux » ; il faut redoubler d'ardeur dans la prière pour que le Maître pourvoie encore des ouvriers à sa moisson (Lc 10, 2).`,
      
      updatedAt: new Date()
    };

    const existing = await collection.findOne({ locale: 'fr' });
    
    if (existing) {
      console.log('⚠️  Les données historiques existent déjà dans la base de données');
      console.log('🔄 Mise à jour des données...');
    }

    const result = await collection.findOneAndUpdate(
      { locale: 'fr' },
      { $set: historyDataFr },
      { upsert: true, returnDocument: 'after' }
    );

    const doc = (result && 'value' in result ? (result as any).value : result) as any;

    if (!doc) {
      throw new Error('Échec de la mise à jour des données');
    }

    console.log('✅ Données historiques mises à jour avec succès !');
    console.log('\n📊 Résumé des données insérées :');
    console.log(`  - Prêtres diocésains: ${doc.diocesanPriests}`);
    console.log(`  - Catéchistes: ${doc.catechists}`);
    console.log(`  - Catholiques baptisés: ${Number(doc.baptizedCatholics).toLocaleString()}`);
    console.log(`  - Population totale: ${Number(doc.totalPopulation).toLocaleString()}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

seedHistory();

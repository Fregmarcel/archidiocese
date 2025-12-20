/**
 * Script pour insérer les données historiques dans MongoDB
 * Exécuter avec: npx tsx scripts/seed-history.ts
 */

import dotenv from 'dotenv';
import { resolve } from 'path';

// Charger les variables d'environnement
dotenv.config({ path: resolve(__dirname, '../.env.local') });

import { connectToDatabase } from '../src/lib/db';
import { HistoryPage } from '../src/models/HistoryPage';

async function seedHistory() {
  try {
    console.log('🔗 Connexion à MongoDB...');
    await connectToDatabase();
    console.log('✅ Connecté à MongoDB');

    const historyDataFr = {
      locale: 'fr',
      
      // Section I - Présentation générale
      missionPresence: "1890",
      apostolicVicariate: "1931",
      archdiocesisErection: "04 septembre 1955",
      
      departments: [
        { name: "Mfoundi", superficie: "297 km²", arrondissements: 7, population: 3975036 },
        { name: "Mefou-Afamba", superficie: "3 338 km²", arrondissements: 8, population: 192821 },
        { name: "Mefou-Akono", superficie: "1 329 km²", arrondissements: 4, population: 131648 }
      ],
      
      baptizedCatholics: 2371213,
      nonCatholicChristians: 656961,
      muslims: 122026,
      revivalChurches: 199953,
      neoPagans: 4,
      undefinedReligion: 934985,
      totalPopulation: 4285042,
      
      diocesanPriests: 298,
      priestsStudyingLocal: 32,
      priestsStudyingAbroad: 37,
      fideiDonumPriests: 10,
      totalPriests: 298,
      receivedFideiDonum: 20,
      religiousPriests: 253,
      religiousBrothers: 12,
      religiousSisters: 1174,
      catechists: 3338,
      
      geographicSituation: "L'Archidiocèse de Yaoundé est localisé dans la Région du Centre, l'une des dix Régions que compte le Cameroun. Il couvre trois (03) circonscriptions administratives : Mfoundi, Mefou-Akono et Mefou-Afamba ; lesquelles circonscriptions, appelées Départements, sont administrées par un Préfet. Chaque département est subdivisé en arrondissements. Un Maire issu des votes populaires assure la gestion de l'Arrondissement.",
      
      strategicSituation: "Le Mfoundi, l'un des départements que compte l'Archidiocèse abrite la Capitale du Cameroun. Le fait du siège des institutions républicaines fait de Yaoundé un Diocèse phare au Cameroun et dans la Sous-Région de l'Afrique Centrale. La forte densité de sa population, majoritairement catholique, ajoute à ce Diocèse un poids, une responsabilité et un rôle déterminant quant à son activité pastorale et à son rayonnement à l'échelle nationale.",
      
      spokenLanguages: "Les langues les plus parlées sont le français et l'anglais, preuves du caractère cosmopolite qui le définit. Cependant la population autochtone est majoritaire (Beti). La langue nationale la plus parlée reste l'Ewondo.",
      
      migrationIssue: "Les migrations pour le travail (Administration publique) sont les plus courantes. L'exode rural des populations venant des départements de la Mefou-Akono et de la Mefou-Afamba et d'autres déplacements sont aussi à souligner. La présence de nombreux déplacés internes venant des régions du Nord-Ouest et du Sud-Ouest du Cameroun, en raison de la crise anglophone, reste tangible. Signalons également les mouvements des populations de l'Extrême-Nord menacées par l'activité terroriste de la secte djihadiste BOKO HARAM.",
      
      landHeritage: "Près de mille six cents (1 600 ha) hectares constituent le patrimoine foncier de l'Archidiocèse",
      
      infrastructures: "189 paroisses et centres eucharistiques, 75 écoles maternelles, 71 écoles primaires, 36 collèges, 02 instituts supérieurs catholiques, 03 orphelinats, 04 maisons de repos, 22 dispensaires et Centres VIH, 07 formations sanitaires, 03 écoles catéchétiques, 01 école cathédrale, l'Institut Universitaire catholique Sainte Thérèse de Yaoundé, la Maison Nazareth (Pastorale du mariage et de la famille)",
      
      humanCapital: "Le capital humain de l'Archidiocèse de Yaoundé est important et diversifié. Les compétences, au sein de son presbyterium, vont des sciences sacrées aux sciences profanes. Les diverses compétences acquises dans les domaines et les champs variés favorisent une évangélisation adaptée aux questions du monde de notre temps.",
      
      spiritualHeritage: "L'Archidiocèse dénombre 189 paroisses qui constituent ses dix-neuf (19) Zones pastorales, neuf (09) Sanctuaires qui stimulent et encadrent la piété populaire en plein essor.",
      
      sanctuaries: [
        { name: "Marie Reine des Apôtres", location: "Mvolyé", department: "Mfoundi", pastoralZone: "Mvolyé", erectionYear: "10 décembre 2006" },
        { name: "Marie Reine de la Paix", location: "Nsimalen", department: "Mfoundi", pastoralZone: "Nsimalen", erectionYear: "13 mai 2016" },
        { name: "Saint Joseph", location: "Esse", department: "Mefou-Afamba", pastoralZone: "Esse", erectionYear: "1er août 2015" },
        { name: "Marie Médiatrice", location: "Etoudi", department: "Mfoundi", pastoralZone: "Etoudi", erectionYear: "08 avril 2018" },
        { name: "Sacré-Cœur", location: "Mokolo", department: "Mfoundi", pastoralZone: "Mokolo", erectionYear: "11 juillet 2012" },
        { name: "Notre Dame de Lourdes", location: "Mont-Febe", department: "Mfoundi", pastoralZone: "Nkolbisson", erectionYear: "2018" },
        { name: "Très Saint Rosaire", location: "Messa-Mvele", department: "Mefou-Afamba", pastoralZone: "Awae", erectionYear: "11 octobre 2019" },
        { name: "De la Miséricorde Divine", location: "Nkol-Melen", department: "Mefou-Akono", pastoralZone: "Akono", erectionYear: "10 août 2021" },
        { name: "Saint Joseph travailleur", location: "Omvan", department: "Mefou-Afamba", pastoralZone: "Nkoabang", erectionYear: "1939" }
      ],
      
      associations: [
        { platform: "Christique", count: 12 },
        { platform: "Mariale", count: 20 },
        { platform: "Du Saint-Esprit", count: 7 },
        { platform: "De Saint Joseph", count: 2 },
        { platform: "Des Saints", count: 12 },
        { platform: "Des Mouvements d'Action Catholique", count: 8 },
        { platform: "Des Lecteurs", count: 1 },
        { platform: "Des Enfants de Chœur", count: 1 },
        { platform: "Des Chorales", count: 1 },
        { platform: "Des Catéchistes", count: 1 }
      ],
      
      mfoundiAnalysis: "Forces : 3 975 036 habitants, Patrimoine foncier valorisé, 09 zones pastorales, 99 paroisses, 05 sanctuaires, Siège des Institutions nationales, Réseau routier assez étendu, Population majoritairement catholique, Présence de nombreuses écoles catholiques, Capital humain disponible, Communication facile.\n\nFaiblesses : Superficie 297 km², Zone surpeuplée, Plan d'urbanisation à revoir, Sous scolarisation de la jeunesse, Chômage, Problématiques liées aux phénomènes de drogue et alcoolisme dans la population jeune.\n\nOpportunités : Opportunités d'Emploi plus faciles, Présence des nombreuses Universités, Présence de l'UCAC et de l'INUCASTY, Accessibilité aux soins.\n\nMenaces : Foisonnement de nouveaux mouvements religieux, Menace d'expropriation foncière par voie frauduleuse, Délinquance juvénile.",
      
      mefouAfambaAnalysis: "Forces : Superficie 3 338 km², 140 442 habitants, Patrimoine foncier, Zone de repeuplement, 06 zones pastorales, 60 paroisses, 03 sanctuaires, Infrastructures routières importantes, Population majoritairement catholique, Culture du Cacao et du café.\n\nFaiblesses : Réseau routier peu dense, Patrimoine foncier faiblement mis en valeur, Sous scolarisation de la jeunesse, Exode rural des jeunes, Problématiques liées à la ruralité.\n\nOpportunités : Proximité avec Yaoundé, Présence de l'Université de Yaoundé II (SOA), Transfert des Brasseries du Cameroun, Construction d'hôpitaux de référence, Construction de 5000 logements sociaux à Nkoabang.\n\nMenaces : Forte présence des populations musulmanes, Menace d'expropriation foncière.",
      
      mefouAkonoAnalysis: "Forces : Superficie 1 329 km², 57 051 habitants, Patrimoine foncier, 04 zones pastorales, 30 paroisses, 01 sanctuaire, La grande mythique Église d'Akono (UNESCO), Population majoritairement catholique, Présence du Grand Séminaire provincial de philosophie, Culture du palmier à huile.\n\nFaiblesses : Réseau routier peu dense, Patrimoine foncier faiblement mis en valeur, Sous scolarisation de la jeunesse, Exode rural des jeunes.\n\nOpportunités : Proximité avec Yaoundé, Port sec de NGOUMOU, Grand Complexe sportif de la CAF, Présence de CIMENCAM, DANGOTE.\n\nMenaces : Nombreux projets financés par la banque Islamique de développement, Menace d'expropriation foncière.",
      
      teachingAction: {
        title: "L'ENSEIGNEMENT",
        description: "Mission d'enseignement auprès de toutes les couches de la population",
        programs: [
          {
            name: "Catéchèse",
            target: "Tous les fidèles de l'Archidiocèse",
            actions: "Lettre du Carême, Homélies de l'Année",
            actors: "Mgr Jean MBARGA, Prêtres, Religieux, Religieuses",
            collaborators: "Catéchistes et responsables des Associations"
          },
          {
            name: "École cathédrale",
            target: "Fidèles",
            actions: "Enseignements théologiques",
            actors: "Prêtres, Religieux et Religieuses",
            collaborators: "Experts laïcs"
          },
          {
            name: "Formation chrétienne et humaine",
            target: "La jeunesse",
            actions: "Création des formations scolaires catholiques",
            actors: "Mgr Jean Mbarga",
            collaborators: "Secrétariat Diocésain à l'Éducation"
          }
        ]
      },
      
      sanctificationAction: {
        title: "LA SANCTIFICATION",
        description: "Mission de sanctification du peuple de Dieu",
        programs: [
          {
            name: "Impulsion de la vie de dévotion",
            target: "Tous les fidèles de l'Archidiocèse",
            actions: "Annonce de l'année de dévotion, organisation des pèlerinages diocésains (07 par an)",
            actors: "Mgr Jean Mbarga",
            collaborators: "Prêtres, Religieux, Religieuses, Catéchistes et responsables des Associations"
          },
          {
            name: "Pastorale de proximité",
            target: "Fidèles",
            actions: "Créations des paroisses et Centres Eucharistiques, Ordinations sacerdotales",
            actors: "Mgr Jean Mbarga",
            collaborators: "Prêtres, Religieux et Religieuses, responsables des maisons de formation"
          },
          {
            name: "Administration des sacrements",
            target: "Les fidèles",
            actions: "Visites pastorales",
            actors: "Mgr Jean Mbarga, Les Vicaires Généraux, les prêtres",
            collaborators: "Les catéchistes"
          }
        ]
      },
      
      governmentAction: {
        title: "LE GOUVERNEMENT",
        description: "Organisation et gouvernement du diocèse",
        programs: [
          {
            name: "Réforme de la Curie",
            target: "Diocèse",
            actions: "Élaboration du Coutumier diocésain, Élaboration d'un plan pastoral, Élaboration des guides de l'aumônier",
            actors: "Mgr Jean Mbarga",
            collaborators: "Modérateurs diocésains, Vicaires généraux, Chanceliers"
          }
        ]
      },
      
      moderators: [
        "Mgr Jean-Claude EKOBENA",
        "Abbé Jacques Philippe TSALA TSALA",
        "Mgr Joseph AKONGA ESSOMBA"
      ],
      
      vicarsGeneral: [
        "Mgr Gabriel François Xavier MINTSA NDO",
        "Mgr Blaise Pascal FANGA MBEGA",
        "Mgr André Marie NKO'O EDJIMBI",
        "Mgr Daniel EWOLO BODO"
      ],
      
      chancellors: [
        "Abbé Sylvestre Dieudonné OMGBA ESSOMBA"
      ],
      
      episcopalVicars: 24,
      
      galleryImages: [
        "/images/history/petit-seminaire-akono.jpg",
        "/images/history/college-stoll-akono.jpg",
        "/images/history/visite-archeveque.jpg",
        "/images/history/complexe-sportif.jpg"
      ],
      
      conclusion: "La dynamique impulsée dans le Diocèse fait de ce dernier un champ de mission permanente ; faisant de son responsable et ses collaborateurs, des ouvriers très actifs pour la Vigne du Seigneur. Au regard du travail considérable réalisé jusque-là, et de ce qui est encore à accomplir, un seul constat se dégage, celui que fit le Christ lui-même : « la moisson est abondante mais les ouvriers peu nombreux » ; il faut redoubler d'ardeur dans la prière pour que le Maître pourvoie encore des ouvriers à sa moisson (Lc 10, 2)"
    };

    const existing = await HistoryPage.findOne({ locale: 'fr' });
    
    if (existing) {
      console.log('⚠️  Les données historiques existent déjà dans la base de données');
      console.log('🔄 Mise à jour des données...');
    }

    const result = await HistoryPage.findOneAndUpdate(
      { locale: 'fr' },
      historyDataFr,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log('✅ Données historiques mises à jour avec succès !');
    console.log('\n📊 Résumé des données insérées :');
    console.log(`  - Départements: ${result.departments.length}`);
    console.log(`  - Sanctuaires: ${result.sanctuaries.length}`);
    console.log(`  - Associations: ${result.associations.length}`);
    console.log(`  - Prêtres diocésains: ${result.diocesanPriests}`);
    console.log(`  - Catéchistes: ${result.catechists}`);
    console.log(`  - Images de galerie: ${result.galleryImages.length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

seedHistory();

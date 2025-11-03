import { NextRequest, NextResponse } from 'next/server';
import { connect } from '../../../../lib/mongodb';
import CurieMember from '../../../../models/CurieMember';

// Données existantes à migrer
const existingMembers = [
  {
    name: "Mgr Gabriel François Xavier MINTSA NDO",
    role: "ARCHEVÊQUE MÉTROPOLITAIN",
    subtitle: "Archevêque Métropolitain de Yaoundé",
    image: "/curie-0.jpg",
    biography: "Mgr Gabriel François Xavier MINTSA NDO est Archevêque Métropolitain de Yaoundé depuis le 14 avril 2013. Docteur en Droit Canon, il a été Évêque de Kribi de 2009 à 2013. Président de la Conférence Épiscopale Nationale du Cameroun (CENC), il guide l'Archidiocèse avec sagesse et dévouement.",
    email: "archeveche@archidioceseyaounde.org",
    phone: "+237 222 23 24 25",
    address: "Archevêché de Yaoundé, BP 644, Yaoundé - Cameroun",
    ordination: "Ordonné prêtre le 29 avril 1990 à la Cathédrale Notre-Dame des Victoires de Yaoundé",
    education: [
      "Doctorat en Droit Canon - Université Pontificale Urbaniana, Rome (2001-2002)",
      "Licence Canonique en Droit Canon - Université Pontificale Urbaniana, Rome (1996-1998)",
      "Baccalauréat Canonique en Théologie - Grand Séminaire Saint Cyprien de Ngoya (1986-1990)",
      "DUES en Philosophie - Grand Séminaire Saint Cyprien de Ngoya (1984-1986)",
      "Baccalauréat A4 Allemand - Lycée d'Ebolowa (1981-1984)",
      "BEPC - CES d'Ebolowa (1977-1981)",
      "CEPE - École Primaire Catholique d'Ebolowa (1970-1977)"
    ],
    ministries: [
      "Archevêque Métropolitain de Yaoundé (14 avril 2013-présent)",
      "Président de la Conférence Épiscopale Nationale du Cameroun (CENC)",
      "Membre du Conseil Pontifical pour les Textes Législatifs",
      "Évêque de Kribi (2009-2013)",
      "Chancelier de l'Archidiocèse de Yaoundé (2005-2009)",
      "Curé de la Paroisse Saint Paul de Nkol-Eton (2002-2005)",
      "Secrétaire Particulier de Mgr Jean Zoa (1998-2001)",
      "Curé de la Paroisse Saint Joseph de Bengbis (1992-1996)",
      "Vicaire à la Paroisse Sainte Thérèse de Mfou (1990-1992)"
    ],
    isActive: true,
    displayOrder: 1
  },
  {
    name: "Mgr Blaise Pascal FANGA MBEGA",
    role: "VICAIRE GÉNÉRAL",
    subtitle: "Vicaire Général chargé de l'Apostolat des laïcs",
    image: "/curie-1.jpg",
    biography: "Mgr Blaise Pascal FANGA MBEGA est Vicaire Général chargé de l'Apostolat des laïcs depuis 2018. Membre de la Société de l'Apostolat Catholique (Pallottins), il est également Président de la Commission de Liturgie et Professeur de Théologie. Médaillé du Souverain Pontife en 2016.",
    email: "vicaire.general@archidioceseyaounde.org",
    phone: "+237 222 23 24 26",
    address: "Vicariat Général, Archidiocèse de Yaoundé, Cameroun",
    ordination: "Vœux perpétuels le 2 octobre 1999, ordonné prêtre le 29 avril 2000 à la Basilique Marie-Reine-des-Apôtres de Mvolyé",
    education: [
      "Master of Advanced Studies in Theology and Religion - Katholieke Universiteit Leuven, Belgique (2013-2014)",
      "Master in Theology and Religious Studies - Katholieke Universiteit Leuven, Belgique (2012-2013)",
      "Diplôme en Catéchèse et Pastoral - Institut International Lumen Vitae (2011-2012)",
      "Formation en Informatique (Data Capturer) - UCO, Afrique du Sud (2006-2007)",
      "Baccalauréat Canonique - ETSC de Ngoya (1994-1998)",
      "Baccalauréat Canonique - IPSJM (1992-1994)",
      "Propédeutique - IPSJM (1991)",
      "Noviciat - IPSJM (01/10/1990)",
      "1er Baccalauréat A - Collège de la Retraite Butare, Rwanda (1988-1990)",
      "Probatoire A - Lycée Bilingue de Yaoundé (1986-1988)",
      "BEPC - CES d'Esse (1981-1986)",
      "CEPE - École Catholique Saint Innocent d'Offoum Nselek (1974-1981)"
    ],
    ministries: [
      "Vicaire Général chargé de l'Apostolat des laïcs - Archidiocèse de Yaoundé (depuis 2018)",
      "Président de la Commission de Liturgie - Province Très Sainte Trinité du Cameroun (Pallottins) (depuis décembre 2023)",
      "Professeur de Théologie - École Théologique Saint Cyprien de Ngoya (depuis 2016)"
    ],
    isActive: true,
    displayOrder: 2
  },
  {
    name: "Mgr André Marie NKO'O EDJIMBI",
    role: "VICAIRE GÉNÉRAL",
    subtitle: "Curé-Recteur de la Cathédrale Notre Dame des Victoires",
    image: "/curie-2.jpg",
    biography: "Mgr André Marie NKO'O EDJIMBI est Vicaire Général et Curé-Recteur de la Cathédrale Notre Dame des Victoires depuis 2024. Docteur en Théologie Morale des Sciences du Mariage et de la Famille, il a une riche expérience pastorale et administrative au sein de l'Archidiocèse de Yaoundé.",
    email: "vicaire.general2@archidioceseyaounde.org",
    phone: "+237 222 23 24 27",
    address: "Cathédrale Notre Dame des Victoires, Yaoundé - Cameroun",
    ordination: "Ordonné diacre le 9 décembre 2006, ordonné prêtre le 7 juillet 2007 à la Cathédrale Notre Dame des Victoires Yaoundé",
    education: [
      "Doctorat en Théologie Morale des Sciences du Mariage et de la Famille - Université du Latran : Institut Jean Paul II de Rome (2015-2019)"
    ],
    ministries: [
      "Curé-Recteur de la Cathédrale Notre Dame des Victoires (2024-présent)",
      "Vicaire Général de l'Archidiocèse de Yaoundé (août 2018-présent)"
    ],
    isActive: true,
    displayOrder: 3
  },
  {
    name: "Mgr Daniel EWOLO BODO",
    role: "VICAIRE GÉNÉRAL",
    subtitle: "Vicaire Général - Curé de Ste Thérèse de Mbenda",
    image: "/curie-3.jpg",
    biography: "Mgr Daniel EWOLO BODO est Vicaire Général de l'Archidiocèse de Yaoundé depuis 2015 et Curé de la Paroisse Ste Thérèse de l'Enfant Jésus de Mbenda depuis 2021. Docteur en Droit Canonique, il a une riche expérience pastorale et administrative, notamment au Tchad et dans l'Archidiocèse de Yaoundé.",
    email: "vicaire.general3@archidioceseyaounde.org",
    phone: "+237 222 23 24 29",
    address: "Paroisse Ste Thérèse de l'Enfant Jésus de Mbenda, Yaoundé - Cameroun",
    ordination: "Ordonné prêtre le 14 mai 2005 à la Basilique Marie Reine des Apôtres Mvolyé",
    education: [
      "Doctorant en Droit privé - Université Catholique d'Afrique Centrale, Faculté des Sciences juridiques et politiques (2021-présent)",
      "Licence canonique en Droit canonique - Université Catholique d'Afrique Centrale, Département de Droit Canonique (2010-2013)"
    ],
    ministries: [
      "Vicaire Général de l'Archidiocèse de Yaoundé (depuis 2015)",
      "Curé de la Paroisse Ste Thérèse de l'Enfant Jésus de Mbenda (depuis 2021)"
    ],
    publications: [
      "La préparation au sacrement de mariage. Pour construire et reconstruire un mariage heureux, Yaoundé, Saint Paul, 2020",
      "Les paroisses personnelles dans l'Archidiocèse de Yaoundé : Défis et perspectives, Yaoundé, Presses de l'UCAC, 2015"
    ],
    isActive: true,
    displayOrder: 4
  },
  {
    name: "Mgr Sylvestre Dieudonné OMGBA ESSOMBA",
    role: "CHANCELIER",
    subtitle: "Chancelier de l'Archidiocèse - Vicaire à la Cathédrale",
    image: "/curie-4.jpg",
    biography: "Mgr Sylvestre Dieudonné OMGBA ESSOMBA est Chancelier de l'Archidiocèse de Yaoundé depuis 2020 et Vicaire à la Cathédrale Notre Dame des Victoires depuis 2024. Docteur en Sociologie de l'Université Pontificale Grégorienne de Rome, il allie expertise académique et engagement pastoral.",
    email: "chancelier@archidioceseyaounde.org",
    phone: "+237 222 23 24 31",
    address: "Chancellerie - Cathédrale Notre Dame des Victoires, Yaoundé - Cameroun",
    ordination: "Ordonné prêtre le 14 mai 2005 à la Basilique Marie Reine des Apôtres Mvolyé",
    education: [
      "Doctorat en Sociologie - Université Pontificale Grégorienne de Rome, Faculté des Sciences Sociales (2011-2018)"
    ],
    ministries: [
      "Chancelier de l'Archidiocèse de Yaoundé (depuis 2020)",
      "Vicaire à la Cathédrale Notre Dame des Victoires de Yaoundé (depuis 2024)"
    ],
    publications: [
      "« Morphologie du quotidien, souffrance sociale et parcours individuels au Cameroun : la mort de Monique Koumatekel, un problème social ? » in African sociological Review/Revue Africaine de Sociologie VOL 22(1) 2018",
      "« Colonial rule, political upheavals and AIDS pandemic in Malawi: A retrospective analysis (2018) in Kanien Vol. 3(1-2) 2015"
    ],
    isActive: true,
    displayOrder: 5
  }
];

export async function POST() {
  try {
    await connect();
    
    // Vérifier si les données existent déjà
    const existingCount = await CurieMember.countDocuments();
    if (existingCount > 0) {
      return NextResponse.json({
        success: false,
        message: 'Des membres de la curie existent déjà dans la base de données'
      }, { status: 400 });
    }
    
    // Insérer les données
    const insertedMembers = await CurieMember.insertMany(existingMembers);
    
    return NextResponse.json({
      success: true,
      message: `${insertedMembers.length} membres de la curie ont été importés avec succès`,
      data: insertedMembers
    });
  } catch (error) {
    console.error('Error migrating curie members:', error);
    return NextResponse.json({
      success: false,
      message: 'Erreur lors de l\'importation des membres de la curie'
    }, { status: 500 });
  }
}

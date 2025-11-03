import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import PastoralZone from '@/models/PastoralZone';
import Parish from '@/models/Parish';

export async function POST(request: NextRequest) {
  try {
    await connect();

    // Supprimer les données existantes
    await PastoralZone.deleteMany({});
    await Parish.deleteMany({});

    // Créer les zones pastorales
    const zones = [
      {
        name: "Zone pastorale d'Awae",
        description: "Zone pastorale regroupant les paroisses autour d'Awae, offrant un accompagnement spirituel et des services communautaires aux fidèles de la région.",
        numberOfParishes: 2,
        coordinator: "Abbé Martin ESSOMBA",
        coordinatorPhone: "+237 677 89 12 34",
        coordinatorEmail: "awae@archidiocese-yaounde.org",
        address: "Awae, Région du Centre"
      },
      {
        name: "Zone pastorale d'Emana",
        description: "Zone pastorale d'Emana desservant plusieurs communautés chrétiennes avec un focus sur l'évangélisation et l'éducation chrétienne.",
        numberOfParishes: 2,
        coordinator: "Abbé Pierre MANGA",
        coordinatorPhone: "+237 655 23 45 67",
        coordinatorEmail: "emana@archidiocese-yaounde.org",
        address: "Emana, Région du Centre"
      },
      {
        name: "Zone pastorale de Talinga",
        description: "Zone pastorale de Talinga engagée dans le développement social et spirituel des communautés rurales et urbaines.",
        numberOfParishes: 2,
        coordinator: "Abbé Jean NKOMO",
        coordinatorPhone: "+237 699 34 56 78",
        coordinatorEmail: "talinga@archidiocese-yaounde.org",
        address: "Talinga, Région du Centre"
      },
      {
        name: "Zone pastorale de Nkolbisson",
        description: "Zone pastorale de Nkolbisson axée sur l'accompagnement des jeunes et des familles dans leur cheminement spirituel.",
        numberOfParishes: 2,
        coordinator: "Abbé Paul ATEBA",
        coordinatorPhone: "+237 677 45 67 89",
        coordinatorEmail: "nkolbisson@archidiocese-yaounde.org",
        address: "Nkolbisson, Région du Centre"
      }
    ];

    const createdZones = await PastoralZone.insertMany(zones);

    // Créer les paroisses
    const parishes = [
      // Zone d'Awae
      {
        name: "Paroisse Saint-Joseph d'Awae",
        description: "Paroisse dynamique au cœur d'Awae, engagée dans l'évangélisation et le service des plus démunis. Notre communauté accueille tous les fidèles dans un esprit de fraternité chrétienne.",
        pastoralZone: createdZones[0]._id.toString(),
        pastor: "Abbé François EYENE",
        vicePastor: "Abbé Marc BELA",
        address: "Quartier Awae Centre, BP 156 Awae",
        phone: "+237 222 234 567",
        email: "stjoseph.awae@gmail.com",
        founded: new Date("1985-03-15"),
        massSchedule: {
          weekdays: "Lundi à Vendredi: 6h00",
          saturday: "Samedi: 18h00",
          sunday: "Dimanche: 7h00, 9h30, 18h00"
        },
        services: ["Baptême", "Mariage", "Catéchèse", "Visites aux malades", "Action sociale", "Chorale"],
        groups: ["Légion de Marie", "Jeunesse Étudiante Chrétienne", "Mouvement des Femmes Chrétiennes", "Enfants de chœur"],
        events: ["Fête patronale - 19 Mars", "Retraite spirituelle - Carême", "Pèlerinage marial - Mai"],
        images: [
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=400&h=300&fit=crop"
        ]
      },
      {
        name: "Paroisse Sainte-Thérèse d'Awae",
        description: "Communauté paroissiale fondée sur les valeurs de simplicité et d'amour de sainte Thérèse de Lisieux. Nous accompagnons nos fidèles dans leur croissance spirituelle.",
        pastoralZone: createdZones[0]._id.toString(),
        pastor: "Abbé Joseph MBALLA",
        address: "Awae Village, Route de Sangmelima",
        phone: "+237 677 345 678",
        email: "stetherese.awae@gmail.com",
        founded: new Date("1992-10-01"),
        massSchedule: {
          weekdays: "Mercredi et Vendredi: 6h30",
          saturday: "Samedi: 17h30",
          sunday: "Dimanche: 8h00, 10h30"
        },
        services: ["Baptême", "Confirmation", "Catéchèse des adultes", "Accompagnement des malades"],
        groups: ["Action Catholique", "Groupe de prière", "Association des mères chrétiennes"],
        events: ["Fête patronale - 1er Octobre", "Neuvaine de Noël"],
        images: [
          "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=400&h=300&fit=crop"
        ]
      },
      // Zone d'Emana
      {
        name: "Paroisse Saint-Michel d'Emana",
        description: "Paroisse sous la protection de saint Michel Archange, dédiée à la formation spirituelle et à la défense de la foi chrétienne dans notre communauté.",
        pastoralZone: createdZones[1]._id.toString(),
        pastor: "Abbé Gabriel NOAH",
        vicePastor: "Abbé David ONANA",
        address: "Emana Centre, Yaoundé",
        phone: "+237 222 345 789",
        email: "stmichel.emana@gmail.com",
        founded: new Date("1978-09-29"),
        massSchedule: {
          weekdays: "Lundi à Samedi: 6h15",
          saturday: "Samedi: 18h30",
          sunday: "Dimanche: 6h30, 9h00, 11h30, 18h30"
        },
        services: ["Baptême", "Mariage", "Funérailles", "Catéchèse", "Formation biblique", "Conseil spirituel"],
        groups: ["Renouveau Charismatique", "JEC", "Scouts Catholiques", "Chorale paroissiale", "Caritas"],
        events: ["Fête patronale - 29 Septembre", "Pèlerinage diocésain", "Semaine sainte"],
        images: [
          "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop"
        ]
      },
      {
        name: "Paroisse Sainte-Anne d'Emana",
        description: "Paroisse dédiée à sainte Anne, grand-mère de Jésus, privilégiant l'accompagnement des familles et l'éducation chrétienne des enfants.",
        pastoralZone: createdZones[1]._id.toString(),
        pastor: "Abbé Matthieu FOUDA",
        address: "Emana Carrefour, Yaoundé",
        phone: "+237 699 456 789",
        email: "steanne.emana@gmail.com",
        founded: new Date("1995-07-26"),
        massSchedule: {
          weekdays: "Mardi et Jeudi: 6h00",
          saturday: "Samedi: 17h00",
          sunday: "Dimanche: 7h30, 10h00"
        },
        services: ["Baptême", "Catéchisme des enfants", "Préparation au mariage", "Visites familiales"],
        groups: ["Mouvement Familial Chrétien", "Enfants de Marie", "Groupe des mamans"],
        events: ["Fête patronale - 26 Juillet", "Journée des familles"],
        images: [
          "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop"
        ]
      }
    ];

    const createdParishes = await Parish.insertMany(parishes);

    return NextResponse.json({
      success: true,
      message: `${createdZones.length} zones pastorales et ${createdParishes.length} paroisses ont été importées avec succès`,
      data: {
        zones: createdZones.length,
        parishes: createdParishes.length
      }
    });
  } catch (error) {
    console.error('Erreur lors de la migration:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la migration des données' },
      { status: 500 }
    );
  }
}

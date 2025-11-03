import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import RadioShow from '@/models/RadioShow';

export async function POST(request: NextRequest) {
  try {
    await connect();

    // Supprimer les émissions existantes
    await RadioShow.deleteMany({});

    // Créer les émissions de radio d'exemple
    const shows = [
      {
        title: "Messe radio du Dimanche",
        description: "Messe dominicale retransmise en direct de la Cathédrale Notre-Dame de Yaoundé avec les chants et homélies.",
        type: "recorded",
        category: "messe",
        duration: "1h10",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
        host: "Mgr. Jean-Baptiste MVONDO",
        recordedAt: new Date("2024-09-13"),
        broadcastDate: new Date("2024-09-15"),
        tags: ["messe", "dimanche", "cathedrale"]
      },
      {
        title: "Chapelet médité",
        description: "Récitation du Saint Rosaire avec méditations sur les mystères joyeux, douloureux et glorieux.",
        type: "recorded", 
        category: "predication",
        duration: "52 min",
        imageUrl: "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=400&h=300&fit=crop",
        host: "Abbé François EYENE",
        recordedAt: new Date("2024-09-07"),
        broadcastDate: new Date("2024-09-07"),
        tags: ["chapelet", "rosaire", "meditation"]
      },
      {
        title: "Magazine diocésain",
        description: "Magazine hebdomadaire présentant l'actualité de l'Archidiocèse, les événements à venir et les témoignages.",
        type: "recorded",
        category: "magazine", 
        duration: "27 min",
        imageUrl: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=400&h=300&fit=crop",
        host: "Sr. Marie ATANGANA",
        recordedAt: new Date("2024-09-02"),
        broadcastDate: new Date("2024-09-02"),
        tags: ["actualite", "diocese", "magazine"]
      },
      {
        title: "Témoignages et vocations",
        description: "Émission dédiée aux témoignages de foi et à la promotion des vocations religieuses et sacerdotales.",
        type: "recorded",
        category: "temoignage",
        duration: "43 min", 
        imageUrl: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop",
        host: "Abbé Paul NGUEMA",
        recordedAt: new Date("2024-08-25"),
        broadcastDate: new Date("2024-08-25"),
        tags: ["temoignage", "vocation", "foi"]
      }
    ];

    const createdShows = await RadioShow.insertMany(shows);

    return NextResponse.json({
      success: true,
      message: `${createdShows.length} émissions radio ont été importées avec succès`,
      data: createdShows
    });
  } catch (error) {
    console.error('Erreur lors de la migration des émissions radio:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la migration des données' },
      { status: 500 }
    );
  }
}

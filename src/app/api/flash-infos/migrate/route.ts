import { NextResponse } from 'next/server';
import { connect } from '../../../../lib/mongodb';
import FlashInfo from '../../../../models/FlashInfo';

const sampleFlashInfos = [
  {
    title: 'Passation de service',
    content: 'Passation de service à la FSJP : Le Rév. Père Dr Janvier Bertin NAMA...',
    displayOrder: 1,
    isActive: true
  },
  {
    title: 'Inscriptions sacrements',
    content: 'Annonce : Inscription aux sacrements – Calendrier 2025',
    displayOrder: 2,
    isActive: true
  },
  {
    title: 'Journée de prière',
    content: 'Communiqué : Journée de prière pour la paix diocésaine',
    displayOrder: 3,
    isActive: true
  },
  {
    title: 'Inscriptions UCAC',
    content: 'Ouverture des inscriptions UCAC – Année 2025 / 2026',
    displayOrder: 4,
    isActive: true
  },
  {
    title: 'Célébrations de Noël',
    content: 'Programme des célébrations de Noël dans l\'Archidiocèse',
    displayOrder: 5,
    isActive: true
  }
];

export async function POST() {
  try {
    await connect();

    // Supprimer les anciennes données
    await FlashInfo.deleteMany({});

    // Insérer les nouvelles données
    const flashInfos = await FlashInfo.insertMany(sampleFlashInfos);

    return NextResponse.json({
      success: true,
      message: `${flashInfos.length} flash infos ont été importées avec succès`,
      data: flashInfos
    });
  } catch (error) {
    console.error('Error migrating flash infos:', error);
    return NextResponse.json({
      success: false,
      message: 'Erreur lors de la migration des flash infos'
    }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import DiocesanService from '@/models/DiocesanService';
import Chaplaincy from '@/models/Chaplaincy';
import University from '@/models/University';
import ReligiousInstitute from '@/models/ReligiousInstitute';
import { 
  diocesanServicesData, 
  chaplainiciesData, 
  universitiesData, 
  religiousInstitutesData 
} from '@/data/seedData';

export async function POST() {
  try {
    await connect();
    
    // Clear existing data
    await DiocesanService.deleteMany({});
    await Chaplaincy.deleteMany({});
    await University.deleteMany({});
    await ReligiousInstitute.deleteMany({});
    
    // Insert seed data
    const services = await DiocesanService.insertMany(diocesanServicesData);
    const chaplaincies = await Chaplaincy.insertMany(chaplainiciesData);
    const universities = await University.insertMany(universitiesData);
    const institutes = await ReligiousInstitute.insertMany(religiousInstitutesData);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Données fictives insérées avec succès',
      data: {
        services: services.length,
        chaplaincies: chaplaincies.length,
        universities: universities.length,
        institutes: institutes.length
      }
    });
  } catch (error) {
    console.error('Error seeding data:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de l\'insertion des données' },
      { status: 500 }
    );
  }
}

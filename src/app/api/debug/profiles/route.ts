import { NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import { UserProfile } from '@/models/UserProfile';

export async function GET() {
  try {
    await connect();
    
    // Lister tous les profils utilisateur
    const profiles = await UserProfile.find({}).lean();
    
    return NextResponse.json({
      success: true,
      count: profiles.length,
      profiles: profiles.map(p => ({
        clerkId: p.clerkId,
        email: p.email,
        firstName: p.firstName,
        lastName: p.lastName,
        isAdmin: p.isAdmin,
        role: p.role
      }))
    });
  } catch (error) {
    console.error('Error listing profiles:', error);
    return NextResponse.json({
      success: false,
      message: 'Erreur lors de la récupération des profils'
    }, { status: 500 });
  }
}

export async function POST() {
  try {
    await connect();
    
    const adminEmail = 'marcellinonana530@gmail.com';
    
    // Forcer la mise à jour du profil admin
    const updatedProfile = await UserProfile.findOneAndUpdate(
      { email: adminEmail },
      {
        email: adminEmail,
        isAdmin: true,
        role: 'admin'
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      success: true,
      user: updatedProfile,
      message: `Profil admin forcé pour ${adminEmail}`
    });
  } catch (error) {
    console.error('Error forcing admin:', error);
    return NextResponse.json({
      success: false,
      message: 'Erreur lors de la mise à jour'
    }, { status: 500 });
  }
}

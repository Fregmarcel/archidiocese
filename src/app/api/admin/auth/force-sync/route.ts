import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { connect } from '@/lib/mongodb';
import { UserProfile } from '@/models/UserProfile';

export async function POST() {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse('Unauthorized', { status: 401 });

    const user = await currentUser();
    if (!user) return new NextResponse('User not found', { status: 404 });

    await connect();

    const email = user.emailAddresses[0]?.emailAddress;
    const adminEmails = (process.env.ADMIN_EMAILS || '')
      .split(',')
      .map(e => e.trim().toLowerCase())
      .filter(e => e);

    const isAdmin = email ? adminEmails.includes(email.toLowerCase()) : false;

    console.log('Force sync data:', {
      clerkId: userId,
      email: email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: isAdmin,
      adminEmails: adminEmails
    });

    // Mettre à jour ou créer le profil utilisateur
    const updatedProfile = await UserProfile.findOneAndUpdate(
      { clerkId: userId },
      {
        clerkId: userId,
        email: email,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
        isAdmin: isAdmin,
        role: isAdmin ? 'admin' : 'user'
      },
      { upsert: true, new: true }
    );

    console.log('Updated profile:', updatedProfile);

    return NextResponse.json({
      success: true,
      user: updatedProfile,
      message: `Profil synchronisé. Admin: ${isAdmin}`
    });
  } catch (error) {
    console.error('Error in force-sync:', error);
    return NextResponse.json({
      success: false,
      message: 'Erreur lors de la synchronisation',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

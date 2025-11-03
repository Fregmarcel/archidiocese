import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { connect } from '@/lib/mongodb';
import { UserProfile } from '@/models/UserProfile';

export async function GET() {
  const { userId } = await auth();
  if (!userId) return new NextResponse('Unauthorized', { status: 401 });
  
  await connect();
  
  let user = await UserProfile.findOne({ clerkId: userId }).lean();
  
  // Si l'utilisateur n'existe pas, le créer automatiquement
  if (!user) {
    const clerkUser = await currentUser();
    if (clerkUser) {
      const email = clerkUser.emailAddresses[0]?.emailAddress;
      const adminEmails = (process.env.ADMIN_EMAILS || '')
        .split(',')
        .map(e => e.trim().toLowerCase())
        .filter(e => e);

      const isAdmin = email ? adminEmails.includes(email.toLowerCase()) : false;

      user = await UserProfile.create({
        clerkId: userId,
        email: email,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        imageUrl: clerkUser.imageUrl,
        isAdmin: isAdmin,
        role: isAdmin ? 'admin' : 'user'
      });
    }
  }
  
  return NextResponse.json({ user });
}

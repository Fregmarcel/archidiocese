import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { connectToDatabase } from '@/lib/db';
import { UserProfile } from '@/models/UserProfile';

export async function POST() {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse('Unauthorized', { status: 401 });

    const user = await currentUser();
    if (!user) return new NextResponse('Unauthorized', { status: 401 });

    const email = user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress;
    const role = (user.publicMetadata?.role as string) || (user.privateMetadata?.role as string) || undefined;

    await connectToDatabase();

    const adminEmails = (process.env.ADMIN_EMAILS || '')
      .split(',')
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);
    const isAdmin = email ? adminEmails.includes(email.toLowerCase()) || role === 'admin' : role === 'admin';

    const doc = await UserProfile.findOneAndUpdate(
      { clerkId: user.id },
      {
        clerkId: user.id,
        email: email,
        firstName: user.firstName ?? undefined,
        lastName: user.lastName ?? undefined,
        imageUrl: user.imageUrl ?? undefined,
        isAdmin,
        role,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).lean();

    return NextResponse.json({ user: doc });
  } catch (e) {
    console.error('/api/admin/auth/sync error', e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { UserProfile, type IUserProfile } from '@/models/UserProfile';

export async function middleware(req: Request) {
  const { userId } = await auth();
  if (!userId) return new NextResponse('Unauthorized', { status: 401 });
  await connectToDatabase();
  const user = await UserProfile.findOne({ clerkId: userId }).lean<IUserProfile | null>();
  if (!user?.isAdmin) return new NextResponse('Forbidden', { status: 403 });
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/admin/:path*', '/fr/admin/:path*', '/en/admin/:path*'],
};

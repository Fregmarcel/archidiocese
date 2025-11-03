import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Webhook } from 'svix';
import type { WebhookEvent } from '@clerk/nextjs/server';
import { connect } from '@/lib/mongodb';
import { UserProfile } from '@/models/UserProfile';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    return new NextResponse('Missing CLERK_WEBHOOK_SECRET', { status: 500 });
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // Vérifier la présence des en-têtes requis et arrêter sinon
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse('Error occured -- no svix headers', { status: 400 });
  }

  // Utiliser le corps brut pour la vérification de signature Svix
  const body = await req.text();

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id!,
      'svix-timestamp': svix_timestamp!,
      'svix-signature': svix_signature!,
    }) as WebhookEvent;
  } catch (err) {
    return new NextResponse('Webhook verification failed', { status: 400 });
  }

  await connect();

  try {
    if (evt.type === 'user.created' || evt.type === 'user.updated') {
      const user = evt.data as any;
      const clerkId = user.id;
      const email = user.email_addresses?.[0]?.email_address;
      const firstName = user.first_name ?? undefined;
      const lastName = user.last_name ?? undefined;
      const imageUrl = user.image_url ?? undefined;
      const role = (user.public_metadata?.role as string) || (user.private_metadata?.role as string) || undefined;

      const adminEmails = (process.env.ADMIN_EMAILS || '')
        .split(',')
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean);
      const isAdmin = email ? adminEmails.includes(email.toLowerCase()) || role === 'admin' : role === 'admin';

      await UserProfile.findOneAndUpdate(
        { clerkId },
        { clerkId, email, firstName, lastName, imageUrl, isAdmin, role },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }

    if (evt.type === 'user.deleted') {
      const clerkId = (evt.data as any).id;
      await UserProfile.findOneAndDelete({ clerkId });
    }

    return NextResponse.json({ received: true });
  } catch (e) {
    console.error('Webhook handling error', e);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { connectToDatabase } from '@/lib/db';
import { UserProfile, type IUserProfile } from '@/models/UserProfile';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

async function ensureAdmin() {
  const { userId } = await auth();
  if (!userId) return { ok: false, status: 401 as const };
  await connectToDatabase();
  const user = await UserProfile.findOne({ clerkId: userId }).lean<IUserProfile | null>();
  if (!user?.isAdmin) return { ok: false, status: 403 as const };
  return { ok: true as const };
}

export async function POST(request: NextRequest) {
  try {
    const admin = await ensureAdmin();
    if (!admin.ok) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: admin.status });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const type = formData.get('type') as string; // 'portrait', 'gallery', 'publication'

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Vérifier le type de fichier
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Type de fichier non supporté' }, { status: 400 });
    }

    // Vérifier la taille (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'Fichier trop volumineux (max 5MB)' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Créer le dossier s'il n'existe pas
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', type || 'general');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Générer un nom de fichier unique
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}_${originalName}`;
    const filepath = path.join(uploadDir, filename);

    // Sauvegarder le fichier
    await writeFile(filepath, buffer);

    // Retourner l'URL publique
    const publicUrl = `/uploads/${type || 'general'}/${filename}`;

    return NextResponse.json({ 
      success: true, 
      url: publicUrl,
      filename: filename,
      size: file.size,
      type: file.type
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Erreur lors de l\'upload' }, { status: 500 });
  }
}

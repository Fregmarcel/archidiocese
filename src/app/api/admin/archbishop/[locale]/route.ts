import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/db";
import { UserProfile, type IUserProfile } from "@/models/UserProfile";
import { Archbishop } from "@/models/Archbishop";

async function ensureAdmin() {
  const { userId } = await auth();
  if (!userId) return { ok: false, status: 401 as const };
  await connectToDatabase();
  const user = await UserProfile.findOne({ clerkId: userId }).lean<IUserProfile | null>();
  if (!user?.isAdmin) return { ok: false, status: 403 as const };
  return { ok: true as const };
}

export async function GET(_: Request, context: { params: Promise<{ locale: string }> }) {
  const { locale } = await context.params;
  await connectToDatabase();
  const doc = await Archbishop.findOne({ locale }).lean();
  return NextResponse.json({ doc: doc ?? null });
}

export async function PUT(req: Request, context: { params: Promise<{ locale: string }> }) {
  const admin = await ensureAdmin();
  if (!admin.ok) return new NextResponse(admin.status === 401 ? "Unauthorized" : "Forbidden", { status: admin.status });

  const { locale } = await context.params;
  await connectToDatabase();
  const body = await req.json().catch(() => ({}));
  const data: any = {
    locale,
    name: typeof body.name === "string" ? body.name : undefined,
    title: typeof body.title === "string" ? body.title : undefined,
    description: typeof body.description === "string" ? body.description : undefined,
    portraitUrl: typeof body.portraitUrl === "string" ? body.portraitUrl : undefined,
    bibliography: Array.isArray(body.bibliography) ? body.bibliography.filter((x: any) => typeof x === "string") : undefined,
    bibliographyRich: typeof body.bibliographyRich === "string" ? body.bibliographyRich : undefined,
    publications: Array.isArray(body.publications) ? body.publications.filter((x: any) => typeof x === "string") : undefined,
    gallery: Array.isArray(body.gallery) ? body.gallery.filter((x: any) => typeof x === "string") : undefined,
  };
  // Remove undefineds
  Object.keys(data).forEach((k) => data[k] === undefined && delete data[k]);

  const updated = await Archbishop.findOneAndUpdate({ locale }, data, { upsert: true, new: true, setDefaultsOnInsert: true });
  return NextResponse.json({ doc: updated });
}

export async function DELETE(_: Request, context: { params: Promise<{ locale: string }> }) {
  const admin = await ensureAdmin();
  if (!admin.ok) return new NextResponse(admin.status === 401 ? "Unauthorized" : "Forbidden", { status: admin.status });
  const { locale } = await context.params;
  await connectToDatabase();
  await Archbishop.findOneAndDelete({ locale });
  return new NextResponse(null, { status: 204 });
}

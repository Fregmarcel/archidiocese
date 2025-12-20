import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/db";
import { UserProfile, type IUserProfile } from "@/models/UserProfile";
import { HistoryPage } from "@/models/HistoryPage";

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
  const doc = await HistoryPage.findOne({ locale }).lean();
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
    ...body
  };
  
  // Remove undefineds
  Object.keys(data).forEach((k) => data[k] === undefined && delete data[k]);

  const updated = await HistoryPage.findOneAndUpdate({ locale }, data, { upsert: true, new: true, setDefaultsOnInsert: true });
  return NextResponse.json({ doc: updated });
}

export async function DELETE(_: Request, context: { params: Promise<{ locale: string }> }) {
  const admin = await ensureAdmin();
  if (!admin.ok) return new NextResponse(admin.status === 401 ? "Unauthorized" : "Forbidden", { status: admin.status });
  const { locale } = await context.params;
  await connectToDatabase();
  await HistoryPage.findOneAndDelete({ locale });
  return new NextResponse(null, { status: 204 });
}

import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/db";
import { UserProfile, type IUserProfile } from "@/models/UserProfile";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminZonesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { userId } = await auth();
  if (!userId) return notFound();
  await connectToDatabase();
  const user = await UserProfile.findOne({ clerkId: userId }).lean<IUserProfile>().exec();
  if (!user || !user.isAdmin) return notFound();

  return <AdminDashboard locale={locale} />;
}

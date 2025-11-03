import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { UserProfile } from "@/models/UserProfile";

export async function GET() {
  try {
    await connectToDatabase();
    const users = await UserProfile.find().limit(50).lean();
    return NextResponse.json({ count: users.length, users });
  } catch (e) {
    console.error("/api/debug/users error", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

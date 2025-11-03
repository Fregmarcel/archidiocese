import { connectToDatabase } from "@/lib/db";
import { Archbishop } from "@/models/Archbishop";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ locale: string }> }
) {
  try {
    const { locale } = await params;
    
    await connectToDatabase();
    const archbishop = await Archbishop.findOne({ locale }).lean();
    
    if (!archbishop) {
      return NextResponse.json(
        { success: false, data: null },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: archbishop
    });
  } catch (error) {
    console.error("Public archbishop API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

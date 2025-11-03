import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/db";

export async function GET() {
  try {
    await connectToDatabase();

    const state = mongoose.connection.readyState; // 0=disconnected,1=connected,2=connecting,3=disconnecting
    const dbName = mongoose.connection.db?.databaseName;

    // Essai de ping Admin (si droits autorisés)
    let ping: unknown = null;
    try {
      // @ts-expect-error - types Admin non exposés par @types/mongodb via mongoose
      ping = await mongoose.connection.db.admin().ping();
    } catch {
      ping = { ok: false };
    }

    return NextResponse.json(
      {
        ok: true,
        state,
        stateLabel: ["disconnected","connected","connecting","disconnecting"][state] ?? "unknown",
        dbName,
        ping,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

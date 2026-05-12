import { NextResponse } from "next/server";
import { getActiveEpisodesFromDB } from "@/lib/youtube";

export async function GET() {
  try {
    const videos = await getActiveEpisodesFromDB();
    return NextResponse.json({ 
      success: true, 
      message: "Synced from Firebase Database (No YouTube Call)",
      videos 
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Sync failed" }, { status: 500 });
  }
}

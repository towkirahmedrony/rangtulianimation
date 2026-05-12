import { NextResponse } from "next/server";
import { getActiveEpisodesFromDB } from "@/lib/youtube";
// আপনার আগের ফাইলের সব ইম্পোর্ট এখানে থাকবে

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const isSyncRequest = searchParams.get("sync") === "true";

  try {
    // ১. যদি অটোমেটিক ক্রন জব (Sync) কল হয়
    if (isSyncRequest) {
      console.log("Starting automatic sync from YouTube...");
      
      // এখানে আপনার সেই আগের ফাইলের সম্পূর্ণ ইউটিউব লজিকটি বসবে
      // fetchYouTubeSearchIds, fetchValidYouTubeVideos ইত্যাদি
      
      // সব প্রসেস শেষে রিটার্ন করবে
      return NextResponse.json({ message: "Sync complete!" });
    }

    // ২. সাধারণ ভিজিটরদের জন্য (কোনো ইউটিউব কল হবে না)
    // সরাসরি ফায়ারবেস থেকে ডাটা রিটার্ন করবে
    const videos = await getActiveEpisodesFromDB();
    return NextResponse.json({ videos });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ videos: [] }, { status: 500 });
  }
}

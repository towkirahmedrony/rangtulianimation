import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import { Episode } from "@/types/youtube";
import { createSlug, getActiveEpisodesFromDB } from "@/lib/youtube";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const isSyncRequest = searchParams.get("sync") === "true";

  try {
    if (isSyncRequest) {
      console.log("Starting automatic sync from YouTube...");
      
      const API_KEY = process.env.YOUTUBE_API_KEY;
      const PLAYLIST_ID = process.env.YOUTUBE_PLAYLIST_ID;

      if (!API_KEY || !PLAYLIST_ID) {
        return NextResponse.json({ error: "YouTube API keys missing" }, { status: 500 });
      }

      // ইউটিউব থেকে লেটেস্ট ভিডিওগুলো আনা (একবারে ৫০টি)
      const ytResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${PLAYLIST_ID}&key=${API_KEY}`,
        { cache: "no-store" }
      );
      const ytData = await ytResponse.json();

      if (!ytData.items) {
        return NextResponse.json({ error: "Failed to fetch from YouTube" }, { status: 500 });
      }

      // ইউটিউবের বর্তমান ভিডিওগুলোর আইডি লিস্ট
      const activeYoutubeVideoIds = ytData.items.map(
        (item: any) => item.snippet.resourceId.videoId
      );

      const episodesRef = adminDb.ref("episodes");
      
      // নতুন ভিডিও ফায়ারবেসে এড করা
      for (const item of ytData.items) {
        const videoId = item.snippet.resourceId.videoId;
        const title = item.snippet.title;
        
        // Private বা Deleted ভিডিও ইগনোর করা
        if (title === "Private video" || title === "Deleted video") continue;

        const episodeData: Episode = {
          id: videoId,
          videoId: videoId,
          title: title,
          slug: createSlug(title),
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url || "",
          publishedAt: item.snippet.publishedAt,
          youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
          embedUrl: `https://www.youtube.com/embed/${videoId}`,
          isActive: true
        };

        // ফায়ারবেসে ভিডিও আপডেট বা নতুন ইনসার্ট করা
        await episodesRef.child(videoId).update(episodeData);
      }

      // ফায়ারবেস থেকে ডিলিট হয়ে যাওয়া ভিডিও রিমুভ করা
      const currentDbVideos = await getActiveEpisodesFromDB();
      for (const dbVideo of currentDbVideos) {
        if (!activeYoutubeVideoIds.includes(dbVideo.videoId)) {
          // ভিডিওটি ইউটিউবে নেই, তাই ওয়েবসাইট থেকেও হাইড/ডিলিট করে দেওয়া হচ্ছে
          await episodesRef.child(dbVideo.videoId).update({ isActive: false });
          console.log(`Deactivated video: ${dbVideo.title}`);
        }
      }

      return NextResponse.json({ message: "Sync complete! Firebase updated." });
    }

    // সাধারণ ওয়েবসাইটের ডাটা সাপ্লাই (অটোমেটিক)
    const videos = await getActiveEpisodesFromDB();
    return NextResponse.json({ videos });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ videos: [] }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import { Episode } from "@/types/youtube";
import { createSlug, getActiveEpisodesFromDB } from "@/lib/youtube";
import { generateAiEpisodeData } from "@/lib/aiDescription";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const chunkArray = (arr: any[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

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

      let allYtItems: any[] = [];
      let nextPageToken = "";

      do {
        const pageTokenParam = nextPageToken ? `&pageToken=${nextPageToken}` : "";
        const ytResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${PLAYLIST_ID}&key=${API_KEY}${pageTokenParam}`,
          { cache: "no-store" }
        );
        const ytData = await ytResponse.json();
        
        if (ytData.error) {
          return NextResponse.json({ error: "API Error", message: ytData.error.message }, { status: 500 });
        }
        
        if (ytData.items) {
          allYtItems = allYtItems.concat(ytData.items);
        }
        nextPageToken = ytData.nextPageToken || "";
      } while (nextPageToken);

      if (allYtItems.length === 0) {
        return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 });
      }

      const activeYoutubeVideoIds = allYtItems.map((item: any) => item.snippet.resourceId.videoId);
      const idChunks = chunkArray(activeYoutubeVideoIds, 50);
      const videoDetailsMap = new Map();

      for (const chunk of idChunks) {
        const videoIdsString = chunk.join(',');
        const detailsResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoIdsString}&key=${API_KEY}`,
          { cache: "no-store" }
        );
        const detailsData = await detailsResponse.json();
        
        if (detailsData.items) {
          detailsData.items.forEach((item: any) => {
            videoDetailsMap.set(item.id, {
              viewCount: item.statistics?.viewCount || "0",
              publishedAt: item.snippet?.publishedAt,
              title: item.snippet?.title,
              description: item.snippet?.description,
              thumbnails: item.snippet?.thumbnails
            });
          });
        }
      }

      const currentDbVideos = await getActiveEpisodesFromDB();
      const existingVideoIds = currentDbVideos.map(v => v.videoId);
      const episodesRef = adminDb.ref("episodes");
      
      for (const videoId of activeYoutubeVideoIds) {
        const details = videoDetailsMap.get(videoId);
        if (!details) continue;

        const title = details.title;
        if (title === "Private video" || title === "Deleted video") continue;

        const isNewVideo = !existingVideoIds.includes(videoId);
        let aiData = null;

        if (isNewVideo) {
          console.log(`New video detected: ${title}. Generating AI Data...`);
          aiData = await generateAiEpisodeData({
            title: title,
            youtubeDescription: details.description,
          });
          await delay(5000); 
        }

        const episodeData: any = {
          id: videoId,
          videoId: videoId,
          title: title,
          slug: createSlug(title),
          thumbnail: details.thumbnails?.high?.url || details.thumbnails?.default?.url || "",
          publishedAt: details.publishedAt,
          youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
          embedUrl: `https://www.youtube.com/embed/${videoId}`,
          viewCount: details.viewCount,
          isActive: true
        };

        if (isNewVideo && aiData && !aiData.isFallback) {
           episodeData.description = aiData.description; 
           episodeData.seoDescription = aiData.seoDescription;
           episodeData.seoTitle = aiData.seoTitle;
           episodeData.tags = aiData.tags;
        } else if (isNewVideo) {
           episodeData.description = details.description;
        }

        if (!isNewVideo) {
           // 🎯 আপডেট লজিক: এখন থেকে টাইটেল এবং স্লাগও আপডেট হবে
           await episodesRef.child(videoId).update({ 
             viewCount: details.viewCount,
             publishedAt: details.publishedAt,
             title: title,
             slug: createSlug(title)
           });
        } else {
           await episodesRef.child(videoId).update(episodeData);
        }
      }

      for (const dbVideo of currentDbVideos) {
        if (!activeYoutubeVideoIds.includes(dbVideo.videoId)) {
          await episodesRef.child(dbVideo.videoId).update({ isActive: false });
        }
      }

      return NextResponse.json({ message: "Sync complete! Firebase updated perfectly." });
    }

    const videos = await getActiveEpisodesFromDB();
    return NextResponse.json({ videos });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ videos: [] }, { status: 500 });
  }
}

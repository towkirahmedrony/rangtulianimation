import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import { generateAiEpisodeData, makeSmartFallbackData } from "@/lib/aiDescription";
import { createSlug } from "@/lib/youtube";

export const revalidate = 0;
export const dynamic = "force-dynamic";

type YouTubeSearchItem = {
  id: {
    videoId?: string;
  };
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: {
      medium?: { url: string };
      high?: { url: string };
    };
  };
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchYouTubeVideos(input: {
  apiKey: string;
  channelId: string;
  order: "date" | "viewCount";
  maxResults: number;
}) {
  const youtubeUrl = new URL("https://www.googleapis.com/youtube/v3/search");

  youtubeUrl.searchParams.set("part", "snippet");
  youtubeUrl.searchParams.set("channelId", input.channelId);
  youtubeUrl.searchParams.set("maxResults", input.maxResults.toString());
  youtubeUrl.searchParams.set("order", input.order);
  youtubeUrl.searchParams.set("type", "video");
  youtubeUrl.searchParams.set("key", input.apiKey);

  const response = await fetch(youtubeUrl.toString(), {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch YouTube ${input.order} videos`);
  }

  const data = await response.json();
  return (data.items || []) as YouTubeSearchItem[];
}

function mergeUniqueVideos(items: YouTubeSearchItem[]) {
  const map = new Map<string, YouTubeSearchItem>();

  for (const item of items) {
    const videoId = item.id.videoId;
    if (!videoId) continue;
    if (!map.has(videoId)) {
      map.set(videoId, item);
    }
  }

  return Array.from(map.values());
}

async function processEpisode(item: YouTubeSearchItem, canUseAi: boolean) {
  const videoId = item.id.videoId;
  if (!videoId) return null;

  const title = item.snippet.title;
  const originalDescription = item.snippet.description || "";
  const episodeRef = adminDb.ref(`episodes/${videoId}`);
  const snapshot = await episodeRef.get();
  
  const savedData = snapshot.exists() ? snapshot.val() : {};

  // Check if data is missing or has the old fallback string
  const isExistingFallback = savedData.isFallback === true || (savedData.seoDescription && savedData.seoDescription.includes("একটি বাংলা হরর কার্টুন গল্প, যেখানে অন্ধকার আর অজানা রহস্যের মুখোমুখি হতে হয়।"));
  
  const needsAi = 
    !savedData.description || 
    !savedData.seoDescription || 
    !savedData.seoTitle || 
    !savedData.tags ||
    isExistingFallback;

  let aiData = null;
  let requestedAi = false;

  if (needsAi) {
    if (canUseAi) {
      console.log(`Generating AI data for: ${title}`);
      aiData = await generateAiEpisodeData({
        title,
        youtubeDescription: originalDescription,
      });
      requestedAi = true;
    } else {
      // If we can't use AI in this cycle, use smart fallback without calling Gemini
      aiData = makeSmartFallbackData(title);
    }
  }

  const now = Date.now();
  const slug = savedData.slug || createSlug(title);
  const useAiData = aiData && !aiData.isFallback;

  const episode = {
    id: videoId,
    videoId,
    slug,
    title: savedData.title || title,
    
    description: useAiData ? aiData!.description : (savedData.description && !isExistingFallback ? savedData.description : (aiData?.description || savedData.description || "")),
    seoDescription: useAiData ? aiData!.seoDescription : (savedData.seoDescription && !isExistingFallback ? savedData.seoDescription : (aiData?.seoDescription || savedData.seoDescription || "")),
    seoTitle: useAiData ? aiData!.seoTitle : (savedData.seoTitle && !isExistingFallback ? savedData.seoTitle : (aiData?.seoTitle || savedData.seoTitle || `${title} | Rang Tuli Animation Horror`)),
    tags: useAiData ? aiData!.tags : (savedData.tags && !isExistingFallback ? savedData.tags : (aiData?.tags || savedData.tags || ["Bangla Bhuter Golpo"])),
    
    isFallback: useAiData ? false : (aiData?.isFallback || savedData.isFallback || false),

    originalDescription: savedData.originalDescription || originalDescription,
    publishedAt: savedData.publishedAt || item.snippet.publishedAt,
    thumbnail:
      savedData.thumbnail ||
      item.snippet.thumbnails.high?.url ||
      item.snippet.thumbnails.medium?.url ||
      "",
    
    youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
    
    createdAt: savedData.createdAt || now,
    updatedAt: now,
  };

  // Only update DB if we successfully generated real AI data or if the DB had nothing at all
  if (useAiData || !snapshot.exists()) {
    await episodeRef.set(episode);
  }

  return { episode, requestedAi };
}

export async function GET() {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID;

    if (!apiKey || !channelId) {
      return NextResponse.json(
        { error: "Missing YouTube API key or channel ID" },
        { status: 500 }
      );
    }

    const [latestItems, mostViewedItems] = await Promise.all([
      fetchYouTubeVideos({ apiKey, channelId, order: "date", maxResults: 50 }),
      fetchYouTubeVideos({ apiKey, channelId, order: "viewCount", maxResults: 10 }),
    ]);

    const mergedItems = mergeUniqueVideos([...mostViewedItems, ...latestItems]);
    const episodes = [];

    let aiRequestCount = 0;
    const MAX_AI_PER_REQUEST = 3; // এক রিকোয়েস্টে সর্বোচ্চ ৩টি ভিডিওর ডেসক্রিপশন জেনারেট হবে

    for (const item of mergedItems) {
      const canUseAi = aiRequestCount < MAX_AI_PER_REQUEST;
      const result = await processEpisode(item, canUseAi);
      
      if (result) {
        episodes.push(result.episode);
        if (result.requestedAi) {
          aiRequestCount++;
          await delay(2000); // ছোট একটি delay
        }
      }
    }

    episodes.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    return NextResponse.json({ videos: episodes });
  } catch (error) {
    console.error("Episodes API error:", error);
    return NextResponse.json(
      { error: "Something went wrong while loading episodes" },
      { status: 500 }
    );
  }
}

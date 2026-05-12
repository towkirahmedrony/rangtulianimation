import { adminDb } from "@/lib/firebaseAdmin";
import { YouTubeApiResponse, Episode } from "@/types/youtube";
import { YoutubeTranscript } from "youtube-transcript";

export function createSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9\u0980-\u09FF]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function getSavedEpisode(videoId: string): Promise<Partial<Episode> | null> {
  try {
    const snapshot = await adminDb.ref(`episodes/${videoId}`).get();
    if (!snapshot.exists()) return null;
    return snapshot.val() as Partial<Episode>;
  } catch (error) {
    return null;
  }
}

// নতুন ফাংশন: ইউটিউব থেকে সাবটাইটেল/ট্রান্সক্রিপ্ট নিয়ে আসার জন্য
export async function getVideoTranscript(videoId: string): Promise<string> {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    return transcript.map((t) => t.text).join(" ");
  } catch (error) {
    console.error(`Transcript fetch failed for video ${videoId}:`, error);
    return ""; // ফেইল করলে এম্পটি স্ট্রিং রিটার্ন করবে যাতে এআই ফলব্যাক নিতে পারে
  }
}

export async function getMostViewedVideo(): Promise<Episode | null> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) return null;

  try {
    const url = new URL("https://www.googleapis.com/youtube/v3/search");
    url.searchParams.append("part", "snippet");
    url.searchParams.append("channelId", channelId);
    url.searchParams.append("order", "viewCount");
    url.searchParams.append("maxResults", "1");
    url.searchParams.append("type", "video");
    url.searchParams.append("key", apiKey);

    // Vercel এর ক্যাশ বাইপাস করার জন্য no-store ব্যবহার করা হলো
    const response = await fetch(url.toString(), { cache: "no-store" });
    const data = await response.json();

    if (!response.ok) {
      console.error("YouTube API Error (Most Viewed):", data);
      return null;
    }

    if (!data.items || data.items.length === 0) return null;

    const item = data.items[0];
    const videoId = item.id.videoId;
    const savedEpisode = await getSavedEpisode(videoId);
    const title = savedEpisode?.title || item.snippet.title;

    return {
      id: videoId,
      videoId,
      slug: savedEpisode?.slug || createSlug(title),
      title,
      description: savedEpisode?.description || "",
      seoDescription: savedEpisode?.seoDescription || "",
      seoTitle: savedEpisode?.seoTitle || "",
      tags: savedEpisode?.tags || [],
      originalDescription: savedEpisode?.originalDescription || item.snippet.description,
      thumbnail: savedEpisode?.thumbnail || item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url || "",
      publishedAt: savedEpisode?.publishedAt || item.snippet.publishedAt,
      youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
    };
  } catch (error) {
    console.error("Most viewed video fetch failed:", error);
    return null;
  }
}

export async function getLatestVideos(maxResults: number = 6): Promise<Episode[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) return [];

  try {
    const url = new URL("https://www.googleapis.com/youtube/v3/search");
    url.searchParams.append("part", "snippet");
    url.searchParams.append("channelId", channelId);
    url.searchParams.append("order", "date");
    url.searchParams.append("maxResults", maxResults.toString());
    url.searchParams.append("type", "video");
    url.searchParams.append("key", apiKey);

    // Vercel এর ক্যাশ বাইপাস করার জন্য no-store
    const response = await fetch(url.toString(), { cache: "no-store" });
    const data = await response.json();

    if (!response.ok) {
      console.error("YouTube API Error (Latest Videos):", data);
      return [];
    }

    if (!data.items) return [];

    const videos = await Promise.all(
      data.items.map(async (item: any) => {
        const snippet = item.snippet;
        const videoId = item.id.videoId;
        const savedEpisode = await getSavedEpisode(videoId);
        const title = savedEpisode?.title || snippet.title;

        return {
          id: videoId,
          videoId,
          slug: savedEpisode?.slug || createSlug(title),
          title,
          description: savedEpisode?.description || "",
          seoDescription: savedEpisode?.seoDescription || "",
          seoTitle: savedEpisode?.seoTitle || "",
          tags: savedEpisode?.tags || [],
          originalDescription: savedEpisode?.originalDescription || snippet.description,
          thumbnail: savedEpisode?.thumbnail || snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url || "",
          publishedAt: savedEpisode?.publishedAt || snippet.publishedAt,
          youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
          embedUrl: `https://www.youtube.com/embed/${videoId}`,
        };
      })
    );

    return videos.filter((video) => video.title !== "Private video" && video.title !== "Deleted video");
  } catch (error) {
    console.error("Latest videos fetch failed:", error);
    return [];
  }
}

export const getYouTubeVideos = getLatestVideos;
export const getChannelVideos = getLatestVideos;

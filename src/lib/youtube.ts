import { adminDb } from "@/lib/firebaseAdmin";
import { YouTubeApiResponse, Episode } from "@/types/youtube";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_PLAYLIST_ID = process.env.YOUTUBE_PLAYLIST_ID;
const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

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
    console.error("Firebase episode read failed:", error);
    return null;
  }
}

export async function getMostViewedVideo(): Promise<Episode | null> {
  if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) return null;

  try {
    const url = new URL("https://www.googleapis.com/youtube/v3/search");
    url.searchParams.append("part", "snippet");
    url.searchParams.append("channelId", YOUTUBE_CHANNEL_ID);
    url.searchParams.append("order", "viewCount");
    url.searchParams.append("maxResults", "1");
    url.searchParams.append("type", "video");
    url.searchParams.append("key", YOUTUBE_API_KEY);

    const response = await fetch(url.toString(), { next: { revalidate: 86400 } });
    const data = await response.json();

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
      thumbnail:
        savedEpisode?.thumbnail ||
        item.snippet.thumbnails?.high?.url ||
        item.snippet.thumbnails?.medium?.url ||
        "",
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
  if (!YOUTUBE_API_KEY || !YOUTUBE_PLAYLIST_ID) return [];

  try {
    const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
    url.searchParams.append("part", "snippet");
    url.searchParams.append("playlistId", YOUTUBE_PLAYLIST_ID);
    url.searchParams.append("maxResults", maxResults.toString());
    url.searchParams.append("key", YOUTUBE_API_KEY);

    const response = await fetch(url.toString(), { next: { revalidate: 3600 } });
    const data = await response.json();

    if (!data.items) return [];

    const videos = await Promise.all(
      data.items.map(async (item: any) => {
        const snippet = item.snippet;
        const videoId = snippet.resourceId.videoId;
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
          thumbnail:
            savedEpisode?.thumbnail ||
            snippet.thumbnails?.high?.url ||
            snippet.thumbnails?.medium?.url ||
            "",
          publishedAt: savedEpisode?.publishedAt || snippet.publishedAt,
          youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
          embedUrl: `https://www.youtube.com/embed/${videoId}`,
        };
      })
    );

    return videos.filter(
      (video) => video.title !== "Private video" && video.title !== "Deleted video"
    );
  } catch (error) {
    console.error("Latest videos fetch failed:", error);
    return [];
  }
}

export const getYouTubeVideos = getLatestVideos;
export const getChannelVideos = getLatestVideos;

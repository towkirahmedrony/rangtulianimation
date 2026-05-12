import { adminDb } from "@/lib/firebaseAdmin";
import { Episode } from "@/types/youtube";
import { YoutubeTranscript } from "youtube-transcript";

export function createSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9\u0980-\u09FF]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// সিঙ্ক রাউটের জন্য ট্রান্সক্রিপ্ট ফাংশন
export async function getVideoTranscript(videoId: string): Promise<string> {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    return transcript.map((t) => t.text).join(" ");
  } catch (error) {
    return "";
  }
}

// ফায়ারবেস থেকে ডেটা আনার কোর ফাংশন (ইউটিউব এপিআই বাদ!)
export async function getActiveEpisodesFromDB(): Promise<Episode[]> {
  try {
    const snapshot = await adminDb.ref("episodes").get();
    if (!snapshot.exists()) return [];
    const data = snapshot.val();
    const episodes = Object.values(data) as Episode[];
    return episodes.filter((ep) => ep.isActive !== false);
  } catch (error) {
    console.error("Firebase fetch error:", error);
    return [];
  }
}

export async function getMostViewedVideo(): Promise<Episode | null> {
  const episodes = await getActiveEpisodesFromDB();
  if (episodes.length === 0) return null;
  const sortedByViews = [...episodes].sort(
    (a, b) => (Number(b.viewCount) || 0) - (Number(a.viewCount) || 0)
  );
  return sortedByViews[0];
}

export async function getLatestVideos(maxResults: number = 6): Promise<Episode[]> {
  const episodes = await getActiveEpisodesFromDB();
  if (episodes.length === 0) return [];
  const sortedByDate = [...episodes].sort(
    (a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime()
  );
  return sortedByDate.slice(0, maxResults);
}

export const getYouTubeVideos = getLatestVideos;
export const getChannelVideos = getLatestVideos;

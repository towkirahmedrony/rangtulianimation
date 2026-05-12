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

// ইউটিউব থেকে সাবটাইটেল/ট্রান্সক্রিপ্ট নিয়ে আসার ফাংশন (যেটা মিসিং হয়ে গিয়েছিল)
export async function getVideoTranscript(videoId: string): Promise<string> {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    return transcript.map((t) => t.text).join(" ");
  } catch (error) {
    console.error(`Transcript fetch failed for video ${videoId}:`, error);
    return "";
  }
}

// ফায়ারবেস থেকে সব অ্যাক্টিভ এপিসোড নিয়ে আসার কোর ফাংশন
export async function getActiveEpisodesFromDB(): Promise<Episode[]> {
  try {
    const snapshot = await adminDb.ref("episodes").get();
    if (!snapshot.exists()) return [];

    const data = snapshot.val();
    const episodes = Object.values(data) as Episode[];

    // যেসব ভিডিও ইনঅ্যাক্টিভ করা নেই, শুধু সেগুলোই রিটার্ন করবে
    return episodes.filter((ep) => ep.isActive !== false);
  } catch (error) {
    console.error("Firebase fetch error:", error);
    return [];
  }
}

// সবচেয়ে জনপ্রিয় ভিডিও (ভিউ অনুযায়ী সর্ট করা)
export async function getMostViewedVideo(): Promise<Episode | null> {
  const episodes = await getActiveEpisodesFromDB();
  if (episodes.length === 0) return null;

  const sortedByViews = [...episodes].sort(
    (a, b) => (Number(b.viewCount) || 0) - (Number(a.viewCount) || 0)
  );
  
  return sortedByViews[0];
}

// লেটেস্ট ভিডিও (তারিখ অনুযায়ী সর্ট করা)
export async function getLatestVideos(maxResults: number = 6): Promise<Episode[]> {
  const episodes = await getActiveEpisodesFromDB();
  if (episodes.length === 0) return [];

  const sortedByDate = [...episodes].sort(
    (a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime()
  );

  return sortedByDate.slice(0, maxResults);
}

// ফ্রন্টএন্ডের অন্যান্য কম্পোনেন্ট যাতে ব্রেক না করে, তার জন্য এলিয়াস
export const getYouTubeVideos = getLatestVideos;
export const getChannelVideos = getLatestVideos;

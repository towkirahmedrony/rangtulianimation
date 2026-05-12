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

type SavedEpisodeData = {
  id?: string;
  videoId?: string;
  slug?: string;
  title?: string;
  description?: string;
  seoDescription?: string;
  seoTitle?: string;
  tags?: string[];
  isFallback?: boolean;
  isActive?: boolean;
  originalDescription?: string;
  publishedAt?: string;
  thumbnail?: string;
  youtubeUrl?: string;
  embedUrl?: string;
  createdAt?: number;
  updatedAt?: number;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const OLD_FALLBACK_TEXT =
  "একটি বাংলা হরর কার্টুন গল্প, যেখানে অন্ধকার আর অজানা রহস্যের মুখোমুখি হতে হয়।";

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

function hasUsefulText(value?: string) {
  return typeof value === "string" && value.trim().length > 0;
}

function isOldFallbackValue(value?: string) {
  return Boolean(value && value.includes(OLD_FALLBACK_TEXT));
}

function shouldReplaceSavedField(savedData: SavedEpisodeData, value?: string) {
  return !hasUsefulText(value) || savedData.isFallback === true || isOldFallbackValue(value);
}

function pickTextField(input: {
  savedData: SavedEpisodeData;
  savedValue?: string;
  generatedValue?: string;
  fallbackValue: string;
}) {
  const { savedData, savedValue, generatedValue, fallbackValue } = input;

  if (!shouldReplaceSavedField(savedData, savedValue)) {
    return savedValue!.trim();
  }

  return generatedValue || fallbackValue;
}

function pickTags(input: {
  savedData: SavedEpisodeData;
  savedTags?: string[];
  generatedTags?: string[];
  fallbackTags: string[];
}) {
  const { savedData, savedTags, generatedTags, fallbackTags } = input;

  if (
    Array.isArray(savedTags) &&
    savedTags.length > 0 &&
    savedData.isFallback !== true
  ) {
    return savedTags;
  }

  if (Array.isArray(generatedTags) && generatedTags.length > 0) {
    return generatedTags;
  }

  return fallbackTags;
}

async function markInactiveEpisodes(activeVideoIds: Set<string>) {
  const episodesRef = adminDb.ref("episodes");
  const snapshot = await episodesRef.get();

  if (!snapshot.exists()) return;

  const updates: Record<string, unknown> = {};
  const allEpisodes = snapshot.val() as Record<string, SavedEpisodeData>;
  const now = Date.now();

  for (const [videoId, episode] of Object.entries(allEpisodes)) {
    const realVideoId = episode.videoId || episode.id || videoId;

    if (!activeVideoIds.has(realVideoId) && episode.isActive !== false) {
      updates[`${videoId}/isActive`] = false;
      updates[`${videoId}/updatedAt`] = now;
    }
  }

  if (Object.keys(updates).length > 0) {
    await episodesRef.update(updates);
  }
}

async function processEpisode(item: YouTubeSearchItem, canUseAi: boolean) {
  const videoId = item.id.videoId;
  if (!videoId) return null;

  const youtubeTitle = item.snippet.title;
  const originalDescription = item.snippet.description || "";
  const episodeRef = adminDb.ref(`episodes/${videoId}`);
  const snapshot = await episodeRef.get();

  const savedData = snapshot.exists() ? (snapshot.val() as SavedEpisodeData) : {};

  const needsAi =
    shouldReplaceSavedField(savedData, savedData.description) ||
    shouldReplaceSavedField(savedData, savedData.seoDescription) ||
    shouldReplaceSavedField(savedData, savedData.seoTitle) ||
    !Array.isArray(savedData.tags) ||
    savedData.tags.length === 0;

  let aiData: ReturnType<typeof makeSmartFallbackData> | null = null;
  let requestedAi = false;

  if (needsAi) {
    if (canUseAi) {
      console.log(`Generating AI data for: ${youtubeTitle}`);

      aiData = await generateAiEpisodeData({
        title: savedData.title || youtubeTitle,
        youtubeDescription: originalDescription,
      });

      requestedAi = true;
    } else {
      aiData = makeSmartFallbackData(savedData.title || youtubeTitle);
    }
  }

  const fallbackData = makeSmartFallbackData(savedData.title || youtubeTitle);
  const now = Date.now();

  const title = savedData.title || youtubeTitle;
  const slug = savedData.slug || createSlug(title);

  const episode = {
    id: videoId,
    videoId,
    slug,
    title,

    description: pickTextField({
      savedData,
      savedValue: savedData.description,
      generatedValue: aiData?.description,
      fallbackValue: fallbackData.description,
    }),

    seoDescription: pickTextField({
      savedData,
      savedValue: savedData.seoDescription,
      generatedValue: aiData?.seoDescription,
      fallbackValue: fallbackData.seoDescription,
    }),

    seoTitle: pickTextField({
      savedData,
      savedValue: savedData.seoTitle,
      generatedValue: aiData?.seoTitle,
      fallbackValue: fallbackData.seoTitle,
    }),

    tags: pickTags({
      savedData,
      savedTags: savedData.tags,
      generatedTags: aiData?.tags,
      fallbackTags: fallbackData.tags,
    }),

    isFallback: aiData?.isFallback ?? savedData.isFallback ?? false,
    isActive: true,

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

  await episodeRef.set(episode);

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
      fetchYouTubeVideos({
        apiKey,
        channelId,
        order: "date",
        maxResults: 50,
      }),
      fetchYouTubeVideos({
        apiKey,
        channelId,
        order: "viewCount",
        maxResults: 10,
      }),
    ]);

    const mergedItems = mergeUniqueVideos([...mostViewedItems, ...latestItems]);

    const activeVideoIds = new Set(
      mergedItems
        .map((item) => item.id.videoId)
        .filter((videoId): videoId is string => Boolean(videoId))
    );

    await markInactiveEpisodes(activeVideoIds);

    const episodes = [];

    let aiRequestCount = 0;
    const MAX_AI_PER_REQUEST = 3;

    for (const item of mergedItems) {
      const canUseAi = aiRequestCount < MAX_AI_PER_REQUEST;
      const result = await processEpisode(item, canUseAi);

      if (result) {
        episodes.push(result.episode);

        if (result.requestedAi) {
          aiRequestCount++;
          await delay(2000);
        }
      }
    }

    const activeEpisodes = episodes
      .filter((episode) => activeVideoIds.has(episode.videoId))
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() -
          new Date(a.publishedAt).getTime()
      );

    return NextResponse.json({ videos: activeEpisodes });
  } catch (error) {
    console.error("Episodes API error:", error);

    return NextResponse.json(
      { error: "Something went wrong while loading episodes" },
      { status: 500 }
    );
  }
}

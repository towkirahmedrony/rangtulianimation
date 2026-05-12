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
};

type YouTubeVideoItem = {
  id: string;
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: {
      medium?: { url: string };
      high?: { url: string };
      maxres?: { url: string };
    };
    tags?: string[];
  };
  statistics?: {
    viewCount?: string;
  };
  contentDetails?: {
    duration?: string;
  };
  status?: {
    privacyStatus?: string;
    embeddable?: boolean;
    uploadStatus?: string;
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
  viewCount?: number;
  duration?: string;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const OLD_FALLBACK_TEXT =
  "একটি বাংলা হরর কার্টুন গল্প, যেখানে অন্ধকার আর অজানা রহস্যের মুখোমুখি হতে হয়।";

async function fetchYouTubeSearchIds(input: {
  apiKey: string;
  channelId: string;
  order: "date" | "viewCount";
  maxResults: number;
}) {
  const youtubeUrl = new URL("https://www.googleapis.com/youtube/v3/search");

  youtubeUrl.searchParams.set("part", "id");
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

  return ((data.items || []) as YouTubeSearchItem[])
    .map((item) => item.id.videoId)
    .filter((videoId): videoId is string => Boolean(videoId));
}

async function fetchValidYouTubeVideos(input: {
  apiKey: string;
  videoIds: string[];
}) {
  if (input.videoIds.length === 0) return [];

  const youtubeUrl = new URL("https://www.googleapis.com/youtube/v3/videos");

  youtubeUrl.searchParams.set(
    "part",
    "snippet,contentDetails,statistics,status"
  );
  youtubeUrl.searchParams.set("id", input.videoIds.join(","));
  youtubeUrl.searchParams.set("key", input.apiKey);

  const response = await fetch(youtubeUrl.toString(), {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to verify YouTube videos");
  }

  const data = await response.json();
  const videos = (data.items || []) as YouTubeVideoItem[];

  return videos.filter((video) => {
    const status = video.status;

    return (
      video.id &&
      status?.privacyStatus === "public" &&
      status?.embeddable !== false &&
      status?.uploadStatus === "processed"
    );
  });
}

function uniqueIds(ids: string[]) {
  return Array.from(new Set(ids));
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
  youtubeTags?: string[];
  generatedTags?: string[];
  fallbackTags: string[];
}) {
  const { savedData, youtubeTags, generatedTags, fallbackTags } = input;

  if (
    Array.isArray(savedData.tags) &&
    savedData.tags.length > 0 &&
    savedData.isFallback !== true
  ) {
    return savedData.tags;
  }

  if (Array.isArray(generatedTags) && generatedTags.length > 0) {
    return generatedTags;
  }

  if (Array.isArray(youtubeTags) && youtubeTags.length > 0) {
    return youtubeTags.slice(0, 10);
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

  for (const [key, episode] of Object.entries(allEpisodes)) {
    const realVideoId = episode.videoId || episode.id || key;

    if (!activeVideoIds.has(realVideoId) && episode.isActive !== false) {
      updates[`${key}/isActive`] = false;
      updates[`${key}/updatedAt`] = now;
    }
  }

  if (Object.keys(updates).length > 0) {
    await episodesRef.update(updates);
  }
}

async function processEpisode(video: YouTubeVideoItem, canUseAi: boolean) {
  const videoId = video.id;
  if (!videoId) return null;

  const youtubeTitle = video.snippet.title;
  const originalDescription = video.snippet.description || "";

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
      youtubeTags: video.snippet.tags,
      generatedTags: aiData?.tags,
      fallbackTags: fallbackData.tags,
    }),

    isFallback: aiData?.isFallback ?? savedData.isFallback ?? false,
    isActive: true,

    originalDescription: savedData.originalDescription || originalDescription,
    publishedAt: savedData.publishedAt || video.snippet.publishedAt,

    thumbnail:
      savedData.thumbnail ||
      video.snippet.thumbnails.maxres?.url ||
      video.snippet.thumbnails.high?.url ||
      video.snippet.thumbnails.medium?.url ||
      "",

    viewCount: Number(video.statistics?.viewCount || savedData.viewCount || 0),
    duration: video.contentDetails?.duration || savedData.duration || "",

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

    const [latestIds, mostViewedIds] = await Promise.all([
      fetchYouTubeSearchIds({
        apiKey,
        channelId,
        order: "date",
        maxResults: 50,
      }),
      fetchYouTubeSearchIds({
        apiKey,
        channelId,
        order: "viewCount",
        maxResults: 10,
      }),
    ]);

    const allVideoIds = uniqueIds([...mostViewedIds, ...latestIds]);

    const validVideos = await fetchValidYouTubeVideos({
      apiKey,
      videoIds: allVideoIds,
    });

    const activeVideoIds = new Set(validVideos.map((video) => video.id));

    await markInactiveEpisodes(activeVideoIds);

    const episodes = [];

    let aiRequestCount = 0;
    const MAX_AI_PER_REQUEST = 3;

    for (const video of validVideos) {
      const canUseAi = aiRequestCount < MAX_AI_PER_REQUEST;
      const result = await processEpisode(video, canUseAi);

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

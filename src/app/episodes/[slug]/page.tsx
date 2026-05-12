import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import VideoEmbed from "@/components/ui/VideoEmbed";
import { siteConfig } from "@/config/site";
import { formatDate, formatNumber } from "@/lib/utils";
import { Youtube } from "lucide-react";

type Episode = {
  id?: string;
  videoId?: string;
  youtubeId?: string;
  slug?: string;
  title: string;
  description?: string;
  seoDescription?: string;
  seoTitle?: string;
  thumbnail?: string;
  publishedAt?: string;
  createdAt?: string | number;
  viewCount?: string | number;
  tags?: string[];
  youtubeUrl?: string;
  embedUrl?: string;
};

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

function createSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9\u0980-\u09FF]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getVideoId(episode: Episode) {
  return episode.youtubeId || episode.videoId || episode.id || "";
}

function getEpisodeSlug(episode: Episode) {
  return episode.slug || createSlug(episode.title);
}

function getYoutubeUrl(episode: Episode) {
  const videoId = getVideoId(episode);
  return episode.youtubeUrl || `https://www.youtube.com/watch?v=${videoId}`;
}

async function getEpisodes(): Promise<Episode[]> {
  try {
    const baseUrl = getBaseUrl();

    console.log(`Fetching from: ${baseUrl}/api/episodes`);

    const res = await fetch(`${baseUrl}/api/episodes`, {
      next: {
        revalidate: 3600,
      },
    });

    if (!res.ok) {
      console.error("API response was not OK in details page. Status:", res.status);
      return [];
    }

    const data = await res.json();

    if (Array.isArray(data)) {
      return data;
    }

    if (Array.isArray(data.videos)) {
      return data.videos;
    }

    if (Array.isArray(data.episodes)) {
      return data.episodes;
    }

    return [];
  } catch (error) {
    console.error("Error fetching episodes in details page:", error);
    return [];
  }
}

async function getEpisodeBySlug(slug: string) {
  const episodes = await getEpisodes();
  const episode = episodes.find((item) => getEpisodeSlug(item) === slug);

  return {
    episode,
    episodes,
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { episode } = await getEpisodeBySlug(slug);

  if (!episode) {
    return {
      title: "Episode Not Found",
    };
  }

  const videoId = getVideoId(episode);
  const title =
    episode.seoTitle ||
    `${episode.title} | Bangla Bhuter Golpo | Rang Tuli Animation Horror`;

  const description =
    episode.seoDescription ||
    episode.description ||
    `${episode.title} দেখুন Rang Tuli Animation Horror-এ। বাংলা ভূতের গল্প, suspense এবং Bengali horror cartoon animation।`;

  const thumbnail =
    episode.thumbnail ||
    (videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : undefined);

  return {
    title,
    description,
    keywords: [
      episode.title,
      "Bangla Bhuter Golpo",
      "Bengali Horror Cartoon",
      "Bangla Horror Cartoon",
      "Vuter Golpo",
      "Rang Tuli Animation Horror",
      ...(episode.tags || []),
    ],
    openGraph: {
      title,
      description,
      type: "video.other",
      images: thumbnail
        ? [
            {
              url: thumbnail,
              width: 1280,
              height: 720,
              alt: `${episode.title} thumbnail`,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: thumbnail ? [thumbnail] : [],
    },
  };
}

export default async function EpisodeDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const { episode, episodes } = await getEpisodeBySlug(slug);

  if (!episode) {
    notFound();
  }

  const videoId = getVideoId(episode);
  const episodeSlug = getEpisodeSlug(episode);
  const youtubeUrl = getYoutubeUrl(episode);

  const description =
    episode.seoDescription ||
    episode.description ||
    "Rang Tuli Animation Horror-এর এই বাংলা হরর কার্টুনে রয়েছে রহস্য, ভয় এবং suspense ভরা একটি ভূতের গল্প।";

  const relatedEpisodes = episodes
    .filter((item) => getEpisodeSlug(item) !== episodeSlug)
    .slice(0, 3);

  const publishedDate = episode.publishedAt || episode.createdAt;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: episode.title,
    description,
    thumbnailUrl:
      episode.thumbnail ||
      (videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : ""),
    uploadDate:
      typeof publishedDate === "string"
        ? publishedDate
        : publishedDate
          ? new Date(publishedDate).toISOString()
          : undefined,
    embedUrl: episode.embedUrl || `https://www.youtube.com/embed/${videoId}`,
    contentUrl: youtubeUrl,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name || "Rang Tuli Animation Horror",
    },
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <section className="relative overflow-hidden border-b border-red-500/10 bg-[radial-gradient(circle_at_top,rgba(127,29,29,0.35),transparent_45%),linear-gradient(180deg,#020617,#0f172a)]">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-slate-300">
            <Link href="/" className="transition hover:text-red-300">
              Home
            </Link>
            <span className="text-slate-600">/</span>
            <Link href="/episodes" className="transition hover:text-red-300">
              Episodes
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-red-300">{episode.title}</span>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.55fr_0.9fr] lg:items-start">
            <div>
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl shadow-red-950/20">
                <VideoEmbed videoId={videoId} title={episode.title} />
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl backdrop-blur">
              <p className="mb-3 inline-flex rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-200">
                Bengali Horror Cartoon
              </p>

              <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
                {episode.title}
              </h1>

              <p className="mt-4 text-base leading-7 text-slate-300">
                {description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-red-950/30 transition hover:bg-red-500"
                >
                  <Youtube className="mr-2 h-5 w-5" />
                  Watch on YouTube
                </a>

                <Link
                  href="/episodes"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-red-400/40 hover:bg-red-500/10"
                >
                  More Episodes
                </Link>
              </div>

              {/* ডেট এবং ভিউ সেকশন আপডেট করা হলো */}
              <div className="mt-6 flex flex-wrap items-center gap-6 border-t border-white/10 pt-5 text-sm text-slate-400">
                {publishedDate ? (
                  <p>
                    <span className="font-semibold text-slate-200">Published:</span>{" "}
                    {formatDate(publishedDate.toString())}
                  </p>
                ) : null}

                {episode.viewCount ? (
                  <p>
                    <span className="font-semibold text-slate-200">Views:</span>{" "}
                    {formatNumber(episode.viewCount)}
                  </p>
                ) : null}
              </div>

              {/* ট্যাগ সেকশন আপডেট করা হলো */}
              {episode.tags && episode.tags.length > 0 ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {episode.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-700/60 bg-slate-800/40 px-3 py-1.5 text-xs font-medium text-slate-300 shadow-sm backdrop-blur-sm transition-colors hover:bg-slate-700/80 hover:text-white"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {relatedEpisodes.length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-300">
              More Horror Stories
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white">
              Related Episodes
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedEpisodes.map((item) => {
              const itemVideoId = getVideoId(item);
              const itemSlug = getEpisodeSlug(item);
              const itemThumb =
                item.thumbnail ||
                `https://img.youtube.com/vi/${itemVideoId}/maxresdefault.jpg`;

              return (
                <Link
                  key={itemSlug}
                  href={`/episodes/${itemSlug}`}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition hover:-translate-y-1 hover:border-red-400/40 hover:bg-white/[0.07]"
                >
                  <div className="aspect-video overflow-hidden bg-slate-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={itemThumb}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="line-clamp-2 text-base font-semibold text-white group-hover:text-red-200">
                      {item.title}
                    </h3>

                    {item.description ? (
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">
                        {item.description}
                      </p>
                    ) : null}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}
    </main>
  );
}

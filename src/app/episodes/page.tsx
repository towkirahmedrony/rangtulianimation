import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import Container from "@/components/ui/Container";
import CTAButton from "@/components/ui/CTAButton";
import { MonitorPlay } from "lucide-react";
import EpisodesList from "./EpisodesList";
import { getAllEpisodes } from "@/lib/youtube";

export const metadata: Metadata = {
  title: "Episodes | Rang Tuli",
  description: "রঙতুলি অ্যানিমেশনের সব ভিডিও এক জায়গায় দেখুন।",
};

// ক্যাশ ক্লিয়ার করার জন্য 0 সেট করা হলো
export const revalidate = 0;

export default async function EpisodesPage() {
  // fetch এর বদলে সরাসরি আমাদের সর্ট করা ডাটাবেস ফাংশন কল করা হলো
  const videos = await getAllEpisodes();

  return (
    <div className="py-4 md:py-8">
      <Container>
        <div className="mb-4 flex flex-col items-center justify-center space-y-3 text-center">
          <p className="text-sm text-slate-400 md:text-base">
            রঙতুলি অ্যানিমেশনের সব ভিডিও এক জায়গায় দেখুন।
          </p>
          <CTAButton href={siteConfig.youtubePlaylistUrl} external variant="outline">
            <MonitorPlay className="mr-2 h-4 w-4" /> Open Full Playlist on YouTube
          </CTAButton>
        </div>

        {videos.length > 0 ? (
          <EpisodesList initialVideos={videos} />
        ) : (
          <div className="mx-auto max-w-4xl space-y-6 py-16 text-center">
            <p className="text-sm text-slate-500">ভিডিও লোড করা যাচ্ছে না।</p>
            <CTAButton href={siteConfig.youtubePlaylistUrl} external showIcon>
              View on YouTube
            </CTAButton>
          </div>
        )}
      </Container>
    </div>
  );
}

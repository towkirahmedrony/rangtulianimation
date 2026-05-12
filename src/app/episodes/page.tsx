import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import Container from "@/components/ui/Container";
import CTAButton from "@/components/ui/CTAButton";
import { MonitorPlay } from "lucide-react";
import { Episode } from "@/types/youtube";
import EpisodesList from "./EpisodesList";

export const metadata: Metadata = {
  title: "Episodes | Rang Tuli",
  description: "রঙতুলি অ্যানিমেশনের সব ভিডিও এক জায়গায় দেখুন।",
};

export const revalidate = 60;

async function getEpisodes(): Promise<Episode[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                   (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://your-domain.com');

    const res = await fetch(`${baseUrl}/api/episodes`, {
      next: { revalidate: 60 },
    });
    
    if (!res.ok) return [];
    
    const data = await res.json();
    return data.videos || [];
  } catch (error) {
    return [];
  }
}

export default async function EpisodesPage() {
  const videos = await getEpisodes();

  return (
    <div className="py-4 md:py-8"> {/* টপ প্যাডিং একদম কমিয়ে দেওয়া হলো */}
      <Container>
        {/* Episodes হেডিং রিমুভ করে শুধু ইউটিউব বাটন রাখা হলো */}
        <div className="text-center mb-4 flex flex-col items-center justify-center space-y-3">
          <p className="text-slate-400 text-sm md:text-base">
            রঙতুলি অ্যানিমেশনের সব ভিডিও এক জায়গায় দেখুন।
          </p>
          <CTAButton href={siteConfig.youtubePlaylistUrl} external variant="outline">
            <MonitorPlay className="w-4 h-4 mr-2" /> Open Full Playlist on YouTube
          </CTAButton>
        </div>

        {videos.length > 0 ? (
          <EpisodesList initialVideos={videos} />
        ) : (
          <div className="max-w-4xl mx-auto text-center space-y-6 py-16">
            <p className="text-slate-500 text-sm">ভিডিও লোড করা যাচ্ছে না।</p>
            <CTAButton href={siteConfig.youtubePlaylistUrl} external showIcon>
              View on YouTube
            </CTAButton>
          </div>
        )}
      </Container>
    </div>
  );
}

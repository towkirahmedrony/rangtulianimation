export const revalidate = 60;
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import Container from "@/components/ui/Container";
import EpisodeCard from "@/components/ui/EpisodeCard";
import CTAButton from "@/components/ui/CTAButton";
import { MonitorPlay } from "lucide-react";
import { Episode } from "@/types/youtube";

export const metadata: Metadata = {
  title: "Episodes",
  description: "রঙতুলি অ্যানিমেশনের সব ভিডিও এক জায়গায় দেখুন।",
};

export const revalidate = 3600;

async function getEpisodes(): Promise<Episode[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                   (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://your-domain.com');

    const res = await fetch(`${baseUrl}/api/episodes`, {
      next: { revalidate: 3600 },
    });
    
    if (!res.ok) {
      console.error("API response was not OK. Status:", res.status);
      return [];
    }
    
    const data = await res.json();
    return data.videos || [];
  } catch (error) {
    console.error("Failed to fetch episodes:", error);
    return [];
  }
}

export default async function EpisodesPage() {
  const videos = await getEpisodes();

  return (
    <div className="py-10 md:py-20">
      <Container>
        {/* Header Section with Integrated CTA */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">Episodes</h1>
          <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
            রঙতুলি অ্যানিমেশনের সব ভিডিও এক জায়গায় দেখুন।
          </p>
          
          <div className="flex justify-center">
            <CTAButton href={siteConfig.youtubePlaylistUrl} external variant="outline">
              <MonitorPlay className="w-4 h-4 mr-2" /> Open Full Playlist on YouTube
            </CTAButton>
          </div>
        </div>

        {videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {videos.map((video) => (
              <EpisodeCard 
                key={video.id} 
                title={video.title}
                description={video.description}
                thumbnail={video.thumbnail}
                slug={video.slug}
                youtubeUrl={video.youtubeUrl}
                publishedAt={video.publishedAt}
              />
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto text-center space-y-6 py-16">
            <p className="text-slate-500 text-sm">ভিডিও লোড করা যাচ্ছে না। দয়া করে কিছুক্ষণ পর আবার চেষ্টা করুন।</p>
            <CTAButton href={siteConfig.youtubePlaylistUrl} external showIcon>
              View on YouTube
            </CTAButton>
          </div>
        )}
      </Container>
    </div>
  );
}

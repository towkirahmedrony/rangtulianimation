import HeroSection from "@/components/home/HeroSection";
import PopularEpisodeSection from "@/components/home/PopularEpisodeSection";
import LatestEpisodesSection from "@/components/home/LatestEpisodesSection";
import ContentFeaturesSection from "@/components/home/ContentFeaturesSection";
import SubscribeSection from "@/components/home/SubscribeSection";
import { getMostViewedVideo, getLatestVideos } from "@/lib/youtube";

// ক্যাশ ক্লিয়ার করার জন্য 0 সেট করা হলো
export const revalidate = 0;

export default async function Home() {
  const mostViewed = await getMostViewedVideo();
  const latestVideos = await getLatestVideos(4);

  return (
    <div className="min-h-screen overflow-hidden bg-app">
      <HeroSection />
      <PopularEpisodeSection video={mostViewed} />
      <LatestEpisodesSection videos={latestVideos} />
      <ContentFeaturesSection />
      <SubscribeSection />
    </div>
  );
}

import { getLatestVideos, getMostViewedVideo } from "@/lib/youtube";
import HeroSection from "@/components/home/HeroSection";
import PopularEpisodeSection from "@/components/home/PopularEpisodeSection";
import LatestEpisodesSection from "@/components/home/LatestEpisodesSection";
import ContentFeaturesSection from "@/components/home/ContentFeaturesSection";
import SubscribeSection from "@/components/home/SubscribeSection";

export default async function Home() {
  const mostViewed = await getMostViewedVideo();
  const latestVideos = await getLatestVideos(4);

  return (
    <div className="min-h-screen overflow-hidden bg-horror">
      <HeroSection />
      <PopularEpisodeSection video={mostViewed} />
      <LatestEpisodesSection videos={latestVideos} />
      <ContentFeaturesSection />
      <SubscribeSection />
    </div>
  );
}

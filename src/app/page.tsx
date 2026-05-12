import { adminDb } from "@/lib/firebaseAdmin";
import HeroSection from "@/components/home/HeroSection";
import PopularEpisodeSection from "@/components/home/PopularEpisodeSection";
import LatestEpisodesSection from "@/components/home/LatestEpisodesSection";
import ContentFeaturesSection from "@/components/home/ContentFeaturesSection";
import SubscribeSection from "@/components/home/SubscribeSection";
import { Episode } from "@/types/youtube";

export const revalidate = 60;

// এখানে TypeScript কে বলে দেওয়া হলো রিটার্ন টাইপ কী হবে
async function getHomeData(): Promise<{ mostViewed: Episode | null; latestVideos: Episode[] }> {
  try {
    const snapshot = await adminDb.ref("episodes").get();
    if (!snapshot.exists()) return { mostViewed: null, latestVideos: [] };

    const data = snapshot.val();
    // 'as Episode[]' দিয়ে নিশ্চিত করা হলো যে এটি এপিসোড টাইপের ডাটা
    const allEpisodes = Object.values(data).filter((ep: any) => ep.isActive !== false) as Episode[];

    // লেটেস্ট ৪টি ভিডিও
    const latestVideos = [...allEpisodes]
      .sort((a, b) => {
        const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        return dateB - dateA;
      })
      .slice(0, 4);

    // সবচেয়ে জনপ্রিয় ভিডিও
    const mostViewed = [...allEpisodes].sort((a: any, b: any) => {
      const viewsA = parseInt(a.views || "0");
      const viewsB = parseInt(b.views || "0");
      return viewsB - viewsA;
    })[0] || null;

    return { mostViewed, latestVideos };
  } catch (error) {
    console.error("Firebase fetch error in Home:", error);
    return { mostViewed: null, latestVideos: [] };
  }
}

export default async function Home() {
  const { mostViewed, latestVideos } = await getHomeData();

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

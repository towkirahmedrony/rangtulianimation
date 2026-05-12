import { adminDb } from "@/lib/firebaseAdmin";
import HeroSection from "@/components/home/HeroSection";
import PopularEpisodeSection from "@/components/home/PopularEpisodeSection";
import LatestEpisodesSection from "@/components/home/LatestEpisodesSection";
import ContentFeaturesSection from "@/components/home/ContentFeaturesSection";
import SubscribeSection from "@/components/home/SubscribeSection";

export const revalidate = 60; // প্রতি ৬০ সেকেন্ডে ক্যাশ আপডেট হবে (কোটা বাঁচার জন্য বেস্ট)

async function getHomeData() {
  try {
    const snapshot = await adminDb.ref("episodes").get();
    if (!snapshot.exists()) return { mostViewed: null, latestVideos: [] };

    const data = snapshot.val();
    const allEpisodes = Object.values(data).filter((ep: any) => ep.isActive !== false);

    // লেটেস্ট ৪টি ভিডিও (তারিখ অনুযায়ী সাজানো)
    const latestVideos = [...allEpisodes]
      .sort((a: any, b: any) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 4);

    // সবচেয়ে জনপ্রিয় ভিডিও (যদি ফায়ারবেসে views সেভ করা থাকে, নতুবা লেটেস্ট ভিডিওটাই দেখাবে)
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

import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { adminDb } from "@/lib/firebaseAdmin";

export const revalidate = 86400; // Revalidate every 24 hours

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.siteUrl;

  // Static Routes
  const staticRoutes = [
    "",
    "/episodes",
    "/about",
    "/contact",
    "/privacy-policy",
    "/disclaimer",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const dynamicRoutes: MetadataRoute.Sitemap = [];

  try {
    // Firebase থেকে সরাসরি ডেটা নিয়ে আসা হচ্ছে (Build time error এড়ানোর জন্য)
    const snapshot = await adminDb.ref("episodes").get();
    
    if (snapshot.exists()) {
      const episodes = snapshot.val();
      
      Object.values(episodes).forEach((episode: any) => {
        if (episode.slug) {
          dynamicRoutes.push({
            url: `${baseUrl}/episodes/${episode.slug}`,
            lastModified: new Date(episode.updatedAt || episode.publishedAt || Date.now()),
            changeFrequency: "weekly" as const,
            priority: 0.7,
          });
        }
      });
    }
  } catch (error) {
    console.error("Sitemap generation error:", error);
  }

  return [...staticRoutes, ...dynamicRoutes];
}

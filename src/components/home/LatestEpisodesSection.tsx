import type { Episode } from "@/types/youtube";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import CTAButton from "@/components/ui/CTAButton";
import EpisodeCard from "@/components/ui/EpisodeCard";

type LatestEpisodesSectionProps = {
  videos: Episode[];
};

export default function LatestEpisodesSection({ videos }: LatestEpisodesSectionProps) {
  return (
    <section className="relative py-8 md:py-14">
      <Container>
        <div className="mb-8 flex items-end justify-between gap-4">
          <SectionHeader
            title="সাম্প্রতিক এপিসোড"
            subtitle="নতুন আপলোড হওয়া বাংলা হরর গল্প।"
            className="mb-0"
          />

          <CTAButton href="/episodes" variant="outline" className="hidden sm:inline-flex">
            সবগুলো দেখুন
          </CTAButton>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {videos.length > 0 ? (
            videos.map((video) => (
              <EpisodeCard 
                key={video.id} 
                title={video.title}
                description={video.description}
                thumbnail={video.thumbnail}
                slug={video.slug}
                youtubeUrl={video.youtubeUrl}
                publishedAt={video.publishedAt}
              />
            ))
          ) : (
            <p className="col-span-full py-10 text-center text-slate-500">
              কোনো ভিডিও পাওয়া যায়নি।
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}

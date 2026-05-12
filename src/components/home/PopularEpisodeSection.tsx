import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Play } from "lucide-react";
import type { Episode } from "@/types/youtube";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import CTAButton from "@/components/ui/CTAButton";

type PopularEpisodeSectionProps = {
  video: Episode | null;
};

export default function PopularEpisodeSection({ video }: PopularEpisodeSectionProps) {
  return (
    <section className="relative py-12 md:py-20">
      <Container>
        <div className="mb-8 flex items-end justify-between gap-4">
          <SectionHeader
            title="সবচেয়ে জনপ্রিয় এপিসোড"
            subtitle="দর্শকদের সবচেয়ে বেশি দেখা ভৌতিক গল্প।"
            className="mb-0"
          />

          <CTAButton href="/episodes" variant="outline" className="hidden sm:inline-flex">
            সবগুলো দেখুন
          </CTAButton>
        </div>

        {video ? (
          <div className="horror-card group relative block overflow-hidden rounded-3xl transition duration-500 hover:-translate-y-1">
            
            {/* Full Card Clickable Overlay */}
            <Link href={`/episodes/${video.slug}`} className="absolute inset-0 z-10" aria-label={`${video.title} বিস্তারিত দেখুন`} />

            <div className="relative z-0 grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
              {/* Image Area */}
              <div className="relative aspect-video overflow-hidden bg-black block">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  unoptimized
                  className="object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

                <div className="absolute left-5 bottom-5 rounded-md bg-red-700 px-4 py-2 text-xs font-black uppercase tracking-wider text-white shadow-[0_0_20px_rgba(220,38,38,0.38)]">
                  Must Watch
                </div>

                <div className="absolute inset-0 grid place-items-center">
                  <div className="grid h-16 w-16 place-items-center rounded-full border border-white/25 bg-black/55 text-white shadow-[0_0_42px_rgba(220,38,38,0.52)] backdrop-blur transition duration-300 group-hover:scale-110 group-hover:bg-red-700">
                    <Play className="ml-0.5 h-7 w-7 fill-white" />
                  </div>
                </div>
              </div>

              {/* Text & Button Area */}
              <div className="relative flex flex-col justify-center p-6 md:p-10">
                <p className="mb-3 text-sm font-semibold text-red-500">
                  জনপ্রিয় গল্প
                </p>

                <h2 className="mb-4 text-2xl font-bold leading-snug text-white transition group-hover:text-red-100 md:text-3xl">
                  {video.title}
                </h2>

                <p className="mb-7 line-clamp-4 text-sm leading-7 text-slate-400">
                  {video.description || "একটি রহস্যময় ও ভয়ংকর বাংলা হরর কার্টুন এপিসোড।"}
                </p>

                {/* Action Buttons (Responsive: Mobile e up-down, Desktop e side-by-side) */}
                <div className="relative z-20 flex flex-col sm:flex-row items-center gap-3 mt-auto pt-4 sm:pt-0">
                  <Link 
                    href={`/episodes/${video.slug}`} 
                    className="flex w-full sm:w-fit items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-bold text-slate-200 transition duration-300 hover:border-red-500/35 hover:bg-red-600/10 hover:text-white"
                  >
                    <Play className="h-4 w-4 fill-red-500 text-red-500" />
                    বিস্তারিত দেখুন
                  </Link>
                  
                  <a 
                    href={video.youtubeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex w-full sm:w-fit items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-bold text-slate-300 transition duration-300 hover:border-red-500/40 hover:bg-red-600/10 hover:text-red-400"
                  >
                    ইউটিউবে দেখুন
                    <ExternalLink className="h-4 w-4 opacity-70" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="horror-card rounded-3xl p-10 text-center text-slate-400">
            ভিডিও লোড হচ্ছে...
          </div>
        )}
      </Container>
    </section>
  );
}

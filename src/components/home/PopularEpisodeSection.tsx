import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
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
          <div className="group horror-card relative block overflow-hidden rounded-3xl transition duration-500 hover:-translate-y-1">
            
            {/* Full Card Clickable Overlay */}
            <Link href={`/episodes/${video.slug}`} className="absolute inset-0 z-10" aria-label={`${video.title} বিস্তারিত দেখুন`} />

            <div className="relative z-0 grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
              {/* Image Area */}
              <div className="relative block aspect-video overflow-hidden bg-black">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  unoptimized
                  className="object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

                <div className="absolute bottom-5 left-5 rounded-md bg-red-700 px-4 py-2 text-xs font-black uppercase tracking-wider text-white shadow-[0_0_20px_rgba(220,38,38,0.38)]">
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
                <div className="relative z-20 mt-auto flex flex-col items-center gap-3 pt-4 sm:flex-row sm:pt-0">
                  
                  {/* বিস্তারিত দেখুন - Primary Button (Solid Red) */}
                  <Link 
                    href={`/episodes/${video.slug}`} 
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-900/30 transition duration-300 hover:bg-red-600 hover:shadow-red-900/50 sm:w-fit"
                  >
                    <Play className="h-4 w-4 fill-white text-white" />
                    বিস্তারিত দেখুন
                  </Link>
                  
                  {/* ইউটিউবে দেখুন - Secondary Button (Outline + YouTube SVG) */}
                  <a 
                    href={video.youtubeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group/btn flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-slate-300 transition duration-300 hover:border-red-500/50 hover:bg-red-500/10 hover:text-white sm:w-fit"
                    title="Watch on YouTube"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4 text-red-500 transition-colors duration-300 group-hover/btn:text-red-400"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    ইউটিউবে দেখুন
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

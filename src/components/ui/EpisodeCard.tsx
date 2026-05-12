import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ExternalLink, Play } from "lucide-react";
import { formatDate } from "@/lib/utils";

type EpisodeCardProps = {
  title: string;
  description?: string;
  thumbnail: string;
  slug: string;
  youtubeUrl: string;
  publishedAt?: string;
  isMustWatch?: boolean;
};

export default function EpisodeCard({
  title,
  description,
  thumbnail,
  slug,
  youtubeUrl,
  publishedAt,
  isMustWatch = false,
}: EpisodeCardProps) {
  const desc = description?.trim() || "একটি রহস্যময় ও ভয়ংকর বাংলা হরর কার্টুন এপিসোড।";

  return (
    <div className="group horror-card relative flex h-full flex-col overflow-hidden rounded-2xl transition duration-500 hover:-translate-y-1">
      {/* Background Glow Effects */}
      <div className="pointer-events-none absolute -right-16 -top-16 z-0 h-36 w-36 rounded-full bg-red-700/0 blur-3xl transition duration-700 group-hover:bg-red-700/18" />
      <div className="pointer-events-none absolute bottom-0 left-0 z-0 h-px w-0 bg-gradient-to-r from-red-600 via-red-500 to-transparent transition-all duration-700 group-hover:w-full" />

      {/* Full Card Clickable Link (Absolute Overlay) */}
      <Link href={`/episodes/${slug}`} className="absolute inset-0 z-10" aria-label={`${title} বিস্তারিত দেখুন`} />

      {/* Image Section */}
      <div className="relative z-0 block aspect-video overflow-hidden bg-black">
        <Image
          src={thumbnail}
          alt={title}
          fill
          unoptimized
          className="object-cover opacity-75 transition duration-700 group-hover:scale-110 group-hover:opacity-100"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-red-950/0 transition duration-500 group-hover:bg-red-950/10" />

        <div className="absolute inset-0 grid place-items-center">
          <div className="grid h-14 w-14 place-items-center rounded-full border border-white/20 bg-black/65 text-white opacity-95 shadow-[0_0_30px_rgba(220,38,38,0.38)] backdrop-blur transition duration-300 group-hover:scale-110 group-hover:border-red-400/40 group-hover:bg-red-700 group-hover:shadow-[0_0_42px_rgba(220,38,38,0.65)]">
            <Play className="ml-0.5 h-6 w-6 fill-white" />
          </div>
        </div>

        {/* শুধুমাত্র isMustWatch true হলে দেখাবে */}
        {isMustWatch && (
          <div className="absolute left-4 top-4 rounded-md border border-red-500/25 bg-red-700/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white shadow-[0_0_18px_rgba(220,38,38,0.28)]">
            Must Watch
          </div>
        )}
      </div>

      {/* Text Content */}
      <div className="relative z-0 flex flex-1 flex-col p-5 pb-0">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-red-400">
          <CalendarDays className="h-3.5 w-3.5" />
          <span>{publishedAt ? formatDate(publishedAt) : "সম্প্রতি প্রকাশিত"}</span>
        </div>

        <h3 className="mb-3 line-clamp-2 text-lg font-bold leading-snug text-slate-100 transition duration-300 group-hover:text-white" title={title}>
          {title}
        </h3>

        <p className="mb-5 line-clamp-3 flex-1 text-sm leading-6 text-slate-400" title={desc}>
          {desc}
        </p>
      </div>

      {/* Action Buttons (Responsive: Mobile e up-down, Desktop e side-by-side) */}
      <div className="relative z-20 p-5 pt-0 mt-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 pt-4">
          <Link 
            href={`/episodes/${slug}`} 
            className="flex w-full sm:flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-2 py-2.5 text-sm font-bold text-slate-200 transition duration-300 hover:border-red-500/35 hover:bg-red-600/10 hover:text-white"
          >
            <Play className="h-4 w-4 fill-red-500 text-red-500" />
            বিস্তারিত
          </Link>

          <a 
            href={youtubeUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex w-full sm:flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-2 py-2.5 text-sm font-bold text-slate-300 transition duration-300 hover:border-red-500/40 hover:bg-red-600/10 hover:text-red-400" 
            title="Watch on YouTube"
          >
            ইউটিউবে দেখুন
            <ExternalLink className="h-3.5 w-3.5 opacity-70" />
          </a>
        </div>
      </div>
    </div>
  );
}

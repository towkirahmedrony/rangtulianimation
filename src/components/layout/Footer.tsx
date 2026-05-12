"use client";

import Link from "next/link";
import Image from "next/image";
import { Share2 } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Rang Tuli Animation",
          text: "রহস্য আর ভয়ের এক নতুন জগত! এখনই সাবস্ক্রাইব করুন।",
          url: siteConfig.youtubeChannelUrl,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(siteConfig.youtubeChannelUrl);
      alert("YouTube channel link copied to clipboard!");
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#020617]">
      {/* Background Subtle Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(220,38,38,0.1),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-8 md:grid-cols-[2fr_1fr_1fr] md:gap-12">
          
          {/* Column 1: Brand & Socials */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <Link href="/" className="mb-4 flex items-center gap-3 transition-transform hover:scale-[1.02]">
              <div className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-xl border border-red-500/30 bg-red-600/10 shadow-lg shadow-red-900/20">
                <Image 
                  src="/icon.png" 
                  alt="Rang Tuli Animation" 
                  width={48} 
                  height={48} 
                  className="h-full w-full object-cover" 
                />
              </div>

              <div>
                <p className="text-base font-black uppercase tracking-[0.15em] text-white">
                  Rang Tuli
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-red-500">
                  Animation
                </p>
              </div>
            </Link>

            <p className="max-w-sm text-sm leading-6 text-slate-400">
              রহস্য, ভয় এবং সাসপেন্সে ভরা একদম নতুন সব সিনেমাটিক বাংলা হরর অ্যানিমেশন গল্প।
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={siteConfig.youtubeChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-bold text-slate-300 transition-all hover:border-red-500/50 hover:bg-red-500/10 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4 text-red-600 transition-colors group-hover:text-red-500"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                Subscribe
              </a>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-bold text-slate-300 transition-all hover:border-red-500/40 hover:bg-white/5 hover:text-white"
              >
                <Share2 className="h-3.5 w-3.5" />
                Share
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="border-t border-white/5 pt-8 text-center md:border-0 md:pt-0 md:text-left">
            <h3 className="mb-5 text-[11px] font-black uppercase tracking-[0.2em] text-slate-200">
              কুইক লিংক
            </h3>

            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs font-medium text-slate-400 md:block md:space-y-3">
              {siteConfig.footerLinks.quickLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path} className="transition-colors hover:text-red-400">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal Links */}
          <div className="border-t border-white/5 pt-8 text-center md:border-0 md:pt-0 md:text-left">
            <h3 className="mb-5 text-[11px] font-black uppercase tracking-[0.2em] text-slate-200">
              তথ্য
            </h3>

            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs font-medium text-slate-400 md:block md:space-y-3">
              {siteConfig.footerLinks.legalLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path} className="transition-colors hover:text-red-400">
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/terms" className="transition-colors hover:text-red-400">
                  শর্তাবলী
                </Link>
              </li>
            </ul>
          </div>
          
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-[10px] font-medium tracking-[0.2em] text-slate-500">
          <p>© {currentYear} {siteConfig.name.toUpperCase()}. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
}

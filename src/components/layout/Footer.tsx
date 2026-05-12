"use client";

import Link from "next/link";
import Image from "next/image";
import { Play, Share2 } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: siteConfig.name,
          text: "বাংলার সেরা হরর অ্যানিমেশন চ্যানেল - Rang Tuli Animation",
          url: siteConfig.youtubeChannelUrl,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback for browsers that do not support Web Share API
      navigator.clipboard.writeText(siteConfig.youtubeChannelUrl);
      alert("YouTube channel link copied to clipboard!");
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050505]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(220,38,38,0.16),transparent_30%),radial-gradient(circle_at_90%_20%,rgba(127,29,29,0.12),transparent_28%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
          
          {/* Column 1: Brand & Socials */}
          <div>
            <Link href="/" className="mb-5 flex items-center gap-3">
              <div className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-xl border border-red-500/30 bg-red-600/10">
                <Image 
                  src="/icon.png" 
                  alt="Rang Tuli Animation" 
                  width={44} 
                  height={44} 
                  className="h-full w-full object-cover" 
                />
              </div>

              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-white">
                  Rang Tuli
                </p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.22em] text-red-500">
                  Animation
                </p>
              </div>
            </Link>

            <p className="max-w-sm text-sm leading-7 text-slate-400">
              {siteConfig.tagline} রহস্য, ভয় এবং সাসপেন্সে ভরা বাংলা হরর অ্যানিমেশন গল্প।
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={siteConfig.youtubeChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 transition hover:border-red-500/40 hover:text-red-400"
              >
                <Play className="h-5 w-5 fill-current" />
              </a>

              <button
                onClick={handleShare}
                aria-label="Share YouTube Channel"
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 transition hover:border-red-500/40 hover:text-red-400"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-white">
              কুইক লিংক
            </h3>

            <ul className="space-y-3 text-sm text-slate-400">
              {siteConfig.footerLinks.quickLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path} className="transition hover:text-red-400">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal Links */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-white">
              তথ্য
            </h3>

            <ul className="space-y-3 text-sm text-slate-400">
              {siteConfig.footerLinks.legalLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path} className="transition hover:text-red-400">
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/terms" className="transition hover:text-red-400">
                  শর্তাবলী ও নীতিমালা
                </Link>
              </li>
            </ul>
          </div>
          
        </div>

        <div className="mt-12 border-t border-white/10 pt-7 text-center text-sm text-slate-500">
          <p>© {currentYear} {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

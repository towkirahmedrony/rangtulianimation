"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Play, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/75 backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Left: Logo Section */}
          <Link href="/" onClick={closeMenu} className="group flex items-center gap-3">
            {/* Main Icon Logo */}
            <div className="relative h-9 w-9 sm:h-11 sm:w-11 shrink-0 overflow-hidden rounded-xl shadow-[0_0_24px_rgba(220,38,38,0.18)]">
              <Image
                src="/logo.png"
                alt="Rang Tuli Logo"
                width={44}
                height={44}
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                priority
              />
              <span className="absolute inset-0 rounded-xl bg-red-600/10 opacity-0 blur transition group-hover:opacity-100" />
            </div>

            {/* Text Logo - Clean and Professional */}
            <div className="flex flex-col justify-center">
              <span className="text-base font-black uppercase tracking-widest text-white sm:text-lg md:text-xl">
                Rang Tuli
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-red-600 sm:text-[10px] md:text-xs">
                Animation
              </span>
            </div>
          </Link>

          {/* Center: Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  "relative text-sm font-semibold text-slate-300 transition hover:text-white",
                  "after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-red-600 after:transition-all hover:after:w-full",
                  pathname === link.path && "text-white after:w-full"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right: Actions & Mobile Toggle */}
          <div className="flex items-center gap-4">
            {/* Desktop Button - Only shows on md/lg screens */}
            <div className="hidden items-center md:flex">
              <a
                href={siteConfig.youtubeChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-red-700 px-5 py-2 text-sm font-bold text-white shadow-[0_0_20px_rgba(220,38,38,0.25)] transition-all hover:scale-105 hover:bg-red-600 hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]"
              >
                <Play className="h-4 w-4 fill-white" />
                YouTube দেখুন
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsOpen((value) => !value)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/5 bg-transparent text-slate-200 transition-colors hover:bg-white/5 lg:hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
          
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="border-t border-white/10 bg-black/90 px-4 py-4 shadow-2xl backdrop-blur-xl lg:hidden">
          <div className="mx-auto max-w-7xl space-y-2">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={closeMenu}
                className={cn(
                  "block rounded-xl px-4 py-3 text-sm font-semibold transition",
                  pathname === link.path
                    ? "bg-red-600/15 text-red-400"
                    : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
                )}
              >
                {link.name}
              </Link>
            ))}

            {/* YouTube button is back inside the mobile menu */}
            <a
              href={siteConfig.youtubeChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-red-700 px-4 py-3 text-sm font-bold text-white"
            >
              <Play className="h-4 w-4 fill-white" />
              YouTube এ দেখুন
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

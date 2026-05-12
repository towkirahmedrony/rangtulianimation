import { Bell, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import Container from "@/components/ui/Container";
import CTAButton from "@/components/ui/CTAButton";

export default function SubscribeSection() {
  return (
    <section className="relative pb-16 md:pb-24">
      <Container>
        <div className="group horror-card relative overflow-hidden rounded-3xl p-7 transition duration-500 hover:-translate-y-1 sm:p-8 md:p-14">
          <div className="absolute inset-0 bg-[url('/subscribe-bg.jpg')] bg-cover bg-center opacity-85 transition duration-700 group-hover:scale-105" />

          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 to-black/30 md:bg-gradient-to-r md:from-black/80 md:via-black/50 md:to-transparent" />

          <div className="absolute right-16 top-1/2 hidden -translate-y-1/2 text-red-600/70 animate-float-soft lg:block">
            <Bell className="h-36 w-36 drop-shadow-[0_0_35px_rgba(220,38,38,0.75)]" />
          </div>

          <div className="relative z-10 mx-auto max-w-xl text-center md:mx-0 md:text-left">
            <div className="mb-4 mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/30 bg-red-600/15 text-red-400 md:mx-0">
              <Sparkles className="h-6 w-6" />
            </div>

            <h2 className="mb-4 text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
              নতুন এপিসোড মিস করতে চান না তো?
            </h2>

            <p className="mb-7 text-sm leading-relaxed text-slate-300 sm:text-base md:font-medium md:text-slate-100">
              আমাদের YouTube চ্যানেলে সাবস্ক্রাইব করুন এবং নোটিফিকেশন অন করে রাখুন।
            </p>

            <div className="flex justify-center md:justify-start">
              <CTAButton
                href={siteConfig.youtubeChannelUrl}
                external
                className="btn-shine flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 text-white"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                চ্যানেল সাবস্ক্রাইব করুন
              </CTAButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

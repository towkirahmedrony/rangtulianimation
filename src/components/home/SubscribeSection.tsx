import { Bell, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import Container from "@/components/ui/Container";
import CTAButton from "@/components/ui/CTAButton";

export default function SubscribeSection() {
  return (
    <section className="relative pb-16 md:pb-24">
      <Container>
        <div className="horror-card relative overflow-hidden rounded-3xl p-7 transition duration-500 hover:-translate-y-1 sm:p-8 md:p-14">
          <div className="absolute inset-0 bg-[url('/subscribe-bg.jpg')] bg-cover bg-center opacity-85 transition duration-700 hover:scale-105" />

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
                showIcon
                className="btn-shine"
              >
                চ্যানেল সাবস্ক্রাইব করুন
              </CTAButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

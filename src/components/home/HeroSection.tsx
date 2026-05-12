import { siteConfig } from "@/config/site";
import Container from "@/components/ui/Container";
import CTAButton from "@/components/ui/CTAButton";

export default function HeroSection() {
  return (
    <section className="relative min-h-[560px] overflow-hidden border-b border-white/10 md:min-h-[690px]">
      <div className="absolute inset-0 scale-105 bg-[url('/bg.png')] bg-cover bg-[75%_center] opacity-100 animate-slow-zoom md:bg-center" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-transparent md:bg-gradient-to-r md:from-black/95 md:via-black/50 md:to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      <div className="absolute left-[-90px] top-24 h-56 w-56 rounded-full bg-red-700/30 blur-3xl animate-float-soft" />
      <div className="absolute right-[-70px] bottom-16 h-64 w-64 rounded-full bg-red-600/20 blur-3xl animate-float-soft" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-[radial-gradient(ellipse_at_center,rgba(148,163,184,0.12),transparent_62%)] opacity-70 animate-fog-drift" />
      <div className="pointer-events-none absolute inset-0 noise-overlay" />

      <Container className="relative z-10 flex min-h-[560px] items-center pb-10 pt-16 md:min-h-[690px] md:pt-20">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-bold text-red-500 animate-fade-up md:tracking-[0.18em]">
            বাংলার সেরা হরর অ্যানিমেশন চ্যানেল
          </p>

          <h1 className="mb-5 text-[3.35rem] font-black uppercase leading-[0.88] tracking-tight text-white animate-fade-up-delay-1 sm:text-7xl md:text-8xl lg:text-9xl">
            <span className="block text-shadow-white">Rang Tuli</span>
            <span className="block text-red-600 text-glow-red animate-red-pulse">
              Animation
            </span>
          </h1>

          <p className="mb-4 max-w-2xl text-xl font-semibold leading-snug text-slate-100 animate-fade-up-delay-2 md:text-2xl">
            রহস্য, ভয় আর রোমাঞ্চ ভরা গল্পের জগৎ
          </p>

          <p className="mb-8 max-w-xl text-base leading-8 text-slate-400 animate-fade-up-delay-2">
            এখানে পাবেন একদম নতুন সব বাংলা হরর গল্প, ভৌতিক রহস্য,
            সাসপেন্স থ্রিলার এবং সিনেমাটিক অ্যানিমেশন কনটেন্ট।
          </p>

          <div className="flex flex-col gap-4 animate-fade-up-delay-3 sm:flex-row">
            <CTAButton
              href={siteConfig.youtubeChannelUrl}
              external
              showIcon
              className="btn-shine"
            >
              YouTube এ দেখুন
            </CTAButton>

            <CTAButton href="/episodes" variant="secondary">
              সব এপিসোড দেখুন
            </CTAButton>
          </div>
        </div>
      </Container>
    </section>
  );
}

import { Metadata } from "next";
import { BookOpen, Clapperboard, Ghost, ShieldCheck, TrendingUp } from "lucide-react";
import { siteConfig } from "@/config/site";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import FeatureCard from "@/components/ui/FeatureCard";

export const metadata: Metadata = {
  title: `About ${siteConfig.name} | বাংলা হরর কার্টুন ও অ্যানিমেশন গল্প`,
  description:
    `${siteConfig.name} একটি বাংলা হরর কার্টুন ও অ্যানিমেশন চ্যানেল, যেখানে ভূতের গল্প, রহস্য, সাসপেন্স এবং সিনেমাটিক Bengali horror cartoon animation প্রকাশ করা হয়।`,
  keywords: [
    "Rang Tuli Animation",
    "রঙতুলি অ্যানিমেশন",
    "বাংলা হরর কার্টুন",
    "ভূতের কার্টুন",
    "বাংলা ভূতের গল্প",
    "Bengali horror cartoon",
    "Bangla horror animation",
    "Bangla cartoon story",
    "বাংলা অ্যানিমেশন",
    "রহস্য গল্প",
    "সাসপেন্স গল্প",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `${siteConfig.name} সম্পর্কে | বাংলা হরর কার্টুন`,
    description:
      "রঙতুলি অ্যানিমেশন বাংলা দর্শকদের জন্য তৈরি একটি হরর, রহস্য ও সাসপেন্স ভিত্তিক অ্যানিমেশন চ্যানেল।",
    type: "website",
    locale: "bn_BD",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} সম্পর্কে`,
    description:
      "বাংলা হরর কার্টুন, ভূতের গল্প, রহস্য ও সাসপেন্স অ্যানিমেশনের জন্য রঙতুলি অ্যানিমেশন।",
  },
};

export default function AboutPage() {
  return (
    <main className="relative overflow-hidden bg-horror pt-2 pb-16 md:py-32">
      <div className="pointer-events-none absolute left-0 top-40 h-64 w-64 rounded-full bg-red-900/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-20 right-0 h-72 w-72 rounded-full bg-red-700/10 blur-[120px]" />

      <Container>
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            title="রঙতুলি অ্যানিমেশন সম্পর্কে"
            subtitle="ভয়, রহস্য আর টানটান উত্তেজনার এক সিনেমাটিক অ্যানিমেশন জগৎ।"
            centered
          />

          <section className="mb-8 mt-2 rounded-2xl border border-white/10 bg-[#0f0f0f]/90 p-5 text-slate-300 shadow-xl md:mb-16 md:mt-10 md:rounded-3xl md:p-12">
            <div className="space-y-4 text-[15px] leading-relaxed md:text-lg md:leading-8">
              <p className="text-base font-medium text-slate-100 md:text-lg">
                অন্ধকারের বুক চিরে বেরিয়ে আসা অজানা রহস্য, শিরদাঁড়া হিম করা ভয় আর টানটান উত্তেজনার গল্পগুলোকে আমরা জীবন্ত করে তুলি অ্যানিমেশনের পর্দায়।
              </p>

              <p>
                আমাদের প্রতিটি সৃষ্টি তৈরি হয় বাংলা ভাষাভাষী দর্শকদের কথা মাথায় রেখে। গতানুগতিক কার্টুনের বাইরে গিয়ে আমরা চেষ্টা করি সিনেমাটিক আবহ, নিখুঁত সাউন্ড ডিজাইন এবং ডার্ক অ্যাটমোসফিয়ারের সাহায্যে গল্পে এক বাস্তবসম্মত ও গা ছমছমে অনুভূতি নিয়ে আসতে। 
              </p>

              <p>
                আমাদের লক্ষ্য একটাই— বাংলা অ্যানিমেশন জগতে এক নতুন মানদণ্ড তৈরি করা, যাতে দর্শকরা ইউটিউবের পর্দাতেই একটি প্রিমিয়াম এবং আন্তর্জাতিক মানের হরর এক্সপেরিয়েন্স উপভোগ করতে পারেন।
              </p>
            </div>

            <div className="mt-6 rounded-r-xl border-l-4 border-red-600 bg-red-950/20 px-4 py-4 md:mt-8 md:rounded-r-2xl md:px-6 md:py-5">
              <p className="text-[15px] font-medium italic leading-relaxed text-red-200 md:text-lg">
                “ভয় কেবল আমাদের মাধ্যম, আসল উদ্দেশ্য হলো এক দুর্দান্ত গল্পের গভীরে আপনাকে টেনে নেওয়া।”
              </p>
            </div>
          </section>

          <section>
            <div className="mb-6 text-center md:mb-10">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-red-500 md:mb-3 md:text-sm">
                Our Mission
              </p>
              <h2 className="text-xl font-bold text-white md:text-4xl">
                আমাদের ক্যানভাসে যা থাকে
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              <FeatureCard
                title="মৌলিক ভূতের গল্প"
                description="শেকড়ের সাথে যুক্ত এমন সব অজানা ও লোমহর্ষক ঘটনা, যা বিশেষভাবে বাংলা দর্শকদের জন্য লেখা।"
                icon={<BookOpen className="h-5 w-5 md:h-6 md:w-6" />}
              />

              <FeatureCard
                title="রহস্য ও সাসপেন্স"
                description="গল্পের পরতে পরতে লুকিয়ে থাকা সাসপেন্স, যা শেষ মুহূর্ত পর্যন্ত আপনাকে স্ক্রিনে আটকে রাখবে।"
                icon={<Ghost className="h-5 w-5 md:h-6 md:w-6" />}
              />

              <FeatureCard
                title="সিনেমাটিক ভিজ্যুয়াল"
                description="ডার্ক অ্যাটমোসফিয়ার এবং মানসম্মত সাউন্ড ডিজাইনের মাধ্যমে অ্যানিমেশনকে আরও বাস্তবসম্মত করে তোলা।"
                icon={<Clapperboard className="h-5 w-5 md:h-6 md:w-6" />}
              />

              <FeatureCard
                title="বিশ্বস্ত ব্র্যান্ড"
                description="মানহীন কনটেন্টের ভিড়ে একটি রুচিশীল এবং প্রিমিয়াম বাংলা কার্টুন চ্যানেল হিসেবে নিজেদের প্রতিষ্ঠিত করা।"
                icon={<TrendingUp className="h-5 w-5 md:h-6 md:w-6" />}
              />
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:mt-16 md:rounded-3xl md:p-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-5">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-red-500/25 bg-red-500/10 text-red-400 md:h-14 md:w-14 md:rounded-2xl">
                <ShieldCheck className="h-6 w-6 md:h-7 md:w-7" />
              </div>

              <div>
                <h2 className="mb-2 text-lg font-bold text-white md:mb-3 md:text-2xl">
                  আমাদের কনটেন্ট ও দর্শক
                </h2>
                <p className="text-[15px] leading-relaxed text-slate-400 md:text-base md:leading-8">
                  রঙতুলি অ্যানিমেশনের গল্পগুলো সম্পূর্ণ বিনোদনের উদ্দেশ্যে তৈরি। অতিপ্রাকৃত ঘটনা এবং সাসপেন্সকে আমরা শিল্পের একটি মাধ্যম হিসেবে ব্যবহার করি, যেন দর্শক নিজেদের ভাষায় সেরা মানের স্টোরিটেলিং উপভোগ করতে পারেন।
                </p>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}

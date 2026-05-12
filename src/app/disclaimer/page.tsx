import { Metadata } from "next";
import {
  Clapperboard,
  Eye,
  Ghost,
  Info,
  ShieldAlert,
  MonitorPlay,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: `Disclaimer | ${siteConfig.name} - বাংলা হরর কার্টুন`,
  description:
    `${siteConfig.name} এর Disclaimer পড়ুন। আমাদের বাংলা হরর কার্টুন, ভূতের গল্প, রহস্য ও সাসপেন্স অ্যানিমেশন কনটেন্ট সম্পূর্ণ বিনোদনের উদ্দেশ্যে তৈরি।`,
  keywords: [
    `${siteConfig.name} disclaimer`,
    "Rang Tuli Animation disclaimer",
    "বাংলা হরর কার্টুন disclaimer",
    "ভূতের গল্প disclaimer",
    "Bangla horror cartoon disclaimer",
    "Bengali horror animation disclaimer",
    "fictional horror content",
  ],
  alternates: {
    canonical: "/disclaimer",
  },
  openGraph: {
    title: `Disclaimer | ${siteConfig.name}`,
    description:
      "রঙতুলি অ্যানিমেশনের হরর, রহস্য ও সাসপেন্স ভিত্তিক অ্যানিমেশন কনটেন্ট সম্পর্কে গুরুত্বপূর্ণ Disclaimer।",
    type: "website",
    locale: "bn_BD",
  },
  twitter: {
    card: "summary_large_image",
    title: `Disclaimer | ${siteConfig.name}`,
    description:
      "বাংলা হরর কার্টুন ও অ্যানিমেশন কনটেন্ট শুধুমাত্র বিনোদনের উদ্দেশ্যে তৈরি।",
  },
};

const disclaimerItems = [
  {
    title: "সম্পূর্ণ কাল্পনিক",
    icon: <Ghost className="h-5 w-5 md:h-6 md:w-6" />,
    content:
      "আমাদের তৈরি প্রতিটি গল্প, চরিত্র এবং ভয়ের পরিবেশ সম্পূর্ণ কাল্পনিক। বাস্তব কোনো ঘটনার সাথে এর কোনো সম্পর্ক নেই।",
  },
  {
    title: "শুধুমাত্র বিনোদন",
    icon: <Clapperboard className="h-5 w-5 md:h-6 md:w-6" />,
    content:
      "রঙতুলি অ্যানিমেশনের মূল উদ্দেশ্য নিছক বিনোদন ও গল্প বলা। কোনো ধরনের কুসংস্কার বা অন্ধবিশ্বাস ছড়ানো আমাদের লক্ষ্য নয়।",
  },
  {
    title: "কাকতালীয় মিল",
    icon: <Info className="h-5 w-5 md:h-6 md:w-6" />,
    content:
      "গল্পের কোনো চরিত্র, স্থান বা ঘটনার সাথে বাস্তব কোনো কিছুর মিল পাওয়া গেলে, তা সম্পূর্ণ কাকতালীয় ও অনিচ্ছাকৃত বলে গণ্য হবে।",
  },
  {
    title: "দর্শকদের সতর্কতা",
    icon: <Eye className="h-5 w-5 md:h-6 md:w-6" />,
    content:
      "আমাদের কনটেন্টে ডার্ক থিম এবং ভয়ের উপাদান থাকায়, শিশু ও সংবেদনশীল দর্শকদের ক্ষেত্রে অভিভাবকের সতর্কতা বাঞ্ছনীয়।",
  },
  {
    title: "ইউটিউব পলিসি",
    icon: <MonitorPlay className="h-5 w-5 md:h-6 md:w-6" />,
    content:
      "ভিডিওগুলো মূলত ইউটিউবে হোস্ট করা থাকে, তাই ইউটিউবের নিজস্ব টার্মস অফ সার্ভিস এবং পলিসি এখানে সম্পূর্ণভাবে প্রযোজ্য।",
  },
  {
    title: "পেশাদার পরামর্শ নয়",
    icon: <ShieldAlert className="h-5 w-5 md:h-6 md:w-6" />,
    content:
      "আমাদের কনটেন্ট কোনো ধরনের আইনি, চিকিৎসা বা পেশাদার পরামর্শ নয়; এটি কেবলই একটি সৃজনশীল অ্যানিমেশন মাধ্যম।",
  },
];

export default function DisclaimerPage() {
  return (
    <main className="relative overflow-hidden bg-horror pt-2 pb-16 md:py-32">
      <div className="pointer-events-none absolute left-[-120px] top-24 h-72 w-72 rounded-full bg-red-700/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-10 right-[-120px] h-80 w-80 rounded-full bg-red-900/10 blur-[130px]" />

      <Container>
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            title="Disclaimer"
            subtitle="আমাদের হরর ও রহস্যভিত্তিক কনটেন্ট সম্পর্কে গুরুত্বপূর্ণ কিছু তথ্য।"
            centered
          />

          <section className="mb-6 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f0f]/95 shadow-xl md:mb-10 md:mt-10 md:rounded-3xl">
            <div className="border-b border-white/10 bg-gradient-to-r from-red-950/35 via-white/[0.03] to-transparent p-5 md:p-10">
              <h1 className="mb-3 text-xl font-bold leading-tight text-white md:mb-4 md:text-4xl">
                {siteConfig.name} কনটেন্ট ডিসক্লেইমার
              </h1>

              <p className="max-w-3xl text-[15px] leading-relaxed text-slate-300 md:text-lg md:leading-8">
                <strong className="text-white">{siteConfig.name}</strong> একটি হরর ও সাসপেন্স নির্ভর অ্যানিমেশন চ্যানেল। আমাদের ভিডিও, গল্প এবং ভিজ্যুয়াল প্রেজেন্টেশন শুধুমাত্র বিনোদনের উদ্দেশ্যে তৈরি।
              </p>
            </div>

            <div className="p-5 md:p-10">
              <div className="mb-6 rounded-r-xl border-l-4 border-red-600 bg-red-950/15 px-4 py-4 md:mb-8 md:rounded-r-2xl md:px-6 md:py-5">
                <p className="text-[15px] font-medium leading-relaxed text-red-100 md:text-lg md:leading-8">
                  রঙতুলি অ্যানিমেশনের সকল ভিডিও, গল্প ও চরিত্র কাল্পনিক। এগুলো বাস্তব জীবনের কোনো ব্যক্তি, প্রতিষ্ঠান বা ঘটনার প্রতিনিধিত্ব করে না।
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:gap-5">
                {disclaimerItems.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:border-red-500/30 hover:bg-red-500/[0.04] md:rounded-2xl md:p-6"
                  >
                    <div className="mb-3 flex items-center gap-3 md:mb-4 md:gap-4">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-red-500/25 bg-red-500/10 text-red-400 md:h-12 md:w-12 md:rounded-2xl">
                        {item.icon}
                      </div>

                      <h2 className="text-lg font-bold text-white md:text-xl">
                        {item.title}
                      </h2>
                    </div>

                    <p className="text-[15px] leading-relaxed text-slate-400 md:text-base md:leading-8">
                      {item.content}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-red-500/15 bg-red-950/10 p-5 md:rounded-3xl md:p-10">
            <h2 className="mb-3 text-lg font-bold text-white md:mb-4 md:text-2xl">
              চূড়ান্ত নোটিশ
            </h2>

            <p className="text-[15px] leading-relaxed text-slate-400 md:text-base md:leading-8">
              আমাদের ওয়েবসাইট বা ইউটিউব কনটেন্ট দেখার মাধ্যমে আপনি সম্মতি দিচ্ছেন যে, রঙতুলি অ্যানিমেশনের সকল হরর ও সাসপেন্স স্টোরি সম্পূর্ণ বিনোদনের জন্য তৈরি। দর্শক হিসেবে আপনার নিজ বিবেচনাবোধ ব্যবহার করা উচিত।
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}

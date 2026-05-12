import { Metadata } from "next";
import Link from "next/link";
import { 
  Scale, 
  Copyright, 
  ExternalLink, 
  ShieldAlert, 
  RefreshCcw, 
  FileText 
} from "lucide-react";
import { siteConfig } from "@/config/site";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: `শর্তাবলী ও নীতিমালা | ${siteConfig.name}`,
  description:
    `${siteConfig.name} ওয়েবসাইটের ব্যবহারের শর্তাবলী ও নীতিমালা পড়ুন। কপিরাইট এবং আমাদের ওয়েবসাইটের নিয়মকানুন সম্পর্কে জানুন।`,
  keywords: [
    `${siteConfig.name} terms`,
    "রঙতুলি অ্যানিমেশন শর্তাবলী",
    "ব্যবহারের নিয়ম",
    "কপিরাইট পলিসি",
    "Bangla animation terms",
  ],
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: `শর্তাবলী ও নীতিমালা | ${siteConfig.name}`,
    description:
      `${siteConfig.name} ওয়েবসাইট এবং এর কনটেন্ট ব্যবহারের নিয়ম ও শর্তাবলী।`,
    type: "website",
    locale: "bn_BD",
  },
};

const lastUpdated = "মে ২০২৬";

const termsItems = [
  {
    title: "শর্তাবলীতে সম্মতি",
    icon: <Scale className="h-5 w-5 md:h-6 md:w-6" />,
    content:
      "এই ওয়েবসাইটটি ভিজিট বা ব্যবহার করার মাধ্যমে আপনি আমাদের এই শর্তাবলী ও নীতিমালা মেনে নিচ্ছেন বলে গণ্য হবে। আপনি যদি কোনো শর্তের সাথে একমত না হন, তবে ওয়েবসাইটটি ব্যবহার না করার অনুরোধ করা হলো।",
  },
  {
    title: "মেধা সত্ত্ব ও কপিরাইট",
    icon: <Copyright className="h-5 w-5 md:h-6 md:w-6" />,
    content:
      "রঙতুলি অ্যানিমেশন চ্যানেলের সকল ভিডিও, গল্প, অডিও, ক্যারেক্টার ডিজাইন এবং গ্রাফিক্স আমাদের নিজস্ব সম্পত্তি। আমাদের লিখিত অনুমতি ছাড়া এগুলো অন্য কোনো প্ল্যাটফর্মে আপলোড করা, রিমেক করা বা কোনো ব্যবসায়িক কাজে ব্যবহার করা সম্পূর্ণ বেআইনি এবং কপিরাইট আইনের লঙ্ঘন।",
  },
  {
    title: "থার্ড-পার্টি লিংক ও সার্ভিস",
    icon: <ExternalLink className="h-5 w-5 md:h-6 md:w-6" />,
    content:
      "আমাদের ওয়েবসাইটে ইউটিউব ভিডিও এমবেড করা থাকে। এসব থার্ড-পার্টি ওয়েবসাইটের কনটেন্ট বা তাদের নিজস্ব প্রাইভেসি পলিসির ওপর আমাদের কোনো নিয়ন্ত্রণ নেই এবং এর জন্য আমরা দায়বদ্ধ নই।",
  },
  {
    title: "ওয়েবসাইটের সঠিক ব্যবহার",
    icon: <FileText className="h-5 w-5 md:h-6 md:w-6" />,
    content:
      "আপনি ওয়েবসাইটটি শুধুমাত্র ব্যক্তিগত বিনোদনের জন্য ব্যবহার করতে পারবেন। ওয়েবসাইটের কোনো ক্ষতি করার চেষ্টা, স্প্যামিং বা আমাদের ব্র্যান্ডের ভাবমূর্তি ক্ষুণ্ণ হয় এমন কোনো কাজে যুক্ত হওয়া নিষিদ্ধ।",
  },
  {
    title: "দায়বদ্ধতা (Disclaimer)",
    icon: <ShieldAlert className="h-5 w-5 md:h-6 md:w-6" />,
    content:
      "ওয়েবসাইটে দেওয়া সকল তথ্য ও ভিডিও শুধুমাত্র বিনোদনের উদ্দেশ্যে তৈরি। কোনো কারিগরি ত্রুটির কারণে ওয়েবসাইট সাময়িক বন্ধ থাকলে তার জন্য আমরা দায়ী থাকব না। বিস্তারিত জানতে আমাদের 'ডিসক্লেইমার' পেজটি দেখুন।",
  },
  {
    title: "নীতিমালা পরিবর্তন",
    icon: <RefreshCcw className="h-5 w-5 md:h-6 md:w-6" />,
    content:
      "আমরা যেকোনো সময় পূর্ব ঘোষণা ছাড়াই এই শর্তাবলী পরিবর্তন বা সংশোধন করার অধিকার রাখি। সংশোধিত নীতিমালা ওয়েবসাইটে আপলোড হওয়ার সাথে সাথেই তা কার্যকর বলে গণ্য হবে।",
  },
];

export default function TermsPage() {
  return (
    <main className="relative overflow-hidden bg-horror pt-2 pb-16 md:py-32">
      <div className="pointer-events-none absolute left-[-120px] top-28 h-72 w-72 rounded-full bg-red-700/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-20 right-[-120px] h-80 w-80 rounded-full bg-red-900/10 blur-[130px]" />

      <Container>
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            title="শর্তাবলী ও নীতিমালা"
            subtitle="আমাদের ওয়েবসাইট এবং কনটেন্ট ব্যবহারের সাধারণ নিয়মগুলো জেনে নিন।"
            centered
          />

          <section className="mb-6 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f0f]/95 shadow-xl md:mb-10 md:mt-10 md:rounded-3xl">
            <div className="border-b border-white/10 bg-gradient-to-r from-red-950/30 via-white/[0.03] to-transparent p-5 md:p-10">
              <h1 className="mb-3 text-xl font-bold leading-tight text-white md:mb-4 md:text-4xl">
                ব্যবহারের শর্তাবলী
              </h1>
              
              <p className="max-w-3xl text-[15px] leading-relaxed text-slate-300 md:text-lg md:leading-8">
                <strong className="text-white">{siteConfig.name}</strong> ওয়েবসাইটে আপনাকে স্বাগতম। আমাদের কনটেন্ট এবং সার্ভিস ব্যবহারের ক্ষেত্রে নিচের নিয়মগুলো প্রযোজ্য হবে।
              </p>

              <p className="mt-3 text-xs font-medium text-slate-500 md:mt-5 md:text-sm">
                শেষ আপডেট: {lastUpdated}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 p-5 md:gap-5 md:p-10">
              {termsItems.map((item) => (
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
          </section>

          <section className="rounded-2xl border border-red-500/15 bg-red-950/10 p-5 md:rounded-3xl md:p-10">
            <h2 className="mb-3 text-lg font-bold text-white md:mb-4 md:text-2xl">
              জিজ্ঞাসা বা মতামত?
            </h2>

            <p className="mb-4 text-[15px] leading-relaxed text-slate-400 md:mb-5 md:text-base md:leading-8">
              এই নীতিমালা সম্পর্কে আপনার কোনো প্রশ্ন থাকলে বা কোনো বিষয়ে অভিযোগ জানাতে চাইলে সরাসরি আমাদের সাথে যোগাযোগ করুন।
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center rounded-xl border border-red-500/30 bg-red-600/10 px-4 py-2.5 text-sm font-bold text-red-200 transition hover:border-red-400/60 hover:bg-red-600/20 hover:text-white md:px-5 md:py-3"
            >
              যোগাযোগ পেজে যান
            </Link>
          </section>
        </div>
      </Container>
    </main>
  );
}

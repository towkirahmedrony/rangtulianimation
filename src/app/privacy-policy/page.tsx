import { Metadata } from "next";
import Link from "next/link";
import { 
  ShieldCheck, 
  MonitorPlay, 
  Mail, 
  Cookie, 
  RefreshCcw, 
  LockKeyhole 
} from "lucide-react";
import { siteConfig } from "@/config/site";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.name} - বাংলা হরর কার্টুন`,
  description:
    `${siteConfig.name} এর Privacy Policy পড়ুন। আমরা কীভাবে YouTube videos, basic website usage এবং email communication সম্পর্কিত তথ্য ব্যবহার করি তা এখানে ব্যাখ্যা করা হয়েছে।`,
  keywords: [
    `${siteConfig.name} privacy policy`,
    "Rang Tuli Animation privacy policy",
    "বাংলা হরর কার্টুন privacy",
    "Bangla horror cartoon website privacy",
    "YouTube animation channel privacy policy",
  ],
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: `Privacy Policy | ${siteConfig.name}`,
    description:
      `${siteConfig.name} ওয়েবসাইটের privacy, YouTube embed, email communication এবং data usage সম্পর্কিত নীতিমালা।`,
    type: "website",
    locale: "bn_BD",
  },
};

const lastUpdated = "May 2026";

const policyItems = [
  {
    title: "আমরা কী ধরনের তথ্য সংগ্রহ করি",
    icon: <ShieldCheck className="h-5 w-5 md:h-6 md:w-6" />,
    content:
      "এই ওয়েবসাইটে কোনো ইউজার অ্যাকাউন্ট, লগইন বা পেমেন্ট সিস্টেম নেই। আমরা সাধারণত দর্শকদের কাছ থেকে নাম, ফোন নম্বর, ঠিকানা বা সংবেদনশীল কোনো ব্যক্তিগত তথ্য সংগ্রহ করি না।",
  },
  {
    title: "YouTube ও Third-Party Services",
    icon: <MonitorPlay className="h-5 w-5 md:h-6 md:w-6" />,
    content:
      "আমাদের ওয়েবসাইটে লেটেস্ট এপিসোড দেখানোর জন্য YouTube video embed করা থাকে। এই এমবেডেড ভিডিওগুলো দেখার সময় গুগল বা ইউটিউব তাদের নিজস্ব পলিসি অনুযায়ী কিছু সাধারণ ডেটা প্রসেস করতে পারে।",
  },
  {
    title: "Cookies ও Tracking",
    icon: <Cookie className="h-5 w-5 md:h-6 md:w-6" />,
    content:
      "বর্তমানে আমরা নিজস্ব কোনো মার্কেটিং কুকিজ বা ট্র্যাকিং সিস্টেম ব্যবহার করি না। তবে ইউটিউব এমবেড বা আমাদের হোস্টিং প্রোভাইডার টেকনিক্যাল প্রয়োজনে সাধারণ কুকিজ ব্যবহার করতে পারে।",
  },
  {
    title: "Email Communication",
    icon: <Mail className="h-5 w-5 md:h-6 md:w-6" />,
    content:
      "আপনি যদি স্পন্সরশিপ বা অন্য কোনো প্রয়োজনে আমাদের ইমেইল করেন, তবে সেই ইমেইল অ্যাড্রেস এবং মেসেজ শুধুমাত্র যোগাযোগের জন্যই ব্যবহার করা হবে। আমরা কোনো মার্কেটিং লিস্টে এটি বিক্রি বা ব্যবহার করি না।",
  },
  {
    title: "Data Security",
    icon: <LockKeyhole className="h-5 w-5 md:h-6 md:w-6" />,
    content:
      "ওয়েবসাইটটি সুরক্ষিত রাখার জন্য আমরা স্ট্যান্ডার্ড টেকনিক্যাল ব্যবস্থা মেনে চলি। তবে ইন্টারনেটে কোনো কিছুই ১০০% ঝুঁকিমুক্ত নয়, তাই ইমেইলে অতি গোপনীয় কোনো তথ্য না দেওয়াই ভালো।",
  },
  {
    title: "Policy Update",
    icon: <RefreshCcw className="h-5 w-5 md:h-6 md:w-6" />,
    content:
      "ভবিষ্যতে যদি নতুন কোনো ফিচার (যেমন- নিউজলেটার বা কন্টাক্ট ফর্ম) যুক্ত করা হয়, তবে ইউজারদের সুবিধার্থে এই প্রাইভেসি পলিসি পেজটি আপডেট করা হবে।",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="relative overflow-hidden bg-horror pt-2 pb-16 md:py-32">
      <div className="pointer-events-none absolute left-[-120px] top-28 h-72 w-72 rounded-full bg-red-700/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-20 right-[-120px] h-80 w-80 rounded-full bg-red-900/10 blur-[130px]" />

      <Container>
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            title="Privacy Policy"
            subtitle="আপনার প্রাইভেসি আমাদের কাছে গুরুত্বপূর্ণ। ওয়েবসাইটটি কীভাবে কাজ করে তার বিস্তারিত জানুন।"
            centered
          />

          <section className="mb-6 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f0f]/95 shadow-xl md:mb-10 md:mt-10 md:rounded-3xl">
            <div className="border-b border-white/10 bg-gradient-to-r from-red-950/30 via-white/[0.03] to-transparent p-5 md:p-10">
              <p className="max-w-3xl text-[15px] leading-relaxed text-slate-300 md:text-lg md:leading-8">
                রঙতুলি অ্যানিমেশন ওয়েবসাইটটি মূলত আমাদের ইউটিউব চ্যানেলের একটি অফিসিয়াল পোর্টাল। এখানে আমরা বাংলা হরর কার্টুনের লেটেস্ট এপিসোড এবং চ্যানেল সম্পর্কিত তথ্য শেয়ার করি।
              </p>

              <p className="mt-3 text-xs font-medium text-slate-500 md:mt-5 md:text-sm">
                Last updated: {lastUpdated}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 p-5 md:gap-5 md:p-10">
              {policyItems.map((item) => (
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

          <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:mb-10 md:rounded-3xl md:p-10">
            <h2 className="mb-3 text-lg font-bold text-white md:mb-4 md:text-2xl">
              Google / YouTube Privacy Policy
            </h2>

            <p className="mb-4 text-[15px] leading-relaxed text-slate-400 md:mb-5 md:text-base md:leading-8">
              যেহেতু আমরা ইউটিউব ভিডিও এমবেড করি, তাই গুগল বা ইউটিউব কীভাবে ডেটা প্রসেস করে তা জানতে তাদের অফিসিয়াল পলিসি পড়ে দেখতে পারেন।
            </p>

            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-xl border border-red-500/30 bg-red-600/10 px-4 py-2.5 text-sm font-bold text-red-200 transition hover:border-red-400/60 hover:bg-red-600/20 hover:text-white md:px-5 md:py-3"
            >
              Google Privacy Policy দেখুন
            </a>
          </section>

          <section className="rounded-2xl border border-red-500/15 bg-red-950/10 p-5 md:rounded-3xl md:p-10">
            <h2 className="mb-3 text-lg font-bold text-white md:mb-4 md:text-2xl">
              আমাদের সাথে যোগাযোগ
            </h2>

            <p className="mb-4 text-[15px] leading-relaxed text-slate-400 md:mb-5 md:text-base md:leading-8">
              Privacy Policy সম্পর্কে কোনো প্রশ্ন বা মতামত থাকলে সরাসরি আমাদের সাথে যোগাযোগ করতে পারেন।
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

import { Metadata } from "next";
import {
  Mail,
  MonitorPlay,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import CTAButton from "@/components/ui/CTAButton";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: `Contact | ${siteConfig.name} - Sponsorship & Collaboration`,
  description:
    `Contact ${siteConfig.name} for business inquiry, sponsorship, collaboration, brand promotion and Bengali horror cartoon animation related communication.`,
  keywords: [
    `${siteConfig.name} contact`,
    "Rang Tuli Animation contact",
    "বাংলা হরর কার্টুন sponsorship",
    "Bengali horror cartoon collaboration",
    "Bangla animation channel contact",
    "YouTube sponsorship Bangladesh",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: `Contact | ${siteConfig.name}`,
    description:
      "Business inquiry, sponsorship, collaboration অথবা Bengali horror animation content related যোগাযোগের জন্য আমাদের contact page ব্যবহার করুন।",
    type: "website",
    locale: "bn_BD",
  },
};

export default function ContactPage() {
  return (
    <main className="relative overflow-hidden bg-horror pt-2 pb-16 md:py-32">
      <div className="pointer-events-none absolute left-[-120px] top-24 h-72 w-72 rounded-full bg-red-700/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-10 right-[-120px] h-80 w-80 rounded-full bg-red-900/10 blur-[130px]" />

      <Container>
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            title="Contact & Sponsorship"
            subtitle="যেকোনো ব্যবসায়িক প্রয়োজন, স্পন্সরশিপ বা কোলাবোরেশনের জন্য আমাদের সাথে যোগাযোগ করুন।"
            centered
          />

          <div className="mt-2 grid grid-cols-1 gap-6 lg:grid-cols-[0.92fr_1.08fr] md:mt-8">
            <section className="horror-card relative order-2 overflow-hidden rounded-2xl p-5 md:rounded-3xl md:p-10 lg:order-1">
              <div className="absolute right-[-70px] top-[-70px] h-44 w-44 rounded-full bg-red-600/15 blur-[90px]" />

              <div className="relative z-10">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl border border-red-500/25 bg-red-500/10 text-red-400 md:mb-6 md:h-16 md:w-16 md:rounded-2xl">
                  <Mail className="h-6 w-6 md:h-8 md:w-8" />
                </div>

                <h1 className="mb-3 text-2xl font-black leading-tight text-white md:text-4xl">
                  Let&apos;s Work Together
                </h1>

                <p className="mb-6 text-[15px] leading-relaxed text-slate-400 md:text-base md:leading-8">
                  রঙতুলি অ্যানিমেশন মূলত হরর, রহস্য এবং সিনেমাটিক গল্প নিয়ে কাজ করে। আমাদের চ্যানেলের মাধ্যমে আপনার ব্র্যান্ড প্রমোশন বা কোনো কোলাবোরেশন করতে চাইলে সরাসরি মেইল করুন বা ফর্মটি পূরণ করুন।
                </p>

                <div className="mb-5 rounded-xl border border-white/10 bg-black/35 p-4 md:rounded-2xl md:p-5">
                  <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                    Business Email
                  </p>

                  <a
                    href={`mailto:${siteConfig.businessEmail}`}
                    className="break-all text-base font-bold text-white transition hover:text-red-300 md:text-xl"
                  >
                    {siteConfig.businessEmail}
                  </a>
                </div>

                <div className="grid grid-cols-1 gap-3 md:gap-4">
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 md:rounded-2xl md:p-5">
                    <div className="mb-2 flex items-center gap-2 text-red-300 md:mb-3">
                      <ShieldCheck className="h-4 w-4 md:h-5 md:w-5" />
                      <h2 className="text-[15px] font-bold text-white md:text-base">Professional Inquiry</h2>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-400 md:leading-7">
                      স্পন্সরশিপ, পেইড প্রমোশন, কোলাবোরেশন বা ইউটিউব সম্পর্কিত যেকোনো ব্যবসায়িক আলোচনার জন্য মেইল করতে পারেন।
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 md:rounded-2xl md:p-5">
                    <div className="mb-2 flex items-center gap-2 text-red-300 md:mb-3">
                      <Sparkles className="h-4 w-4 md:h-5 md:w-5" />
                      <h2 className="text-[15px] font-bold text-white md:text-base">Quick Response</h2>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-400 md:leading-7">
                      আপনার মেসেজটি সুনির্দিষ্ট হলে আমাদের উত্তর দিতে সুবিধা হয়। প্রপোজালের বিস্তারিত লিখে পাঠালে ভালো।
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-8 md:gap-4">
                  <CTAButton href={siteConfig.youtubeChannelUrl} external variant="outline">
                    <MonitorPlay className="mr-2 h-4 w-4" />
                    Visit Channel
                  </CTAButton>

                  <CTAButton href={`mailto:${siteConfig.businessEmail}`} external>
                    Send Email
                  </CTAButton>
                </div>
              </div>
            </section>

            {/* ফর্মের অংশটুকু আলাদা ক্লায়েন্ট কম্পোনেন্ট থেকে রেন্ডার হচ্ছে */}
            <ContactForm />
          </div>
        </div>
      </Container>
    </main>
  );
}

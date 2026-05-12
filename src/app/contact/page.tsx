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
            {/* বাম পাশের ইনফো সেকশন - অত্যন্ত কম্প্যাক্ট ও প্রফেশনাল করা হয়েছে */}
            <section className="horror-card relative order-2 flex flex-col justify-between overflow-hidden rounded-2xl p-6 md:rounded-3xl md:p-8 lg:order-1">
              <div className="absolute right-[-70px] top-[-70px] h-44 w-44 rounded-full bg-red-600/15 blur-[90px]" />

              <div className="relative z-10">
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl border border-red-500/25 bg-red-500/10 text-red-400 md:mb-5 md:h-14 md:w-14">
                  <Mail className="h-5 w-5 md:h-7 md:w-7" />
                </div>

                <h1 className="mb-3 text-2xl font-black leading-tight text-white md:text-3xl">
                  Let&apos;s Work Together
                </h1>

                <p className="mb-6 text-sm leading-relaxed text-slate-400 md:text-[15px]">
                  রঙতুলি অ্যানিমেশন মূলত হরর, রহস্য এবং সিনেমাটিক গল্প নিয়ে কাজ করে। আমাদের চ্যানেলের মাধ্যমে আপনার ব্র্যান্ড প্রমোশন বা কোনো কোলাবোরেশন করতে চাইলে সরাসরি মেইল করুন বা ফর্মটি পূরণ করুন।
                </p>

                {/* কম্প্যাক্ট ফিচার লিস্ট (পাবলিক ইমেইল টেক্সট হাইড করা হয়েছে) */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3.5 transition hover:bg-white/[0.04]">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-red-400 md:h-5 md:w-5" />
                    <div>
                      <h2 className="text-xs font-bold text-white md:text-sm">Professional Inquiry</h2>
                      <p className="mt-0.5 text-[11px] leading-relaxed text-slate-400 md:text-xs">
                        স্পন্সরশিপ, পেইড প্রমোশন বা কোলাবোরেশনের জন্য সরাসরি যোগাযোগ করুন।
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3.5 transition hover:bg-white/[0.04]">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-red-400 md:h-5 md:w-5" />
                    <div>
                      <h2 className="text-xs font-bold text-white md:text-sm">Quick Response</h2>
                      <p className="mt-0.5 text-[11px] leading-relaxed text-slate-400 md:text-xs">
                        প্রপোজালের বিস্তারিত ও সুনির্দিষ্ট তথ্য লিখে পাঠালে দ্রুত রেসপন্স পেতে সুবিধা হয়।
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* অ্যাকশন বাটনসমূহ (সরাসরি মেইল টু অ্যাড করা হয়েছে) */}
              <div className="relative z-10 mt-6 flex flex-col gap-3 sm:flex-row md:mt-8">
                <CTAButton href={siteConfig.youtubeChannelUrl} external variant="outline">
                  <MonitorPlay className="mr-2 h-4 w-4" />
                  Visit Channel
                </CTAButton>

                <CTAButton href="mailto:rangtulianimation@gmail.com" external>
                  Send Email
                </CTAButton>
              </div>
            </section>

            {/* ডান পাশের কন্টাক্ট ফর্ম সেকশন */}
            <ContactForm />
          </div>
        </div>
      </Container>
    </main>
  );
}

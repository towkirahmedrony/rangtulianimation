import { Metadata } from "next";
import {
  Mail,
  MessageSquare,
  MonitorPlay,
  Send,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import CTAButton from "@/components/ui/CTAButton";

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

const formspreeEndpoint = "https://formspree.io/f/xovlrnbz";

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

            <section className="horror-card order-1 rounded-2xl p-5 md:rounded-3xl md:p-10 lg:order-2">
              <div className="mb-6 md:mb-8">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-red-500 md:mb-3">
                  Send Message
                </p>

                <h2 className="mb-2 text-2xl font-black text-white md:mb-3 md:text-3xl">
                  যোগাযোগ ফর্ম
                </h2>

                <p className="text-sm leading-relaxed text-slate-400 md:text-base md:leading-7">
                  নিচের ফর্মটি পূরণ করে মেসেজ পাঠান। এটি সরাসরি আমাদের ইমেইলে চলে আসবে।
                </p>
              </div>

              <form action={formspreeEndpoint} method="POST" className="space-y-4 md:space-y-5">
                <input
                  type="text"
                  name="_gotcha"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <input
                  type="hidden"
                  name="_subject"
                  value={`${siteConfig.name} Website Contact Form Message`}
                />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-xs font-semibold text-slate-200 md:mb-2 md:text-sm"
                    >
                      আপনার নাম
                    </label>

                    <div className="relative">
                      <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="আপনার নাম লিখুন"
                        className="w-full rounded-xl border border-white/10 bg-black/35 py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-red-500/60 focus:bg-black/50 md:rounded-2xl md:py-4 md:pl-11"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-xs font-semibold text-slate-200 md:mb-2 md:text-sm"
                    >
                      ইমেইল অ্যাড্রেস
                    </label>

                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="your@email.com"
                        className="w-full rounded-xl border border-white/10 bg-black/35 py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-red-500/60 focus:bg-black/50 md:rounded-2xl md:py-4 md:pl-11"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="inquiryType"
                    className="mb-1.5 block text-xs font-semibold text-slate-200 md:mb-2 md:text-sm"
                  >
                    যোগাযোগের কারণ
                  </label>

                  <select
                    id="inquiryType"
                    name="inquiry_type"
                    required
                    defaultValue=""
                    className="w-full rounded-xl border border-white/10 bg-black/35 px-3 py-3 text-sm text-white outline-none transition focus:border-red-500/60 focus:bg-black/50 md:rounded-2xl md:px-4 md:py-4"
                  >
                    <option value="" disabled>
                      কী বিষয়ে যোগাযোগ করছেন?
                    </option>
                    <option value="Sponsorship">Sponsorship</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Brand Promotion">Brand Promotion</option>
                    <option value="Animation Project">Animation Project</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-xs font-semibold text-slate-200 md:mb-2 md:text-sm"
                  >
                    মেসেজ
                  </label>

                  <div className="relative">
                    <MessageSquare className="pointer-events-none absolute left-3.5 top-4 h-4 w-4 text-slate-500 md:left-4 md:top-5" />
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="আপনার মেসেজটি বিস্তারিত লিখুন..."
                      className="w-full resize-none rounded-xl border border-white/10 bg-black/35 py-3 pl-10 pr-4 text-sm leading-relaxed text-white outline-none transition placeholder:text-slate-600 focus:border-red-500/60 focus:bg-black/50 md:rounded-2xl md:py-4 md:pl-11 md:leading-7"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center rounded-xl border border-red-500/40 bg-red-700 px-5 py-3.5 text-sm font-black text-white shadow-[0_0_24px_rgba(220,38,38,0.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-red-600 hover:shadow-[0_0_34px_rgba(220,38,38,0.45)] md:rounded-2xl md:px-6 md:py-4"
                >
                  মেসেজ পাঠান
                  <Send className="ml-2 h-4 w-4 transition group-hover:translate-x-0.5" />
                </button>

                <p className="text-center text-[11px] leading-relaxed text-slate-500 md:text-xs md:leading-6">
                  সাবমিট করলে ফর্মস্প্রি (Formspree) এর মাধ্যমে মেসেজটি আমাদের ইমেইলে চলে আসবে।
                </p>
              </form>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}

'use client';

import { useState } from "react";
import { Mail, MessageSquare, Send, User } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";

export default function ContactForm() {
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error', text: string }>({
    type: 'idle',
    text: ''
  });
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!turnstileToken) {
      setStatus({ type: 'error', text: 'দয়া করে সিকিউরিটি ভেরিফিকেশনটি সম্পন্ন করুন।' });
      return;
    }

    setStatus({ type: 'loading', text: 'মেসেজ পাঠানো হচ্ছে...' });

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      inquiry_type: formData.get('inquiry_type'),
      message: formData.get('message'),
      token: turnstileToken,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', text: 'আপনার মেসেজটি সফলভাবে পাঠানো হয়েছে! শীঘ্রই যোগাযোগ করা হবে।' });
        (e.target as HTMLFormElement).reset();
        setTurnstileToken(null);
      } else {
        setStatus({ type: 'error', text: result.message || 'মেসেজ পাঠানো ব্যর্থ হয়েছে। আবার চেষ্টা করুন।' });
      }
    } catch (error) {
      setStatus({ type: 'error', text: 'সার্ভার ত্রুটি দেখা দিয়েছে। কিছুক্ষণ পর চেষ্টা করুন।' });
    }
  };

  return (
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

      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-xs font-semibold text-slate-200 md:mb-2 md:text-sm">
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
            <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-slate-200 md:mb-2 md:text-sm">
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
          <label htmlFor="inquiryType" className="mb-1.5 block text-xs font-semibold text-slate-200 md:mb-2 md:text-sm">
            যোগাযোগের কারণ
          </label>
          <select
            id="inquiryType"
            name="inquiry_type"
            required
            defaultValue=""
            className="w-full rounded-xl border border-white/10 bg-black/35 px-3 py-3 text-sm text-white outline-none transition focus:border-red-500/60 focus:bg-black/50 md:rounded-2xl md:px-4 md:py-4"
          >
            <option value="" disabled className="text-slate-500 bg-black">
              কী বিষয়ে যোগাযোগ করছেন?
            </option>
            <option value="Sponsorship" className="bg-black">Sponsorship</option>
            <option value="Collaboration" className="bg-black">Collaboration</option>
            <option value="Brand Promotion" className="bg-black">Brand Promotion</option>
            <option value="Animation Project" className="bg-black">Animation Project</option>
            <option value="General Inquiry" className="bg-black">General Inquiry</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="mb-1.5 block text-xs font-semibold text-slate-200 md:mb-2 md:text-sm">
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

        {/* Cloudflare Turnstile Widget */}
        <div className="flex justify-center my-3 overflow-hidden">
          <Turnstile 
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!} 
            onSuccess={(token) => setTurnstileToken(token)}
            options={{ theme: 'dark' }}
          />
        </div>

        <button
          type="submit"
          disabled={status.type === 'loading' || !turnstileToken}
          className="group inline-flex w-full items-center justify-center rounded-xl border border-red-500/40 bg-red-700 px-5 py-3.5 text-sm font-black text-white shadow-[0_0_24px_rgba(220,38,38,0.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-red-600 hover:shadow-[0_0_34px_rgba(220,38,38,0.45)] md:rounded-2xl md:px-6 md:py-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {status.type === 'loading' ? 'পাঠানো হচ্ছে...' : 'মেসেজ পাঠান'}
          <Send className="ml-2 h-4 w-4 transition group-hover:translate-x-0.5" />
        </button>

        {status.text && (
          <p className={`text-center text-xs md:text-sm font-semibold mt-3 ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
            {status.text}
          </p>
        )}

        <p className="text-center text-[11px] leading-relaxed text-slate-500 md:text-xs md:leading-6">
          আপনার মেসেজটি সম্পূর্ণ সুরক্ষিত এবং সরাসরি আমাদের ইমেইলে পৌঁছাবে।
        </p>
      </form>
    </section>
  );
}

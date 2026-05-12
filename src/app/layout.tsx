import type { Metadata } from "next";
import { Inter, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const notoBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  display: "swap",
  variable: "--font-bengali",
});

export const metadata: Metadata = {
  title: {
    default: "Rang Tuli Animation Horror",
    template: "%s | Rang Tuli Animation Horror",
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  openGraph: {
    title: "Rang Tuli Animation Horror | বাংলা হরর ও রহস্য অ্যানিমেশন",
    description: siteConfig.description,
    siteName: siteConfig.name,
    type: "website",
    locale: "bn_BD",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className="scroll-smooth">
      <body
        className={`${inter.variable} ${notoBengali.variable} min-h-screen bg-[#050505] font-[var(--font-bengali),var(--font-inter),system-ui,sans-serif] text-slate-200 antialiased`}
      >
        <Header />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

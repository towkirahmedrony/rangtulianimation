export const siteConfig = {
  name: "Rang Tuli Animation Horror",
  banglaName: "রঙতুলি অ্যানিমেশন",
  shortName: "RT Animation",
  tagline: "বাংলার সেরা হরর অ্যানিমেশন চ্যানেল",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com",
  description:
    "বাংলা ভূতের গল্প, suspense animation এবং Bengali horror cartoon stories.",
  youtubeChannelUrl: "https://youtube.com/@rangtulianimationhorror",
  youtubePlaylistUrl:
    "https://youtube.com/playlist?list=PLkxZiTnwL0d-MgIqNwsWkisNFyrCSDjL2",
  youtubePlaylistEmbedUrl:
    "https://www.youtube.com/embed/videoseries?list=PLkxZiTnwL0d-MgIqNwsWkisNFyrCSDjL2",
  youtubeChannelId: "UCVCjVNM3IwCUj0juOOAEapg",
  youtubePlaylistId: "PLkxZiTnwL0d-MgIqNwsWkisNFyrCSDjL2",
  businessEmail: "rangtulianimationhorror@gmail.com",

  keywords: [
    "Bangla Bhuter Golpo",
    "Bengali Horror Cartoon",
    "Bangla Horror Cartoon",
    "Vuter Golpo",
    "Rang Tuli Animation Horror",
  ],

  navLinks: [
    { name: "হোম", path: "/" },
    { name: "এপিসোড", path: "/episodes" },
    { name: "আমাদের সম্পর্কে", path: "/about" },
    { name: "যোগাযোগ", path: "/contact" },
  ],

  footerLinks: {
    quickLinks: [
      { name: "হোম", path: "/" },
      { name: "এপিসোড", path: "/episodes" },
      { name: "আমাদের সম্পর্কে", path: "/about" },
      { name: "যোগাযোগ", path: "/contact" },
    ],
    legalLinks: [
      { name: "প্রাইভেসি পলিসি", path: "/privacy-policy" },
      { name: "ডিসক্লেইমার", path: "/disclaimer" },
      { name: "যোগাযোগ", path: "/contact" },
    ],
  },

  socialLinks: {
    youtube: "https://youtube.com/@rangtulianimationhorror",
    facebook: "#",
    instagram: "#",
    tiktok: "#",
  },
} as const;

export type SiteConfig = typeof siteConfig;

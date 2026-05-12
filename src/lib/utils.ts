import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ডেট ফরম্যাটকে প্রফেশনাল (Sep 16, 2025) করা হলো
export function formatDate(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

// নাম্বারে কমা (102,639) যুক্ত করার ফাংশন
export function formatNumber(value: number | string) {
  const num = typeof value === "string" ? Number(value) : value;
  if (isNaN(num)) return value;
  
  return new Intl.NumberFormat("en-US").format(num);
}

export function truncateText(text: string, maxLength = 120) {
  if (!text) return "";
  if (text.length <= maxLength) return text;

  return `${text.slice(0, maxLength).trim()}...`;
}

export function absoluteUrl(path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return `${baseUrl}${path}`;
}

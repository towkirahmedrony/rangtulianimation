import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export const revalidate = 60; // প্রতি ৬০ সেকেন্ডে ক্যাশ রিফ্রেশ হবে

export async function GET() {
  try {
    const snapshot = await adminDb.ref("episodes").get();
    if (!snapshot.exists()) {
      return NextResponse.json({ videos: [] });
    }

    const data = snapshot.val();
    const episodes = Object.values(data).filter((ep: any) => ep.isActive !== false);

    // লেটেস্ট ভিডিওগুলো আগে দেখানোর জন্য সর্ট করা
    const sortedEpisodes = episodes.sort(
      (a: any, b: any) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    return NextResponse.json({ videos: sortedEpisodes });
  } catch (error) {
    console.error("Firebase read error:", error);
    return NextResponse.json({ error: "Failed to load episodes", videos: [] }, { status: 500 });
  }
}

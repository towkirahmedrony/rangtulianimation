"use client";

import { useState } from "react";
import EpisodeCard from "@/components/ui/EpisodeCard";
import SearchBar from "@/components/ui/SearchBar";
import { Episode } from "@/types/youtube";

export default function EpisodesList({ initialVideos }: { initialVideos: Episode[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVideos = initialVideos.filter((video) => {
    // ফিক্স ১: সার্চ বক্স খালি থাকলে সব ভিডিও দেখাবে
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    
    // ফিক্স ২: সেফটি চেক (যাতে কোনো ডাটা মিসিং থাকলেও ক্র্যাশ না করে)
    const titleMatch = video.title?.toLowerCase().includes(query) || false;
    const descMatch = video.description?.toLowerCase().includes(query) || false;
    const tagMatch = video.tags?.some(tag => tag.toLowerCase().includes(query)) || false;

    return titleMatch || descMatch || tagMatch;
  });

  return (
    <div className="w-full">
      <SearchBar onSearch={setSearchQuery} />

      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mt-4">
          {filteredVideos.map((video) => (
            <EpisodeCard 
              key={video.id || video.videoId} 
              title={video.title}
              description={video.description}
              thumbnail={video.thumbnail}
              slug={video.slug}
              youtubeUrl={video.youtubeUrl}
              publishedAt={video.publishedAt}
            />
          ))}
        </div>
      ) : (
        <div className="max-w-3xl mx-auto text-center py-16 bg-zinc-900/30 rounded-2xl border border-zinc-800/50 mt-4">
          <p className="text-red-400 text-lg font-medium mb-2">কোনো ফলাফল পাওয়া যায়নি!</p>
          <p className="text-slate-400">"{searchQuery}" এর জন্য কোনো ভৌতিক গল্প আমাদের আর্কাইভে নেই।</p>
        </div>
      )}
    </div>
  );
}

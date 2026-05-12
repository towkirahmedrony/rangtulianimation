"use client";

import { useState } from "react";
import EpisodeCard from "@/components/ui/EpisodeCard";
import SearchBar from "@/components/ui/SearchBar";
import { Episode } from "@/types/youtube";

export default function EpisodesList({ initialVideos }: { initialVideos: Episode[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  // লাইভ ফিল্টারিং লজিক (টাইটেল, ডেসক্রিপশন বা ট্যাগ দিয়ে খুঁজবে)
  const filteredVideos = initialVideos.filter((video) => {
    const query = searchQuery.toLowerCase();
    return (
      video.title?.toLowerCase().includes(query) ||
      video.description?.toLowerCase().includes(query) ||
      video.tags?.some(tag => tag.toLowerCase().includes(query))
    );
  });

  return (
    <div className="w-full">
      {/* সার্চ বার */}
      <SearchBar onSearch={setSearchQuery} />

      {/* ফিল্টার করা ভিডিওর গ্রিড */}
      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mt-8">
          {filteredVideos.map((video) => (
            <EpisodeCard 
              key={video.id} 
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
        <div className="max-w-3xl mx-auto text-center py-16 bg-zinc-900/30 rounded-2xl border border-zinc-800/50 mt-8">
          <p className="text-red-400 text-lg font-medium mb-2">কোনো ফলাফল পাওয়া যায়নি!</p>
          <p className="text-slate-400">"{searchQuery}" এর জন্য কোনো ভৌতিক গল্প আমাদের আর্কাইভে নেই। অন্য কোনো শব্দ দিয়ে চেষ্টা করুন।</p>
        </div>
      )}
    </div>
  );
}

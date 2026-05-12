"use client";

import { Search } from "lucide-react";
import { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const placeholderTexts = [
  "যেকোনো ভিডিও খুঁজুন...",
  "মধ্যরাতের অভিশপ্ত ট্রেন...",
  "কবরস্থানের ভয়ংকর রাত...",
  "ভৌতিক গল্প বা ডাইনি..."
];

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % placeholderTexts.length;
      const fullText = placeholderTexts[i];

      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(40);
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(120);
      }

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 2500); 
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, loopNum, typingSpeed]);

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-8 mt-2 group">
      {/* ফিক্স: z-10 যোগ করা হয়েছে যাতে আইকনটি ইনপুটের ওপরে ভাসে */}
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
        <Search className="h-5 w-5 text-zinc-400 group-focus-within:text-red-500 transition-colors duration-300" />
      </div>
      
      <input
        type="text"
        className="block w-full pl-12 pr-4 py-4 border border-zinc-700/60 rounded-2xl text-lg leading-5 bg-zinc-900/80 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300 shadow-lg backdrop-blur-md relative z-0"
        placeholder={currentText}
        onChange={(e) => onSearch(e.target.value)}
      />
      
      {/* ফিক্স: ডান পাশের ব্যাজটিতেও z-10 দেওয়া হয়েছে */}
      <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none z-10">
        <div className="hidden sm:flex items-center px-3 py-1.5 border border-zinc-700/50 rounded-xl text-xs font-medium text-zinc-400 bg-zinc-800/50">
          Search
        </div>
      </div>
    </div>
  );
}

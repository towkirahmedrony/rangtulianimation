"use client";

import { Search } from "lucide-react";
import { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const placeholderTexts = [
  "যেকোনো ভিডিও খুঁজুন...",
  "মধ্যরাতের অভিশপ্ত ট্রেন..."
];

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % placeholderTexts.length;
      const fullText = placeholderTexts[i];

      if (isDeleting) {
        // কাটার সময় স্পিড একটু বেশি থাকবে (৫০ms)
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(50);
      } else {
        // লেখার সময় স্পিড নরমাল (১০০ms)
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(100);
      }

      // লেখা শেষ হলে কিছুক্ষণ অপেক্ষা করে কাটা শুরু করবে
      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 1500); // ১.৫ সেকেন্ড পজ
      } 
      // পুরোটা কাটা হয়ে গেলে পরের টেক্সট লেখা শুরু করবে
      else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500); // নতুন শব্দ শুরুর আগে আধা সেকেন্ড পজ
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, loopNum, typingSpeed]);

  return (
    <div className="relative w-full max-w-2xl mx-auto my-6">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-11 pr-4 py-3.5 border border-zinc-800 rounded-2xl leading-5 bg-zinc-900/50 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300 backdrop-blur-sm"
        placeholder={currentText}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}

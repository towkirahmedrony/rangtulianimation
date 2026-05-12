import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
}

export default function FeatureCard({
  title,
  description,
  icon,
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "group horror-card relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1",
        className
      )}
    >
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-red-700/10 blur-3xl transition duration-500 group-hover:bg-red-600/20" />
      <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-red-600 to-transparent transition-all duration-500 group-hover:w-full" />

      <div className="relative z-10 mb-6 grid h-14 w-14 place-items-center rounded-2xl border border-red-500/25 bg-red-600/10 text-red-400 shadow-[0_0_24px_rgba(220,38,38,0.12)] transition duration-500 group-hover:scale-110 group-hover:border-red-500/45 group-hover:bg-red-600/15 group-hover:text-red-300">
        {icon}
      </div>

      <h3 className="relative z-10 mb-3 text-xl font-bold text-white">
        {title}
      </h3>

      <p className="relative z-10 text-sm leading-7 text-slate-400">
        {description}
      </p>
    </div>
  );
}

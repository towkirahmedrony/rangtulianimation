import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  external?: boolean;
  showIcon?: boolean;
}

export default function CTAButton({
  href,
  children,
  variant = "primary",
  className,
  external = false,
  showIcon = false,
}: CTAButtonProps) {
  const baseStyles =
    "group relative inline-flex items-center justify-center overflow-hidden rounded-xl px-5 py-3 text-sm font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-black active:scale-[0.98]";

  const variants = {
    primary:
      "bg-red-700 text-white shadow-[0_0_26px_rgba(220,38,38,0.28)] hover:-translate-y-0.5 hover:bg-red-600 hover:shadow-[0_0_42px_rgba(220,38,38,0.55)]",
    secondary:
      "border border-white/12 bg-white/[0.045] text-white backdrop-blur hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.08] hover:shadow-[0_0_30px_rgba(255,255,255,0.06)]",
    outline:
      "border border-white/12 bg-black/25 text-slate-200 backdrop-blur hover:-translate-y-0.5 hover:border-red-500/45 hover:bg-red-600/10 hover:text-white hover:shadow-[0_0_30px_rgba(220,38,38,0.14)]",
  };

  const content = (
    <>
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 transition duration-500 group-hover:translate-x-full group-hover:opacity-100" />
      <span className="relative z-10 inline-flex items-center justify-center">
        {children}
        {showIcon && (
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(baseStyles, variants[variant], className)}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(baseStyles, variants[variant], className)}>
      {content}
    </Link>
  );
}

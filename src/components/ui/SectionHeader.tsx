import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  centered = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-10", centered && "text-center", className)}>
      <div
        className={cn(
          "mb-4 flex items-center gap-4",
          centered && "justify-center"
        )}
      >
        <h2 className="text-2xl font-black tracking-tight text-white md:text-4xl">
          {title}
        </h2>

        <span className="hidden h-px w-16 bg-gradient-to-r from-red-600 to-transparent sm:block" />
      </div>

      {subtitle && (
        <p
          className={cn(
            "max-w-2xl text-sm leading-7 text-slate-400 md:text-base",
            centered && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

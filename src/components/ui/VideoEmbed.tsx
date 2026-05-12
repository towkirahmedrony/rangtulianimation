import { cn } from "@/lib/utils";

type VideoEmbedProps = {
  videoId: string;
  title: string;
  className?: string;
};

export default function VideoEmbed({ videoId, title, className }: VideoEmbedProps) {
  return (
    <div className={cn("relative w-full overflow-hidden rounded-2xl bg-black border border-white/10 aspect-video shadow-[0_0_30px_rgba(0,0,0,0.8)]", className)}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        className="absolute top-0 left-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

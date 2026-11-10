import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2 } from "lucide-react";
import type { Project } from "./projects-data";
import { LazyVideo } from "./LazyVideo";

interface Props {
  items: Project[];
}

export function ProjectGrid({ items }: Props) {
  const [lightbox, setLightbox] = useState<Project | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {items.length === 0 && (
          <div className="col-span-full text-center py-24 text-sm text-muted-foreground">
            New work coming soon.
          </div>
        )}
        {items.map((p) => (
          <button
            key={p.src}
            onClick={() => setLightbox(p)}
            className="group relative rounded-3xl overflow-hidden bg-surface aspect-[9/14] border border-border hover:border-gold/40 transition-all"
            aria-label={`Preview ${p.title}`}
          >
            <LazyVideo
              src={p.src}
              poster={p.poster}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black via-black/70 to-transparent">
              <div className="text-[10px] uppercase tracking-[0.25em] text-gold">
                {p.category ?? "Featured"}
              </div>
              <div className="mt-1.5 flex items-end justify-between gap-3">
                <div className="text-base font-medium">{p.title}</div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground group-hover:text-gold transition-colors">
                  Preview ↗
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl grid place-items-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 h-11 w-11 rounded-full glass grid place-items-center text-lg"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            ✕
          </button>
          <div className="relative max-h-[85vh] w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <LightboxVideo key={lightbox.src} src={lightbox.src} poster={lightbox.poster} />
            <div className="mt-4 text-center">
              <div className="text-[10px] uppercase tracking-[0.25em] text-gold">
                {lightbox.category ?? "Featured"}
              </div>
              <div className="mt-1 text-base font-medium">{lightbox.title}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function LightboxVideo({ src, poster }: { src: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [needsSoundTap, setNeedsSoundTap] = useState(false);

  const startPlayback = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    try {
      await video.play();
      setNeedsSoundTap(false);
    } catch {
      video.muted = true;
      try {
        await video.play();
        setNeedsSoundTap(true);
      } catch {
        setNeedsSoundTap(true);
      }
    }
  }, []);

  useEffect(() => {
    void startPlayback();
  }, [startPlayback]);

  return (
    <div className="relative aspect-[9/16] overflow-hidden rounded-2xl bg-black">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls
        loop
        playsInline
        preload="metadata"
        className="h-full w-full object-contain"
        onPlay={() => setNeedsSoundTap(false)}
      />
      {needsSoundTap && (
        <button
          type="button"
          onClick={() => {
            const video = videoRef.current;
            if (!video) return;
            video.muted = false;
            void video.play().then(() => setNeedsSoundTap(false)).catch(() => setNeedsSoundTap(true));
          }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 rounded-full glass px-4 py-2 text-sm text-foreground"
        >
          <Volume2 className="mr-2 inline-block size-4" /> Tap for sound
        </button>
      )}
    </div>
  );
}

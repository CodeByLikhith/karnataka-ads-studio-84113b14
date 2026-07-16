import { useState } from "react";
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
            <div className="rounded-3xl overflow-hidden bg-black shadow-elevated aspect-[9/16]">
              <video src={lightbox.src} controls autoPlay loop className="h-full w-full object-contain" />
            </div>
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

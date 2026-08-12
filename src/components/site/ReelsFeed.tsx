import { useCallback, useEffect, useRef, useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { reels, type Reel } from "./reels-data";

/**
 * Vertical reels experience.
 *
 * Performance rules:
 *  - Poster renders first; the <video> element only gets a src when the reel is
 *    near the viewport, so opening the page never downloads all reels.
 *  - Exactly one reel plays at a time (the most visible one); everything else
 *    is paused, and playback stops entirely when the tab is hidden.
 */
export function ReelsFeed() {
  const [muted, setMuted] = useState(true);
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const ratios = useRef<Map<number, number>>(new Map());

  const report = useCallback((index: number, ratio: number) => {
    ratios.current.set(index, ratio);
    let best = -1;
    let bestRatio = 0.35;
    ratios.current.forEach((v, k) => {
      if (v > bestRatio) {
        bestRatio = v;
        best = k;
      }
    });
    setActive((prev) => (best === -1 ? prev : best));
  }, []);

  return (
    <section id="reels" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Reels Feed"
          align="center"
          title={<>Watch the <span className="text-gradient-gold italic font-normal">reels.</span></>}
          description="Vertical creatives the way your audience actually sees them. Scroll through, tap to play or pause, and turn the sound on."
        />

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            aria-pressed={!muted}
            className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-xs tracking-wide text-foreground hover:bg-white/10 hover:border-gold/30 transition-all"
          >
            <SoundIcon muted={muted} />
            {muted ? "Sound off — tap to unmute" : "Sound on"}
          </button>
        </div>

        <div
          ref={containerRef}
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 snap-y snap-mandatory sm:snap-none"
        >
          {reels.map((reel, i) => (
            <ReelCard
              key={reel.src}
              reel={reel}
              index={i}
              muted={muted}
              isActive={active === i && expanded === null}
              onVisibility={report}
              onToggleMute={() => setMuted((m) => !m)}
              onExpand={() => setExpanded(i)}
            />
          ))}
        </div>
      </div>

      {expanded !== null && (
        <ReelViewer
          reel={reels[expanded]}
          onClose={() => setExpanded(null)}
          onPrev={expanded > 0 ? () => setExpanded(expanded - 1) : undefined}
          onNext={expanded < reels.length - 1 ? () => setExpanded(expanded + 1) : undefined}
        />
      )}
    </section>
  );
}

function ReelCard({
  reel,
  index,
  muted,
  isActive,
  onVisibility,
  onToggleMute,
  onExpand,
}: {
  reel: Reel;
  index: number;
  muted: boolean;
  isActive: boolean;
  onVisibility: (index: number, ratio: number) => void;
  onToggleMute: () => void;
  onExpand: () => void;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [near, setNear] = useState(false);
  const [paused, setPaused] = useState(false);

  // Download gate — only fetch when the reel comes close to the viewport.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setNear(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Visibility reporting — the parent decides which single reel plays.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) onVisibility(index, e.isIntersecting ? e.intersectionRatio : 0);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 0.95] },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      onVisibility(index, 0);
    };
  }, [index, onVisibility]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = muted;
  }, [muted]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !near) return;
    if (isActive && !paused) {
      const p = el.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          el.muted = true;
          el.play().catch(() => {});
        });
      }
    } else if (!el.paused) {
      el.pause();
    }
  }, [isActive, paused, near]);

  useEffect(() => {
    const onVis = () => {
      const el = videoRef.current;
      if (document.hidden && el && !el.paused) el.pause();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <div ref={wrapRef} className="snap-start sm:snap-align-none">
      <div className="group relative rounded-[1.75rem] overflow-hidden border border-border bg-black aspect-[9/16]">
        <img
          src={reel.poster}
          alt={reel.title ? `${reel.title} poster frame` : "Reel poster frame"}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {near && (
          <video
            ref={videoRef}
            src={reel.src}
            poster={reel.poster}
            playsInline
            loop
            muted={muted}
            preload="none"
            className={`absolute inset-0 h-full w-full ${reel.fit === "contain" ? "object-contain" : "object-cover"}`}
          />
        )}

        {/* Tap surface: play / pause */}
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Play reel" : "Pause reel"}
          className="absolute inset-0"
        >
          {(paused || !isActive) && (
            <span className="absolute inset-0 grid place-items-center">
              <span className="h-14 w-14 rounded-full bg-black/50 backdrop-blur-md border border-white/20 grid place-items-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white translate-x-[1px]">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          )}
        </button>

        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <IconButton label={muted ? "Unmute" : "Mute"} onClick={onToggleMute}>
            <SoundIcon muted={muted} />
          </IconButton>
          <IconButton label="Expand reel" onClick={onExpand}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h6v6" />
              <path d="M9 21H3v-6" />
              <path d="M21 3l-7 7" />
              <path d="M3 21l7-7" />
            </svg>
          </IconButton>
        </div>

        {(reel.title || reel.category) && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black via-black/60 to-transparent">
            {reel.category && (
              <div className="text-[10px] uppercase tracking-[0.25em] text-gold">{reel.category}</div>
            )}
            {reel.title && <div className="mt-1 text-sm font-medium">{reel.title}</div>}
          </div>
        )}
      </div>
    </div>
  );
}

function ReelViewer({
  reel,
  onClose,
  onPrev,
  onNext,
}: {
  reel: Reel;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext?.();
      if (e.key === "ArrowLeft") onPrev?.();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, onNext, onPrev]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl grid place-items-center p-4" onClick={onClose}>
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-6 right-6 h-11 w-11 rounded-full glass grid place-items-center text-lg"
      >
        ✕
      </button>
      <div className="relative w-full max-w-[420px]" onClick={(e) => e.stopPropagation()}>
        <div className="rounded-[1.75rem] overflow-hidden bg-black aspect-[9/16] shadow-elevated">
          <video
            key={reel.src}
            src={reel.src}
            poster={reel.poster}
            autoPlay
            loop
            controls
            playsInline
            preload="metadata"
            className="h-full w-full object-contain"
          />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <NavBtn label="Previous reel" onClick={onPrev} disabled={!onPrev}>←</NavBtn>
          <NavBtn label="Next reel" onClick={onNext} disabled={!onNext}>→</NavBtn>
        </div>
      </div>
    </div>
  );
}

function NavBtn({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="h-11 w-11 rounded-full glass grid place-items-center text-sm disabled:opacity-30"
    >
      {children}
    </button>
  );
}

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="h-9 w-9 rounded-full bg-black/55 backdrop-blur-md border border-white/15 grid place-items-center text-white hover:bg-black/80 hover:border-gold/40 transition-all"
    >
      {children}
    </button>
  );
}

function SoundIcon({ muted }: { muted: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5 6 9H2v6h4l5 4z" />
      {muted ? (
        <>
          <path d="m23 9-6 6" />
          <path d="m17 9 6 6" />
        </>
      ) : (
        <>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </>
      )}
    </svg>
  );
}

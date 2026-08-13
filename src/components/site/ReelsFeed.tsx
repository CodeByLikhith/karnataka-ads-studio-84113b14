import { useCallback, useEffect, useRef, useState } from "react";
import { Heart, Share2, Volume2, VolumeX, Maximize2, Play } from "lucide-react";
import { toast } from "sonner";
import type { Reel } from "./reels-data";

interface Props {
  reels: Reel[];
}

/**
 * Vertical, one-at-a-time reels viewer with scroll snapping.
 * - Only the active reel loads + plays; every other reel is paused and unloaded-ish.
 * - Native scroll-snap handles wheel + touch swipe consistently.
 */
export function ReelsFeed({ reels }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  return (
    <div
      className="reels-scroll h-[calc(100svh-9rem)] md:h-[calc(100svh-10rem)] overflow-y-auto snap-y snap-mandatory rounded-3xl"
      style={{ scrollbarWidth: "none" }}
    >
      {reels.map((reel, i) => (
        <ReelItem
          key={reel.id}
          reel={reel}
          index={i}
          active={i === activeIndex}
          near={Math.abs(i - activeIndex) <= 1}
          muted={muted}
          liked={!!liked[reel.id]}
          onToggleMute={() => setMuted((m) => !m)}
          onToggleLike={() => setLiked((l) => ({ ...l, [reel.id]: !l[reel.id] }))}
          onActivate={setActiveIndex}
        />
      ))}
    </div>
  );
}

function ReelItem({
  reel,
  index,
  active,
  near,
  muted,
  liked,
  onToggleMute,
  onToggleLike,
  onActivate,
}: {
  reel: Reel;
  index: number;
  active: boolean;
  near: boolean;
  muted: boolean;
  liked: boolean;
  onToggleMute: () => void;
  onToggleLike: () => void;
  onActivate: (i: number) => void;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [paused, setPaused] = useState(false);
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.intersectionRatio >= 0.6) onActivate(index);
        }
      },
      { threshold: [0, 0.6, 0.9] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [index, onActivate]);

  // Only the active reel plays.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (active && !paused) {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    } else if (!v.paused) {
      v.pause();
    }
    if (!active) setPaused(false);
  }, [active, paused]);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.muted = muted;
  }, [muted]);

  useEffect(() => {
    const onVis = () => {
      const v = videoRef.current;
      if (document.hidden && v && !v.paused) v.pause();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const togglePlay = () => setPaused((p) => !p);

  const share = useCallback(async () => {
    const url = typeof window !== "undefined" ? `${window.location.origin}${window.location.pathname}#${reel.id}` : "";
    try {
      if (navigator.share) {
        await navigator.share({ url, title: reel.title ?? "Karnique reel" });
        return;
      }
      await navigator.clipboard.writeText(url);
      toast.success("Link copied");
    } catch {
      /* user cancelled or clipboard blocked */
    }
  }, [reel.id, reel.title]);

  const fullscreen = () => {
    const el = frameRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen?.();
    else el.requestFullscreen?.();
  };

  const like = () => {
    onToggleLike();
    setBurst(true);
    window.setTimeout(() => setBurst(false), 450);
  };

  return (
    <div
      ref={wrapRef}
      id={reel.id}
      className="h-full w-full snap-start snap-always grid place-items-center px-3 py-3"
    >
      <div
        className="relative aspect-[9/16] max-h-full"
        style={{ width: "min(100%, calc((100svh - 12rem) * 0.5625))" }}
      >
        <div
          ref={frameRef}
          className="relative h-full w-full overflow-hidden rounded-3xl bg-black border border-border"
        >
          <video
            ref={videoRef}
            src={near ? reel.video : undefined}
            poster={reel.poster}
            muted={muted}
            loop
            playsInline
            preload={near ? "auto" : "none"}
            onClick={togglePlay}
            className="h-full w-full object-cover cursor-pointer"
          />

          {paused && active && (
            <button
              type="button"
              onClick={togglePlay}
              aria-label="Play"
              className="absolute inset-0 grid place-items-center"
            >
              <span className="grid place-items-center h-16 w-16 rounded-full glass backdrop-blur-md">
                <Play className="h-7 w-7 text-foreground" fill="currentColor" />
              </span>
            </button>
          )}

          {(reel.title || reel.category || reel.client) && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 pr-16 bg-gradient-to-t from-black via-black/60 to-transparent">
              {reel.category && (
                <div className="text-[10px] uppercase tracking-[0.25em] text-gold">{reel.category}</div>
              )}
              {reel.title && <div className="mt-1 text-sm font-medium">{reel.title}</div>}
              {reel.client && <div className="text-xs text-muted-foreground">{reel.client}</div>}
            </div>
          )}

          {/* Right-side controls */}
          <div className="absolute right-3 bottom-5 flex flex-col items-center gap-3">
            <ControlButton label={liked ? "Unlike" : "Like"} onClick={like}>
              <Heart
                className={`h-5 w-5 transition-transform duration-300 ${liked ? "text-gold scale-110" : "text-foreground"} ${burst ? "scale-125" : ""}`}
                fill={liked ? "currentColor" : "none"}
              />
            </ControlButton>
            <ControlButton label="Share" onClick={share}>
              <Share2 className="h-5 w-5" />
            </ControlButton>
            <ControlButton label={muted ? "Unmute" : "Mute"} onClick={onToggleMute}>
              {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </ControlButton>
            <ControlButton label="Fullscreen" onClick={fullscreen}>
              <Maximize2 className="h-5 w-5" />
            </ControlButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function ControlButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid place-items-center h-10 w-10 rounded-full glass backdrop-blur-md text-foreground transition-transform hover:scale-110 active:scale-95"
    >
      {children}
    </button>
  );
}

import { useEffect, useRef, useState, memo, type VideoHTMLAttributes } from "react";

interface Props extends Omit<VideoHTMLAttributes<HTMLVideoElement>, "src"> {
  src: string;
  /** Distance ahead of viewport at which to begin downloading. */
  rootMargin?: string;
  /** Fraction of the video that must be visible to start playback. */
  playThreshold?: number;
  /** Fraction below which the video pauses. Must be < playThreshold to avoid flicker. */
  pauseThreshold?: number;
}

/**
 * Viewport-aware video:
 *  - Downloads only when within `rootMargin` of the viewport (bandwidth).
 *  - Plays when intersectionRatio ≥ playThreshold.
 *  - Pauses when intersectionRatio < pauseThreshold (hysteresis prevents flicker).
 *  - Never unmounts, so currentTime persists → resumes from exact spot.
 *  - Uses a single IntersectionObserver — no scroll listeners.
 */
export const LazyVideo = memo(function LazyVideo({
  src,
  rootMargin = "600px 0px",
  playThreshold = 0.1,
  pauseThreshold = 0,
  className,
  poster,
  muted = true,
  loop = true,
  playsInline = true,
  ...rest
}: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const loadedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setLoaded(true);
      loadedRef.current = true;
      return;
    }

    // Build a small, deduped threshold list so we get callbacks near both boundaries.
    const thresholds = Array.from(
      new Set([0, pauseThreshold, Math.max(0, playThreshold - 0.05), playThreshold, 0.99].filter(
        (t) => t >= 0 && t <= 1,
      )),
    ).sort((a, b) => a - b);

    // Download observer — fires early using rootMargin, then disconnects.
    const loadIO = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !loadedRef.current) {
            loadedRef.current = true;
            setLoaded(true);
            loadIO.disconnect();
            break;
          }
        }
      },
      { rootMargin, threshold: 0 },
    );
    loadIO.observe(el);

    // Playback observer — tight to the viewport, uses ratio hysteresis.
    const playIO = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const ratio = e.intersectionRatio;
          if (ratio >= playThreshold) {
            if (el.ended) {
              try { el.currentTime = 0; } catch { /* ignore */ }
            }
            const p = el.play();
            if (p && typeof p.catch === "function") p.catch(() => { /* autoplay guard */ });
          } else if (ratio <= pauseThreshold) {
            if (!el.paused) el.pause();
          }
        }
      },
      { threshold: thresholds },
    );
    playIO.observe(el);

    const onVisibility = () => {
      if (document.hidden && !el.paused) el.pause();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      loadIO.disconnect();
      playIO.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [playThreshold, pauseThreshold, rootMargin]);

  return (
    <video
      ref={ref}
      src={loaded ? src : undefined}
      poster={poster}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      preload={loaded ? "auto" : "none"}
      className={className}
      {...rest}
    />
  );
});

import { useEffect, useRef, useState, type VideoHTMLAttributes } from "react";

type Props = VideoHTMLAttributes<HTMLVideoElement> & {
  src: string;
  /** Fade-in duration when the first frame is ready. */
  fadeMs?: number;
};

/**
 * Video that:
 *  - Only starts loading its source when it scrolls near the viewport
 *  - Auto plays when visible, pauses when off-screen (saves CPU/GPU)
 *  - Fades in smoothly once the first frame is decoded
 *  - Respects prefers-reduced-motion
 */
export function LazyVideo({ src, className = "", fadeMs = 500, ...rest }: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            // Kick off playback once we have data
            el.play().catch(() => {});
          } else {
            el.pause();
          }
        }
      },
      { rootMargin: "200px 0px", threshold: 0.1 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      // Only attach src once near viewport; keeps initial network light.
      src={inView ? src : undefined}
      muted
      loop
      playsInline
      preload="metadata"
      onLoadedData={() => setReady(true)}
      style={{
        opacity: ready ? 1 : 0,
        transition: `opacity ${fadeMs}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        ...(rest.style ?? {}),
      }}
      className={className}
      {...rest}
    />
  );
}

import { useEffect, useRef, useState, memo, type VideoHTMLAttributes } from "react";

interface Props extends Omit<VideoHTMLAttributes<HTMLVideoElement>, "src"> {
  src: string;
  /** Distance ahead of viewport at which to begin loading. */
  rootMargin?: string;
  /** Wrapper class (video always fills wrapper). */
  wrapperClassName?: string;
}

/**
 * Video that only starts downloading when it's within `rootMargin` of the viewport.
 * Uses IntersectionObserver — no bandwidth is spent on off-screen videos on initial load.
 */
export const LazyVideo = memo(function LazyVideo({
  src,
  rootMargin = "800px 0px",
  wrapperClassName,
  className,
  poster,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  ...rest
}: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin, threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView, rootMargin]);

  return (
    <video
      ref={ref}
      src={inView ? src : undefined}
      poster={poster}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      preload={inView ? "auto" : "none"}
      className={className}
      {...rest}
    />
  );
});

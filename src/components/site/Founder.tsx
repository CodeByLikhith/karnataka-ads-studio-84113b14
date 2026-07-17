import { useEffect, useRef, useState } from "react";
import founder from "@/assets/founder.png.asset.json";
import founderVideo from "@/assets/founder-intro.mp4.asset.json";

const STORAGE_KEY = "kas:founder-unmuted";

export function Founder() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [muted, setMuted] = useState(true);
  const [showUnmute, setShowUnmute] = useState(false);

  // Attempt playback with the current muted state; fall back to muted on rejection.
  const tryPlay = (el: HTMLVideoElement, wantUnmuted: boolean) => {
    el.muted = !wantUnmuted;
    const p = el.play();
    if (p && typeof p.catch === "function") {
      p.catch(() => {
        // Autoplay with sound blocked — retry muted so the video still plays.
        if (wantUnmuted) {
          el.muted = true;
          setMuted(true);
          setShowUnmute(true);
          const p2 = el.play();
          if (p2 && typeof p2.catch === "function") p2.catch(() => { /* ignore */ });
        }
      });
    }
  };

  // IntersectionObserver: play at ≥60%, pause at <30%.
  useEffect(() => {
    const el = videoRef.current;
    const wrap = wrapRef.current;
    if (!el || !wrap) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.intersectionRatio >= 0.6) {
            setInView(true);
            if (el.ended) {
              try { el.currentTime = 0; } catch { /* ignore */ }
            }
            const prefersUnmuted = sessionStorage.getItem(STORAGE_KEY) === "1";
            tryPlay(el, prefersUnmuted);
          } else if (e.intersectionRatio < 0.3) {
            setInView(false);
            if (!el.paused) el.pause();
          }
        }
      },
      { threshold: [0, 0.3, 0.6, 0.9] },
    );
    io.observe(wrap);

    const onVis = () => {
      if (document.hidden && !el.paused) el.pause();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  // If the user interacts anywhere on the page and the video is playing muted while in view,
  // try to promote to unmuted (browsers commonly allow this after a gesture).
  useEffect(() => {
    const onGesture = () => {
      const el = videoRef.current;
      if (!el) return;
      if (sessionStorage.getItem(STORAGE_KEY) === "1" && inView && el.muted) {
        tryPlay(el, true);
        setMuted(false);
        setShowUnmute(false);
      }
    };
    window.addEventListener("pointerdown", onGesture, { once: true, passive: true });
    return () => window.removeEventListener("pointerdown", onGesture);
  }, [inView]);

  const handleUnmute = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = false;
    setMuted(false);
    const p = el.play();
    if (p && typeof p.catch === "function") {
      p.then(() => {
        sessionStorage.setItem(STORAGE_KEY, "1");
        setShowUnmute(false);
      }).catch(() => {
        el.muted = true;
        setMuted(true);
        setShowUnmute(true);
      });
    } else {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setShowUnmute(false);
    }
  };

  // Initial mute state from session preference.
  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") {
      setMuted(false);
      setShowUnmute(false);
    } else {
      setShowUnmute(true);
    }
  }, []);

  return (
    <section id="about" className="py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-6 rounded-[2.5rem] opacity-30 blur-2xl"
                   style={{ background: "radial-gradient(closest-side, oklch(0.82 0.13 86 / 0.7), transparent)" }} />
              <div ref={wrapRef} className="relative rounded-[2rem] overflow-hidden border border-border bg-surface aspect-[3/4]">
                <video
                  ref={videoRef}
                  src={founderVideo.url}
                  poster={founder.url}
                  playsInline
                  loop
                  muted={muted}
                  preload="auto"
                  aria-label="Likhith Gowda — Founder of Karnataka Ads Studio"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {showUnmute && muted && (
                  <button
                    type="button"
                    onClick={handleUnmute}
                    aria-label="Unmute founder video"
                    className="absolute top-4 right-4 inline-flex items-center gap-2 rounded-full bg-black/60 backdrop-blur-md border border-white/15 px-3.5 py-2 text-xs font-medium text-white hover:bg-black/80 hover:border-gold/40 transition-all shadow-elevated"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 5 6 9H2v6h4l5 4z" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    </svg>
                    Tap for sound
                  </button>
                )}

                <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                  <div className="text-xs uppercase tracking-widest text-gold">Founder</div>
                  <div className="mt-1 text-2xl font-semibold">Likhith Gowda</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground">
              <span className="h-1 w-1 rounded-full bg-gold" />
              Meet the Founder
            </div>
            <h2 className="mt-6 text-4xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1.02]">
              Obsessed with the craft of <span className="text-gradient-gold italic font-normal">scroll-stopping</span> creative.
            </h2>
            <div className="mt-8 space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Hi, I&rsquo;m Likhith, founder of Karnataka Ads Studio.
              </p>
              <p>
                We help consumer brands create premium AI-powered advertising creatives designed for
                Meta, Instagram and TikTok.
              </p>
              <p>
                Our goal is to combine creative strategy with AI production to help brands test more
                creative ideas, faster and more efficiently.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="https://instagram.com/aiwithlikhith"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full glass px-5 py-3 text-sm hover:bg-white/10 hover:border-gold/30 transition-all"
              >
                <span className="h-2 w-2 rounded-full bg-gold" />
                @aiwithlikhith
                <span className="text-muted-foreground">on Instagram</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-primary-foreground hover:shadow-gold hover:-translate-y-0.5 transition-all"
              >
                Let's Talk →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

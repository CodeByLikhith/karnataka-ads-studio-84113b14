/**
 * Central media registry.
 *
 * Every image and video lives in the repository under `public/` and is served
 * from an absolute, production-safe path (`/videos/...`, `/images/...`).
 * No CDN pointers, blob:, data:, localhost or preview-only URLs.
 */

export interface MediaVideo {
  /** Absolute production path to the MP4 (H.264). */
  url: string;
  /** Absolute production path to the WebP poster frame. */
  poster: string;
}

const v = (name: string): MediaVideo => ({
  url: `/videos/${name}.mp4`,
  poster: `/images/posters/${name}.webp`,
});

export const video = {
  p1: v("portfolio-1"),
  p2: v("portfolio-2"),
  p3: v("portfolio-3"),
  p4: v("portfolio-4"),
  p5: v("portfolio-5"),
  p6: v("portfolio-6"),
  p7: v("portfolio-7"),
  p8: v("portfolio-8"),
  p9: v("portfolio-9"),
  p10: v("portfolio-10"),
  p11: v("portfolio-11"),
  p12: v("portfolio-12"),
  p13: v("portfolio-13"),
  p14: v("portfolio-14"),
  p15: v("portfolio-15"),
  p16: v("portfolio-16"),
  p17: v("portfolio-17"),
  p18: v("portfolio-18"),
  p19: v("portfolio-19"),
  p20: v("portfolio-20"),
  p21: v("portfolio-21"),
  p22: v("portfolio-22"),
  p23: v("portfolio-23"),
  founderIntro: v("founder-intro"),
} as const;

export const image = {
  logo: "/images/karnique-logo.webp",
  founder: "/images/founder.webp",
} as const;

/**
 * Reels Feed collection.
 *
 * Data-driven: add a new batch by appending entries below. Files live in the
 * repository under `public/videos/reels/` and `public/images/posters/reels/`
 * so the paths are production-safe (no CDN pointers, blob:, or preview URLs).
 *
 * To add the next batch of 10, drop the encoded MP4s into
 * `public/videos/reels/` and their WebP posters into
 * `public/images/posters/reels/`, then append `r(10) … r(19)` here.
 */

export interface Reel {
  /** Absolute production path to the MP4 (H.264). */
  src: string;
  /** Absolute production path to the WebP poster frame. */
  poster: string;
  /** Optional label — leave undefined rather than inventing metadata. */
  title?: string;
  category?: string;
  /** Use "contain" for source footage that is not 9:16. */
  fit?: "cover" | "contain";
}

const r = (n: number, extra: Partial<Reel> = {}): Reel => ({
  src: `/videos/reels/reel-${n}.mp4`,
  poster: `/images/posters/reels/reel-${n}.webp`,
  ...extra,
});

export const reels: Reel[] = [
  r(1),
  r(2),
  r(3),
  r(4, { fit: "contain" }),
  r(5),
  r(6),
  r(7),
  r(8),
  r(9),
];

import { video } from "@/lib/media";

/**
 * Reels Feed data.
 *
 * Data-driven list rendered by the vertical Reels viewer on /portfolio.
 * New batches of uploads are appended here — never duplicated, never
 * split across new pages. Optional fields are omitted when unknown.
 */
export interface Reel {
  id: string;
  video: string;
  poster: string;
  title?: string;
  category?: string;
  client?: string;
}

const source = [
  video.p1,
  video.p2,
  video.p3,
  video.p4,
  video.p5,
  video.p6,
  video.p7,
  video.p8,
  video.p9,
  video.p11,
  video.p12,
  video.p13,
  video.p14,
];

export const reels: Reel[] = source.map((v, i) => ({
  id: `reel-${String(i + 1).padStart(2, "0")}`,
  video: v.url,
  poster: v.poster,
}));

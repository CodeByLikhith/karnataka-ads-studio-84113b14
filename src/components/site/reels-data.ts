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
  // Batch: Elevique uploads (appended, upload order preserved)
  video.p15,
  video.p16,
  video.p17,
  video.p18,
  video.p19,
  video.p20,
  video.p21,
  video.p22,
  video.p23,
  // Batch: August uploads (appended, upload order preserved)
  video.p24,
  video.p25,
  video.p26,
  video.p27,
  video.p28,
  video.p29,
  video.p30,
  // Batch: latest uploads (appended, upload order preserved)
  video.p31,
  video.p32,
  video.p33,
  video.p34,
  video.p35,
  video.p36,
  // Batch: newest uploads (appended, upload order preserved)
  video.p37,
  video.p38,
  video.p39,
  video.p40,
  video.p41,
];

export const reels: Reel[] = source.map((v, i) => ({
  id: `reel-${String(i + 1).padStart(2, "0")}`,
  video: v.url,
  poster: v.poster,
}));

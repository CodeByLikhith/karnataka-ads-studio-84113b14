import { video } from "@/lib/media";

export type ProjectCategory =
  | "Health Supplements"
  | "Skincare"
  | "Beverages"
  | "Packaged Foods"
  | "Functional Beverages"
  | "Fashion & Accessories"
  | "Confectionery"
  | "Luxury Skincare"
  | "Pet Nutrition";


export interface Project {
  src: string;
  poster: string;
  title: string;
  category: ProjectCategory | null;
}

// Curated order — first 6 appear as the homepage teaser.
// Selected for best balance of fast loading, smooth playback and visual quality.
export const projects: Project[] = [
  { ...video.p1, src: video.p1.url, title: "Project 01", category: "Health Supplements" },
  { ...video.p6, src: video.p6.url, title: "Project 02", category: "Skincare" },
  { ...video.p8, src: video.p8.url, title: "Project 03", category: "Health Supplements" },
  { ...video.p14, src: video.p14.url, title: "Project 04", category: "Beverages" },
  { ...video.p7, src: video.p7.url, title: "Project 05", category: "Beverages" },
  { ...video.p2, src: video.p2.url, title: "Project 06", category: "Packaged Foods" },
  { ...video.p3, src: video.p3.url, title: "Project 07", category: "Functional Beverages" },
  { ...video.p4, src: video.p4.url, title: "Project 08", category: "Skincare" },
  { ...video.p5, src: video.p5.url, title: "Project 09", category: "Skincare" },
  { ...video.p12, src: video.p12.url, title: "Project 10", category: "Fashion & Accessories" },
  { ...video.p11, src: video.p11.url, title: "Project 11", category: "Confectionery" },
  { ...video.p13, src: video.p13.url, title: "Project 12", category: "Luxury Skincare" },
  { ...video.p9, src: video.p9.url, title: "Project 13", category: "Pet Nutrition" },
  // Latest batch — appended in upload order (also mirrored in the Reels Feed).
  { ...video.p15, src: video.p15.url, title: "Project 14", category: null },
  { ...video.p16, src: video.p16.url, title: "Project 15", category: null },
  { ...video.p17, src: video.p17.url, title: "Project 16", category: null },
  { ...video.p18, src: video.p18.url, title: "Project 17", category: null },
  { ...video.p19, src: video.p19.url, title: "Project 18", category: null },
  { ...video.p20, src: video.p20.url, title: "Project 19", category: null },
  { ...video.p21, src: video.p21.url, title: "Project 20", category: null },
  { ...video.p22, src: video.p22.url, title: "Project 21", category: null },
  { ...video.p23, src: video.p23.url, title: "Project 22", category: null },
  { ...video.p24, src: video.p24.url, title: "Project 23", category: null },
  { ...video.p25, src: video.p25.url, title: "Project 24", category: null },
  { ...video.p26, src: video.p26.url, title: "Project 25", category: null },
  { ...video.p27, src: video.p27.url, title: "Project 26", category: null },
  { ...video.p28, src: video.p28.url, title: "Project 27", category: null },
  { ...video.p29, src: video.p29.url, title: "Project 28", category: null },
  { ...video.p30, src: video.p30.url, title: "Project 29", category: null },
  { ...video.p31, src: video.p31.url, title: "Project 30", category: null },
  { ...video.p32, src: video.p32.url, title: "Project 31", category: null },
  { ...video.p33, src: video.p33.url, title: "Project 32", category: null },
  { ...video.p34, src: video.p34.url, title: "Project 33", category: null },
  { ...video.p35, src: video.p35.url, title: "Project 34", category: null },
  { ...video.p36, src: video.p36.url, title: "Project 35", category: null },
  { ...video.p37, src: video.p37.url, title: "Project 36", category: null },
  { ...video.p38, src: video.p38.url, title: "Project 37", category: null },
  { ...video.p39, src: video.p39.url, title: "Project 38", category: null },
  { ...video.p40, src: video.p40.url, title: "Project 39", category: null },
  { ...video.p41, src: video.p41.url, title: "Project 40", category: null },
];

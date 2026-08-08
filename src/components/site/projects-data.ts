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
];

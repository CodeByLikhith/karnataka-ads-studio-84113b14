import v1 from "@/assets/portfolio-1.mp4.asset.json";
import v2 from "@/assets/portfolio-2.mp4.asset.json";
import v3 from "@/assets/portfolio-3.mp4.asset.json";
import v4 from "@/assets/portfolio-4.mp4.asset.json";
import v5 from "@/assets/portfolio-5.mp4.asset.json";
import v6 from "@/assets/portfolio-6.mp4.asset.json";
import v7 from "@/assets/portfolio-7.mp4.asset.json";
import v8 from "@/assets/portfolio-8.mp4.asset.json";
import v9 from "@/assets/portfolio-9.mp4.asset.json";
import v10 from "@/assets/portfolio-10.mp4.asset.json";
import v11 from "@/assets/portfolio-11.webm.asset.json";
import v12 from "@/assets/portfolio-12.webm.asset.json";
import v13 from "@/assets/portfolio-13.webm.asset.json";
import v14 from "@/assets/portfolio-14.mp4.asset.json";

export type ProjectCategory =
  | "Supplements"
  | "Skincare"
  | "Perfumes"
  | "Food & Wellness"
  | "Posters";

export interface Project {
  src: string;
  title: string;
  category: ProjectCategory | null;
}

// Curated order — first 6 appear as the homepage teaser.
export const projects: Project[] = [
  { src: v11.url, title: "Project 01", category: "Food & Wellness" },
  { src: v9.url, title: "Project 02", category: "Skincare" },
  { src: v13.url, title: "Project 03", category: "Skincare" },
  { src: v10.url, title: "Project 04", category: "Food & Wellness" },
  { src: v12.url, title: "Project 05", category: "Skincare" },
  { src: v14.url, title: "Project 06", category: "Perfumes" },
  { src: v1.url, title: "Project 07", category: "Skincare" },
  { src: v2.url, title: "Project 08", category: "Skincare" },
  { src: v3.url, title: "Project 09", category: "Supplements" },
  { src: v4.url, title: "Project 10", category: "Supplements" },
  { src: v5.url, title: "Project 11", category: "Perfumes" },
  { src: v6.url, title: "Project 12", category: "Food & Wellness" },
  { src: v7.url, title: "Project 13", category: "Posters" },
  { src: v8.url, title: "Project 14", category: "Posters" },
];

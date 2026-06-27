import { useState } from "react";
import { SectionHeader } from "./SectionHeader";
import v1 from "@/assets/portfolio-1.mp4.asset.json";
import v2 from "@/assets/portfolio-2.mp4.asset.json";
import v3 from "@/assets/portfolio-3.mp4.asset.json";
import v4 from "@/assets/portfolio-4.mp4.asset.json";
import v5 from "@/assets/portfolio-5.mp4.asset.json";
import v6 from "@/assets/portfolio-6.mp4.asset.json";
import v7 from "@/assets/portfolio-7.mp4.asset.json";
import v8 from "@/assets/portfolio-8.mp4.asset.json";

type Category = "All" | "Supplements" | "Skincare" | "Perfumes" | "Food & Wellness" | "Posters";

interface Project {
  src: string;
  title: string;
  category: Exclude<Category, "All">;
}

// To add new projects later, append to this array.
const projects: Project[] = [
  { src: v1.url, title: "Premium Supplement Hero", category: "Supplements" },
  { src: v2.url, title: "Glow Serum Cinematic", category: "Skincare" },
  { src: v3.url, title: "Eau de Parfum Visual", category: "Perfumes" },
  { src: v4.url, title: "Wellness Ritual Reel", category: "Food & Wellness" },
  { src: v5.url, title: "Active Skin Story", category: "Skincare" },
  { src: v6.url, title: "Protein Studio Film", category: "Supplements" },
  { src: v7.url, title: "Botanical Fragrance", category: "Perfumes" },
  { src: v8.url, title: "Functional Drink Ad", category: "Food & Wellness" },
];

const categories: Category[] = ["All", "Supplements", "Skincare", "Perfumes", "Food & Wellness", "Posters"];

export function Portfolio() {
  const [active, setActive] = useState<Category>("All");
  const [lightbox, setLightbox] = useState<Project | null>(null);

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="portfolio" className="py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <SectionHeader
            eyebrow="Portfolio"
            title={<>Work that <span className="text-gradient-gold italic font-normal">stops thumbs.</span></>}
          />
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`px-4 py-2 rounded-full text-xs tracking-wide transition-all ${
                  active === c
                    ? "bg-gold text-primary-foreground"
                    : "glass text-muted-foreground hover:text-foreground hover:border-white/15"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-24 text-muted-foreground text-sm">
              New {active.toLowerCase()} drops coming soon.
            </div>
          )}
          {filtered.map((p, i) => (
            <button
              key={p.src + i}
              onClick={() => setLightbox(p)}
              className="group relative rounded-3xl overflow-hidden bg-surface aspect-[9/14] reveal border border-border hover:border-gold/30 transition-all"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <video
                src={p.src}
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black via-black/60 to-transparent">
                <div className="text-[10px] uppercase tracking-[0.25em] text-gold">{p.category}</div>
                <div className="mt-2 text-base font-medium">{p.title}</div>
              </div>
              <div className="absolute top-4 right-4 h-10 w-10 rounded-full glass grid place-items-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-1 group-hover:translate-y-0">
                <span className="text-sm">↗</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl grid place-items-center p-4 animate-in fade-in duration-300"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 h-12 w-12 rounded-full glass grid place-items-center text-lg"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            ✕
          </button>
          <div className="relative max-h-[85vh] w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="rounded-3xl overflow-hidden bg-black shadow-elevated aspect-[9/16]">
              <video
                src={lightbox.src}
                controls
                autoPlay
                loop
                className="h-full w-full object-contain"
              />
            </div>
            <div className="mt-4 text-center">
              <div className="text-[10px] uppercase tracking-[0.25em] text-gold">{lightbox.category}</div>
              <div className="mt-1 text-base font-medium">{lightbox.title}</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

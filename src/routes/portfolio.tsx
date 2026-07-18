import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { SectionHeader } from "@/components/site/SectionHeader";
import { ProjectGrid } from "@/components/site/ProjectGrid";
import { projects, type ProjectCategory } from "@/components/site/projects-data";

const CANONICAL = "https://karnataka-ads-studio.lovable.app/portfolio";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Karnataka Ads Studio" },
      {
        name: "description",
        content:
          "Browse AI video ads, UGC and static creative built for supplement, skincare, perfume, wellness and packaged food brands.",
      },
      { property: "og:title", content: "Portfolio — Karnataka Ads Studio" },
      {
        property: "og:description",
        content: "AI-generated creative built for consumer product brands.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
  }),
  component: PortfolioPage,
});

type Filter = "All" | ProjectCategory;
const filters: Filter[] = ["All", "Health Supplements", "Skincare", "Beverages", "Packaged Foods", "Functional Beverages", "Fashion & Accessories", "Confectionery", "Luxury Skincare", "Pet Nutrition"];

function PortfolioPage() {
  const [active, setActive] = useState<Filter>("All");
  const items = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <main className="relative">
      <Navbar />
      <section className="pt-40 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            eyebrow="Portfolio"
            align="center"
            title={<>Every <span className="text-gradient-gold italic font-normal">scroll-stopper</span> we've made.</>}
            description="Filter by category to explore the work."
          />
          <div className="mt-12 flex flex-wrap justify-center gap-2">
            {filters.map((c) => (
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
          <div className="mt-12">
            <ProjectGrid items={items} />
          </div>
          <div className="mt-20 text-center">
            <Link to="/" className="text-sm text-muted-foreground hover:text-gold transition-colors">
              ← Back to home
            </Link>
          </div>
        </div>
      </section>
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}

import { Link } from "@tanstack/react-router";
import { SectionHeader } from "./SectionHeader";
import { ProjectGrid } from "./ProjectGrid";
import { projects } from "./projects-data";

export function Portfolio() {
  // Desktop/tablet: latest 6. Mobile reduces to first 3 via CSS.
  const featured = projects.slice(0, 6);

  return (
    <section id="portfolio" className="py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Creative Showcase"
          align="center"
          title={<>Creative <span className="text-gradient-gold italic font-normal">Showcase.</span></>}
          description="A collection of AI-powered advertising concepts demonstrating our creative quality, storytelling and production capabilities."
        />

        <div className="mt-16">
          {/* Mobile: show first 3. Tablet+: show all 6. */}
          <div className="sm:hidden">
            <ProjectGrid items={featured.slice(0, 3)} />
          </div>
          <div className="hidden sm:block">
            <ProjectGrid items={featured} />
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            to="/portfolio"
            className="group inline-flex items-center gap-3 rounded-full border border-gold/40 bg-white/[0.02] px-8 py-4 text-sm font-medium tracking-wide text-foreground transition-all hover:border-gold hover:bg-gold/10 hover:shadow-[0_10px_40px_-10px_rgba(242,201,76,0.5)]"
          >
            View All Projects
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

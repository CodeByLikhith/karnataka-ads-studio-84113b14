import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { SectionHeader } from "@/components/site/SectionHeader";
import { CaseStudyCard } from "@/components/site/CaseStudyCard";
import {
  caseStudies,
  type CaseStudyIndustry,
  type CaseStudyCreativeType,
} from "@/components/site/case-studies-data";

const CANONICAL = "https://karnataka-ads-studio.lovable.app/case-studies";

export const Route = createFileRoute("/case-studies/")({
  head: () => ({
    meta: [
      { title: "Case Studies — AI Creative for Consumer Brands | Karnataka Ads Studio" },
      {
        name: "description",
        content:
          "Real campaigns and results from AI video, UGC and static creative across supplements, skincare, perfumes and health drinks.",
      },
      { property: "og:title", content: "Case Studies — Karnataka Ads Studio" },
      {
        property: "og:description",
        content: "Performance results from AI creative across consumer categories.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
  }),
  component: CaseStudiesIndex,
});

const industries: Array<"All" | CaseStudyIndustry> = [
  "All",
  "Supplements",
  "Skincare",
  "Perfumes",
  "Health Drinks",
];
const types: Array<"All" | CaseStudyCreativeType> = ["All", "AI Video", "UGC", "Static"];

function CaseStudiesIndex() {
  const [industry, setIndustry] = useState<"All" | CaseStudyIndustry>("All");
  const [type, setType] = useState<"All" | CaseStudyCreativeType>("All");

  const filtered = useMemo(
    () =>
      caseStudies.filter(
        (s) =>
          (industry === "All" || s.industry === industry) &&
          (type === "All" || s.creativeTypes.includes(type)),
      ),
    [industry, type],
  );

  return (
    <main className="relative">
      <Navbar />
      <section className="pt-40 pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            eyebrow="Case Studies"
            align="center"
            title={
              <>
                Proof, not <span className="text-gradient-gold italic font-normal">promises.</span>
              </>
            }
            description="Real campaigns. Real numbers. Filter by industry or creative type."
          />

          <div className="mt-14 grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            <FilterRow label="Industry" options={industries} value={industry} onChange={setIndustry} />
            <FilterRow label="Creative type" options={types} value={type} onChange={setType} />
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filtered.length === 0 ? (
              <div className="md:col-span-2 lg:col-span-3 text-center py-24 text-sm text-muted-foreground border border-dashed border-white/10 rounded-3xl">
                No case studies match these filters yet.
              </div>
            ) : (
              filtered.map((s) => <CaseStudyCard key={s.slug} study={s} showType />)
            )}
          </div>

          <div className="mt-24 text-center">
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

function FilterRow<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3 text-center md:text-left">
        {label}
      </div>
      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`px-4 py-2 rounded-full text-xs tracking-wide transition-all ${
              value === o
                ? "bg-gold text-primary-foreground"
                : "glass text-muted-foreground hover:text-foreground hover:border-white/15"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

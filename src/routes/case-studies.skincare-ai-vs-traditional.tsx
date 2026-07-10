import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";

const CANONICAL = "https://karnataka-ads-studio.lovable.app/case-studies/skincare-ai-vs-traditional";

export const Route = createFileRoute("/case-studies/skincare-ai-vs-traditional")({
  head: () => ({
    meta: [
      { title: "AI Video Ads vs Traditional Shoots — A Skincare Case Study" },
      {
        name: "description",
        content:
          "A 30-day side-by-side test: cinematic AI video ads vs a traditional studio shoot for a skincare brand. ROAS, CPC, hook rate and production cost compared.",
      },
      { property: "og:title", content: "AI Video Ads vs Traditional Shoots — Skincare Case Study" },
      {
        property: "og:description",
        content:
          "How AI-generated ad creative outperformed a studio-shot ad on ROAS, CPC and hook rate — at a fraction of the cost.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: CANONICAL },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "AI Video Ads vs Traditional Shoots — A Skincare Case Study",
          description:
            "Side-by-side performance test of AI-generated video ads vs a traditional studio shoot for a skincare brand.",
          author: { "@type": "Organization", name: "Karnataka Ads Studio" },
          publisher: { "@type": "Organization", name: "Karnataka Ads Studio" },
          mainEntityOfPage: CANONICAL,
        }),
      },
    ],
  }),
  component: CaseStudy,
});

type Metric = {
  label: string;
  ai: string;
  traditional: string;
  delta: string;
  positive: boolean;
};

const metrics: Metric[] = [
  { label: "ROAS (Return on Ad Spend)", ai: "4.8×", traditional: "2.1×", delta: "+128%", positive: true },
  { label: "CPC (Cost per Click)", ai: "₹6.20", traditional: "₹14.80", delta: "−58%", positive: true },
  { label: "Hook Rate (3-sec view)", ai: "42%", traditional: "19%", delta: "+121%", positive: true },
  { label: "Thumbstop Rate", ai: "31%", traditional: "14%", delta: "+121%", positive: true },
  { label: "CTR (Link click-through)", ai: "3.4%", traditional: "1.6%", delta: "+112%", positive: true },
  { label: "Production cost", ai: "₹18,000", traditional: "₹1,80,000", delta: "−90%", positive: true },
  { label: "Time from brief to live", ai: "5 days", traditional: "31 days", delta: "−84%", positive: true },
  { label: "Creative variants tested", ai: "12", traditional: "2", delta: "+500%", positive: true },
];

function CaseStudy() {
  return (
    <main className="relative">
      <Navbar />

      <article className="pt-36 pb-24 md:pt-44 md:pb-32">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Case Study · Skincare</div>
          <h1 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
            AI video ads vs a traditional studio shoot.{" "}
            <span className="text-gradient-gold italic font-normal">One brand. 30 days. Same budget.</span>
          </h1>
          <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
            We ran two ad sets for an Indian skincare brand against the same audience, same offer and
            the same monthly spend. One used a cinematic AI-generated video built in our studio. The
            other used a traditionally shot studio ad produced by a freelance crew. Here&rsquo;s what the
            numbers looked like on day 30.
          </p>
        </div>

        <section className="mx-auto max-w-5xl px-6 mt-20">
          <div className="rounded-3xl glass overflow-hidden">
            <div className="grid grid-cols-12 px-6 sm:px-8 py-5 text-[10px] uppercase tracking-[0.25em] text-muted-foreground border-b border-border">
              <div className="col-span-5">Metric</div>
              <div className="col-span-3 text-right">AI Video Ad</div>
              <div className="col-span-3 text-right">Traditional Shoot</div>
              <div className="col-span-1 text-right">Δ</div>
            </div>
            {metrics.map((m) => (
              <div
                key={m.label}
                className="grid grid-cols-12 items-center px-6 sm:px-8 py-5 border-b border-border last:border-b-0 hover:bg-white/[0.02] transition-colors"
              >
                <div className="col-span-5 text-sm">{m.label}</div>
                <div className="col-span-3 text-right text-sm font-medium text-gold">{m.ai}</div>
                <div className="col-span-3 text-right text-sm font-medium text-muted-foreground">{m.traditional}</div>
                <div
                  className={`col-span-1 text-right text-xs font-mono ${
                    m.positive ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {m.delta}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Reported by the brand&rsquo;s in-house Meta Ads Manager. Identical audience, placement,
            objective and budget across both sets. Names withheld under NDA.
          </p>
        </section>

        <section className="mx-auto max-w-3xl px-6 mt-24 space-y-16">
          <Block
            eyebrow="The brand"
            title="A premium skincare line with a tight margin"
            body="The brand sells a vitamin-C serum at ₹899 with a target ROAS of 3×. They had been running studio-shot UGC and lifestyle videos for six months. CPCs were drifting up, hook rates were dropping, and refreshing creative meant another month of pre-production."
          />
          <Block
            eyebrow="The test"
            title="Same offer, same spend, two creative philosophies"
            body="We built twelve AI-generated video variants — texture macros, ingredient cinematography, before/after sequences — using our usual workflow. The control was a single 30-second ad shot in a Bangalore studio with a model, makeup artist, gimbal operator and editor. Both sets ran for 30 days on Meta with ₹40,000 of spend each."
          />
          <Block
            eyebrow="What moved the needle"
            title="Hook rate, not just cost"
            body="The AI variants opened with extreme close-ups of the serum reacting on skin — visuals that would have been expensive and slow to film. Three-second view rate more than doubled, which pulled CPC down and ROAS up. The traditional ad looked great but lost the scroll in the first second; on Meta, that&rsquo;s the only second that matters."
          />
          <Block
            eyebrow="What we&rsquo;d do differently"
            title="AI for volume, studio for the hero shot"
            body="A pure-AI workflow won this test, but the highest-performing single variant blended an AI-generated opener with a real founder cut at the end. Going forward we&rsquo;re scripting hybrid creatives: AI for the first three seconds and the B-roll, founder/UGC for the proof and the CTA."
          />
        </section>

        <section className="mx-auto max-w-3xl px-6 mt-24">
          <div className="rounded-3xl glass p-8 sm:p-10 text-center">
            <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Want this for your brand?</div>
            <h2 className="mt-4 text-2xl md:text-3xl font-semibold tracking-tight">
              Cinematic AI ad creative, shipped in days.
            </h2>
            <p className="mt-4 text-sm text-muted-foreground max-w-lg mx-auto">
              We build AI video ads for consumer brands across supplements, skincare, perfumes and
              wellness. See packages or book a free discovery call.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/"
                hash="packages"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-medium text-primary-foreground hover:shadow-gold hover:-translate-y-0.5 transition-all"
              >
                View Packages
              </Link>
              <a
                href="https://wa.me/919008237225"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm font-medium hover:border-gold/30 transition-all"
              >
                Let's Talk →
              </a>
            </div>
          </div>
        </section>
      </article>

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}

function Block({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.3em] text-gold">{eyebrow}</div>
      <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-4 text-base text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}

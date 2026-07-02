import { SectionHeader } from "./SectionHeader";
import { Check } from "lucide-react";
import { waLink, waMessages } from "@/lib/whatsapp";

type Pkg = {
  name: string;
  tag: string;
  desc: string;
  features: string[];
  cta: string;
  message: string;
  highlighted?: boolean;
};

const packages: Pkg[] = [
  {
    name: "Starter",
    tag: "Test the waters",
    desc: "Perfect for brands testing our creative quality.",
    features: [
      "2 AI Ad Creatives",
      "2 Static Creatives",
      "Basic Creative Strategy",
      "1 Revision",
      "Delivery in 3–4 Working Days",
    ],
    cta: "Get Started",
    message: waMessages.starter,
  },
  {
    name: "Growth",
    tag: "Most Popular",
    desc: "Perfect for growing D2C brands.",
    features: [
      "10 AI Ad Creatives",
      "10 Static Creatives",
      "Creative Strategy",
      "Script Writing",
      "Storyboarding",
      "2 Revisions",
      "Priority Support",
    ],
    cta: "Request a Custom Quote",
    message: waMessages.growth,
    highlighted: true,
  },
  {
    name: "Scale",
    tag: "For active advertisers",
    desc: "Perfect for brands actively running Meta Ads.",
    features: [
      "15 AI Ad Creatives",
      "15 Static Creatives",
      "Advanced Creative Strategy",
      "Script Writing",
      "Storyboarding",
      "Monthly Creative Planning",
      "3 Revisions",
      "Priority Delivery",
    ],
    cta: "Discuss Your Brand",
    message: waMessages.scale,
  },
  {
    name: "Enterprise",
    tag: "High-volume partner",
    desc: "Perfect for high-growth brands and agencies.",
    features: [
      "25 AI Ad Creatives",
      "25 Static Creatives",
      "Complete Creative Strategy",
      "Script Writing",
      "Storyboarding",
      "Dedicated Creative Team",
      "White-label Production",
      "Priority Support",
    ],
    cta: "Let's Talk",
    message: waMessages.enterprise,
  },
];

const metaSetup = [
  "Pixel Setup",
  "Conversion Tracking",
  "Campaign Structure",
  "Audience Setup",
  "Business Manager Review",
  "Complete Account Audit",
];

const metaManagement = [
  "Campaign Management",
  "Weekly Optimization",
  "Audience Optimization",
  "Budget Management",
  "Creative Testing",
  "ROAS Monitoring",
  "Monthly Reports",
  "Strategy Recommendations",
];

export function Packages() {
  return (
    <section id="packages" className="py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Solutions"
          align="center"
          title={
            <>
              Find the right creative solution{" "}
              <span className="text-gradient-gold italic font-normal">for your brand.</span>
            </>
          }
          description="Whether you're launching your first product or scaling an established brand, we create custom AI-powered ad creatives tailored to your business goals."
        />

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch">
          {packages.map((p) => (
            <div
              key={p.name}
              className={`group relative rounded-[2rem] flex flex-col transition-all duration-500 ${
                p.highlighted
                  ? "bg-gradient-to-b from-surface-elevated via-surface to-background border border-gold/40 shadow-gold xl:-translate-y-3"
                  : "glass hover:-translate-y-1 hover:border-white/15"
              }`}
            >
              {p.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold text-primary-foreground text-[10px] font-semibold uppercase tracking-[0.2em] whitespace-nowrap">
                  ⭐ Most Popular
                </div>
              )}

              <div className="p-8">
                <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {p.name}
                </div>
                <div
                  className={`mt-6 text-2xl md:text-3xl font-semibold tracking-tight leading-tight ${
                    p.highlighted ? "text-gradient-gold" : ""
                  }`}
                >
                  {p.tag}
                </div>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed min-h-[3rem]">
                  {p.desc}
                </p>
              </div>

              <div className="hairline mx-8" />

              <div className="p-8 flex-1">
                <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-4">
                  You'll get
                </div>
                <ul className="space-y-3.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          p.highlighted ? "text-gold" : "text-foreground/70"
                        }`}
                        strokeWidth={2.5}
                      />
                      <span className="text-foreground/90 leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 pt-0">
                <a
                  href={waLink(p.message)}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex w-full justify-center items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-all ${
                    p.highlighted
                      ? "bg-gold text-primary-foreground hover:shadow-gold hover:-translate-y-0.5"
                      : "bg-white/5 text-foreground hover:bg-white/10 border border-border"
                  }`}
                >
                  {p.cta}
                  <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div className="mt-32 md:mt-40">
          <SectionHeader
            eyebrow="Add-ons"
            align="center"
            title={
              <>
                Meta Ads,{" "}
                <span className="text-gradient-gold italic font-normal">handled end-to-end.</span>
              </>
            }
            description="Optional services to launch and scale your ad account alongside your creative retainer."
          />

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
            <div className="rounded-[2rem] glass p-8 md:p-10 flex flex-col hover:-translate-y-1 hover:border-white/15 transition-all duration-500">
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Meta Ads Setup
              </div>
              <div className="mt-6 text-2xl md:text-3xl font-semibold tracking-tight">
                Launch or fix your ad account
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Perfect for brands launching or fixing Meta Ads.
              </p>

              <div className="hairline my-8" />

              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-4">
                Includes
              </div>
              <ul className="space-y-3.5 flex-1">
                {metaSetup.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={2.5} />
                    <span className="text-foreground/90 leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={waLink(waMessages.metaSetup)}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex w-full justify-center items-center gap-2 rounded-full bg-white/5 hover:bg-white/10 border border-border px-6 py-3.5 text-sm font-medium transition-all"
              >
                Enquire Now <span aria-hidden>→</span>
              </a>
            </div>

            <div className="rounded-[2rem] glass p-8 md:p-10 flex flex-col hover:-translate-y-1 hover:border-white/15 transition-all duration-500">
              <div className="flex items-center justify-between gap-3">
                <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  Meta Ads Management
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-gold border border-gold/30 bg-gold/10 rounded-full px-2.5 py-1 whitespace-nowrap">
                  Growth+ only
                </div>
              </div>
              <div className="mt-6 text-2xl md:text-3xl font-semibold tracking-tight">
                Scale spend, protect ROAS
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Available only for Growth, Scale and Enterprise clients.
              </p>

              <div className="hairline my-8" />

              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-4">
                Includes
              </div>
              <ul className="space-y-3.5 flex-1">
                {metaManagement.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={2.5} />
                    <span className="text-foreground/90 leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={waLink(waMessages.metaManagement)}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex w-full justify-center items-center gap-2 rounded-full bg-white/5 hover:bg-white/10 border border-border px-6 py-3.5 text-sm font-medium transition-all"
              >
                Discuss Your Requirements <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

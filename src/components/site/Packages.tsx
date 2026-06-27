import { SectionHeader } from "./SectionHeader";

type Pkg = {
  name: string;
  badge: string;
  price: string;
  period: string;
  desc: string;
  features: string[];
  bonus: string[];
  cta: string;
  highlighted?: boolean;
};

const packages: Pkg[] = [
  {
    name: "Launch",
    badge: "🚀",
    price: "₹12,999",
    period: "/ month",
    desc: "For brands shipping their first AI creative drop.",
    features: [
      "8 Performance-Focused AI Ad Creatives",
      "12 Performance Static Creatives",
      "Product Research",
      "Competitor Creative Research",
      "Creative Strategy",
      "Script Writing",
      "Storyboards",
      "AI UGC Videos",
      "AI Voiceovers",
      "2 Revisions",
    ],
    bonus: ["Instagram Post Scheduling", "Caption Writing", "Hashtag Strategy", "Feed Planning"],
    cta: "Book Launch Package",
  },
  {
    name: "Growth",
    badge: "📈",
    price: "₹19,999",
    period: "/ month",
    desc: "Our most popular plan for scaling brands.",
    features: [
      "14 Performance-Focused AI Ad Creatives",
      "18 Performance Static Creatives",
      "Product Research",
      "Competitor Research",
      "Creative Strategy",
      "Multiple Hook Variations",
      "Script Writing",
      "Storyboards",
      "AI UGC Videos",
      "AI Voiceovers",
      "Multi-language Creatives",
      "Priority Support",
      "3 Revisions",
    ],
    bonus: ["Instagram Post Scheduling", "Caption Writing", "Hashtag Strategy", "Monthly Content Calendar"],
    cta: "Book Growth Package",
    highlighted: true,
  },
  {
    name: "Scale",
    badge: "🚀",
    price: "₹29,999",
    period: "/ month",
    desc: "End-to-end creative partner for serious brands.",
    features: [
      "22 Performance-Focused AI Ad Creatives",
      "30 Performance Static Creatives",
      "Advanced Product Research",
      "Weekly Competitor Creative Analysis",
      "Creative Strategy",
      "Fresh Creative Concepts",
      "Hook Variations",
      "Script Writing",
      "Storyboards",
      "AI UGC Videos",
      "AI Voiceovers",
      "Multi-language Creatives",
      "Dedicated Creative Manager",
    ],
    bonus: [
      "Complete Instagram Page Management",
      "Post Scheduling",
      "Caption Writing",
      "Hashtag Strategy",
      "Feed Planning",
      "Monthly Content Calendar",
    ],
    cta: "Book Scale Package",
  },
];

export function Packages() {
  return (
    <section id="packages" className="py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Packages"
          align="center"
          title={<>Pricing built for <span className="text-gradient-gold italic font-normal">ambitious brands.</span></>}
          description="Transparent monthly retainers. No hidden fees. Cancel anytime."
        />

        <div className="mt-20 grid md:grid-cols-3 gap-5 items-start">
          {packages.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-[2rem] transition-all duration-500 flex flex-col ${
                p.highlighted
                  ? "bg-gradient-to-b from-surface-elevated via-surface to-background border border-gold/40 shadow-gold md:-translate-y-4"
                  : "glass hover:-translate-y-1 hover:border-white/15"
              }`}
            >
              {p.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold text-primary-foreground text-[10px] font-semibold uppercase tracking-[0.2em]">
                  Most Popular
                </div>
              )}

              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3">
                  <span className="text-2xl" aria-hidden>{p.badge}</span>
                  <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{p.name}</div>
                </div>

                <div className="mt-8 flex items-baseline gap-1.5">
                  <span className={`text-5xl md:text-6xl font-semibold tracking-tight ${p.highlighted ? "text-gradient-gold" : ""}`}>
                    {p.price}
                  </span>
                  <span className="text-sm text-muted-foreground">{p.period}</span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>

              <div className="hairline mx-8" />

              <div className="p-8 md:p-10 flex-1">
                <ul className="space-y-3.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                      <span className="text-foreground/90 leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-border">
                  <div className="text-xs uppercase tracking-[0.25em] text-gold mb-4">🎁 Complimentary</div>
                  <ul className="space-y-2.5">
                    {p.bonus.map((b) => (
                      <li key={b} className="text-xs text-muted-foreground leading-relaxed">{b}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-8 md:p-10 pt-0">
                <a
                  href="#contact"
                  className={`inline-flex w-full justify-center items-center gap-2 rounded-full px-6 py-4 text-sm font-medium transition-all ${
                    p.highlighted
                      ? "bg-gold text-primary-foreground hover:shadow-gold hover:-translate-y-0.5"
                      : "bg-white/5 text-foreground hover:bg-white/10 border border-border"
                  }`}
                >
                  {p.cta}
                  <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="relative rounded-3xl glass p-8 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className="h-14 w-14 rounded-2xl bg-gold/10 grid place-items-center text-gold text-xl shrink-0">+</div>
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Optional Add-on</div>
                <h3 className="mt-2 text-xl font-medium tracking-tight">Meta Ads Management</h3>
                <p className="mt-1 text-sm text-muted-foreground">Client pays ad spend separately.</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-3xl font-semibold tracking-tight text-gradient-gold">₹3,000</div>
              <div className="text-xs text-muted-foreground">/ month</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

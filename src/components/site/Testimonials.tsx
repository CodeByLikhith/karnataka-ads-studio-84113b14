import { SectionHeader } from "./SectionHeader";

const testimonials = [
  {
    quote: "The creative quality is genuinely unmatched. Our CTR jumped 3.2× in the first week of running their ads.",
    name: "Aanya Mehta",
    role: "Founder, Glow Ritual",
  },
  {
    quote: "We replaced our entire video team. The turnaround is fast, the output is cinematic, and the strategy is sharp.",
    name: "Rohan Sharma",
    role: "Head of Growth, Atlas Nutrition",
  },
  {
    quote: "Karnataka Ads Studio feels less like an agency and more like an in-house creative team that just gets it.",
    name: "Priya Iyer",
    role: "CMO, Maison Perfumes",
  },
  {
    quote: "Easily the best creative partner we've worked with. They obsess over the first second of every ad.",
    name: "Karthik Rao",
    role: "Founder, Wellbrew",
  },
];

export function Testimonials() {
  return (
    <section className="py-32 md:py-44 border-y border-border bg-surface/30">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Testimonials"
          align="center"
          title={<>What founders <span className="text-gradient-gold italic font-normal">are saying.</span></>}
        />

        <div className="mt-16 grid md:grid-cols-2 gap-5">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-3xl glass p-8 md:p-10 hover:bg-white/[0.07] transition-all">
              <div className="text-gold text-3xl leading-none">&ldquo;</div>
              <blockquote className="mt-4 text-lg md:text-xl leading-relaxed text-foreground/90">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gold/40 to-gold/10 grid place-items-center text-sm font-semibold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

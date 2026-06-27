import { SectionHeader } from "./SectionHeader";

const rows = [
  ["Production timeline", "4–8 weeks", "48–72 hours"],
  ["Cost per creative", "₹50k+", "From ₹3k"],
  ["Revisions", "Limited rounds", "Unlimited"],
  ["Creative variations", "1–2 final cuts", "Unlimited variants"],
  ["Creative strategy", "Add-on", "Included"],
  ["Scaling output", "Linear, expensive", "Instant, AI-native"],
];

export function WhyUs() {
  return (
    <section className="py-28 md:py-36 border-y border-border">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Why Karnataka Ads Studio"
          align="center"
          title={<>The new standard for <span className="text-gradient-gold italic font-normal">creative production.</span></>}
        />

        <div className="mt-16 rounded-3xl glass overflow-hidden">
          <div className="grid grid-cols-3 text-xs uppercase tracking-widest text-muted-foreground border-b border-border">
            <div className="p-6"> </div>
            <div className="p-6 text-center">Traditional Process</div>
            <div className="p-6 text-center bg-gold/5 text-gold">Karnataka Ads Studio</div>
          </div>
          {rows.map((r, i) => (
            <div key={i} className={`grid grid-cols-3 items-center text-sm ${i !== rows.length - 1 ? "border-b border-border" : ""}`}>
              <div className="p-6 font-medium">{r[0]}</div>
              <div className="p-6 text-center text-muted-foreground">{r[1]}</div>
              <div className="p-6 text-center bg-gold/5 text-foreground font-medium">{r[2]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { SectionHeader } from "./SectionHeader";
import processVideo from "@/assets/portfolio-14.mp4.asset.json";


const steps = [
  { n: "01", t: "Research", d: "We study your offer, audience and category leaders." },
  { n: "02", t: "Creative Strategy", d: "Hook angles, formats and messaging frameworks." },
  { n: "03", t: "Script Writing", d: "Tight, high-retention copy built around the first 3 seconds." },
  { n: "04", t: "Storyboard", d: "Frame-by-frame blueprint approved before production." },
  { n: "05", t: "AI Production", d: "Cinematic visuals generated and composed in our pipeline." },
  { n: "06", t: "Editing", d: "Sound design, color, motion polish — studio grade." },
  { n: "07", t: "Delivery", d: "Multiple variations sized for Meta, IG, TikTok and YouTube." },
];

export function Process() {
  return (
    <section className="py-32 md:py-44 border-y border-border bg-surface/30">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Process"
          align="center"
          title={<>A seven-step <span className="text-gradient-gold italic font-normal">creative engine.</span></>}
          description="Every project moves through the same proven path — from brief to scroll-stopping delivery."
        />

        <div className="mt-16 flex justify-center">
          <div className="relative w-full max-w-xs aspect-[9/16] rounded-3xl overflow-hidden border border-border shadow-elevated">
            <video
              src={processVideo.url}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/20 rounded-3xl" />
          </div>
        </div>

        <div className="mt-20 relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />
          <div className="space-y-12 md:space-y-20">
            {steps.map((s, i) => (
              <div key={s.n} className={`grid md:grid-cols-2 gap-6 md:gap-16 items-center ${i % 2 ? "md:[direction:rtl]" : ""}`}>
                <div className="[direction:ltr]">
                  <div className="glass rounded-3xl p-8 hover:bg-white/[0.07] transition-all">
                    <div className="text-xs font-mono text-gold tracking-widest">STEP {s.n}</div>
                    <h3 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight">{s.t}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                  </div>
                </div>
                <div className="hidden md:flex justify-center relative [direction:ltr]">
                  <div className="h-16 w-16 rounded-full bg-background border border-border grid place-items-center text-gold font-mono text-sm shadow-gold">
                    {s.n}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { SectionHeader } from "./SectionHeader";

const services = [
  { title: "AI Video Ads", desc: "Cinematic product films generated and edited end-to-end with AI.", num: "01" },
  { title: "AI UGC Videos", desc: "Authentic creator-style content at scale, no talent fees.", num: "02" },
  { title: "Performance Statics", desc: "Conversion-tested static creatives engineered for ROAS.", num: "03" },
  { title: "Creative Strategy", desc: "Hook-first messaging frameworks built around your offer.", num: "04" },
  { title: "Storyboards", desc: "Frame-by-frame visual blueprints before a pixel is rendered.", num: "05" },
  { title: "Script Writing", desc: "Scroll-stopping copy crafted for the first 3 seconds.", num: "06" },
  { title: "Meta Ad Creatives", desc: "Reels, stories and feed assets sized and shipped daily.", num: "07" },
  { title: "Instagram Creatives", desc: "Branded social drops that look like editorial, not ads.", num: "08" },
];

export function Services() {
  return (
    <section id="services" className="py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Services"
          title={<>Everything your brand needs <span className="text-gradient-gold italic font-normal">to win the scroll.</span></>}
          description="One studio, every creative output. We replace agencies, freelancers and edit suites with a single AI-native workflow."
        />

        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s) => (
            <article
              key={s.title}
              className="group relative rounded-3xl glass p-7 transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.07]"
            >
              <div className="text-xs font-mono text-gold/70 tracking-widest">{s.num}</div>
              <h3 className="mt-8 text-xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                   style={{ background: "radial-gradient(400px circle at var(--mx,50%) var(--my,0%), oklch(0.82 0.13 86 / 0.08), transparent 40%)" }} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

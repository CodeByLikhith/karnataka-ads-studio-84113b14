import v1 from "@/assets/portfolio-11.webm.asset.json";
import v2 from "@/assets/portfolio-9.mp4.asset.json";
import v3 from "@/assets/portfolio-13.webm.asset.json";
import { waLink, waMessages } from "@/lib/whatsapp";

export function Hero() {
  return (
    <section id="home" className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden">
      {/* Ambient gold glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[900px] rounded-full opacity-30 blur-[120px]"
             style={{ background: "radial-gradient(closest-side, oklch(0.82 0.13 86 / 0.6), transparent)" }} />
        <div className="absolute inset-0 opacity-[0.04]"
             style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 reveal">
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
              AI Creative Agency · For Consumer Brands
            </div>

            <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-[-0.04em] leading-[0.95]">
              Where products
              <br />
              become <span className="text-gradient-gold italic font-normal">scroll-stoppers.</span>
            </h1>

            <p className="mt-8 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
              We create premium AI-powered advertising creatives for modern consumer brands. From food &amp; beverage and beauty to wellness, pet care and lifestyle products, we help brands produce high-converting Meta, Instagram and TikTok creatives without the cost and time of traditional production.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={waLink(waMessages.hero)}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-4 text-sm font-medium text-primary-foreground transition-all hover:shadow-gold hover:-translate-y-0.5"
              >
                Let's Grow Your Brand
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 rounded-full glass px-7 py-4 text-sm font-medium text-foreground hover:bg-white/10 transition-all"
              >
                View Portfolio
              </a>
            </div>

            <div className="mt-14 flex items-center gap-8 text-xs text-muted-foreground">
              <div>
                <div className="text-2xl font-semibold text-foreground">120+</div>
                <div className="mt-1">Creatives shipped</div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <div className="text-2xl font-semibold text-foreground">48h</div>
                <div className="mt-1">Avg. turnaround</div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <div className="text-2xl font-semibold text-foreground">9×</div>
                <div className="mt-1">Faster than studio</div>
              </div>
            </div>
          </div>

          {/* Right side: animated stacked phone mockups */}
          <div className="lg:col-span-5 relative reveal" style={{ animationDelay: "200ms" }}>
            <div className="relative aspect-[4/5] max-w-md mx-auto">
              <PhoneCard src={v1.url} className="absolute left-0 top-8 w-[58%] rotate-[-8deg] z-10" preload="auto" />
              <PhoneCard src={v2.url} className="absolute right-0 top-0 w-[58%] rotate-[6deg] z-20" preload="auto" />
              <PhoneCard src={v3.url} className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[58%] z-30" preload="auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhoneCard({ src, className, preload = "metadata" }: { src: string; className?: string; preload?: "auto" | "metadata" | "none" }) {
  return (
    <div className={`group ${className}`}>
      <div className="relative rounded-[2rem] p-1.5 bg-gradient-to-b from-white/20 to-white/5 shadow-elevated">
        <div className="rounded-[1.7rem] overflow-hidden bg-black aspect-[9/16]">
          <video
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload={preload}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute top-3 left-1/2 -translate-x-1/2 h-1 w-12 rounded-full bg-black/70" />
      </div>
    </div>
  );
}

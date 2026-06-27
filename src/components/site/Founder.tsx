import founder from "@/assets/founder.png.asset.json";

export function Founder() {
  return (
    <section id="about" className="py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-6 rounded-[2.5rem] opacity-30 blur-2xl"
                   style={{ background: "radial-gradient(closest-side, oklch(0.82 0.13 86 / 0.7), transparent)" }} />
              <div className="relative rounded-[2rem] overflow-hidden border border-border bg-surface aspect-[3/4]">
                <img src={founder.url} alt="Likhith Gowda — Founder of Karnataka Ads Studio" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-xs uppercase tracking-widest text-gold">Founder</div>
                  <div className="mt-1 text-2xl font-semibold">Likhith Gowda</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground">
              <span className="h-1 w-1 rounded-full bg-gold" />
              Meet the Founder
            </div>
            <h2 className="mt-6 text-4xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1.02]">
              Obsessed with the craft of <span className="text-gradient-gold italic font-normal">scroll-stopping</span> creative.
            </h2>
            <div className="mt-8 space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Hi, I&rsquo;m Likhith. I started Karnataka Ads Studio with one belief — that consumer brands
                deserve world-class ad creative without the cost and timelines of a traditional shoot.
              </p>
              <p>
                Today we work with supplement, skincare and wellness founders across India and the US,
                producing the kind of cinematic, performance-driven creative that used to take weeks — in days.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="https://instagram.com/aiwithlikhith"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full glass px-5 py-3 text-sm hover:bg-white/10 hover:border-gold/30 transition-all"
              >
                <span className="h-2 w-2 rounded-full bg-gold" />
                @aiwithlikhith
                <span className="text-muted-foreground">on Instagram</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-primary-foreground hover:shadow-gold hover:-translate-y-0.5 transition-all"
              >
                Work with me →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

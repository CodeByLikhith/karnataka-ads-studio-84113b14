import { SectionHeader } from "./SectionHeader";
import { waLink, waMessages } from "@/lib/whatsapp";

const channels = [
  {
    label: "WhatsApp",
    value: "+91 90082 37225",
    href: waLink(waMessages.strategyCall),
    glyph: "✦",
  },
  {
    label: "Email",
    value: "founder@karnatakaadsstudio.in",
    href: "mailto:founder@karnatakaadsstudio.in",
    glyph: "✉",
  },
  {
    label: "Agency Instagram",
    value: "@karnataka.ads",
    href: "https://instagram.com/karnataka.ads",
    glyph: "◇",
  },
  {
    label: "Founder Instagram",
    value: "@aiwithlikhith",
    href: "https://instagram.com/aiwithlikhith",
    glyph: "◈",
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-32 md:py-44 border-t border-border">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <SectionHeader
          eyebrow="Let's talk"
          align="center"
          title={
            <>
              Let&rsquo;s create something{" "}
              <span className="text-gradient-gold italic font-normal">great together.</span>
            </>
          }
          description="Skip the forms. Message us on WhatsApp and we'll reply personally — usually within a few hours."
        />

        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={waLink(waMessages.strategyCall)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-medium text-primary-foreground transition-all hover:shadow-gold hover:-translate-y-0.5"
          >
            Start Your Project
            <span aria-hidden>→</span>
          </a>
          <a
            href="mailto:founder@karnatakaadsstudio.in"
            className="inline-flex items-center gap-2 rounded-full glass px-8 py-4 text-sm font-medium text-foreground hover:bg-white/10 transition-all"
          >
            Email us instead
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between rounded-2xl glass p-5 sm:p-6 hover:bg-white/[0.07] hover:border-gold/30 transition-all"
            >
              <div className="flex items-center gap-4 min-w-0">
                <span className="h-11 w-11 shrink-0 rounded-full bg-gold/10 text-gold grid place-items-center text-lg">
                  {c.glyph}
                </span>
                <div className="min-w-0 text-left">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    {c.label}
                  </div>
                  <div className="mt-1 text-sm font-medium truncate">{c.value}</div>
                </div>
              </div>
              <span className="text-muted-foreground group-hover:text-gold group-hover:translate-x-1 transition-all">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { SectionHeader } from "./SectionHeader";

const channels = [
  {
    label: "Email",
    value: "karnatakaadsstudio@gmail.com",
    href: "mailto:karnatakaadsstudio@gmail.com",
    glyph: "✉",
  },
  {
    label: "WhatsApp",
    value: "+91 90082 37225",
    href: "https://wa.me/919008237225",
    glyph: "✦",
  },
  {
    label: "Founder Instagram",
    value: "@aiwithlikhith",
    href: "https://instagram.com/aiwithlikhith",
    glyph: "◈",
  },
  {
    label: "Agency Instagram",
    value: "@karnataka.ads",
    href: "https://instagram.com/karnataka.ads",
    glyph: "◇",
  },
];

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="py-32 md:py-44 border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Contact"
          align="center"
          title={<>Let&rsquo;s build creative that <span className="text-gradient-gold italic font-normal">actually converts.</span></>}
          description="Tell us about your brand. We reply within 24 hours with examples from your category."
        />

        <div className="mt-20 grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-2xl glass p-6 hover:bg-white/[0.07] hover:border-gold/30 transition-all"
              >
                <div className="flex items-center gap-4">
                  <span className="h-12 w-12 rounded-full bg-gold/10 text-gold grid place-items-center text-lg">{c.glyph}</span>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{c.label}</div>
                    <div className="mt-1 text-sm font-medium">{c.value}</div>
                  </div>
                </div>
                <span className="text-muted-foreground group-hover:text-gold group-hover:translate-x-1 transition-all">→</span>
              </a>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="lg:col-span-3 rounded-3xl glass p-8 md:p-10 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Your name" name="name" placeholder="Likhith Gowda" />
              <Field label="Email" name="email" type="email" placeholder="you@brand.com" />
            </div>
            <Field label="Brand" name="brand" placeholder="Your brand name" />
            <div>
              <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Tell us about your project</label>
              <textarea
                required
                rows={5}
                placeholder="What's your category, current monthly ad spend, and what you'd like to produce?"
                className="mt-2 w-full rounded-2xl bg-background/60 border border-border px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full inline-flex justify-center items-center gap-2 rounded-full bg-gold px-6 py-4 text-sm font-medium text-primary-foreground transition-all hover:shadow-gold hover:-translate-y-0.5"
            >
              {sent ? "Thanks — we'll be in touch ✓" : "Send Inquiry →"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{label}</label>
      <input
        required
        {...rest}
        className="mt-2 w-full rounded-2xl bg-background/60 border border-border px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-all"
      />
    </div>
  );
}

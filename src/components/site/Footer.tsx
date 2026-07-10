import logo from "@/assets/logo.png.asset.json";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <img src={logo.url} alt="" className="h-10 w-10 rounded-lg ring-1 ring-white/10" />
              <div className="text-sm font-medium tracking-tight">
                Karnataka <span className="text-gradient-gold">Ads Studio</span>
              </div>
            </div>
            <p className="mt-6 text-sm text-muted-foreground max-w-xs leading-relaxed">
              Premium AI creative for consumer product brands. Where products become scroll-stoppers.
            </p>
          </div>

          <FooterCol title="Studio" links={[
            { l: "Portfolio", h: "#portfolio" },
            { l: "Packages", h: "#packages" },
            { l: "About", h: "#about" },
            { l: "Contact", h: "#contact" },
          ]} />
          <FooterCol title="Services" links={[
            { l: "AI Video Ads", h: "#services" },
            { l: "AI UGC", h: "#services" },
            { l: "Static Creatives", h: "#services" },
            { l: "Creative Strategy", h: "#services" },
          ]} />
          <FooterCol title="Connect" links={[
            { l: "@karnataka.ads", h: "https://instagram.com/karnataka.ads" },
            { l: "@aiwithlikhith", h: "https://instagram.com/aiwithlikhith" },
            { l: "WhatsApp", h: "https://wa.me/919008237225" },
            { l: "Email", h: "mailto:founder@karnatakaadsstudio.in" },
          ]} />
        </div>

        <div className="mt-20 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Karnataka Ads Studio. All rights reserved.</div>
          <div>Crafted by Likhith Gowda</div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { l: string; h: string }[] }) {
  return (
    <div className="md:col-span-2">
      <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{title}</div>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.l}>
            <a href={l.h} className="text-sm text-foreground/80 hover:text-gold transition-colors">{l.l}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

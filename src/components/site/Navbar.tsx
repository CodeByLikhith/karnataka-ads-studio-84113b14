import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import logo from "@/assets/logo.png.asset.json";

type NavItem = { label: string; hash?: string; to?: string };

const nav: NavItem[] = [
  { label: "Home", hash: "home" },
  { label: "Services", hash: "services" },
  { label: "Portfolio", hash: "portfolio" },
  { label: "Case Studies", to: "/case-studies" },
  { label: "Pricing", hash: "packages" },
  { label: "About", hash: "about" },
  { label: "Contact", hash: "contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const HashLink = ({ hash, children, onClick, className }: { hash: string; children: React.ReactNode; onClick?: () => void; className?: string }) => {
    if (onHome) {
      return (
        <a href={`#${hash}`} onClick={onClick} className={className}>
          {children}
        </a>
      );
    }
    return (
      <Link to="/" hash={hash} onClick={onClick} className={className}>
        {children}
      </Link>
    );
  };

  const linkCls = "px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-white/5";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`flex items-center justify-between rounded-full px-4 py-3 transition-all duration-500 ${
            scrolled ? "glass shadow-elevated" : ""
          }`}
        >
          <Link to="/" hash="home" className="flex items-center gap-3 group">
            <img src={logo.url} alt="Karnataka Ads Studio" className="h-9 w-9 rounded-lg ring-1 ring-white/10 transition-transform group-hover:scale-105" />
            <span className="hidden sm:block text-sm font-medium tracking-tight">
              Karnataka <span className="text-gradient-gold">Ads Studio</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {nav.map((n) =>
              n.to ? (
                <Link
                  key={n.label}
                  to={n.to}
                  className={linkCls}
                  activeProps={{ className: "px-4 py-2 text-sm text-foreground rounded-full bg-white/5" }}
                >
                  {n.label}
                </Link>
              ) : (
                <HashLink key={n.label} hash={n.hash!} className={linkCls}>
                  {n.label}
                </HashLink>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <HashLink
              hash="contact"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:shadow-gold hover:-translate-y-0.5"
            >
              Book Discovery Call
              <span aria-hidden>→</span>
            </HashLink>
            <button
              onClick={() => setOpen((o) => !o)}
              className="md:hidden h-10 w-10 grid place-items-center rounded-full glass"
              aria-label="Menu"
            >
              <span className="i-menu block h-4 w-4 relative">
                <span className={`absolute inset-x-0 top-1 h-px bg-foreground transition-transform ${open ? "translate-y-1 rotate-45" : ""}`} />
                <span className={`absolute inset-x-0 top-3 h-px bg-foreground transition-transform ${open ? "-translate-y-1 -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden mt-2 glass rounded-3xl p-4 reveal">
            {nav.map((n) =>
              n.to ? (
                <Link
                  key={n.label}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 text-sm text-foreground hover:text-gold transition-colors"
                >
                  {n.label}
                </Link>
              ) : (
                <HashLink
                  key={n.label}
                  hash={n.hash!}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 text-sm text-foreground hover:text-gold transition-colors"
                >
                  {n.label}
                </HashLink>
              ),
            )}
            <HashLink
              hash="contact"
              onClick={() => setOpen(false)}
              className="mt-2 block text-center rounded-full bg-gold px-5 py-3 text-sm font-medium text-primary-foreground"
            >
              Book Discovery Call
            </HashLink>
          </div>
        )}
      </div>
    </header>
  );
}

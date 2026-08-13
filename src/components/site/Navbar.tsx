import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { image } from "@/lib/media";
import { openBookACall } from "./BookACall";

type NavItem = { label: string; hash?: string; to?: string };

const nav: NavItem[] = [
  { label: "Home", hash: "home" },
  { label: "Services", hash: "services" },
  { label: "Portfolio", hash: "portfolio" },
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
          <Link to="/" hash="home" className="flex items-center group">
            <img
              src={image.logo}
              alt="Karnique"
              className="h-6 sm:h-7 w-auto object-contain transition-transform group-hover:scale-105"
            />
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
            <button
              type="button"
              onClick={openBookACall}
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:shadow-gold hover:-translate-y-0.5"
            >
              Book a Call
              <span aria-hidden>→</span>
            </button>
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
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openBookACall();
              }}
              className="mt-2 block w-full text-center rounded-full bg-gold px-5 py-3 text-sm font-medium text-primary-foreground"
            >
              Book a Call
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

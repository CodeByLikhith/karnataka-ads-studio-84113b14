import { SectionHeader } from "./SectionHeader";

type Industry = { name: string; tagline: string; illustration: React.ReactNode };

const stroke = "currentColor";

const Illustrations = {
  Supplements: (
    <svg viewBox="0 0 120 120" fill="none" className="h-full w-full">
      <defs>
        <linearGradient id="cap1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#F0D78C" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
      </defs>
      <rect x="36" y="22" width="48" height="76" rx="24" fill="url(#cap1)" opacity="0.18" />
      <rect x="36" y="22" width="48" height="38" rx="24" fill="url(#cap1)" />
      <rect x="36" y="60" width="48" height="38" rx="24" fill="#1a1a1a" stroke={stroke} strokeOpacity="0.2" />
      <circle cx="60" cy="76" r="2" fill="#D4AF37" />
      <circle cx="68" cy="84" r="1.5" fill="#D4AF37" opacity="0.6" />
      <circle cx="52" cy="86" r="1.5" fill="#D4AF37" opacity="0.6" />
    </svg>
  ),
  Skincare: (
    <svg viewBox="0 0 120 120" fill="none" className="h-full w-full">
      <defs>
        <linearGradient id="bot1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#F0D78C" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <rect x="40" y="36" width="40" height="64" rx="6" fill="url(#bot1)" stroke="#D4AF37" strokeOpacity="0.5" />
      <rect x="48" y="22" width="24" height="14" rx="2" fill="#D4AF37" />
      <line x1="46" y1="56" x2="74" y2="56" stroke="#D4AF37" strokeOpacity="0.4" />
      <text x="60" y="80" textAnchor="middle" fontSize="7" fill="#D4AF37" letterSpacing="2" fontFamily="serif">SERUM</text>
    </svg>
  ),
  Haircare: (
    <svg viewBox="0 0 120 120" fill="none" className="h-full w-full">
      <rect x="36" y="20" width="48" height="84" rx="8" fill="#1a1a1a" stroke="#D4AF37" strokeOpacity="0.4" />
      <rect x="42" y="14" width="36" height="10" rx="3" fill="#D4AF37" />
      <circle cx="60" cy="50" r="14" stroke="#D4AF37" strokeOpacity="0.5" />
      <path d="M50 50 Q60 40 70 50 Q60 60 50 50" fill="#D4AF37" opacity="0.3" />
      <line x1="44" y1="78" x2="76" y2="78" stroke="#D4AF37" strokeOpacity="0.3" />
      <line x1="48" y1="86" x2="72" y2="86" stroke="#D4AF37" strokeOpacity="0.2" />
    </svg>
  ),
  Perfumes: (
    <svg viewBox="0 0 120 120" fill="none" className="h-full w-full">
      <rect x="44" y="18" width="32" height="14" rx="2" fill="#D4AF37" />
      <rect x="50" y="32" width="20" height="8" fill="#D4AF37" opacity="0.6" />
      <path d="M38 40 L82 40 L78 100 Q60 108 42 100 Z" fill="#1a1a1a" stroke="#D4AF37" strokeOpacity="0.6" />
      <ellipse cx="60" cy="72" rx="14" ry="18" fill="#D4AF37" opacity="0.15" />
      <text x="60" y="76" textAnchor="middle" fontSize="6" fill="#D4AF37" letterSpacing="3" fontFamily="serif">PARFUM</text>
    </svg>
  ),
  "Health Drinks": (
    <svg viewBox="0 0 120 120" fill="none" className="h-full w-full">
      <path d="M42 28 L78 28 L74 102 Q60 108 46 102 Z" fill="#1a1a1a" stroke="#D4AF37" strokeOpacity="0.5" />
      <path d="M42 28 L78 28 L77 44 L43 44 Z" fill="#D4AF37" opacity="0.3" />
      <rect x="46" y="20" width="28" height="10" rx="2" fill="#D4AF37" />
      <path d="M48 60 Q60 56 72 60 L70 96 Q60 100 50 96 Z" fill="#D4AF37" opacity="0.2" />
      <circle cx="56" cy="74" r="1.5" fill="#D4AF37" opacity="0.7" />
      <circle cx="63" cy="82" r="1" fill="#D4AF37" opacity="0.5" />
    </svg>
  ),
  "Packaged Foods": (
    <svg viewBox="0 0 120 120" fill="none" className="h-full w-full">
      <path d="M30 36 L90 36 L84 104 L36 104 Z" fill="#1a1a1a" stroke="#D4AF37" strokeOpacity="0.5" />
      <path d="M30 36 L90 36 L86 50 L34 50 Z" fill="#D4AF37" opacity="0.4" />
      <path d="M44 36 Q50 24 60 24 Q70 24 76 36" stroke="#D4AF37" strokeWidth="1.2" fill="none" />
      <line x1="42" y1="68" x2="78" y2="68" stroke="#D4AF37" strokeOpacity="0.4" />
      <text x="60" y="82" textAnchor="middle" fontSize="7" fill="#D4AF37" letterSpacing="2" fontFamily="serif">GOURMET</text>
      <line x1="48" y1="92" x2="72" y2="92" stroke="#D4AF37" strokeOpacity="0.3" />
    </svg>
  ),
  Wellness: (
    <svg viewBox="0 0 120 120" fill="none" className="h-full w-full">
      <circle cx="60" cy="60" r="36" stroke="#D4AF37" strokeOpacity="0.4" />
      <circle cx="60" cy="60" r="24" stroke="#D4AF37" strokeOpacity="0.6" />
      <path d="M60 38 Q72 52 60 82 Q48 52 60 38" fill="#D4AF37" opacity="0.6" />
      <circle cx="60" cy="60" r="3" fill="#D4AF37" />
    </svg>
  ),
  "Consumer Brands": (
    <svg viewBox="0 0 120 120" fill="none" className="h-full w-full">
      <rect x="22" y="40" width="32" height="60" rx="3" fill="#1a1a1a" stroke="#D4AF37" strokeOpacity="0.5" />
      <rect x="58" y="28" width="22" height="72" rx="3" fill="#D4AF37" opacity="0.85" />
      <rect x="84" y="52" width="18" height="48" rx="3" fill="#1a1a1a" stroke="#D4AF37" strokeOpacity="0.5" />
      <circle cx="69" cy="48" r="4" fill="#1a1a1a" />
    </svg>
  ),
};

const industries: Industry[] = [
  { name: "Supplements", tagline: "Performance · Capsules · Powders", illustration: Illustrations.Supplements },
  { name: "Skincare", tagline: "Serums · Creams · Cleansers", illustration: Illustrations.Skincare },
  { name: "Haircare", tagline: "Oils · Shampoos · Treatments", illustration: Illustrations.Haircare },
  { name: "Perfumes", tagline: "Eau de Parfum · Attars", illustration: Illustrations.Perfumes },
  { name: "Health Drinks", tagline: "Functional · Hydration · Energy", illustration: Illustrations["Health Drinks"] },
  { name: "Packaged Foods", tagline: "Gourmet · Snacks · Pantry", illustration: Illustrations["Packaged Foods"] },
  { name: "Wellness", tagline: "Mind · Body · Ritual", illustration: Illustrations.Wellness },
  { name: "Consumer Brands", tagline: "D2C · Lifestyle · Retail", illustration: Illustrations["Consumer Brands"] },
];

export function Industries() {
  return (
    <section className="py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Industries"
          align="center"
          title={<>Built for <span className="text-gradient-gold italic font-normal">consumer product</span> brands.</>}
          description="We specialise in categories where visual craft drives conversion."
        />

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {industries.map((i, idx) => (
            <div
              key={i.name}
              className="group relative rounded-3xl overflow-hidden border border-border bg-surface/40 transition-all duration-700 hover:border-gold/30 hover:-translate-y-1"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-surface to-background">
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: "radial-gradient(circle at 50% 50%, oklch(0.82 0.13 86 / 0.12), transparent 60%)" }}
                />
                <div className="absolute inset-0 grid place-items-center p-10 transition-transform duration-700 group-hover:scale-110">
                  <div className="h-full w-full max-h-32 max-w-32 text-gold">{i.illustration}</div>
                </div>
              </div>
              <div className="p-6 border-t border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-medium tracking-tight">{i.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{i.tagline}</p>
                  </div>
                  <span className="text-muted-foreground group-hover:text-gold group-hover:translate-x-1 transition-all">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

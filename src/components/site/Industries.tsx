import { SectionHeader } from "./SectionHeader";

const industries = [
  { name: "Supplements", glyph: "◐" },
  { name: "Skincare", glyph: "◯" },
  { name: "Haircare", glyph: "◢" },
  { name: "Perfumes", glyph: "❖" },
  { name: "Wellness", glyph: "✦" },
  { name: "Health Drinks", glyph: "◈" },
  { name: "Packaged Foods", glyph: "▣" },
  { name: "Consumer Brands", glyph: "◇" },
];

export function Industries() {
  return (
    <section className="py-28 md:py-36 border-y border-border">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Industries"
          title={<>Built for <span className="text-gradient-gold italic font-normal">consumer product</span> brands.</>}
          description="We specialise in categories where visual craft drives conversion."
        />

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3">
          {industries.map((i) => (
            <div
              key={i.name}
              className="group relative rounded-2xl glass p-8 flex flex-col items-start gap-6 hover:bg-white/[0.07] transition-all duration-500"
            >
              <span className="text-3xl text-gold/80 group-hover:scale-110 group-hover:text-gold transition-all">
                {i.glyph}
              </span>
              <span className="text-sm font-medium tracking-tight">{i.name}</span>
              <span className="absolute top-5 right-5 h-1.5 w-1.5 rounded-full bg-border group-hover:bg-gold transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

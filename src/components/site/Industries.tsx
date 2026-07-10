import { SectionHeader } from "./SectionHeader";
import foodBev from "@/assets/cat-foods.jpg";
import beauty from "@/assets/cat-skincare.jpg";
import wellness from "@/assets/cat-wellness.jpg";
import petcare from "@/assets/cat-petcare.jpg";
import home from "@/assets/cat-home.jpg";
import baby from "@/assets/cat-baby.jpg";

const industries = [
  { name: "Food & Beverage", description: "Snacks, drinks, health foods & everyday consumables", image: foodBev },
  { name: "Beauty & Skincare", description: "Serums, creams, cosmetics & personal beauty", image: beauty },
  { name: "Health & Wellness", description: "Supplements, nutrition, self-care & lifestyle wellness", image: wellness },
  { name: "Pet Care", description: "Pet food, grooming, supplements & everyday pet essentials", image: petcare },
  { name: "Home & Lifestyle", description: "Candles, fragrances, décor & modern living essentials", image: home },
  { name: "Baby & Family", description: "Baby care, family wellness & everyday household products", image: baby },
];

export function Industries() {
  return (
    <section className="py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Industries"
          align="center"
          title={<>Industries We <span className="text-gradient-gold italic font-normal">Specialize In</span></>}
          description="Helping modern consumer brands create premium AI-powered creatives that capture attention and drive sales."
        />

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {industries.map((i) => (
            <article
              key={i.name}
              className="group relative rounded-[24px] overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-[0_30px_80px_-30px_rgba(242,201,76,0.35)]"
            >
              <div className="aspect-[4/5] relative overflow-hidden bg-black">
                <img
                  src={i.image}
                  alt={`${i.name} — premium product render`}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: "radial-gradient(circle at 50% 100%, rgba(242,201,76,0.18), transparent 65%)" }}
                />
                <div className="absolute inset-x-0 bottom-0 p-7 md:p-8">
                  <h3 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] leading-tight">{i.name}</h3>
                  <p className="mt-2 text-sm text-white/65 leading-relaxed max-w-xs">{i.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-muted-foreground">
          And other fast-growing consumer brands.
        </p>
      </div>
    </section>
  );
}

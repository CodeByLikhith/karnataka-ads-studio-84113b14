import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { getCaseStudy, caseStudies, type CaseStudy } from "@/components/site/case-studies-data";

const SITE = "https://karnataka-ads-studio.lovable.app";

export const Route = createFileRoute("/case-studies/$slug")({
  loader: ({ params }): { study: CaseStudy } => {
    const study = getCaseStudy(params.slug);
    if (!study) throw notFound();
    return { study };
  },
  head: ({ params, loaderData }) => {
    const study = loaderData?.study;
    const url = `${SITE}/case-studies/${params.slug}`;
    const title = study
      ? `${study.brand} ${study.industry} Case Study — ${study.typeLabel} | Karnataka Ads Studio`
      : "Case Study | Karnataka Ads Studio";
    const description = study
      ? `${study.industry} case study: ${study.brand} — ${study.shortDescription}`
      : "Case study by Karnataka Ads Studio.";
    const ogTitle = study ? `${study.brand} — ${study.title}` : title;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        ...(study
          ? [{ name: "keywords", content: `${study.industry} ads, ${study.brand}, ${study.creativeTypes.join(", ")}, AI ad creatives, case study` }]
          : []),
        { property: "og:title", content: ogTitle },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:site_name", content: "Karnataka Ads Studio" },
        ...(study ? [{ property: "article:section", content: study.industry }] : []),
        ...(study ? [{ property: "og:image", content: `${SITE}${study.cover}` }] : []),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: ogTitle },
        { name: "twitter:description", content: description },
        ...(study ? [{ name: "twitter:image", content: `${SITE}${study.cover}` }] : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: study
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: study.title,
                description: study.shortDescription,
                image: `${SITE}${study.cover}`,
                articleSection: study.industry,
                keywords: [study.industry, study.brand, ...study.creativeTypes].join(", "),
                author: { "@type": "Organization", name: "Karnataka Ads Studio" },
                publisher: { "@type": "Organization", name: "Karnataka Ads Studio" },
                mainEntityOfPage: url,
              }),
            },
          ]
        : undefined,
    };
  },
  notFoundComponent: () => (
    <main className="relative">
      <Navbar />
      <section className="pt-40 pb-32 text-center">
        <div className="mx-auto max-w-xl px-6">
          <div className="text-[10px] uppercase tracking-[0.3em] text-gold">404</div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">Case study not found</h1>
          <p className="mt-4 text-muted-foreground">The case study you&rsquo;re looking for doesn&rsquo;t exist.</p>
          <Link to="/case-studies" className="mt-8 inline-flex rounded-full bg-gold px-5 py-3 text-sm font-medium text-primary-foreground">
            View all case studies
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  ),
  errorComponent: ({ reset }) => (
    <main className="pt-40 pb-32 text-center">
      <p className="text-muted-foreground">Something went wrong.</p>
      <button onClick={reset} className="mt-4 rounded-full bg-gold px-4 py-2 text-sm text-primary-foreground">Retry</button>
    </main>
  ),
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const { study } = Route.useLoaderData() as { study: CaseStudy };
  const others = caseStudies.filter((c) => c.slug !== study.slug).slice(0, 3);

  return (
    <main className="relative">
      <Navbar />

      {/* Hero banner */}
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={study.cover}
            alt=""
            aria-hidden
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/85 to-background" />
        </div>
        <div className="mx-auto max-w-5xl px-6">
          <Link to="/case-studies" className="text-xs text-muted-foreground hover:text-gold transition-colors">
            ← All case studies
          </Link>
          <div className="mt-8 flex flex-wrap gap-2">
            <Tag>{study.industry}</Tag>
            {study.creativeTypes.map((t) => (
              <Tag key={t} tone="gold">{t}</Tag>
            ))}
          </div>
          <div className="mt-6 text-[10px] uppercase tracking-[0.3em] text-gold">{study.brand}</div>
          <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1.05]">
            {study.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            {study.shortDescription}
          </p>
        </div>
      </section>

      {/* Cover image */}
      <section className="mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-3xl border border-white/10">
          <img
            src={study.cover}
            alt={`${study.brand} hero`}
            width={1280}
            height={896}
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      {/* Overview / Challenge / Strategy */}
      <section className="mx-auto max-w-3xl px-6 mt-24 md:mt-32 space-y-16">
        <Block eyebrow="Project Overview" title="The brief" body={study.overview} />
        <Block eyebrow="The Challenge" title="What we were up against" body={study.challenge} />
        <Block eyebrow="Creative Strategy" title="How we approached it" body={study.strategy} />
      </section>

      {/* Final Creative Gallery */}
      <section className="mx-auto max-w-7xl px-6 mt-24 md:mt-32">
        <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Final Creative Gallery</div>
        <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">Selected frames from the campaign</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {study.gallery.map((src, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-white/10">
              <img
                src={src}
                alt={`${study.brand} creative ${i + 1}`}
                loading="lazy"
                width={1280}
                height={896}
                className="w-full h-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Results */}
      <section className="mx-auto max-w-5xl px-6 mt-24 md:mt-32">
        <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Results</div>
        <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
          What changed for the brand.
        </h2>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {study.results.map((m) => (
            <div
              key={m.label}
              className="rounded-3xl glass p-8 text-center"
            >
              <div className="text-4xl md:text-5xl font-semibold text-gradient-gold tracking-tight">{m.value}</div>
              <div className="mt-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{m.label}</div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">Indicative numbers from campaign reporting. Brand names used for illustration.</p>
      </section>

      {/* Testimonial */}
      <section className="mx-auto max-w-3xl px-6 mt-24 md:mt-32">
        <figure className="rounded-3xl glass p-10 md:p-14 text-center">
          <div className="text-gold text-5xl leading-none">&ldquo;</div>
          <blockquote className="mt-2 text-xl md:text-2xl font-medium tracking-tight leading-relaxed">
            {study.testimonial.quote}
          </blockquote>
          <figcaption className="mt-8 text-sm text-muted-foreground">
            <span className="text-foreground font-medium">{study.testimonial.name}</span> · {study.testimonial.role}
          </figcaption>
        </figure>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 mt-24 md:mt-32 mb-24 md:mb-32">
        <div className="rounded-3xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-10 md:p-14 text-center">
          <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Start Your Project</div>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
            Let&rsquo;s build your next campaign.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            We work with consumer brands across supplements, skincare, perfumes and wellness. Book a free discovery call.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              hash="contact"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-medium text-primary-foreground hover:shadow-gold hover:-translate-y-0.5 transition-all"
            >
              Start Your Project →
            </Link>
            <a
              href="https://wa.me/919008237225"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3.5 text-sm font-medium hover:border-gold/40 transition-all"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* More case studies */}
      {others.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 mb-32">
          <div className="text-[10px] uppercase tracking-[0.3em] text-gold">More Work</div>
          <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight">Other case studies</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {others.map((o) => (
              <Link
                key={o.slug}
                to="/case-studies/$slug"
                params={{ slug: o.slug }}
                className="group block"
              >
                <div className="overflow-hidden rounded-2xl border border-white/10 aspect-[4/3]">
                  <img src={o.cover} alt={o.brand} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="mt-4 text-[10px] uppercase tracking-[0.25em] text-gold">{o.industry}</div>
                <div className="mt-2 text-base font-medium group-hover:text-gold transition-colors">{o.title}</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}

function Block({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.3em] text-gold">{eyebrow}</div>
      <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-4 text-base text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}

function Tag({ children, tone }: { children: React.ReactNode; tone?: "gold" }) {
  const cls =
    tone === "gold"
      ? "border-gold/30 bg-gold/10 text-gold"
      : "border-white/10 bg-white/[0.04] text-muted-foreground";
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.2em] ${cls}`}>
      {children}
    </span>
  );
}

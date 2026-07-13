import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import HtmlLangSetter from "@/components/layout/HtmlLangSetter";
import JsonLd from "@/components/seo/JsonLd";
import { FEATURES } from "@/lib/content/features";

export const metadata = {
  title: "Features",
  description:
    "Discover the 8 features of Assistant Vie Canada in detail: financial management, AI assistant, projections, goals, security and more.",
  alternates: {
    canonical: "/en/features",
    languages: { fr: "/fonctionnalites", en: "/en/features" },
  },
};

export default function FeaturesPageEn() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: FEATURES.map((f, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: f.en.titre,
      description: f.en.description,
    })),
  };

  return (
    <main className="min-h-screen gradient-bg pt-[var(--header-height)]">
      <HtmlLangSetter lang="en" />
      <JsonLd data={jsonLd} />
      <SiteHeader locale="en" hrefFr="/fonctionnalites" hrefEn="/en/features" />
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <section className="text-center py-10 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Eight tools to steer your financial life
          </h1>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Each Assistant Vie Canada module answers a specific need. Here&apos;s how they work in
            practice.
          </p>
        </section>

        <nav
          aria-label="Feature navigation"
          className="pills-scroll flex flex-nowrap overflow-x-auto gap-2.5 pb-12 px-1 -mx-1"
        >
          {FEATURES.map((f) => (
            <a
              key={f.slugEn}
              href={`#${f.slugEn}`}
              className="flex-shrink-0 whitespace-nowrap rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition py-1.5 px-4 text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            >
              {f.en.titre}
            </a>
          ))}
        </nav>

        <div className="space-y-8 pb-16">
          {FEATURES.map((f) => (
            <section
              key={f.slugEn}
              id={f.slugEn}
              className="glass rounded-2xl p-6 md:p-8 scroll-mt-20"
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${f.color}22` }}
                >
                  <svg
                    className="w-7 h-7"
                    style={{ color: f.color }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {f.icon}
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">{f.en.titre}</h2>
                  <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">
                    {f.en.description}
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed opacity-90">
                    {f.en.descriptionLongue}
                  </p>
                </div>
              </div>
            </section>
          ))}
        </div>

        <section className="pb-16">
          <div className="glass rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to try it?</h2>
            <p className="text-[var(--color-text-secondary)] mb-8">
              Create your free account and start your first simulation in a few minutes.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                href="/register"
                className="link-button rounded-lg bg-[var(--color-primary)] hover:opacity-90 transition py-3 px-8 text-base font-semibold"
              >
                Try it now
              </Link>
              <Link
                href="/register"
                className="link-button rounded-lg bg-white/10 hover:bg-white/20 transition py-3 px-8 text-base font-semibold"
              >
                Run my first simulation
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

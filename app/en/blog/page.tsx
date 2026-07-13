import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import HtmlLangSetter from "@/components/layout/HtmlLangSetter";

export const metadata = {
  title: "Blog",
  description: "Advice and explanations about finance, immigration, studies and more in Canada.",
  alternates: { canonical: "/en/blog", languages: { fr: "/blog", en: "/en/blog" } },
};

// Les articles eux-mêmes ne sont pas encore traduits (13 articles à
// traduire, hors périmètre de cette passe "pages publiques"). Plutôt que
// d'afficher des titres français sous une interface anglaise (confus pour
// un visiteur anglophone), cette page reste honnête sur l'état actuel et
// renvoie vers le blog français.
export default function BlogPageEn() {
  return (
    <main className="min-h-screen gradient-bg pt-[var(--header-height)]">
      <HtmlLangSetter lang="en" />
      <SiteHeader locale="en" hrefFr="/blog" hrefEn="/en/blog" />
      <div className="max-w-2xl mx-auto px-6 md:px-10">
        <section className="text-center py-16 md:py-24">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">Blog</h1>
          <p className="text-[var(--color-text-secondary)] mb-8">
            Our blog articles are currently only available in French. An English version is on
            its way — in the meantime, you can read them in French below.
          </p>
          <Link
            href="/blog"
            className="link-button inline-block rounded-lg bg-[var(--color-primary)] hover:opacity-90 transition py-3 px-8 text-base font-semibold"
          >
            Browse the French blog
          </Link>
        </section>
      </div>
    </main>
  );
}

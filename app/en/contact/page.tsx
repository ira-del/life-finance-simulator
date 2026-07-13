import Link from "next/link";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import HtmlLangSetter from "@/components/layout/HtmlLangSetter";

export const metadata = {
  title: "Contact",
  description: "Contact the Assistant Vie Canada team.",
  alternates: { canonical: "/en/contact", languages: { fr: "/contact", en: "/en/contact" } },
};

export default function ContactPageEn() {
  return (
    <main className="min-h-screen gradient-bg p-6 md:p-10">
      <HtmlLangSetter lang="en" />
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Contact</h1>
          <div className="flex items-center gap-4">
            <LanguageSwitcher locale="en" hrefFr="/contact" hrefEn="/en/contact" />
            <Link
              href="/en"
              className="link-button rounded-lg bg-white/10 hover:bg-white/20 transition py-2 px-4 text-sm font-semibold"
            >
              ← Home
            </Link>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 md:p-8 space-y-6">
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            A question, an issue, a suggestion? Email us at{" "}
            <a
              href="mailto:contact@assistantvie.com"
              className="text-[var(--color-secondary)] hover:underline font-semibold"
            >
              contact@assistantvie.com
            </a>
            . Most common questions are also answered in our{" "}
            <Link href="/en/faq" className="text-[var(--color-secondary)] hover:underline">
              FAQ
            </Link>
            .
          </p>

          <div className="border-t border-white/10 pt-6">
            <p className="text-sm font-semibold text-[var(--color-primary)] mb-1">
              Typical response time
            </p>
            <p className="text-sm text-[var(--color-text-secondary)]">48 business hours.</p>
          </div>

          <div className="border-t border-white/10 pt-6">
            <p className="text-sm font-semibold text-[var(--color-primary)] mb-1">
              Question about your data?
            </p>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Head to the{" "}
              <Link href="/mes-donnees" className="text-[var(--color-secondary)] hover:underline">
                My Data
              </Link>{" "}
              page to view, download, or delete it directly.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

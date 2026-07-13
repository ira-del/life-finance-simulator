import Link from "next/link";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import HtmlLangSetter from "@/components/layout/HtmlLangSetter";

export const metadata = {
  title: "Legal Notice",
  description: "Legal information about Assistant Vie Canada.",
  alternates: {
    canonical: "/en/legal-notice",
    languages: { fr: "/mentions-legales", en: "/en/legal-notice" },
  },
};

export default function LegalNoticePageEn() {
  return (
    <main className="min-h-screen gradient-bg p-6 md:p-10">
      <HtmlLangSetter lang="en" />
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Legal Notice</h1>
          <div className="flex items-center gap-4">
            <LanguageSwitcher locale="en" hrefFr="/mentions-legales" hrefEn="/en/legal-notice" />
            <Link
              href="/en"
              className="link-button rounded-lg bg-white/10 hover:bg-white/20 transition py-2 px-4 text-sm font-semibold"
            >
              ← Home
            </Link>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 md:p-8 space-y-6 text-sm text-[var(--color-text-secondary)] leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">
              Publisher
            </h2>
            <p>
              Assistant Vie Canada is currently a personal project in development, not operated by
              a registered legal entity. This information will be updated once the service is
              formally incorporated.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">
              Hosting
            </h2>
            <p>
              The site is hosted by Vercel Inc. (340 S Lemon Ave #4133, Walnut, CA 91789, United
              States). The database and authentication are provided by Supabase.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">
              Intellectual property
            </h2>
            <p>
              All content, design, and code of Assistant Vie Canada is protected and may not be
              reproduced without authorization.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">
              Contact
            </h2>
            <p>
              For any question, email{" "}
              <a
                href="mailto:contact@assistantvie.com"
                className="text-[var(--color-secondary)] hover:underline"
              >
                contact@assistantvie.com
              </a>{" "}
              or visit our{" "}
              <Link href="/en/contact" className="text-[var(--color-secondary)] hover:underline">
                Contact
              </Link>{" "}
              page.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

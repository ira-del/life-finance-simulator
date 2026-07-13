import Link from "next/link";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import HtmlLangSetter from "@/components/layout/HtmlLangSetter";

export const metadata = {
  title: "Privacy Policy",
  description: "How Assistant Vie Canada collects, uses, and protects your personal data.",
  alternates: {
    canonical: "/en/privacy-policy",
    languages: { fr: "/confidentialite", en: "/en/privacy-policy" },
  },
};

export default function PrivacyPolicyPageEn() {
  return (
    <main className="min-h-screen gradient-bg p-6 md:p-10">
      <HtmlLangSetter lang="en" />
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <div className="flex items-center gap-4">
            <LanguageSwitcher locale="en" hrefFr="/confidentialite" hrefEn="/en/privacy-policy" />
            <Link
              href="/en"
              className="link-button rounded-lg bg-white/10 hover:bg-white/20 transition py-2 px-4 text-sm font-semibold"
            >
              ← Home
            </Link>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 md:p-8 space-y-6 text-sm text-[var(--color-text-secondary)] leading-relaxed">
          <p className="text-xs opacity-70">Last updated: July 2026</p>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">
              What data we collect
            </h2>
            <p>
              To provide you with personalized projections and advice, we retain: your profile
              (age, province, immigration status, family and professional situation), your
              financial situation (income, expenses, savings, debts, goals), your progress
              (badges, steps, score history), your conversations with the AI Assistant, and a log
              of important actions on your account (logins, changes).
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">
              Why we collect it
            </h2>
            <p>
              Solely to run the service: calculate your financial health score, generate your
              projections, personalize AI advice, and identify opportunities (benefits, tax
              credits) that genuinely apply to you. We do not sell or share your data for
              advertising purposes.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">
              Who your data is shared with
            </h2>
            <p>
              Your data is hosted by <strong>Supabase</strong> (database and authentication) and
              the site is deployed on <strong>Vercel</strong>. When you use an AI feature (advisor,
              assistant, opportunities, immigration), the relevant content is sent to{" "}
              <strong>Anthropic</strong> (the AI model provider) to generate a response. If you
              accept audience-measurement cookies, anonymized browsing data is sent to{" "}
              <strong>Google Analytics</strong>. None of this data is sold to third parties or
              used for advertising purposes.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">
              How your data is protected
            </h2>
            <p>
              All communications with the site are encrypted (HTTPS/TLS). Your password is never
              stored in plain text — it is hashed by Supabase Auth. Access to your data is
              restricted by database-level security rules (Row Level Security): no one other than
              you can read your information through the application.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">
              Cookies
            </h2>
            <p>
              We use only cookies essential to the site&apos;s operation (keeping you signed in),
              plus optional audience-measurement cookies (Google Analytics) that only load after
              you accept them in the cookie banner. No third-party advertising or tracking
              cookies are used.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">
              Your rights
            </h2>
            <p>
              You can view, download (as a PDF), or permanently delete all your data at any time
              from the{" "}
              <Link href="/mes-donnees" className="text-[var(--color-secondary)] hover:underline">
                My Data
              </Link>{" "}
              page. Account deletion is immediate and irreversible.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">
              Contact us
            </h2>
            <p>
              For any question about this policy, email{" "}
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

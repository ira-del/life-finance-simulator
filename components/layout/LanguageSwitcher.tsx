import Link from "next/link";

// Chaque page passe explicitement l'URL de son équivalent dans l'autre
// langue — plus simple et plus sûr qu'une table de correspondance centrale,
// vu que toutes les pages n'ont pas (encore) de traduction.
export default function LanguageSwitcher({
  locale,
  hrefFr,
  hrefEn,
}: {
  locale: "fr" | "en";
  hrefFr: string;
  hrefEn: string;
}) {
  return (
    <div className="flex items-center gap-1.5 text-xs font-semibold">
      <Link
        href={hrefFr}
        className={locale === "fr" ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition"}
        aria-current={locale === "fr" ? "true" : undefined}
      >
        FR
      </Link>
      <span className="text-[var(--color-text-secondary)] opacity-40">/</span>
      <Link
        href={hrefEn}
        className={locale === "en" ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition"}
        aria-current={locale === "en" ? "true" : undefined}
      >
        EN
      </Link>
    </div>
  );
}

import Link from "next/link";

// Wordmark simple en attendant un vrai logo designé — le point coloré fait
// office d'accent de marque minimal sans être un faux logo générique.
export default function Logo({
  className = "",
  href = "/",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link href={href} className={`inline-flex items-center gap-2 ${className}`}>
      <span
        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: "var(--color-primary)" }}
        aria-hidden="true"
      />
      <span className="font-bold tracking-tight">Assistant Vie Canada</span>
    </Link>
  );
}

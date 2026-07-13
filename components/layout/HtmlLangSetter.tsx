"use client";

import { useEffect } from "react";

// Le layout racine ne rend qu'un seul <html lang="fr"> pour tout le site —
// il persiste tel quel lors des navigations client (App Router). Les pages
// publiques anglaises (et leurs équivalents français) corrigent cet
// attribut au montage pour rester correctes en accessibilité et en SEO.
export default function HtmlLangSetter({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
}

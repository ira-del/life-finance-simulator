"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Analytics } from "@/lib/analytics/events";

// Certaines actions (connexion, inscription, déconnexion, fin d'onboarding)
// se terminent par une redirection serveur — impossible d'appeler gtag()
// depuis le serveur. Ces actions ajoutent donc ?event=xxx à l'URL de
// redirection ; ce composant global lit ce paramètre au montage, déclenche
// l'événement GA correspondant, puis nettoie l'URL.
const EVENEMENTS_CONNUS: Record<string, () => void> = {
  login: Analytics.connexion,
  signup: Analytics.inscription,
  logout: Analytics.deconnexion,
  onboarding_complete: Analytics.onboardingTermine,
  goal_added: Analytics.objectifAjoute,
  goal_deleted: Analytics.objectifSupprime,
};

export default function EventFromQuery() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const brut = searchParams.get("event");
    if (!brut) return;

    for (const nom of brut.split(",")) {
      EVENEMENTS_CONNUS[nom]?.();
    }

    const params = new URLSearchParams(searchParams.toString());
    params.delete("event");
    const reste = params.toString();
    router.replace(reste ? `${pathname}?${reste}` : pathname, { scroll: false });
    // On ne veut relancer cet effet que si le paramètre "event" change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return null;
}

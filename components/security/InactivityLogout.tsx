"use client";

import { useEffect, useRef } from "react";
import { logout } from "@/app/actions/auth";

const MINUTES_INACTIVITE = 30;
const EVENEMENTS = ["mousemove", "keydown", "click", "scroll", "touchstart"] as const;

// Déconnecte automatiquement après une longue période d'inactivité — limite
// le risque si l'utilisateur laisse une session ouverte sur un appareil
// partagé ou public. Ne rend rien à l'écran, juste un minuteur en arrière-plan.
export default function InactivityLogout() {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function resetTimer() {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        logout();
      }, MINUTES_INACTIVITE * 60 * 1000);
    }

    EVENEMENTS.forEach((e) => window.addEventListener(e, resetTimer));
    resetTimer();

    return () => {
      EVENEMENTS.forEach((e) => window.removeEventListener(e, resetTimer));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return null;
}

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/actions/auth";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Si personne n'est connecté, on renvoie vers la page de connexion
  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen gradient-bg flex items-center justify-center p-6">
      <div className="glass rounded-2xl p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4">
          Tableau de bord
        </h1>
        <p className="text-[var(--color-text-secondary)] mb-2">
          Bienvenue !
        </p>
        <p className="text-sm text-[var(--color-text-secondary)] mb-8">
          Connecté en tant que <span className="text-[var(--color-primary)]">{user.email}</span>
        </p>

        <form action={logout}>
          <button
            type="submit"
            className="rounded-lg bg-white/10 hover:bg-white/20 transition py-2 px-6 font-semibold"
          >
            Se déconnecter
          </button>
        </form>
      </div>
    </main>
  );
}
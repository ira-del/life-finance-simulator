import { createClient } from "@/lib/supabase/server";
import OnboardingFinancesClient from "./FinancesForm";

export default async function OnboardingFinancesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let finances = null;
  if (user) {
    const { data } = await supabase
      .from("financial_profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();
    finances = data;
  }

  return <OnboardingFinancesClient finances={finances} />;
}
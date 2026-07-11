import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Ce client est utilisé côté serveur (Server Components, API routes)
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Cette erreur peut être ignorée si le middleware
            // rafraîchit déjà les sessions utilisateur
          }
        },
      },
    }
  )
}
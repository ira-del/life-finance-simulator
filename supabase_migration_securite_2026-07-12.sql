-- Rate-limiting sur connexion/inscription (en plus de la limite native
-- de Supabase Auth). L'email n'est jamais stocké en clair (hashé côté app
-- avant l'insertion) car cette table est accessible avec la clé anon,
-- nécessaire puisqu'on vérifie AVANT que l'utilisateur soit authentifié.
create table login_attempts (
  id uuid primary key default gen_random_uuid(),
  identifier_hash text not null,
  action text not null,
  success boolean not null,
  created_at timestamptz default now() not null
);

alter table login_attempts enable row level security;

create policy "Anyone can log an attempt (rate limiting checkpoint)"
  on login_attempts for insert
  to anon, authenticated
  with check (true);

create policy "Anyone can read attempts (rate limiting checkpoint)"
  on login_attempts for select
  to anon, authenticated
  using (true);

create index login_attempts_lookup_idx on login_attempts (identifier_hash, action, created_at);

-- Journal d'activité du compte (connexion, modification de profil,
-- changement de mot de passe, export/suppression de données, etc.)
create table activity_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  action text not null,
  description text,
  created_at timestamptz default now() not null
);

alter table activity_log enable row level security;

create policy "Users can view their own activity log"
  on activity_log for select
  using (auth.uid() = user_id);

create policy "Users can insert their own activity log"
  on activity_log for insert
  with check (auth.uid() = user_id);

create index activity_log_user_created_idx on activity_log (user_id, created_at desc);

-- ============================================================================
--  Admin paneli — kullanıcı listesi + lisans talepleri (app_users + auth.users)
-- ============================================================================
--  Eski profiles/user_states silindiği için admin panelinin "Kullanıcılar" ve
--  "Lisans Talepleri" sekmeleri boştu. Bu RPC app_users + auth.users'ı birleştirip
--  is_admin kontrolüyle döndürür.
--
--  ⚠️ Bu liste e-posta + lisans anahtarı içerdiği için OTURUM ŞART (is_admin).
--     Localde de gerçek giriş yapman gerekir (artık e-posta+parola, kolay).
--
--  Supabase → SQL Editor → RUN.
-- ============================================================================

create or replace function public.admin_users()
returns table (
  id uuid, username text, display_name text, email text, avatar_color text,
  profile_photo text, xp int, streak int, hearts int, completed_lessons jsonb,
  coins int, licence_key text, last_seen_at timestamptz, created_at timestamptz
)
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'yetkisiz'; end if;
  return query
    select a.id, a.username, a.display_name, u.email::text, a.avatar_color,
           a.profile_photo, a.xp, a.streak, a.hearts, a.completed_lessons,
           a.coins, a.licence_key, a.last_seen_at, a.created_at
    from public.app_users a
    left join auth.users u on u.id = a.id
    order by a.created_at desc;
end $$;

grant execute on function public.admin_users() to authenticated;

-- admin_counts: lisans talebi sayısını da ekle
create or replace function public.admin_counts()
returns jsonb
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then return jsonb_build_object('reports', 0, 'feedback', 0, 'requests', 0); end if;
  return jsonb_build_object(
    'reports',  (select count(*) from public.question_reports),
    'feedback', (select count(*) from public.general_feedback),
    'requests', (select count(*) from public.app_users where licence_key = 'REQUESTED')
  );
end $$;

grant execute on function public.admin_counts() to authenticated;

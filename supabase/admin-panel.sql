-- ============================================================================
--  Admin paneli — hata bildirimleri + geri bildirimler (RLS-güvenli)
-- ============================================================================
--  question_reports / general_feedback RLS ile kilitli (FAZ 1). Admin panelinin
--  bunları okuyup silebilmesi için: admin_uids tablosuna kayıtlı auth.uid()'e
--  izin veren SECURITY DEFINER RPC'ler.
--
--  ⚠️ Admin panelini localde açsan bile GERÇEK giriş yapmış olman şart
--     (e-posta ile). Sadece "Admin" kısayolu Supabase oturumu açmıyor.
--
--  Supabase → SQL Editor → yapıştır → RUN.
-- ============================================================================

create table if not exists public.admin_uids (
  uid uuid primary key references auth.users(id) on delete cascade
);
alter table public.admin_uids enable row level security;  -- politika yok = kilitli

-- Kendi hesabını admin yap (id = auth.users'daki id'n):
insert into public.admin_uids (uid)
  values ('b7f4f996-1029-4e1f-a04e-6a4488d2da69')
  on conflict do nothing;

create or replace function public.is_admin()
returns boolean
language sql security definer stable set search_path = public
as $$ select exists (select 1 from public.admin_uids where uid = auth.uid()) $$;

-- ── Okuma ────────────────────────────────────────────────────────────────────
create or replace function public.admin_reports()
returns setof public.question_reports
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'yetkisiz'; end if;
  return query select * from public.question_reports order by created_at desc;
end $$;

create or replace function public.admin_feedback()
returns setof public.general_feedback
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'yetkisiz'; end if;
  return query select * from public.general_feedback order by created_at desc;
end $$;

create or replace function public.admin_counts()
returns jsonb
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then return jsonb_build_object('reports', 0, 'feedback', 0); end if;
  return jsonb_build_object(
    'reports',  (select count(*) from public.question_reports),
    'feedback', (select count(*) from public.general_feedback)
  );
end $$;

-- ── Silme ────────────────────────────────────────────────────────────────────
create or replace function public.admin_delete_report(p_id text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'yetkisiz'; end if;
  delete from public.question_reports where id::text = p_id;
end $$;

create or replace function public.admin_clear_reports()
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'yetkisiz'; end if;
  delete from public.question_reports where true;
end $$;

create or replace function public.admin_delete_feedback(p_id text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'yetkisiz'; end if;
  delete from public.general_feedback where id::text = p_id;
end $$;

create or replace function public.admin_clear_feedback()
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'yetkisiz'; end if;
  delete from public.general_feedback where true;
end $$;

grant execute on function public.is_admin()                 to authenticated;
grant execute on function public.admin_reports()            to authenticated;
grant execute on function public.admin_feedback()           to authenticated;
grant execute on function public.admin_counts()             to authenticated;
grant execute on function public.admin_delete_report(text)  to authenticated;
grant execute on function public.admin_clear_reports()      to authenticated;
grant execute on function public.admin_delete_feedback(text) to authenticated;
grant execute on function public.admin_clear_feedback()     to authenticated;

-- Başka birini admin yapmak:  insert into public.admin_uids (uid) values ('<uid>');
-- Admin listesi:               select * from public.admin_uids;

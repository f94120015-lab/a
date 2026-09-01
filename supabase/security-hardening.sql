-- ============================================================================
--  amok — Supabase güvenlik sertleştirmesi
-- ============================================================================
--  Sorun: RLS tüm tablolarda kapalı. Herkese açık anon anahtarıyla:
--    • profiles         → tüm e-posta / telefon / password_hash okunabiliyor
--    • user_states       → tüm licence_key / licence_devices okunabiliyor
--    • question_reports  → tüm raporlar + ekran görüntüleri okunabiliyor
--    • anon PATCH/DELETE  → herhangi biri tüm kullanıcı tabanını silebilir
--
--  Nasıl çalıştırılır: Supabase Dashboard → SQL Editor → New query →
--  aşağıdaki bölümü yapıştır → RUN. Bölümleri SIRAYLA çalıştır.
--
--  ⚠ Tablo/sütun adlarını kendi şemanla doğrula (Table Editor). Bu dosya
--  gözlemlenen adlara göre yazıldı: profiles, user_states, question_reports,
--  general_feedback, friends.
-- ============================================================================


-- ============================================================================
--  FAZ 0 — Sıfır risk, hemen çalıştır. Uygulamayı HİÇ etkilemez.
-- ============================================================================
--  password_hash bir dummy sabit ("phone-auth-no-password" SHA-256'sı); telefon
--  /OTP auth kullanıldığı için işlevsiz. Yine de herkese servis ediliyor.

alter table public.profiles drop column if exists password_hash;


-- ============================================================================
--  FAZ 1 — Toplu silmeyi ve rapor/geri-bildirim toplamayı durdurur.
--          Uygulama son kullanıcı akışları için %100 çalışmaya devam eder.
--          KAYBEDİLEN: uygulama içi admin panelinden rapor/geri bildirim
--          okuma-silme. (Bunları Supabase Dashboard → Table Editor'den yönet.)
-- ============================================================================

-- ---- question_reports: kullanıcı yalnızca EKLER ----
alter table public.question_reports enable row level security;
drop policy if exists anon_insert_question_reports on public.question_reports;
create policy anon_insert_question_reports
  on public.question_reports for insert to anon with check (true);
revoke select, update, delete on public.question_reports from anon;

-- ---- general_feedback: kullanıcı yalnızca EKLER ----
alter table public.general_feedback enable row level security;
drop policy if exists anon_insert_general_feedback on public.general_feedback;
create policy anon_insert_general_feedback
  on public.general_feedback for insert to anon with check (true);
revoke select, update, delete on public.general_feedback from anon;

-- ---- friends: kimse toplu silemesin ----
alter table public.friends enable row level security;
drop policy if exists anon_rw_friends on public.friends;
create policy anon_rw_friends
  on public.friends for select to anon using (true);
drop policy if exists anon_insert_friends on public.friends;
create policy anon_insert_friends
  on public.friends for insert to anon with check (true);
revoke delete, update on public.friends from anon;

-- ---- profiles / user_states: TOPLU SİLMEYİ engelle ----
--  (okuma/yazma bu fazda hâlâ açık — e-posta/telefon/licence sızıntısı
--   FAZ 2'de kapanır, ama o kod değişikliği de ister.)
revoke delete on public.profiles     from anon;
revoke delete on public.user_states  from anon;

alter table public.profiles     enable row level security;
alter table public.user_states  enable row level security;

drop policy if exists anon_select_profiles on public.profiles;
drop policy if exists anon_insert_profiles on public.profiles;
drop policy if exists anon_update_profiles on public.profiles;
create policy anon_select_profiles on public.profiles for select to anon using (true);
create policy anon_insert_profiles on public.profiles for insert to anon with check (true);
create policy anon_update_profiles on public.profiles for update to anon using (true) with check (true);

drop policy if exists anon_select_user_states on public.user_states;
drop policy if exists anon_insert_user_states on public.user_states;
drop policy if exists anon_update_user_states on public.user_states;
create policy anon_select_user_states on public.user_states for select to anon using (true);
create policy anon_insert_user_states on public.user_states for insert to anon with check (true);
create policy anon_update_user_states on public.user_states for update to anon using (true) with check (true);

-- FAZ 1 sonrası kontrol (0 satır dönmeli / hata vermeli):
--   delete from public.profiles where username = '___yok___';   -> "permission denied" beklenir


-- ============================================================================
--  FAZ 2 — E-posta / telefon / licence_key sızıntısını kapatır.
--  ⚠ Bu bölüm TEK BAŞINA uygulamayı bozar. Önce app.js'te ilgili sorguların
--    aşağıdaki görünümlere / RPC'ye taşınması gerekir (kod tarafını ben
--    yapacağım). Kod hazır olmadan ÇALIŞTIRMA.
-- ============================================================================

-- create or replace view public.public_leaderboard as
--   select us.username, us.xp, us.streak, us.avatar_color,
--          us.completed_lessons, us.last_seen_at,
--          p.display_name, p.first_name, p.last_name, p.profile_photo
--   from public.user_states us
--   left join public.profiles p on p.username = us.username;
-- grant select on public.public_leaderboard to anon;
--
-- -- Giriş sırasında e-posta/telefondan username çözer, PII döndürmez:
-- create or replace function public.resolve_login(p_email text, p_phone text)
--   returns text language sql security definer set search_path = public as $$
--     select username from public.profiles
--     where (p_email is not null and email = p_email)
--        or (p_phone is not null and phone = p_phone)
--     limit 1
--   $$;
-- grant execute on function public.resolve_login(text, text) to anon;
--
-- -- Ham tablo okumasını anon'dan tamamen al:
-- revoke select on public.profiles    from anon;
-- revoke select on public.user_states from anon;
-- drop policy if exists anon_select_profiles    on public.profiles;
-- drop policy if exists anon_select_user_states on public.user_states;


-- ============================================================================
--  FAZ 3 — Kimlik taklidini / puan hilesini kapatır (gerçek çözüm).
--  Uygulama Supabase Auth oturumunu (auth.uid()) kullanmalı; satırlar
--  auth.users'a bağlanmalı. Bu bir mimari değişiklik — ayrı planlanacak.
-- ============================================================================

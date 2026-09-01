-- ============================================================================
--  İSTİSNA — localhost admin paneli raporları oturumsuz okuyabilsin
-- ============================================================================
--  question_reports + general_feedback: anon OKUYABİLİR.
--  Yazma yok, SİLME yok — kimse dışarıdan raporları silemez/bozamaz.
--  Diğer tablolar (app_users, licences, profiles) etkilenmez.
--
--  Bedeli: anon anahtarını bilen biri tüm hata bildirimlerini + geri bildirimleri
--  + ekran görüntülerini çekebilir. Gerçek kullanıcı akınından önce kabul edilebilir.
--
--  Supabase → SQL Editor → RUN.
-- ============================================================================

grant select on public.question_reports to anon;
grant select on public.general_feedback to anon;

drop policy if exists anon_read_question_reports on public.question_reports;
create policy anon_read_question_reports
  on public.question_reports for select to anon using (true);

drop policy if exists anon_read_general_feedback on public.general_feedback;
create policy anon_read_general_feedback
  on public.general_feedback for select to anon using (true);

-- Not: INSERT politikaları (kullanıcı rapor gönderebilsin) duruyor.
--      UPDATE / DELETE hâlâ yok → yalnızca admin RPC'leri (is_admin) silebilir,
--      ya da Supabase Dashboard'dan silersin.

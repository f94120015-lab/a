-- ============================================================================
--  Lisans sistemi v2 — sunucu doğrulamalı (imza/sır yok, taklit edilemez)
-- ============================================================================
--  Sen kodları licences tablosuna eklersin (Table Editor veya bu editör).
--  Uygulama redeem_licence RPC ile kullanır; doğrulama tamamen sunucuda.
--  Supabase Dashboard → SQL Editor → yapıştır → RUN.
-- ============================================================================

create table if not exists public.licences (
  code         text primary key,                       -- kullanıcıya verdiğin kod (BÜYÜK harf tut)
  label        text,                                    -- notun: kime/nereden verdin
  expires_at   date not null,                           -- son geçerlilik günü
  active       boolean not null default true,           -- iptal için false yap
  bound_to     uuid references auth.users(id),          -- ilk kullanan hesaba kilitlenir
  bound_email  text,
  redeemed_at  timestamptz,
  created_at   timestamptz default now()
);

alter table public.licences enable row level security;
-- Politika YOK = anon/authenticated doğrudan okuyamaz/yazamaz. Sadece RPC üzerinden.

-- ── Kod kullan ───────────────────────────────────────────────────────────────
create or replace function public.redeem_licence(p_code text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid   uuid := auth.uid();
  v_email text;
  v_lic   public.licences%rowtype;
begin
  if v_uid is null then
    return jsonb_build_object('ok', false, 'error', 'Giriş yapmalısınız.');
  end if;

  select email into v_email from auth.users where id = v_uid;

  select * into v_lic from public.licences
    where code = upper(trim(p_code)) for update;

  if not found then
    return jsonb_build_object('ok', false, 'error', 'Geçersiz lisans kodu.');
  end if;
  if not v_lic.active then
    return jsonb_build_object('ok', false, 'error', 'Bu lisans iptal edilmiş.');
  end if;
  if v_lic.expires_at < current_date then
    return jsonb_build_object('ok', false, 'error', 'Lisansın süresi dolmuş.');
  end if;
  if v_lic.bound_to is not null and v_lic.bound_to <> v_uid then
    return jsonb_build_object('ok', false, 'error', 'Bu lisans başka bir hesaba tanımlı.');
  end if;

  if v_lic.bound_to is null then
    update public.licences
      set bound_to = v_uid, bound_email = v_email, redeemed_at = now()
      where code = v_lic.code;
  end if;

  update public.app_users set licence_key = v_lic.code where id = v_uid;

  return jsonb_build_object('ok', true, 'expires_at', v_lic.expires_at);
end;
$$;

grant execute on function public.redeem_licence(text) to authenticated;

-- ── Premium durumu (girişte kontrol) ─────────────────────────────────────────
create or replace function public.my_licence_status()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_key text;
  v_lic public.licences%rowtype;
begin
  if v_uid is null then return jsonb_build_object('premium', false); end if;
  select licence_key into v_key from public.app_users where id = v_uid;
  if v_key is null or v_key = 'REQUESTED' then return jsonb_build_object('premium', false); end if;

  select * into v_lic from public.licences where code = v_key;
  if not found or not v_lic.active or v_lic.expires_at < current_date
     or (v_lic.bound_to is not null and v_lic.bound_to <> v_uid) then
    -- artık geçerli değil → app_users'tan temizle
    update public.app_users set licence_key = null where id = v_uid and licence_key = v_key;
    return jsonb_build_object('premium', false);
  end if;

  return jsonb_build_object('premium', true, 'expires_at', v_lic.expires_at);
end;
$$;

grant execute on function public.my_licence_status() to authenticated;


-- ============================================================================
--  KULLANIM — yeni lisans ver:
-- ============================================================================
--  insert into public.licences (code, label, expires_at) values
--    ('AMOK-2027-ABCD-1234', 'Ahmet Y. / instagram', '2027-06-01');
--
--  İptal et:        update public.licences set active = false where code = '...';
--  Süre uzat:       update public.licences set expires_at = '2028-01-01' where code = '...';
--  Kime bağlı gör:  select code, label, bound_email, expires_at, active from public.licences;
--
--  Kod formatı serbest — rastgele, tahmin edilmesi zor bir şey seç (kripto gerekmez,
--  çünkü sadece tabloda varsa çalışır). Hep BÜYÜK harf gir.
-- ============================================================================

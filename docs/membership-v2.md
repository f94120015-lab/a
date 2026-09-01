# Üyelik v2 — Google + E-posta Linki + Misafir (FAZ 3)

Amaç: `username` ile eşleşen, sunucu yetkisi olmayan mevcut sistemi, Supabase
Auth oturumuna (`auth.uid()`) dayalı standart desene taşımak.

- **Masraf:** $0 (SMS OTP kalkıyor; Google + magic link ücretsiz)
- **Kazanç:** kimlik taklidi, puan hilesi, PII sızıntısı — hepsi kapanır
- **Yöntem:** önce Vercel **Preview** deploy'da yaz + test et, sonra prod'a

---

## 1. Hedef veritabanı şeması

Eski `profiles` + `user_states` → tek tablo `app_users`, birincil anahtar `auth.users.id`.

```sql
-- ============ app_users: tek birleşik tablo ============
create table if not exists public.app_users (
  id                    uuid primary key references auth.users(id) on delete cascade,
  username              text unique,
  display_name          text,
  avatar_color          text default '#8B7EC8',
  profile_photo         text,
  xp                    int  default 0,
  streak                int  default 0,
  hearts                int  default 5,
  completed_lessons     jsonb default '[]'::jsonb,
  unlocked_achievements jsonb default '[]'::jsonb,
  coins                 int  default 0,
  licence_key           text,
  last_seen_at          timestamptz default now(),
  created_at            timestamptz default now()
);

alter table public.app_users enable row level security;

-- Herkes YALNIZCA kendi satırını görür/yazar
create policy "own_select" on public.app_users for select using (auth.uid() = id);
create policy "own_insert" on public.app_users for insert with check (auth.uid() = id);
create policy "own_update" on public.app_users for update using (auth.uid() = id) with check (auth.uid() = id);
-- DELETE politikası yok → hesap silme ileride RPC ile

-- ============ leaderboard: herkese açık, PII yok ============
create or replace view public.leaderboard as
  select username, display_name, avatar_color, profile_photo, xp, streak, completed_lessons
  from public.app_users;

grant select on public.leaderboard to anon, authenticated;
-- Not: view, base tablo RLS'ini bypass eder (owner=postgres). E-posta/telefon/
-- licence_key view'da YOK, o yüzden sızmaz.
```

`licence_key` tabloda kalır ama **view'da yoktur** → sadece sahibi kendi anahtarını
okur. Admin lisans atamayı Supabase Dashboard → Table Editor'den (veya service_role
RPC) yapar.

---

## 2. Mevcut 2 kullanıcının göçü

Sistemde sadece `faruk_nafiz` (sen) ve `sibel_coskun` (test) var.

1. Sen Google ile ilk kez giriş yap → yeni `auth.uid()` oluşur, `app_users`'a boş satır yazılır
2. Eski XP'ni taşımak için Dashboard → SQL Editor:
   ```sql
   update public.app_users
     set xp = 1390, streak = 1, licence_key = 'AMOK-15A30689-555294DA-20261111-6AED2A1'
     where id = auth.uid();   -- ya da where username = 'faruk_nafiz'
   ```
3. `sibel_coskun` test hesabı — göç gerekmez.

Eski `profiles` / `user_states` tabloları **silinmez** (rollback güvenliği).
Her şey doğrulandıktan sonra: `drop table public.user_states; drop table public.profiles;`

---

## 3. Google OAuth kurulumu (senden ~15 dk, tek seferlik)

1. **console.cloud.google.com** → üstte proje seçici → **New Project** → ad: `amok` → Create
2. Sol menü → **APIs & Services** → **OAuth consent screen**
   - User Type: **External** → Create
   - App name: `amok`, User support email: kendi e-postan, Developer contact: kendi e-postan
   - Save and Continue → Scopes (dokunma) → Save → Test users (dokunma) → Save
   - "Publish app" → Confirm (yoksa sadece test kullanıcıları girebilir)
3. Sol menü → **Credentials** → **+ Create Credentials** → **OAuth client ID**
   - Application type: **Web application**
   - Name: `amok-web`
   - **Authorized redirect URIs** → Add URI:
     `https://hpbjmkimkbjzjwapbief.supabase.co/auth/v1/callback`
   - Create → çıkan **Client ID** ve **Client Secret**'ı kopyala
4. **Supabase Dashboard** → Authentication → **Sign In / Providers** → **Google**
   - Enable → Client ID + Client Secret yapıştır → Save
5. Supabase → Authentication → **URL Configuration**
   - **Site URL:** prod adresin (ör. `https://amok.vercel.app`)
   - **Redirect URLs** → ekle: `https://*.vercel.app/**` (preview deploy'lar için) ve prod adresin

---

## 4. E-posta sihirli link kurulumu (5 dk)

1. Supabase → Authentication → **Sign In / Providers** → **Email** → Enable
2. "Confirm email" açık kalsın; magic link varsayılan çalışır
3. **Free tier limiti:** yerleşik SMTP saatte ~2-3 e-posta. Gerçek kullanıcı hacmi için:
   - Authentication → **SMTP Settings** → ücretsiz bir sağlayıcı bağla
     (Resend: ayda 3000 ücretsiz / Brevo: günde 300)

---

## 5. app.js değişiklikleri (bende — preview'da yapılacak)

### Silinecek (~600 satır sadeleşme)
- `handlePhoneLogin` OTP modal makinesi (telefon + e-posta OTP)
- `APPROVED_USERS_WHITELIST` + `isUserWhitelisted` + whitelist admin sekmesi
- `PRODUCTION_TESTERS_MASTER_OTP` (zaten kaldırıldı)
- `proceedWithLogin` içindeki tüm legacy profil/username-üretme dalları
- Giriş anında `sendTelegramNotification(...)` çağrıları (telefon/e-posta sızdırıyor)
- `signInWithOtp({ phone })` — SMS tamamen kalkıyor

### Eklenecek
- `signInWithGoogle()` → `supabaseClient.auth.signInWithOAuth({ provider:'google', options:{ redirectTo: window.location.origin } })`
- `signInWithEmailLink(email)` → `supabaseClient.auth.signInWithOtp({ email, options:{ emailRedirectTo: window.location.origin } })`
- `supabaseClient.auth.onAuthStateChange(...)` → oturum gelince `app_users` upsert + state yükle
- `init()` içinde oturum geri yükleme: `getSession()` → varsa kendi satırını çek

### Değişecek
- `saveState()` → `app_users` tablosuna `id = session.user.id` ile upsert (username eşleşmesi kalkar)
- `loadState()` / bootstrap → kendi satırını oturumdan yükle
- `logout()` → başına `await supabaseClient.auth.signOut()`
- `renderLeaderboard()` + `renderSocialList()` → `.from('leaderboard')` view
- Auth ekranı UI → 3 alanlı form + OTP yerine: **[Google ile Giriş]** + **[E-posta ile Giriş]** + **[Misafir olarak devam et]**

### Misafir modu
Oturum yok → `app_users`'a hiç yazma, her şey localStorage. "Kaydetmek ve
yarışmak için giriş yap" mesajı.

### Admin paneli
DB işlemleri (kullanıcı sil, lisans ata) RLS altında çalışmayacak. Geçici olarak
Supabase Dashboard'dan yönetilecek; ileride `is_admin` bayrağı + service_role RPC.

---

## 6. Test planı (Preview deploy'da)

1. Vercel → proje → yeni bir branch push et → otomatik preview URL
2. O URL'i Supabase Redirect URLs'e eklediğinden emin ol
3. Test:
   - [ ] Google ile giriş → geri dönüş → oturum açık, üst barda ad görünüyor
   - [ ] Ders çöz, XP kazan → sayfayı yenile → XP korunuyor (DB'den geldi)
   - [ ] Farklı tarayıcı/cihazda aynı Google ile gir → aynı XP
   - [ ] E-posta ile giriş → gelen linke tıkla → oturum açık
   - [ ] Çıkış yap → oturum kapandı, misafir moduna düştü
   - [ ] Misafir modunda ders çöz → çalışıyor, DB'ye yazmıyor
   - [ ] Puan tablosu açılıyor, isimler görünüyor
   - [ ] Konsolda `supabaseClient.from('app_users').select('*')` → SADECE kendi satırın
   - [ ] Konsolda başka birinin XP'sini PATCH etmeyi dene → `permission denied`
4. Hepsi ✓ → prod'a merge

## 7. Rollback

- Eski tablolar duruyor → app.js commit'ini geri al, eski haline döner
- `app_users` RLS sorun çıkarırsa: `alter table public.app_users disable row level security;`

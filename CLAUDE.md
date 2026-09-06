# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

AMOK — a gamified English-learning web app for Turkish speakers (YÖKDİL/YDS exam prep). No frontend framework or bundler: plain HTML/CSS/JS loaded as classic `<script>` tags that share globals. Backend is Supabase. Android is wrapped via Capacitor.

## Commands

- `npm start` — local dev server (`http-server` on :3000, no caching) serving the repo root directly (source files, not `www/`).
- `npm run build` — runs `scripts/build.js`: produces the deployable `www/` tree (see Build pipeline below).
- `npm run status` — `scripts/check-lessons.js`: loads `data-stable.js` → `data.js` → `data-extra.js` → `rules-db.js` in a Node `vm` sandbox to validate curriculum data without a browser. Use this after editing any data file.
- `npm run ship -- "commit message"` — `scripts/ship.sh`: build → `git commit` → `git push` → `vercel --prod` in one shot, stops on first failure. **Only run when the user explicitly asks for a deploy**, never after routine changes.
- `npm run cap:sync` — `npx cap sync`, syncs `www/` into the Capacitor Android project.

There is no test suite and no linter configured; `npm run status` is the closest thing to a correctness check for content changes.

## Architecture

### Script load order is load-bearing

`index.html` loads, in this fixed order: `data-stable.js` → `data.js` → `data-extra.js` → `drill-expansion.js` → `exam-expansion.js` → `lesson-cause-effect.js` → `rules-db.js` → `translation-guide.js` → `app.js`. They are not modules — they share bare globals (`lessons`, `units`, `rawTopics`, `unitSentencesMap`, `state`, …). `data-stable.js` builds the base `units`/`lessons` skeleton and `wordDictionary`; `data.js` (the largest file) fills in most lesson/question content; `data-extra.js` is an IIFE guarded by `if (typeof lessons === 'undefined') return;` that pushes *additional* exercises onto lessons already created by the earlier files — so a lesson's questions can be defined across two files. Changing the load order or extracting a file as an ES module will break this.

### app.js is a single ~32K-line file

Everything client-side lives here: the `state` object (persisted via `saveState`/`loadState`), Supabase auth (`initAuth`, `enterApp`, session → `app_users` table, RLS on `auth.uid()`), the licence/paywall system (`verifyLicenceKey`, `activateLicence`, `my_licence_status` RPC), the store/coin economy (`STORE_CATALOG`, `buyStoreItem`, `state.coins` — coins are spendable and don't affect XP/leaderboard rank), social/leaderboard (`renderSocialList`, `renderLeaderboard`), the admin panel, the exam engine (`renderExamTab`, `startExamSession`), the placement test, the verb-tense "cockpit"/simulator, and ~25 different question-type renderers (`renderMultipleChoice`, `renderWordBank`, `renderMatching`, `renderPrepositionMagnet`, etc. — dispatched from `renderQuestion()`).

Because this is one file, targeted `grep`/`rg` for a function name is much cheaper than reading large line ranges — prefer searching for `^function <name>` first to get the line number.

### Tabs: some are currently hidden, not deleted

`switchTab()` in app.js is the nav router; tab content lives in `<div id="tab-content-*">` in index.html. A `RETIRED_TABS` map (app.js, inside `enterApp`) currently redirects `simulator`, `structure-robot`, and `cause-effect` → `lessons`, and `ezber-robotu` → `transitions-matrix`. Their nav buttons are commented out in index.html and their code is untouched — to bring one back, remove its line from `RETIRED_TABS` and un-comment its `<button>`. Don't assume a tab is dead just because it's unreachable from the UI.

### Question option order is randomized at runtime

`shuffleQuestionOptions()` (app.js) reorders `question.options` and remaps `correctIndex` in place, once per quiz attempt (guarded by `question.__shuffleEpoch`). This means two builds of the same content can produce different rendered option order — that's expected nondeterminism, not a content regression, when diffing build output.

### Build pipeline (`scripts/build.js`)

1. Copies source files verbatim into `www/` (the Vercel output dir per `vercel.json`, and what `cap:sync` wraps for Android).
2. `inject-env.js --inject-only` bakes `SUPABASE_URL`/`SUPABASE_ANON_KEY` (from `.env.local`) into `www/app.js` before minification.
3. Runs every JS file through `terser` — **top-level names are deliberately left unmangled** (`-m` without touching top-level) because the files share globals across `<script>` boundaries; only local/inner names get mangled.
4. `scripts/jsonify.js` rewrites large object/array literals (above a size threshold) into `JSON.parse("...")` calls — V8 parses JSON faster than general JS literal syntax, and these files are pure data. Must run after terser (it only rewrites the literal, not surrounding code).
5. `inject-env.js --stamp-only` stamps content-hash `?v=` cache-busting params into `www/index.html`, describing the files as actually shipped (post-minify).

### Data/content files

- `data-stable.js` — `wordDictionary` (EN→TR glossary) plus the base `rawTopics`/`units`/`lessons` arrays.
- `data.js` — bulk of lesson/question content (largest file, ~88K lines).
- `data-extra.js`, `drill-expansion.js`, `exam-expansion.js`, `lesson-cause-effect.js` — additional exercises/tests appended to existing lessons/units after the base data loads.
- `rules-db.js` — `window.ACADEMIC_RULES`, grammar rule reference content.
- `translation-guide.js` — Turkish translation help data.
- `structure-robot.js`, `ezber-robotu.js` — lazy-loaded via `loadScriptOnce()` only when their tab is opened (currently unreachable — see Tabs above).

### Backend (Supabase)

Schema/policy source lives in `supabase/*.sql` (`app_users` table with RLS via `auth.uid() = id`, `admin-panel.sql`, `licences.sql`, `security-hardening.sql`). Auth is email+password only — OTP/magic-link was removed; the Supabase project's "Confirm email" setting must stay **off**. `SUPABASE_URL` is a public anon URL hardcoded near the top of `app.js`; the anon key is injected from `.env.local` at build time (see Build pipeline) and is not committed.

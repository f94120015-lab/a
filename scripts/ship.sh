#!/usr/bin/env bash
# Tek komut: derle -> commit -> push -> Vercel prod deploy
#
# Kullanim:
#   npm run ship -- "commit mesaji"
#   ./scripts/ship.sh "commit mesaji"
#
# Mesaj verilmezse tarih-saatli varsayilan mesaj kullanilir.
# Herhangi bir adim hata verirse script durur (deploy'a gecmez).
set -euo pipefail

cd "$(dirname "$0")/.."

MSG="${1:-chore: yayin $(date '+%Y-%m-%d %H:%M')}"
BRANCH="$(git branch --show-current)"

echo "==> 1/4  Derleme (npm run build) - yayindan once dogrulama"
npm run build

echo "==> 2/4  Commit"
git add -A
if git diff --cached --quiet; then
  echo "    stage'de degisiklik yok, commit atlaniyor"
else
  git commit -m "$MSG"
fi

echo "==> 3/4  Push (origin/$BRANCH)"
git push

echo "==> 4/4  Vercel prod deploy"
if command -v vercel >/dev/null 2>&1; then
  vercel --prod
else
  npx --yes vercel --prod
fi

echo "==> Bitti."

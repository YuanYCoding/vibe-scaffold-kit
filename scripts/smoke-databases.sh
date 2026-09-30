#!/usr/bin/env bash
set -Eeuo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TEMP_DIR="$(mktemp -d)"
CURRENT_PROJECT=""

cleanup() {
  status=$?
  if [[ -n "$CURRENT_PROJECT" && -d "$CURRENT_PROJECT" ]]; then
    if [[ $status -ne 0 ]]; then
      (cd "$CURRENT_PROJECT" && docker compose logs --no-color) || true
    fi
    (cd "$CURRENT_PROJECT" && docker compose down --volumes --remove-orphans) || true
  fi
  rm -rf "$TEMP_DIR"
  exit "$status"
}
trap cleanup EXIT

templates=("$@")
if [[ ${#templates[@]} -eq 0 ]]; then
  templates=(web-lite ts-platform ai-platform)
fi

for template in "${templates[@]}"; do
  case "$template" in
    web-lite|ts-platform|ai-platform) ;;
    *) echo "Unknown template: $template" >&2; exit 2 ;;
  esac
  project="$TEMP_DIR/database-$template"
  node "$ROOT_DIR/create.mjs" "$template" "database-$template" \
    --output "$TEMP_DIR" --no-git
  CURRENT_PROJECT="$project"
  (
    cd "$project"
    docker compose up --detach --wait
    pnpm db:deploy
    docker compose exec --no-TTY postgres \
      psql -U postgres -d "database_${template//-/_}" -c "SELECT 1;"
    docker compose down --volumes --remove-orphans
  )
  CURRENT_PROJECT=""
done

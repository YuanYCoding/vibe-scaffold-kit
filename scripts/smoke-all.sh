#!/usr/bin/env bash
set -Eeuo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TEMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TEMP_DIR"' EXIT

templates=("$@")
if [[ ${#templates[@]} -eq 0 ]]; then
  templates=(web-lite ts-platform ai-platform)
fi

for template in "${templates[@]}"; do
  case "$template" in
    web-lite|ts-platform|ai-platform) ;;
    *) echo "Unknown template: $template" >&2; exit 2 ;;
  esac
  node "$ROOT_DIR/create.mjs" "$template" "smoke-$template" \
    --output "$TEMP_DIR" --no-git --no-install
  (
    cd "$TEMP_DIR/smoke-$template"
    pnpm install --frozen-lockfile=false
    if [[ "$template" == "ai-platform" ]]; then
      uv sync --project apps/api --all-groups
    else
      pnpm db:generate
    fi
    pnpm check
    pnpm build
  )
done

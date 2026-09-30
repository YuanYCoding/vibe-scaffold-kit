#!/usr/bin/env bash
set -Eeuo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TEMP_DIR="$(mktemp -d)"
WEB_IMAGE="vibe-scaffold-smoke-web-lite:local"
API_IMAGE="vibe-scaffold-smoke-ai-api:local"

cleanup() {
  rm -rf "$TEMP_DIR"
  docker image rm --force "$WEB_IMAGE" "$API_IMAGE" >/dev/null 2>&1 || true
}
trap cleanup EXIT

node "$ROOT_DIR/create.mjs" web-lite image-web-lite --output "$TEMP_DIR" --no-git
docker build --tag "$WEB_IMAGE" "$TEMP_DIR/image-web-lite"

node "$ROOT_DIR/create.mjs" ai-platform image-ai-platform --output "$TEMP_DIR" --no-git
docker build --tag "$API_IMAGE" "$TEMP_DIR/image-ai-platform/apps/api"

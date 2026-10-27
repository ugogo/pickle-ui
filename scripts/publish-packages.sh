#!/usr/bin/env sh
# Publish every package at the version release-it just set (its after:bump
# hook), dependencies first. `pnpm pack` rewrites `workspace:` ranges to real
# versions; `npm publish` uploads each tarball with npm Trusted Publishing.
# Pre-releases go to the dist-tag in NPM_TAG (set by the Release workflow).
set -eu

tag="${NPM_TAG:-latest}"
out="$(mktemp -d)"

pnpm -r run build

for pkg in tokens react; do
  tarball="$(cd "packages/$pkg" && pnpm pack --pack-destination "$out" | tail -n 1)"
  npm publish "$tarball" --access public --tag "$tag"
done

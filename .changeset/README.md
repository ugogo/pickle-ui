# Changesets

Every pull request that changes a published package adds a changeset: run
`pnpm changeset`, pick the bump (patch, minor or major) and write one line for
the changelog. On `main`, the Release workflow gathers the changesets into a
"Version Packages" pull request; merging it publishes the packages.

All `@pickle-ui/*` packages share one version. While `pre.json` exists, every
release is a `beta` pre-release.

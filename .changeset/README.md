# Changesets

Every pull request that changes a published package adds a changeset: run
`pnpm changeset`, pick the bump (patch, minor or major) and write one line for
the changelog. On `main`, the Release workflow gathers the changesets into a
"Version Packages" pull request; merging it publishes the packages.

Each package has its own version. A `@pickle-ui/tokens` changeset also releases
`@pickle-ui/react` with a patch bump, since react pins the tokens version it
ships with. While `pre.json` exists, every release is a `beta` pre-release.

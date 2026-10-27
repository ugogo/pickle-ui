# @pickle-ui/tokens

Pickle UI's design tokens as data: the light and dark color tokens and the
radius scale. `@pickle-ui/react`'s `src/theme.css` is generated from them.
The package is private until another package consumes it.

## Changing a token

1. Edit the value in `src/tokens.ts`.
2. Run `pnpm --filter @pickle-ui/tokens generate` to rewrite
   `packages/react/src/theme.css`.
3. Commit both files. The tokens test fails while they disagree, so CI catches
   a forgotten step.

The stylesheet keeps the token references (`var(--color-neutral-800)`,
`--alpha(…)`, `color-mix(…)`), so overriding a variable still cascades.

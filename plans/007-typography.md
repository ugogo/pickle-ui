# Plan 007: Add a Typography (`Text`) component

> **Executor instructions**: Follow this plan step by step. Build the component
> to match the conventions of the existing ones (read `Button.tsx`, `Input.tsx`,
> and `Switch.tsx` first). Run every verification command before moving on. If a
> STOP condition occurs, stop and report. When done, update this plan's status
> row in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat d742bcc..HEAD -- src/components src/index.ts src/globals.css`
> If the component conventions or design tokens have moved, re-derive from the
> live files before writing code.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: LOW
- **Depends on**: none
- **Category**: feat
- **Planned at**: commit `d742bcc`, 2026-06-16

## Why this matters

pickle-ui ships interactive controls (Button, Input, Select, Slider, Switch) but
has **no typographic primitive** — every consumer hand-rolls `<p className="text-sm
text-muted-foreground">`. The sibling app `../pane` had to define its own
`Text`/`MutedText` in `packages/ui/src/components/text.tsx`. A `Text` component is
the structural foundation for building screens (headings, body, captions, code) and
is the first item in the recommended build-out. The design tokens already exist in
`src/globals.css` (`--font-sans`/Geist, `--font-heading`, `--font-serif`/Playfair,
`--font-mono`/JetBrains, the `--tracking-*` scale, `foreground`/`muted-foreground`)
— this plan only surfaces them as a typed, variant-driven component.

`Label` is intentionally **out of scope** here — it belongs with the form controls
it wires up (see plan 008).

## Current state

- Components live in `src/components/*.tsx`, one file each, exported (component +
  types) from `src/index.ts`. Each ships a `*.stories.tsx`; most ship a
  `*.test.tsx`.
- Conventions to match exactly:
  - Variants via `cva` + `VariantProps` (`Button.tsx`), classes merged with `cn`
    from `@/lib/utils`.
  - React 19 **ref-as-prop** (no `forwardRef`; `ref` is a destructured prop — see
    `Button.tsx`, set by plan 005).
  - A `data-slot` attribute on the rendered element.
  - Compound parts attached via `Object.assign(Root, { Part })` (`Switch.tsx`).
  - `'use client'` only when the module itself calls a client-only hook
    (`Switch.tsx` has it; `Button.tsx`/`Input.tsx` do not). `Text` calls none, so
    it ships without it.
- Element selection: a plain `variantElement` map (`variant → React.ElementType`)
  plus an optional `as` prop — no polymorphism hook. `Text` is presentational
  (like `Button`), not a Base UI primitive wrapper, so it does not pull in
  `@base-ui/react`.

## API design

Single exported component `Text`. The rendered element is determined by `variant`
(headings → `h1`–`h4`, `code` → `<code>`, etc.) via a `variantElement` map, with an
optional `as` prop to override the element. No polymorphism hook/library is used.

```tsx
import { Text } from 'pickle-ui';

<Text variant="h1">Settings</Text>            // renders <h1>
<Text>Body copy.</Text>                        // variant="body" → <p>
<Text tone="muted">Secondary line.</Text>      // <p>, muted color — works on ANY variant
<Text variant="code">npm i pickle-ui</Text>    // <code>
<Text variant="h2" as="h1">Page title</Text>   // h2 styling on an <h1> element
```

`TextProps = React.ComponentProps<'p'> & VariantProps<typeof textVariants> &
{ as?: React.ElementType }`.

CVA (`textVariants`) — **structure / size / weight only; color is the separate
`tone` axis** so muted/primary/destructive compose with any variant. Grounded in
existing tokens, do not invent new CSS vars:

| `variant` (default `body`) | classes (starting point)                                          | default element |
| -------------------------- | ----------------------------------------------------------------- | --------------- |
| `display`                  | `font-heading text-4xl font-semibold tracking-tight text-balance` | `h1`            |
| `h1`                       | `font-heading text-3xl font-semibold tracking-tight`              | `h1`            |
| `h2`                       | `font-heading text-2xl font-semibold tracking-tight`              | `h2`            |
| `h3`                       | `text-xl font-semibold`                                           | `h3`            |
| `h4`                       | `text-lg font-medium`                                             | `h4`            |
| `lead`                     | `text-base`                                                       | `p`             |
| `body`                     | `text-sm leading-normal`                                          | `p`             |
| `small`                    | `text-xs leading-none`                                            | `span`          |
| `code`                     | `font-mono text-[0.85em] bg-muted rounded px-1 py-0.5`            | `code`          |
| `blockquote`               | `border-l-2 pl-4 italic`                                          | `blockquote`    |

(`code`'s `bg-muted` and `blockquote`'s border are structural, not text color — the
`tone` axis still applies on top.)

Orthogonal modifiers (all optional):

- `tone` (default `default` → inherits `foreground`): `muted` (`text-muted-foreground`)
  | `primary` (`text-primary`) | `destructive` (`text-destructive`). This is the
  **only** place text color is set — there is no `muted` variant.
- `weight`: `normal` | `medium` | `semibold` | `bold`.
- `align`: `start` | `center` | `end`.
- `truncate?: boolean` → `truncate`.

Implement plainly — no Base UI `useRender`:

```tsx
function Text({
  align,
  as,
  className,
  tone,
  variant = 'body',
  weight,
  ref,
  ...props
}: TextProps) {
  const Component = as ?? variantElement[variant]; // variantElement: Record<variant, React.ElementType>
  return (
    <Component
      className={cn(textVariants({ align, tone, variant, weight }), className)}
      data-slot="text"
      ref={ref}
      {...props}
    />
  );
}
```

`Text` calls no client-only hook, so it needs **no** `'use client'` (matches
`Button.tsx`). Keep heading `tracking`/`text-balance` consistent with `--font-heading`.

## Scope

**In scope** (the only files you should create/modify):

- **New** `src/components/Text.tsx` — the component + `textVariants`.
- **New** `src/components/Text.stories.tsx` — mirror `Switch.stories.tsx`: use the
  `Story.Layout` / `Story.Section` / `Story.Matrix` helpers from `./Story`. One
  section per variant scale, one for tone/weight, one showing polymorphism.
- **New** `src/components/Text.test.tsx` — vitest + `@testing-library/react`.
- **Edit** `src/index.ts` — add `export { Text }` and `export type { TextProps }`,
  keeping the existing alphabetical ordering.

**Out of scope** (do NOT touch, even though they look related):

- `src/globals.css` — the design tokens already exist; consume them, do not add
  or rename CSS vars. If a token you need is missing, that is a STOP condition.
- Any other `src/components/*.tsx` — do not refactor existing components to use
  `Text`. (`Text` itself needs no `'use client'`; don't add one.)
- `package.json` — no new dependencies; `class-variance-authority` and `cn`
  (`@/lib/utils`) are already present.

## Git workflow

- Branch: `feat/typography`.
- Conventional Commits (repo mandates them — see `AGENTS.md`). Example:
  `feat(text): add Text typography component`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Build `Text.tsx`

Write `textVariants` (cva, the table above), the `variantElement` map
(`Record<variant, React.ElementType>`), and the component exactly as in the code
shape under "API design" — `as ?? variantElement[variant]`, `data-slot="text"`,
`ref` as a prop, classes via `cn(textVariants({ ... }), className)`. Export
`{ Text, textVariants }` and `type { TextProps }`. No `'use client'` (presentational,
like `Button.tsx`).

**Verify**: `pnpm run typecheck` → exit 0.

### Step 2: Export from the public entry

Add `export { Text }` and `export type { TextProps }` to `src/index.ts` in the
existing alphabetical block.

**Verify**: `pnpm run typecheck` → exit 0.

### Step 3: Story + tests

Write `Text.stories.tsx` (mirror `Switch.stories.tsx`) and `Text.test.tsx` (cases
in Test plan).

**Verify**: `pnpm run test` → all pass, including the new `Text` tests.

### Step 4: Full gate

**Verify**: `pnpm run lint` (exit 0), `pnpm run format:check` (exit 0; run
`pnpm run format` first if it reformats), `pnpm run build` (exit 0; `Text` and
`TextProps` appear in `dist/index.d.ts`).

## Test plan

`src/components/Text.test.tsx` (`pnpm run test`):

- Renders default `body` as a `<p>` with the body classes.
- `variant="h2"` renders an `<h2>`; `variant="code"` renders a `<code>`.
- `as="h1"` overrides the element (renders `<h1>`) while keeping `data-slot` and
  the variant classes.
- `className` is merged, not replaced (`cn` precedence).
- `tone="muted"` adds `text-muted-foreground`, and works on a non-default variant
  too (e.g. `variant="h3" tone="muted"`) — proves color is orthogonal to variant.

## Commands

| Purpose   | Command                 | Expected                                     |
| --------- | ----------------------- | -------------------------------------------- |
| Typecheck | `pnpm run typecheck`    | exit 0                                       |
| Test      | `pnpm run test`         | new Text tests pass                          |
| Lint      | `pnpm run lint`         | exit 0                                       |
| Format    | `pnpm run format:check` | exit 0 (run `format` if needed)              |
| Build     | `pnpm run build`        | exit 0; `Text` appears in `dist/index.d.ts`  |
| Visual    | `pnpm run dev`          | `components/Text` story renders all variants |

## Done criteria

- [ ] `Text` + `TextProps` exported from `src/index.ts`.
- [ ] `variant`, `tone`, `weight`, `align` all type-check via `VariantProps`.
- [ ] There is **no** `muted` variant; muted is reachable only via `tone="muted"`.
- [ ] Element override works through `as` (test proves it); no `useRender` import.
- [ ] Story shows every variant; `pnpm run typecheck`, `test`, `lint`,
      `format:check`, `build` all pass.
- [ ] `plans/README.md` row for 007 updated.

## STOP conditions

- Typing the `as` override against `React.ComponentProps<'p'>` produces
  unavoidable type errors for element-specific props — stop and report rather than
  scattering `any`; the fallback is to keep `as` as a tag-name override only.
- The token names in `src/globals.css` (`--font-heading`, `--tracking-*`,
  `muted-foreground`) differ from "Current state" — re-derive the variant classes
  from the live tokens rather than inventing new ones.

## Maintenance notes

- Form `Label`, `Field.Description`, and `Field.Error` (plan 008) may reuse
  `Text`'s `muted`/`small`/`destructive` styling for visual consistency, but must
  not hard-depend on it — keep `Text` free of form concerns.

# Plan 003: Replace blanket `eslint-disable` directives with scoped, justified ones

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat ac25fde..HEAD -- src/components/ColorPickerPrimitive.tsx src/components/VisuallyHiddenInput.tsx src/lib/compose-refs.ts src/hooks/use-lazy-ref.ts`
> If any of these changed since this plan was written, compare against the
> "Current state" notes before proceeding; on a mismatch treat it as a STOP
> condition.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: MED
- **Depends on**: plans/002-fix-conditional-hook.md
- **Category**: dx
- **Planned at**: commit `ac25fde`, 2026-06-15

## Why this matters

Four source files begin with a blanket `/* eslint-disable */` that turns off
**every** lint rule for the whole file — including `react-hooks/rules-of-hooks`
and `react-hooks/exhaustive-deps`. The worst offender is
`ColorPickerPrimitive.tsx`, the largest and highest-churn component (5 commits):
its blanket disable is exactly what hid the conditional-hook bug fixed in plan 002. A blanket disable on the file most likely to regress means the linter
protects everything except the code that needs it most. This plan removes each
blanket directive and replaces it with the narrowest scoped disable that the
code actually requires, each carrying a `--` justification — so genuine future
violations (a new conditional hook, a real exhaustive-deps miss) surface again.

`src/lib/color.ts:11` is the model to imitate: it disables only specific
`perfectionist/*` rules with a written reason, not the whole ruleset.

## Current state

Blanket directives today (confirmed via
`grep -rn "eslint-disable" src --include='*.ts' --include='*.tsx' | grep -v "disable-next-line\|disable-line"`):

- `src/components/ColorPickerPrimitive.tsx:1` → `/* eslint-disable */`
- `src/components/VisuallyHiddenInput.tsx:3` → `/* eslint-disable */`
- `src/lib/compose-refs.ts:1` → `/* eslint-disable */`
- `src/hooks/use-lazy-ref.ts:1` → `/* eslint-disable */`

The good example to follow (`src/lib/color.ts:11`):

```ts
/* eslint-disable perfectionist/sort-objects, perfectionist/sort-object-types, perfectionist/sort-interfaces, perfectionist/sort-modules, perfectionist/sort-switch-case -- color values read best in their conventional order ... */
```

Lint config (`eslint.config.mjs`) enables, among others:
`@eslint/js` recommended, `typescript-eslint` recommended,
`react-hooks` recommended-latest (rules-of-hooks + exhaustive-deps +
react-compiler checks), and `perfectionist` (natural sorting of imports,
objects, props, types, etc.).

**Why this depends on plan 002**: removing the blanket disable from
`ColorPickerPrimitive.tsx` re-activates `react-hooks/rules-of-hooks`. If 002 has
not landed, lint will (correctly) error on the conditional `useDirection()`
call, and you would be tempted to suppress it — which is the bug, not a style
nit. Do plan 002 first.

## Commands you will need

| Purpose           | Command                   | Expected on success |
| ----------------- | ------------------------- | ------------------- |
| Lint (whole repo) | `pnpm run lint`           | exit 0              |
| Lint one file     | `pnpm exec eslint <path>` | exit 0 / shows rule |
| Typecheck         | `pnpm run typecheck`      | exit 0              |
| Run tests         | `pnpm run test`           | all pass            |
| Format check      | `pnpm run format:check`   | exit 0              |

## Scope

**In scope** (modify only these — comment lines, not logic):

- `src/components/ColorPickerPrimitive.tsx`
- `src/components/VisuallyHiddenInput.tsx`
- `src/lib/compose-refs.ts`
- `src/hooks/use-lazy-ref.ts`

**Out of scope** (do NOT touch):

- `src/lib/color.ts` — already correctly scoped; leave it.
- **Any executable logic** in the four in-scope files. This plan changes only
  the disable directives and, where a violation is legitimate, adds a
  `// eslint-disable-next-line <rule> -- <reason>` immediately above the
  offending line. You may NOT rewrite logic to satisfy a rule in this plan; if a
  rule flags what looks like a real bug, STOP and report.
- The behavior of any component. Run the test suite to confirm nothing changed.

## Git workflow

- Branch: `advisor/003-scope-eslint-disable`
- Conventional Commits. Example: `chore(lint): scope blanket eslint-disable directives`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

Process the files in this order. For each: remove the blanket directive, run
`pnpm exec eslint <file>`, then for every reported violation decide whether it
is an **intentional pattern** (add a scoped next-line disable with a reason) or a
**real problem** (STOP and report). Re-add a file-level scoped disable only if a
rule is violated pervasively and intentionally throughout the file.

### Step 1: `src/hooks/use-lazy-ref.ts`

Remove line 1 (`/* eslint-disable */`). This file is tiny (a `useRef` lazy
initializer ending in `return ref as React.RefObject<T>`).

**Verify**: `pnpm exec eslint src/hooks/use-lazy-ref.ts` → exit 0. If a rule
fires (e.g. a `@typescript-eslint` cast warning), add a single
`// eslint-disable-next-line <rule> -- <reason>` above the exact line, then
re-run. Expected: at most one scoped next-line disable, likely none.

### Step 2: `src/lib/compose-refs.ts`

Remove line 1 (`/* eslint-disable */`). Note this file already contains a
`biome-ignore` comment above the `React.useCallback(composeRefs(...), refs)`
call in `useComposedRefs` — that callback intentionally violates
`react-hooks/exhaustive-deps` (it memoizes by the spread `refs` array).

**Verify**: `pnpm exec eslint src/lib/compose-refs.ts`. Expected violations are
`react-hooks/exhaustive-deps` (the intentional memo) and possibly
`@typescript-eslint/no-explicit-any` if `any` appears. For each **intentional**
one, add directly above the offending line:
`// eslint-disable-next-line react-hooks/exhaustive-deps -- memoize by all ref values; refs array identity is intentional`
Re-run until exit 0. Do NOT change the memoization logic.

### Step 3: `src/components/VisuallyHiddenInput.tsx`

Remove line 3 (`/* eslint-disable */`; lines 1-2 are `'use client'` and a blank
line — keep them). This component uses `useLayoutEffect`/`useEffect` with
deliberately partial dependency arrays and a native setter dispatch.

**Verify**: `pnpm exec eslint src/components/VisuallyHiddenInput.tsx`. Likely
`react-hooks/exhaustive-deps` on one or more effects. For each effect whose deps
are intentional, add a scoped
`// eslint-disable-next-line react-hooks/exhaustive-deps -- <why these deps are intentional>`
above the dependency array's hook. Re-run until exit 0.

### Step 4: `src/components/ColorPickerPrimitive.tsx`

**Confirm plan 002 has landed first**: `grep -n "const contextDir = useDirection();" src/components/ColorPickerPrimitive.tsx`
must return a match. If it does NOT, STOP — do plan 002 first.

Remove line 1 (`/* eslint-disable */`; keep `'use client'` on line 2).

**Verify**: `pnpm exec eslint src/components/ColorPickerPrimitive.tsx`. Triage
each violation:

- `react-hooks/rules-of-hooks` → this should NOT fire after plan 002. If it
  does, STOP and report (there is another conditional hook).
- `react-hooks/exhaustive-deps` on `useCallback`/`useMemo`/effects → if the deps
  are intentional, add a scoped next-line disable with a reason. If the rule
  points at what looks like a genuinely missing dependency that could cause a
  stale-closure bug, STOP and report rather than suppressing.
- `perfectionist/*` (sorting of the large import block, object keys, etc.) → if
  pervasive and the existing order is deliberate, add a file-level scoped
  disable modeled on `src/lib/color.ts:11`, listing only the specific
  `perfectionist/*` rules and a reason. Otherwise prefer fixing the order with
  `pnpm run lint:fix` ONLY for sorting rules (sorting is safe, automated, and
  does not change behavior) — but verify the test suite still passes afterward.

Re-run `pnpm exec eslint src/components/ColorPickerPrimitive.tsx` until exit 0.

### Step 5: Full verification

**Verify** (all must pass):

- `pnpm run lint` → exit 0
- `pnpm run typecheck` → exit 0
- `pnpm run test` → all pass (proves no logic changed)
- `pnpm run format:check` → exit 0 (run `pnpm run format` if needed)
- `grep -rn "eslint-disable \*/\|eslint-disable$" src` → returns **no** blanket
  disables (every remaining disable names specific rules with a reason)

## Test plan

- No new tests. This is a tooling/comment change; the existing suite (plans 001
  and 002) is the regression guard that proves behavior is unchanged.
- Verification: `pnpm run test` → all pass, identical to before.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `grep -rn "eslint-disable" src --include='*.ts' --include='*.tsx' | grep -v "disable-next-line\|disable-line"`
      shows only directives that name specific rules and include a `--` reason
      (no bare `/* eslint-disable */`)
- [ ] `pnpm run lint` exits 0
- [ ] `pnpm run typecheck` exits 0
- [ ] `pnpm run test` exits 0 (all pre-existing tests still pass)
- [ ] Only the four in-scope files changed (`git status`)
- [ ] `plans/README.md` status row for 003 updated

## STOP conditions

Stop and report back (do not improvise) if:

- `react-hooks/rules-of-hooks` fires on `ColorPickerPrimitive.tsx` after plan
  002 landed (a second conditional-hook site exists).
- `react-hooks/exhaustive-deps` points at a missing dependency that looks like a
  real stale-closure bug rather than an intentional omission — do not suppress
  it; report it as a candidate finding.
- Removing a blanket disable surfaces a `@typescript-eslint` error that would
  require changing logic (not just a comment) to satisfy.
- The number of passing tests changes after your edits (you altered behavior,
  not just comments).

## Maintenance notes

- Going forward, new lint suppressions in these files should be line-scoped
  (`// eslint-disable-next-line <rule> -- <reason>`) or rule-scoped at file level
  with a reason — never bare `/* eslint-disable */`.
- A reviewer should confirm every remaining disable in the diff names a rule and
  states why, and that the test count is unchanged.
- This plan deliberately does not "clean up" the underlying patterns the rules
  flag (e.g. the intentional non-exhaustive deps) — those are separate decisions.
  </content>

# Plan 005: Convert Button from `forwardRef` to the React 19 ref-as-prop pattern

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat ac25fde..HEAD -- src/components/Button.tsx`
> If that file changed since this plan was written, compare against the "Current
> state" excerpt before proceeding; on a mismatch treat it as a STOP condition.

## Status

- **Priority**: P3
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: tech-debt
- **Planned at**: commit `ac25fde`, 2026-06-15

## Why this matters

`Button` is the only component that still uses `React.forwardRef` plus a manual
`displayName`. Every other component in the library (`Input`, `Slider`,
`Switch`, the color-picker parts) uses the React 19 convention of accepting
`ref` as a regular prop. `forwardRef` is deprecated in React 19, and the
inconsistency is a small papercut for contributors and anyone reading the
codebase to learn its conventions. This change aligns `Button` with the rest of
the library with no change to its public behavior — consumers still pass `ref`
the same way.

## Current state

- The library targets React 19 (`package.json` has `react: ^19.2.7`,
  `@types/react: ^19.2.17`).
- The exemplar to match is `src/components/Input.tsx`, which takes `ref`
  implicitly through `React.ComponentProps<'input'>` and is a plain function:

  ```tsx
  type InputProps = React.ComponentProps<'input'>;

  function Input({ className, type, ...props }: InputProps) {
    return <input className={cn(/* ... */, className)} data-slot="input" type={type} {...props} />;
  }
  ```

- `Button` today (`src/components/Button.tsx:33-50`) uses `forwardRef`:

  ```tsx
  export interface ButtonProps
    extends
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      VariantProps<typeof buttonVariants> {}

  const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, size, type = 'button', variant, ...props }, ref) => (
      <button
        className={cn(buttonVariants({ className, size, variant }))}
        ref={ref}
        type={type}
        {...props}
      />
    ),
  );
  Button.displayName = 'Button';

  export { Button, buttonVariants };
  ```

- `buttonVariants` (lines 6-31) and the `ButtonProps` export must be preserved —
  `buttonVariants` and `ButtonProps` are part of the public surface
  (`ButtonProps` is re-exported from `src/index.ts`), and the color picker types
  `ColorPickerTriggerProps`/`ColorPickerEyeDropperProps` derive from
  `React.ComponentProps<typeof Button>`.
- Note: `React.ButtonHTMLAttributes<HTMLButtonElement>` does **not** include
  `ref`. `React.ComponentProps<'button'>` **does** (in React 19 types). To accept
  `ref` as a prop with correct typing, `ButtonProps` should extend
  `React.ComponentProps<'button'>` like `Input` does with `'input'`.

## Commands you will need

| Purpose   | Command                 | Expected |
| --------- | ----------------------- | -------- |
| Typecheck | `pnpm run typecheck`    | exit 0   |
| Tests     | `pnpm run test`         | all pass |
| Lint      | `pnpm run lint`         | exit 0   |
| Format    | `pnpm run format:check` | exit 0   |

## Scope

**In scope** (the only file you should modify):

- `src/components/Button.tsx`

**Out of scope** (do NOT touch):

- `buttonVariants` definition (lines 6-31) — keep it exactly as is, including
  the export.
- `src/index.ts` — the `Button` / `ButtonProps` exports there do not need to
  change; this plan keeps both names.
- Any consumer of `Button` (`ColorPickerPrimitive.tsx`, stories) — the public
  API is unchanged, so they must not need edits. If one does, STOP.

## Git workflow

- Branch: `advisor/005-unify-ref-api`
- Conventional Commits. Example: `refactor(button): use React 19 ref-as-prop instead of forwardRef`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Rewrite `Button` as a plain function component

Replace the `Button` definition (the `forwardRef` block and the `displayName`
line) with a plain function that takes `ref` as a prop. Keep `buttonVariants`
and the exports unchanged. The `ButtonProps` interface changes its base from
`React.ButtonHTMLAttributes<HTMLButtonElement>` to
`React.ComponentProps<'button'>` so `ref` is correctly typed.

Target shape:

```tsx
export interface ButtonProps
  extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {}

function Button({
  className,
  ref,
  size,
  type = 'button',
  variant,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ className, size, variant }))}
      ref={ref}
      type={type}
      {...props}
    />
  );
}

export { Button, buttonVariants };
```

Remove the now-unused `React.forwardRef` usage and the
`Button.displayName = 'Button';` line. The `import * as React from 'react';`
line stays (still used for `React.ComponentProps`).

**Verify**:

- `grep -n "forwardRef\|displayName" src/components/Button.tsx` → no matches.
- `pnpm run typecheck` → exit 0.

### Step 2: Full verification

**Verify**:

- `pnpm run typecheck` → exit 0
- `pnpm run test` → all pass (the Button render test from plan 001 still passes)
- `pnpm run lint` → exit 0
- `pnpm run format:check` → exit 0 (run `pnpm run format` if needed)

## Test plan

- No new tests required. The `src/components/Button.test.tsx` render smoke test
  from plan 001 already exercises rendering and the default `type="button"`; it
  must continue to pass. If plan 001 has not landed and that test file does not
  exist, add a minimal render test mirroring the one in plan 001's Step 6.
- Verification: `pnpm run test` → all pass.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `grep -n "forwardRef" src/components/Button.tsx` returns no matches
- [ ] `grep -n "displayName" src/components/Button.tsx` returns no matches
- [ ] `grep -n "buttonVariants" src/components/Button.tsx` still shows the
      definition and export (unchanged)
- [ ] `pnpm run typecheck` exits 0
- [ ] `pnpm run test` exits 0
- [ ] `pnpm run lint` exits 0
- [ ] Only `src/components/Button.tsx` changed (`git status`)
- [ ] `plans/README.md` status row for 005 updated

## STOP conditions

Stop and report back (do not improvise) if:

- Changing `ButtonProps`'s base type produces a typecheck error in a consumer
  (`ColorPickerPrimitive.tsx` derives `ComponentProps<typeof Button>`); the
  public prop shape should be a superset of before, so an error means something
  subtle changed — report it rather than widening or casting.
- Any consumer of `Button` needs to be edited for this to compile — the public
  API is meant to be unchanged.

## Maintenance notes

- After this lands, **no** component in the library uses `forwardRef`; new
  components should follow the ref-as-prop pattern (`ref` destructured from
  props), matching `Input`/`Slider`/`Button`.
- A reviewer should confirm `ref` still forwards to the underlying `<button>`
  (the render test covers basic rendering; ref forwarding is type-checked via
  `ComponentProps<'button'>`).
  </content>

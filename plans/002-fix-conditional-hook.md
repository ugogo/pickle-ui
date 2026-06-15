# Plan 002: Fix the conditional `useDirection()` hook call in ColorPicker

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat ac25fde..HEAD -- src/components/ColorPickerPrimitive.tsx`
> If that file changed since this plan was written, compare the "Current state"
> excerpt against the live code before proceeding; on a mismatch, treat it as a
> STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: plans/001-test-baseline.md (for the regression test harness)
- **Category**: bug
- **Planned at**: commit `ac25fde`, 2026-06-15

## Why this matters

`ColorPickerImpl` calls a React hook conditionally:

```ts
const dir = dirProp ?? useDirection();
```

The `??` operator short-circuits, so `useDirection()` is invoked **only when the
`dir` prop is absent**. This violates the Rules of Hooks. If a consumer renders
`<ColorPicker dir="ltr" />` and later re-renders the same instance without a
`dir` prop (or vice versa), the number of hooks called changes between renders
and React throws "Rendered more hooks than during the previous render",
crashing the component tree. The bug survives today only because the file is
covered by a blanket `/* eslint-disable */` (addressed in plan 003) that
silences `react-hooks/rules-of-hooks`. The fix is a one-line reordering so the
hook is always called.

## Current state

- `src/components/ColorPickerPrimitive.tsx:1` begins with `/* eslint-disable */`
  — this is why the linter does not already flag the line below. (Re-scoping
  that directive is plan 003; this plan only fixes the hook.)
- The bug, in `ColorPickerImpl` (`src/components/ColorPickerPrimitive.tsx`,
  around lines 323-342):

  ```ts
  function ColorPickerImpl(props: ColorPickerImplProps) {
    const {
      value: valueProp,
      dir: dirProp,
      defaultOpen,
      open: openProp,
      name,
      ref,
      asChild,
      disabled,
      inline,
      modal,
      readOnly,
      required,
      ...rootProps
    } = props;

    const store = useStoreContext(ROOT_IMPL_NAME);

    const dir = dirProp ?? useDirection();   // <-- line 342: conditional hook
  ```

- `useDirection` is imported at the top:
  `import { useDirection } from '@base-ui/react/direction-provider';`
  (`src/components/ColorPickerPrimitive.tsx:4`). It reads React context and is
  safe to call unconditionally; it returns a default direction when no
  `DirectionProvider` is present.
- Convention: this codebase uses React 19 and small, explicit function
  components. Call all hooks unconditionally at the top of the component body.

## Commands you will need

| Purpose   | Command                                                             | Expected on success |
| --------- | ------------------------------------------------------------------- | ------------------- |
| Typecheck | `pnpm run typecheck`                                                | exit 0              |
| Run tests | `pnpm run test`                                                     | all pass            |
| Targeted  | `pnpm exec vitest run src/components/ColorPickerPrimitive.test.tsx` | pass                |
| Lint      | `pnpm run lint`                                                     | exit 0              |

## Scope

**In scope** (the only files you should modify/create):

- `src/components/ColorPickerPrimitive.tsx` — the one-line hook fix only
- `src/components/ColorPickerPrimitive.test.tsx` (create) — regression test

**Out of scope** (do NOT touch):

- The `/* eslint-disable */` directive on line 1 — that is plan 003's job. Leave
  it in place for this plan.
- Any other logic in `ColorPickerImpl` (the `value`/`open` sync effects, the
  context memo, the render branches). Change only the `dir` assignment.

## Git workflow

- Branch: `advisor/002-fix-conditional-hook`
- Conventional Commits. Example: `fix(color-picker): call useDirection unconditionally`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Make the hook call unconditional

In `src/components/ColorPickerPrimitive.tsx`, change:

```ts
const dir = dirProp ?? useDirection();
```

to:

```ts
const contextDir = useDirection();
const dir = dirProp ?? contextDir;
```

This calls `useDirection()` on every render regardless of the `dir` prop, then
applies the prop override with the same `??` semantics. Behavior for consumers
is unchanged; only the hook-ordering bug is removed.

**Verify**:

- `grep -n "useDirection()" src/components/ColorPickerPrimitive.tsx` → the call
  appears on its own line (a `const contextDir = useDirection();` line), NOT to
  the right of `??`.
- `pnpm run typecheck` → exit 0.

### Step 2: Add a regression test

Create `src/components/ColorPickerPrimitive.test.tsx`. This test re-renders the
same `ColorPicker` instance switching the `dir` prop from present to absent —
which crashes with the old conditional-hook code and passes with the fix.

```tsx
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ColorPicker } from './ColorPickerPrimitive';

describe('ColorPicker hook stability', () => {
  it('does not change hook count when the dir prop is added or removed', () => {
    const { rerender } = render(<ColorPicker dir="ltr" />);
    // Re-rendering the same instance without `dir` must not throw
    // "Rendered more/fewer hooks than during the previous render".
    expect(() => rerender(<ColorPicker />)).not.toThrow();
    expect(() => rerender(<ColorPicker dir="rtl" />)).not.toThrow();
  });
});
```

**Verify**: `pnpm exec vitest run src/components/ColorPickerPrimitive.test.tsx`
→ the test passes.

### Step 3: Run all gates

**Verify**:

- `pnpm run test` → all pass
- `pnpm run typecheck` → exit 0
- `pnpm run lint` → exit 0
- `pnpm run format:check` → exit 0 (run `pnpm run format` first if it fails)

## Test plan

- New file `src/components/ColorPickerPrimitive.test.tsx` — one regression test
  that toggles the `dir` prop across re-renders of one instance. With the bug
  present this throws a React hooks error; with the fix it does not.
- Model after `src/components/Button.test.tsx` (created in plan 001) for the
  RTL `render`/`rerender` structure.
- Verification: `pnpm run test` → all pass including the new test.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `grep -n "dirProp ?? useDirection()" src/components/ColorPickerPrimitive.tsx`
      returns **no** matches (the inline conditional call is gone)
- [ ] `grep -n "const contextDir = useDirection();" src/components/ColorPickerPrimitive.tsx`
      returns one match
- [ ] `pnpm run test` exits 0; the new regression test exists and passes
- [ ] `pnpm run typecheck` exits 0
- [ ] `pnpm run lint` exits 0
- [ ] Only the two in-scope files are modified/created (`git status`)
- [ ] `plans/README.md` status row for 002 updated

## STOP conditions

Stop and report back (do not improvise) if:

- The `dir` assignment in `ColorPickerImpl` no longer matches the excerpt in
  "Current state" (the file has drifted; plan 003 or another change may have
  already touched it).
- The regression test in Step 2 fails even **after** the Step 1 fix — that means
  the crash has a different root cause than the conditional hook; report it.
- Making the hook unconditional changes any other typecheck or test result —
  it should be behavior-preserving.

## Maintenance notes

- After plan 003 re-scopes the eslint-disable on this file,
  `react-hooks/rules-of-hooks` will guard this line going forward; a reviewer
  should confirm lint passes once 003 lands.
- Any future hook added to `ColorPickerImpl` must also be called
  unconditionally at the top of the component, before the early `if (inline)`
  return branch.
  </content>

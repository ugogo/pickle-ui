# Plan 001: Establish a Vitest test baseline with characterization tests for color math

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat ac25fde..HEAD -- package.json vite.config.ts src/lib/color.ts .github/workflows/ci.yml`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: LOW
- **Depends on**: none
- **Category**: tests
- **Planned at**: commit `ac25fde`, 2026-06-15

## Why this matters

The repository has **zero runtime tests**. CI runs only lint, format-check, and
typecheck (`.github/workflows/ci.yml`), and `package.json` has no `test` script.
The most fragile code — the color-space conversion math in `src/lib/color.ts` —
was recently rewritten to use the `culori` library (commit `94ce287`) with no
test safety net, and the sliders were migrated (commit `051ccc3`) the same way.
Every future change to color math or component state is currently unverifiable
except by hand in Storybook. This plan stands up a one-command test runner and
writes characterization tests that pin the current, correct behavior of the
pure color functions — making plans 002 and 004 safe to execute. It is the
prerequisite for confident iteration on this codebase.

## Current state

- `package.json` — no `test` script today. Scripts block (`package.json:19-31`):
  ```json
  "scripts": {
    "dev": "storybook dev -p 6006",
    "build": "tsc -p tsconfig.build.json && tsc-alias -p tsconfig.build.json",
    "typecheck": "tsc --noEmit",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "doctor": "react-doctor",
    "prepare": "husky"
  },
  ```
- `vite.config.ts` is currently **empty**:

  ```ts
  import { defineConfig } from 'vite';

  export default defineConfig({});
  ```

- The `@/*` import alias maps to `./src/*` — declared in `tsconfig.json:25-27`:
  ```json
  "paths": {
    "@/*": ["./src/*"]
  }
  ```
  Vitest does NOT read `tsconfig` paths automatically, so the alias must be
  added to `vite.config.ts` (see Step 2).
- `tsconfig.build.json:4-10` already excludes `*.test.ts` / `*.test.tsx` from
  the library build, so test files will not leak into `dist`. Do not change it.
- `src/lib/color.ts` is the pure module under test. Its exported functions:
  `hexToRgb`, `rgbToHex`, `rgbToHsv`, `hsvToRgb`, `rgbToHsl`, `hslToRgb`,
  `colorToString`, `parseColorString`, `isColorEqual`, `isHsvEqual`, plus types
  `ColorValue` (`{ r, g, b, a }`, RGB channels 0–255, alpha 0–1) and
  `HSVColorValue` (`{ h, s, v, a }`, h in degrees 0–360, s/v in percent 0–100).
  Relevant signatures (from `src/lib/color.ts`):
  ```ts
  export function hexToRgb(hex: string, alpha?: number): ColorValue;
  export function rgbToHex(color: ColorValue): string;
  export function rgbToHsv(color: ColorValue): HSVColorValue;
  export function hsvToRgb(hsv: HSVColorValue): ColorValue;
  export function rgbToHsl(color: ColorValue): {
    h: number;
    s: number;
    l: number;
  };
  export function hslToRgb(
    hsl: { h: number; s: number; l: number },
    alpha?: number,
  ): ColorValue;
  export function colorToString(
    color: ColorValue,
    format?: ColorFormat,
  ): string;
  export function parseColorString(value: string): ColorValue | null;
  ```
- Conventions to match: TypeScript, single quotes (`prettier.config.mjs` sets
  `singleQuote: true`), ES modules, named exports, the `@/` alias for
  cross-directory imports. Test files live next to source as `*.test.ts` /
  `*.test.tsx` (the build already anticipates this naming).

## Commands you will need

| Purpose      | Command                 | Expected on success      |
| ------------ | ----------------------- | ------------------------ |
| Install deps | `pnpm add -D <pkgs>`    | exit 0, lockfile updated |
| Typecheck    | `pnpm run typecheck`    | exit 0, no output        |
| Lint         | `pnpm run lint`         | exit 0, no output        |
| Format check | `pnpm run format:check` | exit 0                   |
| Run tests    | `pnpm run test`         | all tests pass           |

## Scope

**In scope** (the only files you should create or modify):

- `package.json` — add `test` script + dev dependencies
- `vite.config.ts` — add Vitest config + `@` alias
- `src/lib/color.test.ts` (create) — characterization tests
- `src/components/Button.test.tsx` (create) — one render smoke test
- `.github/workflows/ci.yml` — add a test step
- `src/test-setup.ts` (create) — Testing Library / jest-dom setup

**Out of scope** (do NOT touch, even though they look related):

- `src/lib/color.ts` — do not change the implementation in this plan. If a test
  reveals a bug, record it; the hue-preservation fix is plan 004's job.
- `tsconfig.build.json` — already excludes test files; leave it.
- Any component source file other than adding the one Button smoke test.

## Git workflow

- Branch: `advisor/001-test-baseline`
- Conventional Commits (see `AGENTS.md`). Example messages:
  `build: add vitest and testing-library`, `test(color): add characterization tests`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Add test dependencies

Run:

```
pnpm add -D vitest@^3 jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom @vitejs/plugin-react
```

**Verify**: `pnpm ls vitest @testing-library/react jsdom` → all three listed, exit 0.

### Step 2: Configure Vitest in `vite.config.ts`

Replace the entire contents of `vite.config.ts` with:

```ts
/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
  },
});
```

**Verify**: `pnpm run typecheck` → exit 0.

### Step 3: Create the Testing Library setup file

Create `src/test-setup.ts`:

```ts
import '@testing-library/jest-dom/vitest';
```

### Step 4: Add the `test` script

In `package.json` scripts, add a `test` entry (place it after `format:check`):

```json
"test": "vitest run",
```

**Verify**: `pnpm run test` → exits 0 with "No test files found" (or runs the
tests added below if you have already created them).

### Step 5: Write characterization tests for `src/lib/color.ts`

Create `src/lib/color.test.ts`. These assert the **current, correct** behavior
of unambiguous conversions. Use `vitest`'s `describe`/`it`/`expect`. Match the
single-quote style.

```ts
import { describe, expect, it } from 'vitest';

import {
  colorToString,
  hexToRgb,
  hslToRgb,
  hsvToRgb,
  parseColorString,
  rgbToHex,
  rgbToHsl,
  rgbToHsv,
} from './color';

describe('hex <-> rgb', () => {
  it('parses a primary hex to rgb', () => {
    expect(hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0, a: 1 });
  });

  it('applies an explicit alpha', () => {
    expect(hexToRgb('#ff0000', 0.5)).toEqual({ r: 255, g: 0, b: 0, a: 0.5 });
  });

  it('falls back to black for an unparseable string', () => {
    expect(hexToRgb('not-a-color')).toEqual({ r: 0, g: 0, b: 0, a: 1 });
  });

  it('serializes rgb back to hex', () => {
    expect(rgbToHex({ r: 255, g: 0, b: 0, a: 1 })).toBe('#ff0000');
  });
});

describe('rgb <-> hsv', () => {
  it('converts a primary to hsv', () => {
    expect(rgbToHsv({ r: 255, g: 0, b: 0, a: 1 })).toEqual({
      h: 0,
      s: 100,
      v: 100,
      a: 1,
    });
  });

  it('converts hsv green back to rgb', () => {
    expect(hsvToRgb({ h: 120, s: 100, v: 100, a: 1 })).toEqual({
      r: 0,
      g: 255,
      b: 0,
      a: 1,
    });
  });

  // Documents CURRENT behavior: achromatic colors report hue 0 (red).
  // Plan 004 changes this to preserve a caller-supplied hue. When 004 lands,
  // this assertion is expected to be updated there.
  it('reports hue 0 for white (achromatic)', () => {
    expect(rgbToHsv({ r: 255, g: 255, b: 255, a: 1 })).toEqual({
      h: 0,
      s: 0,
      v: 100,
      a: 1,
    });
  });
});

describe('rgb <-> hsl', () => {
  it('converts a primary to hsl', () => {
    expect(rgbToHsl({ r: 255, g: 0, b: 0, a: 1 })).toEqual({
      h: 0,
      s: 100,
      l: 50,
    });
  });

  it('converts hsl green back to rgb', () => {
    expect(hslToRgb({ h: 120, s: 100, l: 50 })).toEqual({
      r: 0,
      g: 255,
      b: 0,
      a: 1,
    });
  });
});

describe('parseColorString', () => {
  it('parses an rgb() string', () => {
    expect(parseColorString('rgb(255, 0, 0)')).toEqual({
      r: 255,
      g: 0,
      b: 0,
      a: 1,
    });
  });

  it('parses an hsb() string (handled by the custom parser)', () => {
    expect(parseColorString('hsb(120, 100%, 100%)')).toEqual({
      r: 0,
      g: 255,
      b: 0,
      a: 1,
    });
  });

  it('returns null for an unparseable string', () => {
    expect(parseColorString('definitely not a color')).toBeNull();
  });
});

describe('colorToString', () => {
  it('formats opaque rgb without the alpha channel', () => {
    expect(colorToString({ r: 255, g: 0, b: 0, a: 1 }, 'rgb')).toBe(
      'rgb(255, 0, 0)',
    );
  });

  it('formats translucent rgb with the alpha channel', () => {
    expect(colorToString({ r: 255, g: 0, b: 0, a: 0.5 }, 'rgb')).toBe(
      'rgba(255, 0, 0, 0.5)',
    );
  });

  it('defaults to hex', () => {
    expect(colorToString({ r: 0, g: 0, b: 0, a: 1 })).toBe('#000000');
  });
});
```

**Verify**: `pnpm run test` → all tests in `color.test.ts` pass.

> If any assertion above fails because the function genuinely returns a
> different value, this is a STOP condition (see below): the implementation may
> have drifted from when this plan was written. Do not "fix" the test to match
> an unexpected output without reporting first.

### Step 6: Write one component render smoke test

Create `src/components/Button.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from './Button';

describe('Button', () => {
  it('renders its children and defaults to type="button"', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
  });
});
```

**Verify**: `pnpm run test` → all tests pass (color + button).

### Step 7: Add a test job step to CI

In `.github/workflows/ci.yml`, after the existing "Typecheck" step (the last
step, `pnpm run typecheck`), add:

```yaml
- name: Test
  run: pnpm run test
```

Keep the same indentation as the surrounding steps (6 spaces before `- name`).

**Verify**: `grep -n "pnpm run test" .github/workflows/ci.yml` → returns one match.

### Step 8: Format and final checks

Run `pnpm run format` to normalize the new files, then run all gates.

**Verify**:

- `pnpm run format:check` → exit 0
- `pnpm run lint` → exit 0
- `pnpm run typecheck` → exit 0
- `pnpm run test` → all pass

## Test plan

- New file `src/lib/color.test.ts` — covers hex/rgb/hsv/hsl round-trips for
  primaries, alpha handling, the achromatic-hue current behavior (cross-linked
  to plan 004), `parseColorString` happy paths + null, and `colorToString`
  alpha/format branches.
- New file `src/components/Button.test.tsx` — render smoke test establishing the
  React Testing Library pattern other component tests will follow.
- There is no existing test to model after — these files **are** the pattern
  future tests follow. Keep them simple and explicit.
- Verification: `pnpm run test` → all pass.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `pnpm run test` exits 0 and runs at least the two new test files
- [ ] `pnpm run typecheck` exits 0
- [ ] `pnpm run lint` exits 0
- [ ] `pnpm run format:check` exits 0
- [ ] `grep -n "\"test\"" package.json` shows the new script
- [ ] `grep -n "pnpm run test" .github/workflows/ci.yml` returns a match
- [ ] No files outside the in-scope list are modified (`git status`)
- [ ] `plans/README.md` status row for 001 updated

## STOP conditions

Stop and report back (do not improvise) if:

- A characterization assertion in Step 5 fails because the function returns a
  value different from the one written here (the implementation has drifted
  since this plan was written — do not edit the test to match without
  reporting).
- `@vitejs/plugin-react` or `vitest@^3` fails to install or is incompatible
  with the installed Vite version — report the version conflict rather than
  downgrading other dependencies.
- Adding the `react()` plugin breaks `pnpm run build` or Storybook — these
  should be unaffected, so a failure means the config bled where it shouldn't.

## Maintenance notes

- When plan 004 (achromatic hue preservation) lands, the "reports hue 0 for
  white" test in Step 5 must be updated there — it documents the very behavior
  004 changes.
- Future component tests should follow `Button.test.tsx`'s structure (RTL
  `render` + role queries).
- A reviewer should confirm the Vitest `react()` plugin and the `test` block do
  not alter library build output (`dist/`).
  </content>
  </invoke>

# Plan 004: Preserve hue when a color becomes achromatic in the color picker

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat ac25fde..HEAD -- src/lib/color.ts src/components/ColorPickerPrimitive.tsx`
> If either changed since this plan was written, compare the "Current state"
> excerpts against the live code before proceeding; on a mismatch treat it as a
> STOP condition.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: MED
- **Depends on**: plans/001-test-baseline.md
- **Category**: bug
- **Planned at**: commit `ac25fde`, 2026-06-15

## Why this matters

In HSV/HSB color, **hue is undefined for achromatic colors** (pure grey, white,
black, or any color with saturation 0 or value 0). `culori` returns an undefined
hue for these, and `rgbToHsv` in `src/lib/color.ts` coerces that to `0` (red):

```ts
h: Math.round(hsv.h ?? 0),
```

Several color-picker code paths derive HSV from an RGB color by calling
`rgbToHsv(newColor)` with no memory of the previous hue: typing into the input
fields, using the eyedropper, and syncing a controlled `value` prop. So when a
user edits a color toward grey (e.g. drags saturation to 0, or types `#808080`),
the stored hue snaps to 0 and the saturation/value **area marker jumps to the
red corner**. Re-saturating then produces red instead of the hue the user had.
The picker already keeps a separate `hsv` field in its store precisely to
preserve hue across achromatic states — but the RGB-derived paths discard it.

The fix: let `rgbToHsv` accept a fallback hue to use when the result is
achromatic, and have the three lossy call sites pass the previously-known hue.

## Current state

- The lossy coercion in `src/lib/color.ts` (`rgbToHsv`, lines ~111-120):

  ```ts
  export function rgbToHsv(color: ColorValue): HSVColorValue {
    const hsv = toHsv(toCuloriRgb(color));

    return {
      h: Math.round(hsv.h ?? 0),
      s: Math.round(hsv.s * 100),
      v: Math.round(hsv.v * 100),
      a: alphaToValue(hsv.alpha),
    };
  }
  ```

  `toHsv` is `converter('hsv')` from culori; `hsv.h` is `undefined` for
  achromatic input.

- The store keeps `hsv` as first-class state (`StoreState` in
  `src/components/ColorPickerPrimitive.tsx`):

  ```ts
  interface StoreState {
    color: ColorValue;
    hsv: HSVColorValue;
    open: boolean;
    format: ColorFormat;
  }
  ```

- Three call sites lose hue (line numbers approximate; confirm against the live
  file). All currently call `rgbToHsv(<rgb>)` with no fallback:

  1. **Input fields** — `ColorPickerInput`'s `onColorChange`
     (`src/components/ColorPickerPrimitive.tsx`, ~882-888). It already has the
     current `hsv` in scope (selected a few lines above via
     `const hsv = useStore((state) => state.hsv);`):

     ```ts
     const onColorChange = React.useCallback(
       (newColor: ColorValue) => {
         const newHsv = rgbToHsv(newColor);
         store.setValue(newColor, newHsv);
       },
       [store],
     );
     ```

  2. **Eyedropper** — `ColorPickerEyeDropper.onEyeDropper`
     (`src/components/ColorPickerPrimitive.tsx`, ~782-798). It has `color` in
     scope but NOT `hsv` today:

     ```ts
     const newColor = hexToRgb(result.sRGBHex, currentAlpha);
     const newHsv = rgbToHsv(newColor);
     store.setValue(newColor, newHsv);
     ```

  3. **Controlled value sync** — the `useIsomorphicLayoutEffect` in
     `ColorPickerImpl` (`src/components/ColorPickerPrimitive.tsx`, ~350-359). It
     has `currentState` in scope:
     ```ts
     useIsomorphicLayoutEffect(() => {
       if (valueProp !== undefined) {
         const currentState = store.getState();
         const color =
           parseColorString(valueProp) ??
           hexToRgb(valueProp, currentState.color.a);
         const hsv = rgbToHsv(color);
         store.setValue(color, hsv, { emit: false });
       }
     }, [valueProp]);
     ```

- Paths that already preserve hue (do NOT change them): the area drag
  (`updateColorFromPosition` builds HSV from stored `hsv?.h`), the hue slider
  (sets `h` explicitly), and the alpha slider (`{ ...hsv, a }`).

- Conventions: pure helpers live in `src/lib/color.ts`; the component reads
  state via `useStore(selector)`. Keep `rgbToHsv` backward-compatible (a new
  optional parameter), so existing callers and the characterization test from
  plan 001 keep working unchanged.

## Commands you will need

| Purpose   | Command                                      | Expected |
| --------- | -------------------------------------------- | -------- |
| Typecheck | `pnpm run typecheck`                         | exit 0   |
| Tests     | `pnpm run test`                              | all pass |
| Targeted  | `pnpm exec vitest run src/lib/color.test.ts` | pass     |
| Lint      | `pnpm run lint`                              | exit 0   |

## Scope

**In scope** (the only files you should modify):

- `src/lib/color.ts` — add an optional `fallbackHue` parameter to `rgbToHsv`
- `src/components/ColorPickerPrimitive.tsx` — pass the previous hue at the three
  lossy call sites
- `src/lib/color.test.ts` — add assertions for the new fallback behavior

**Out of scope** (do NOT touch):

- The area / hue-slider / alpha-slider code paths — they already preserve hue.
- `rgbToHsl` / `hslToRgb` — HSL hue handling is not part of this plan.
- The `setValue` store method's change-detection logic.

## Git workflow

- Branch: `advisor/004-preserve-hue-achromatic`
- Conventional Commits. Example: `fix(color-picker): preserve hue for achromatic colors`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Add a `fallbackHue` parameter to `rgbToHsv`

In `src/lib/color.ts`, change `rgbToHsv` to accept an optional fallback hue used
only when culori reports no hue:

```ts
export function rgbToHsv(color: ColorValue, fallbackHue = 0): HSVColorValue {
  const hsv = toHsv(toCuloriRgb(color));

  return {
    h: Math.round(hsv.h ?? fallbackHue),
    s: Math.round(hsv.s * 100),
    v: Math.round(hsv.v * 100),
    a: alphaToValue(hsv.alpha),
  };
}
```

This is backward-compatible: existing zero-argument callers behave exactly as
before (`fallbackHue` defaults to 0).

**Verify**: `pnpm run typecheck` → exit 0; `pnpm exec vitest run src/lib/color.ts` is not a test — instead run `pnpm exec vitest run src/lib/color.test.ts` → existing color tests still pass.

### Step 2: Pass the previous hue at the input call site

In `ColorPickerInput`'s `onColorChange`
(`src/components/ColorPickerPrimitive.tsx`), pass the in-scope `hsv.h` as the
fallback, and add `hsv` to the dependency array:

```ts
const onColorChange = React.useCallback(
  (newColor: ColorValue) => {
    const newHsv = rgbToHsv(newColor, hsv?.h ?? 0);
    store.setValue(newColor, newHsv);
  },
  [hsv, store],
);
```

(`hsv` is already selected in `ColorPickerInput` via
`const hsv = useStore((state) => state.hsv);` — confirm it is present; if not,
that is a drift STOP condition.)

**Verify**: `pnpm run typecheck` → exit 0.

### Step 3: Pass the previous hue at the eyedropper call site

In `ColorPickerEyeDropper`, the component currently selects `color` but not
`hsv`. Add an `hsv` selector alongside it:

```ts
const color = useStore((state) => state.color);
const hsv = useStore((state) => state.hsv);
```

Then in `onEyeDropper`, pass the fallback and add `hsv` to the dependency array:

```ts
const newColor = hexToRgb(result.sRGBHex, currentAlpha);
const newHsv = rgbToHsv(newColor, hsv?.h ?? 0);
store.setValue(newColor, newHsv);
```

Update the `onEyeDropper` `useCallback` dependency array to include `hsv`.

**Verify**: `pnpm run typecheck` → exit 0; `pnpm run lint` → exit 0 (no
`exhaustive-deps` warning for the new `hsv` dependency — note this file's lint
status depends on whether plan 003 has landed; if 003 has not landed the file is
still blanket-disabled and lint will not check it, which is acceptable here).

### Step 4: Pass the previous hue at the controlled-value sync

In the `useIsomorphicLayoutEffect` in `ColorPickerImpl`, use the current state's
hue as the fallback:

```ts
const hsv = rgbToHsv(color, currentState.hsv.h);
```

**Verify**: `pnpm run typecheck` → exit 0.

### Step 5: Add tests for the new behavior

Append to `src/lib/color.test.ts`:

```ts
describe('rgbToHsv hue preservation', () => {
  it('uses the fallback hue for an achromatic color', () => {
    // White has no intrinsic hue; without a fallback it reports 0.
    expect(rgbToHsv({ r: 255, g: 255, b: 255, a: 1 }, 200)).toEqual({
      h: 200,
      s: 0,
      v: 100,
      a: 1,
    });
  });

  it('ignores the fallback when the color has a real hue', () => {
    expect(rgbToHsv({ r: 0, g: 255, b: 0, a: 1 }, 200)).toEqual({
      h: 120,
      s: 100,
      v: 100,
      a: 1,
    });
  });

  it('still defaults to hue 0 with no fallback (backward compatible)', () => {
    expect(rgbToHsv({ r: 128, g: 128, b: 128, a: 1 })).toMatchObject({ h: 0 });
  });
});
```

The plan-001 test "reports hue 0 for white (achromatic)" remains valid and
should keep passing — do not modify it.

**Verify**: `pnpm exec vitest run src/lib/color.test.ts` → all pass, including
the three new assertions.

### Step 6: Full verification

**Verify**:

- `pnpm run test` → all pass
- `pnpm run typecheck` → exit 0
- `pnpm run lint` → exit 0
- `pnpm run format:check` → exit 0 (run `pnpm run format` if needed)

## Test plan

- Extend `src/lib/color.test.ts` with a `rgbToHsv hue preservation` block:
  fallback used for achromatic input, fallback ignored for chromatic input, and
  backward-compatible default. These are the unit-level guard for the fix.
- (Optional, only if straightforward) a component-level regression in
  `src/components/ColorPickerPrimitive.test.tsx`: render an uncontrolled
  `ColorPicker`, drive the input toward a grey value, and assert the stored hue
  did not reset — but the unit tests above are the required coverage; skip the
  component test if the store is not easily observable from outside.
- Verification: `pnpm run test` → all pass.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `grep -n "fallbackHue" src/lib/color.ts` shows the new parameter
- [ ] `grep -n "rgbToHsv(newColor, " src/components/ColorPickerPrimitive.tsx`
      returns matches for the input and eyedropper sites
- [ ] `grep -n "rgbToHsv(color, currentState.hsv.h)" src/components/ColorPickerPrimitive.tsx`
      returns one match
- [ ] `pnpm run test` exits 0; the three new `rgbToHsv` assertions pass
- [ ] `pnpm run typecheck` exits 0
- [ ] `pnpm run lint` exits 0
- [ ] Only the three in-scope files changed (`git status`)
- [ ] `plans/README.md` status row for 004 updated

## STOP conditions

Stop and report back (do not improvise) if:

- `ColorPickerInput` does not already select `hsv` from the store, or any of the
  three call-site excerpts in "Current state" no longer match the live file (the
  component has been refactored since this plan was written).
- A new test fails because culori reports a different value than written (e.g.
  `rgbToHsv` of pure green is not `h:120` — the conversion library may have
  changed). Report the actual value rather than editing the assertion blindly.
- The change would require modifying the area/hue-slider/alpha-slider paths to
  work — it should not; those already preserve hue.

## Maintenance notes

- If a future change makes the store keep a canonical "last non-zero hue"
  separately, the per-call-site fallback here could be centralized into
  `setValue`; note that the hue slider must still be able to set hue while
  saturation is 0, so any centralization must not clobber explicit hue updates.
- A reviewer should verify the three call sites pass a _previous_ hue (not a
  freshly recomputed one) and that the area marker no longer jumps to red when
  the color goes grey (manual check in Storybook).
  </content>

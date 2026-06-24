# Plan 008: Round out the form elements — Label, Checkbox, RadioGroup, Field

> **Executor instructions**: Follow this plan step by step. Match the existing
> component conventions — read `Switch.tsx` closely; it is the template for a
> Base-UI control with an optional `label` prop and a compound `.Label` part.
> Run every verification command before moving on. Honor the STOP conditions.
> When done, update this plan's status row in `plans/README.md`. The four
> components are independent enough to land as **separate commits** in the order
> below.
>
> **Drift check (run first)**: `git diff --stat d742bcc..HEAD -- src/components src/index.ts`
> Re-derive conventions from the live `Switch.tsx`/`Input.tsx` if they changed.

## Status

- **Priority**: P2
- **Effort**: L
- **Risk**: LOW
- **Depends on**: plans/010-new-components.md (branch from `cursor/new-components-e448`
  so Form/InputGroup stories can use `InputGroup.Addon`; rebase onto `main` after 010
  merges)
- **Category**: feat
- **Planned at**: commit `d742bcc`, 2026-06-16 (reconciled 2026-06-24 — components
  landed under `src/components/form/`; remaining work is public exports + README)
- **Branch**: `cursor/form-elements-e448`

## Why this matters

pickle-ui has `Input`, `Select`, `Slider`, and `Switch`, but the form story has
two gaps that block building anything like `../pane` (a settings/forms-heavy app):

1. **No selection controls** — there is no `Checkbox` or `RadioGroup`, the two
   most common settings inputs after `Switch`.
2. **No labeling / validation layer** — labels are ad-hoc (`Switch` bakes its own
   `SwitchLabel`; `Input` has none). There is no shared way to attach an
   accessible label, description, and error message to a control.

Base UI provides all the primitives (confirmed present): `@base-ui/react/field`,
`@base-ui/react/checkbox`, `@base-ui/react/radio-group`, `@base-ui/react/radio`,
`@base-ui/react/fieldset`. Each is one wrapper away given the established compound
pattern. The repo's own audit flagged this (`plans/README.md` → "Round out the
primitive set — Checkbox, RadioGroup …").

## Current state — conventions to match

> **Reconciliation (2026-06-24)**: Checkbox, RadioGroup, Field, Label, and Form
> already exist under `src/components/form/` (not the paths below). Checkbox and
> RadioGroup are exported from `src/index.ts`. **Label and Field are not yet
> exported** from the public API — that is the primary remaining work for this
> plan. Do not rebuild components that already pass tests.

- `Switch.tsx` is the reference: a Base UI control (`SwitchPrimitive.Root` from
  `@base-ui/react/switch`, with `'use client'`), styled with `cn` + design tokens,
  `data-slot` attributes, `data-size` for the size variant, an optional `label`
  prop + `labelClassName` that auto-wires `htmlFor`/`id` via `React.useId`, and a
  compound `Switch.Label` exposed through `Object.assign`.
- Icons come from `@tabler/icons-react` (`iconLibrary: "tabler"` in
  `components.json`): use `IconCheck` (checkbox checked), `IconMinus` (checkbox
  indeterminate). The radio indicator is a CSS dot, no icon needed.
- React 19 ref-as-prop; sizes mirror `Switch` (`'default' | 'sm'`).
- Stories use the `Story.Layout`/`Section`/`Matrix` helpers (`./Story`) with the
  `pseudo-states` addon for `focus`/`hover` columns (`Switch.stories.tsx`).

## Components to build (one commit each)

### 1. `Label` — `src/components/Label.tsx`

Standalone form label for controls used **outside** a `Field` (e.g. next to an
`Input`). Base UI has no standalone Label, so render a styled `<label>` mirroring
`SwitchLabel`'s classes (text-sm, font-medium, `peer-disabled` dimming,
`select-none`). `data-slot="label"`. `htmlFor` required (typed like
`SwitchLabelProps`). Export `{ Label }` + `type { LabelProps }`.

**Verify**: `pnpm run typecheck` exit 0; `Label` test passes; commit.

### 2. `Checkbox` — `src/components/Checkbox.tsx`

`'use client'`. Wrap `@base-ui/react/checkbox` (`Checkbox.Root` + `Checkbox.Indicator`).

- Box: bordered square, `data-checked:bg-primary`, `focus-ring`,
  `aria-invalid:*` + `data-disabled:*` states — adapt the exact token classes
  from `SwitchControl`.
- Indicator renders `IconCheck`, or `IconMinus` when `indeterminate`.
- `size?: 'default' | 'sm'` via `data-size` (match Switch sizing).
- Optional `label?` + `labelClassName?`: when present, render box + `Checkbox.Label`
  in a flex row wired by `useId`, exactly like `SwitchRoot`. Compound
  `Checkbox.Label` via `Object.assign`.
- Support `indeterminate` (Base UI Checkbox `indeterminate` prop).

Export `{ Checkbox }` + `type { CheckboxProps, CheckboxLabelProps }`.

**Verify**: `pnpm run typecheck` exit 0; Checkbox tests pass (toggle, label click,
indeterminate); commit.

### 3. `RadioGroup` + `RadioGroup.Item` — `src/components/RadioGroup.tsx`

`'use client'`. Wrap `@base-ui/react/radio-group` (`RadioGroup`) and
`@base-ui/react/radio` (`Radio.Root` + `Radio.Indicator`).

- `RadioGroup` root: vertical stack (`grid gap-2`), passes through value/defaultValue.
- `RadioGroup.Item`: circular control, `data-checked` filled dot indicator,
  `focus-ring`, disabled/invalid states; optional per-item `label` wired with
  `useId` (same ergonomics as Checkbox). Attach as `RadioGroup.Item` via
  `Object.assign` (AGENTS.md: attach parts to parent, not a parallel `RadioItem`).

Export `{ RadioGroup }` + `type { RadioGroupProps, RadioGroupItemProps }`.

**Verify**: `pnpm run typecheck` exit 0; RadioGroup tests pass (single-selection,
roving focus); commit.

### 4. `Field` — `src/components/Field.tsx`

`'use client'`. Wrap `@base-ui/react/field` to provide the labeling/validation
layer that wires an accessible label, description, and error to **any** control
(the existing `Input`/`Select` and the new Checkbox/Radio).

- `Field` (= `Field.Root`, `grid gap-1.5`), `Field.Label`, `Field.Description`
  (muted, small), `Field.Error` (`text-destructive` small), and `Field.Control`
  passthrough. Style `Label`/`Description`/`Error` consistently with plan 007's
  `Text` `muted`/`small`/`destructive` styles — but inline the classes; do not
  hard-import `Text`.
- Compound via `Object.assign(FieldRoot, { Label, Description, Error, Control })`.

```tsx
<Field>
  <Field.Label>Email</Field.Label>
  <Field.Control render={<Input type="email" />} />
  <Field.Description>We'll never share it.</Field.Description>
  <Field.Error match="valueMissing">Required.</Field.Error>
</Field>
```

Export `{ Field }` + the part prop types.

**Verify**: `pnpm run typecheck` exit 0; Field test passes (`getByLabelText`
resolves a wrapped `Input`); then run the full gate — `pnpm run lint`,
`pnpm run format:check`, `pnpm run build` (new components in `dist/index.d.ts`) —
all exit 0; commit.

## Remaining work (2026-06-24 reconciliation)

Skip steps 2–3 if Checkbox and RadioGroup already pass tests on your branch.

### Step A: Export `Label` from public API

Add to `src/index.ts` (alphabetical, form block):

```tsx
export { Label } from './components/form/Label';
export type { LabelProps } from './components/form/Label';
```

**Verify**: `grep Label src/index.ts`; `pnpm run build` includes `Label` in
`dist/index.d.ts`.

### Step B: Export `Field` from public API

Add compound export:

```tsx
export { Field } from './components/form/Field';
export type {
  FieldControlProps,
  FieldDescriptionProps,
  FieldErrorProps,
  FieldItemProps,
  FieldLabelProps,
  FieldProps,
  FieldValidityProps,
} from './components/form/Field';
```

**Verify**: `Field` test still passes; `pnpm run build` exit 0.

### Step C: Optional — InputGroup.Addon in Form story

If plan 010 landed on your branch, add one `FormInputGroup` example using
`InputGroup.Addon` in `Form.stories.tsx` (prefix icon or `$` addon).

## Scope (reconciled)

**In scope**:

- **Edit** `src/index.ts` — export `Label` and `Field` + types
- **Optional edit** `src/components/form/Form.stories.tsx` — InputGroup.Addon demo

**Out of scope**:

- Rebuilding Checkbox, RadioGroup, Field, Label (already exist under `form/`)
- `Switch.tsx` label refactor
- Changing `Input.tsx` / `Select.tsx` public APIs

## Git workflow

- Branch: `cursor/form-elements-e448` — **create from `cursor/new-components-e448`**
  (not `main`) so 010's InputGroup addons are available; after 010 merges to
  `main`, rebase this branch onto `main` and update PR base
- Single commit: `feat(form): export Label and Field from public API`
- Push: `git push -u origin cursor/form-elements-e448`
- Open draft PR with base branch `cursor/new-components-e448` until 010 merges

## Test plan (vitest + `@testing-library/react`)

- **Label**: clicking it focuses/toggles the associated control via `htmlFor`.
- **Checkbox**: toggles on click; clicking the `label` toggles it; `indeterminate`
  renders `IconMinus` and reports mixed state; `disabled` blocks interaction;
  `className` merges.
- **RadioGroup**: selecting one item deselects the others; `defaultValue` selects;
  arrow-key roving focus works (Base UI behavior — assert checked moves);
  disabled item is skipped.
- **Field**: `Field.Label` is associated with the control (`getByLabelText`
  resolves); `Field.Error` appears only when its `match` validity fails.

## Commands

| Purpose   | Command                 | Expected                                     |
| --------- | ----------------------- | -------------------------------------------- |
| Typecheck | `pnpm run typecheck`    | exit 0                                       |
| Test      | `pnpm run test`         | new form-element tests pass                  |
| Lint      | `pnpm run lint`         | exit 0                                       |
| Format    | `pnpm run format:check` | exit 0 (run `format` if needed)              |
| Build     | `pnpm run build`        | exit 0; new components in `dist/index.d.ts`  |
| Visual    | `pnpm run dev`          | new stories render states via `Story.Matrix` |

## Done criteria

- [ ] `Label`, `Checkbox`, `RadioGroup`, `Field` (+ types) exported from
      `src/index.ts`.
- [ ] Checkbox and RadioGroup use the `'default' | 'sm'` sizing and the optional
      `label` ergonomics consistent with `Switch`.
- [ ] Compound parts attached to parents (`Checkbox.Label`, `RadioGroup.Item`,
      `Field.Label/Description/Error/Control`) — no parallel exports.
- [ ] `Field` wires an accessible label to a wrapped `Input` (test proves
      `getByLabelText`).
- [ ] `typecheck`, `test`, `lint`, `format:check`, `build` all pass.
- [ ] `plans/README.md` row for 008 updated.

## STOP conditions

- A Base UI subpath (`field`, `checkbox`, `radio`, `radio-group`) is missing or its
  part API differs materially from `Field.Root`/`Checkbox.Indicator`/`Radio.Indicator`
  — stop and report; do **not** reintroduce `radix-ui` (AGENTS.md forbids it).
- Wiring `Field.Control` around the existing `Input` requires changing `Input.tsx`'s
  public API — stop and report rather than silently reshaping a shipped component.

## Maintenance notes

- When these land, revisit whether `Switch`'s bespoke label could delegate to the
  shared `Label`/`Field` layer for consistency (follow-up, not part of this plan).
- `Fieldset` (`@base-ui/react/fieldset`, for grouping a set of radios/checkboxes
  under a legend) is a natural next addition but is out of scope here.

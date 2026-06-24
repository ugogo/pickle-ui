# Plan 009: Component design system polish (UI designer review)

> **Executor instructions**: Follow this plan step by step. Run every verification
> command and confirm the expected result before moving to the next step. If
> anything in the "STOP conditions" section occurs, stop and report — do not
> improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 5133872..HEAD -- src/components src/globals.css src/index.ts`
> Compare "Current state" excerpts against live code before proceeding.

## Status

- **Priority**: P1
- **Effort**: L
- **Risk**: MED (Badge variant color shifts are user-visible breaking changes)
- **Depends on**: plans/010-new-components.md (InputGroup addon seams and any new
  compounds should exist before polishing form-adjacent surfaces; branch from
  `cursor/new-components-e448` or `main` after 010 merges)
- **Category**: direction
- **Planned at**: commit `5133872`, 2026-06-24
- **Branch**: `cursor/component-design-polish-e448`

## Why this matters

A senior UI designer review of pickle-ui (component-level, not page layouts)
found a solid compound-API foundation undermined by **token drift** (Badge uses
raw Tailwind palette classes while everything else uses OKLCH semantic tokens),
**inconsistent interaction language** (three different focus/invalid treatments
across Checkbox, Input, and Slider), and **documented states that do not exist**
(Button Active matrix column, Input missing hover that Select already has).

This plan addresses **refinements to existing components only**. Net-new
components (Table, Sidebar, InputGroup addons, etc.) belong in plan 010.

## Current state

### Token break — Badge (`src/components/Badge.tsx`)

```tsx
// Uses design tokens:
success: 'bg-success text-success-foreground';

// Uses raw Tailwind — everything else:
primary: 'bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300';
destructive: 'bg-red-50 text-red-700 ...';
failed: 'bg-red-50 text-red-700 ...'; // duplicate of destructive
```

### Focus divergence

- Shared `@utility focus-ring` in `src/globals.css` — used by Button, Input, Select
- Checkbox/Switch/Radio invalid: `aria-invalid:ring-[3px]` (no offset)
- Slider thumb: `hover:ring-5 focus-visible:ring-5` (no offset, different width)

### Missing states

- `Button.tsx`: no `active:` classes; `Button.stories.tsx` Active column uses
  `pseudo-active` but styles do not respond
- `Input.tsx`: no `enabled:hover:border-ring/50` (Select.Trigger has it)

### Typography inconsistency

- `Text.tsx`: `h1`/`h2` use `font-heading tracking-tight`; `h3`/`h4` do not
- `Popover.tsx`: `PopoverTitle` is raw `<h2 className="text-base font-medium">`;
  `Card.Title` uses `Text variant="h3"` (`text-xl`) — overlay titles are a step
  smaller than card titles for equivalent anatomy

### Size naming split

- Button: `sm | md | lg`
- Select/Switch/Checkbox: `default | sm` (Select trigger uses `data-[size=default]:h-8`)

### Off-grid dimensions

- Switch default: `h-[18px] w-8`
- Slider thumb: `size-4.5`

### Progress indeterminate

- `Progress.stories.tsx` composes `value={null}` with consumer `animate-pulse w-1/3`
  — not built into `Progress.Indicator`

## Commands you will need

| Purpose   | Command              | Expected on success |
| --------- | -------------------- | ------------------- |
| Typecheck | `pnpm run typecheck` | exit 0              |
| Test      | `pnpm run test`      | all pass            |
| Lint      | `pnpm run lint`      | exit 0              |
| Build     | `pnpm run build`     | exit 0              |
| Visual    | `pnpm run dev`       | Storybook matrices  |

## Scope

**In scope**:

- `src/globals.css` — new subtle semantic tokens, `invalid-ring` utility
- `src/components/Badge.tsx`, `Badge.stories.tsx`, `Badge.test.tsx`
- `src/components/Button.tsx`, `Button.stories.tsx`, `Button.test.tsx`
- `src/components/Input.tsx`, `Input.stories.tsx`, `Input.test.tsx`
- `src/components/Text.tsx`, `Text.stories.tsx`
- `src/components/Popover.tsx`
- `src/components/form/Checkbox.tsx`, `Switch.tsx`, `RadioGroup.tsx`
- `src/components/Slider.tsx`
- `src/components/Progress.tsx`, `Progress.stories.tsx`
- `src/components/ScrollArea.tsx`, `ScrollArea.stories.tsx`
- `src/components/form/Select.tsx`
- `src/components/form/Field.tsx`
- `src/components/Card.tsx` (compact density variant only)

**Out of scope**:

- New top-level components (Table, Sidebar, Chart) — plan 010
- `InputGroup` addon slots — plan 010
- Dashboard demo page layout — `src/demo/`
- Re-adding Button `link` variant — intentionally removed in favor of `asChild`

## Git workflow

- Branch: `cursor/component-design-polish-e448` (from `main` after 010 merges, or
  stacked on `cursor/new-components-e448` if doing both before merge)
- Conventional Commits; one commit per phase below
- Do NOT push unless the operator instructed it

## Steps

### Phase 1 — P0: Token and interaction foundation

#### Step 1.1: Add semantic subtle tokens and `invalid-ring`

In `src/globals.css`, add token pairs for status backgrounds (e.g.
`--info-subtle`, `--warning-subtle`, `--destructive-subtle`) in `:root` and
`.dark`. Add `@utility invalid-ring` mirroring `focus-ring` but using
`ring-destructive`.

**Verify**: `pnpm run typecheck` exit 0

#### Step 1.2: Re-tokenize Badge

Replace all raw `sky-*`, `red-*`, `amber-*`, etc. in `badgeVariants` with the
new semantic tokens. Collapse duplicate pairs (`failed` → alias or remove if
breaking; document in commit body). Expand `Badge.stories.tsx` to document
`outline`, `primary`, `secondary`, `destructive` alongside status variants.

**Verify**: `pnpm run test -- Badge` exit 0; Storybook Badge story renders all
variants in light and dark

#### Step 1.3: Unify invalid rings on form controls

Apply `invalid-ring` (or consistent invalid pattern) to Checkbox, Switch,
RadioGroup, Input, Select. Replace Slider thumb `ring-5` with the shared focus
width/offset pattern.

**Verify**: `pnpm run test` exit 0; tab through Form story — focus rings feel
consistent

#### Step 1.4: Button active states

Add per-variant `active:` styles to `buttonVariants`. Confirm `Button.stories.tsx`
Active column (`pseudo-active`) shows visible pressed state.

**Verify**: `pnpm run test -- Button` exit 0

#### Step 1.5: Input hover border

Add `enabled:hover:border-ring/50` to Input (mirror Select.Trigger). Add
hover/focus columns to `Input.stories.tsx` matrix if one exists, or add a States
section.

**Verify**: `pnpm run lint` exit 0

### Phase 2 — P1: Size scale and typography

#### Step 2.1: Standardize size naming

Rename Select/Switch/Checkbox `default` size to `md` internally. Keep `default` as
a deprecated alias mapping to `md` for one release if needed. Document control
height table in a comment at top of `src/globals.css` or `AGENTS.md`.

**Verify**: `pnpm run typecheck` exit 0; no `size="default"` in stories without
still working via alias

#### Step 2.2: Snap Switch and Slider to 4px grid

Switch default → `h-4 w-8` (adjust thumb translate). Slider thumb → `size-4`.
Update stories.

**Verify**: `pnpm run test -- Switch Slider` exit 0

#### Step 2.3: Input size variants

Add `size?: 'sm' | 'md' | 'lg'` to Input matching Button heights (`h-7`/`h-8`/`h-9`).
Update `Input.stories.tsx`.

**Verify**: `pnpm run build` exit 0

#### Step 2.4: Typography alignment

Add `font-heading tracking-tight` to Text `h3`/`h4`. Migrate `Popover.Title` and
`Popover.Description` to use `Text` (`Popover.Title` → `Text as="h2" variant="h4"`
or new `variant="title"` at `text-base` if card hierarchy requires it — document
choice in commit).

**Verify**: `pnpm run lint` exit 0

#### Step 2.5: Progress indeterminate built-in

When `Progress` root `value={null}`, render built-in indeterminate animation on
`Progress.Indicator` (sliding translate or shimmer). Remove consumer-composed
pulse hack from `Progress.stories.tsx`.

**Verify**: `pnpm run test -- Progress` exit 0

### Phase 3 — P2: Polish (optional follow-up commits)

Implement as separate commits if time-boxed; each is independently verifiable:

- Button `loading` prop / `data-loading` spinner slot
- Button icon size tied to button size (`sm → size-3.5`, etc.)
- Card `size="compact"` density variant
- ScrollArea `visibility="hover" | "always" | "scroll"` prop
- `prefers-reduced-motion` guard for Select/Popover animations in `globals.css`
- Field `orientation="horizontal"`
- Switch leading label support
- Select item subtle focus ring alongside accent background

## Test plan

- Extend existing component tests; model after `Button.test.tsx` / `Badge.test.tsx`
- Badge: at least one test per semantic token variant class
- Input: hover class present; size variant height test
- Progress: indeterminate renders `data-indeterminate` on indicator

## Done criteria

- [ ] Badge uses only semantic tokens (no raw `sky-*` / `red-*` in `Badge.tsx`)
- [ ] `invalid-ring` utility exists and is used consistently on form controls
- [ ] Button Active story column shows real `active:` styles
- [ ] Input has hover border feedback matching Select
- [ ] Text `h3`/`h4` and Popover title/description use shared typography
- [ ] Progress indeterminate is built-in, not story-composed
- [ ] `pnpm run typecheck`, `test`, `lint`, `build` all exit 0
- [ ] `plans/README.md` row for 009 updated

## STOP conditions

- Badge re-tokenization requires removing variants consumers rely on — stop and
  report which variants to deprecate rather than silently deleting
- Unifying focus rings requires editing `ColorPickerPrimitive.tsx` — out of scope;
  stop and report
- Select Base UI API does not expose `size` rename path — stop and report

## Maintenance notes

- Badge color changes are **breaking** for apps matching exact Tailwind classes —
  note in PR body
- Button `link` variant was removed intentionally; use `asChild` + `<a>` instead
- After 010 merges, re-run dashboard demo story to confirm polish composes cleanly

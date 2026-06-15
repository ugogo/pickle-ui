# Plan 006: Refresh the README — real component list and pnpm commands

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat ac25fde..HEAD -- README.md src/index.ts package.json`
> If any changed since this plan was written, re-derive the component list from
> the live `src/index.ts` before editing; on a structural mismatch treat it as a
> STOP condition.

## Status

- **Priority**: P3
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: docs
- **Planned at**: commit `ac25fde`, 2026-06-15

## Why this matters

The README is actively wrong in two ways: it lists "Components — Coming soon…"
even though six components ship today, and its Development section uses `npm`
commands (`npm install`, `npm run dev`) when the repo mandates **pnpm**
(`AGENTS.md`: "use `pnpm`, not `npm`/`yarn`"; `package.json` declares
`packageManager: pnpm@10.28.2` and a frozen-lockfile CI). Wrong setup
instructions are worse than missing ones — a new contributor following them
generates an `npm` lockfile the project does not use. This plan corrects the
component list and the commands. It is documentation-only.

## Current state

- The exported public components, from `src/index.ts` (the source of truth —
  re-confirm before editing): `Button`, `ColorPicker`, `Input`, `Popover`,
  `Select`, `Slider`, `Switch`.
- `README.md:29-40` today:

  ````markdown
  ## Components

  - Coming soon...

  ## Development

  ```bash
  npm install
  npm run dev
  npm run build
  npm run typecheck
  ```
  ````

  ```

  ```

- Available scripts (`package.json`): `dev` (Storybook on 6006), `build`,
  `typecheck`, `lint`, `format`, `format:check`, and — once plan 001 lands —
  `test`.
- The library uses compound component APIs (e.g. `Slider.Value`, `Slider.Marks`,
  `Popover.Trigger`, `ColorPicker.Area`). Keep the existing simple `Button`
  usage example; do not invent elaborate examples for components whose exact
  prop shapes you would have to guess.

## Commands you will need

| Purpose      | Command                 | Expected                                                               |
| ------------ | ----------------------- | ---------------------------------------------------------------------- |
| Format check | `pnpm run format:check` | exit 0                                                                 |
| Lint         | `pnpm run lint`         | exit 0 (README is not linted, but run to confirm nothing else changed) |

## Scope

**In scope** (the only file you should modify):

- `README.md`

**Out of scope** (do NOT touch):

- Any source file, `package.json`, or `AGENTS.md`.
- Do not add usage snippets that assert specific prop APIs you have not verified
  against the component source — an out-of-date example is the exact problem this
  plan fixes. List component names; show one minimal, already-correct example.

## Git workflow

- Branch: `advisor/006-refresh-readme`
- Conventional Commits. Example: `docs: list shipped components and use pnpm in README`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Replace the Components section

First confirm the list: `grep -n "^export { " src/index.ts` shows the exported
component names. Replace the "Coming soon…" bullet with the real list (adjust if
`src/index.ts` differs from the names above):

```markdown
## Components

- `Button`
- `ColorPicker`
- `Input`
- `Popover`
- `Select`
- `Slider`
- `Switch`

All components use compound APIs where they have sub-parts — e.g.
`Slider.Value`, `Popover.Trigger`, `ColorPicker.Area`.
```

### Step 2: Fix the Development section to use pnpm

Replace the `npm`-based code block with pnpm commands that match
`package.json` scripts:

````markdown
## Development

This project uses [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm run dev        # Storybook on http://localhost:6006
pnpm run build      # build the library to dist/
pnpm run typecheck
pnpm run test       # added by the test baseline
pnpm run lint
```
````

```

> If plan 001 (the test baseline) has not landed yet, omit the
> `pnpm run test` line — do not reference a script that does not exist. Confirm
> with `grep -n '"test"' package.json`.

### Step 3: Verify

**Verify**:
- `pnpm run format:check` → exit 0 (run `pnpm run format` first if it reformats
  the README).
- `grep -n "npm install\|npm run" README.md` → no matches (all converted to
  pnpm).
- `grep -n "Coming soon" README.md` → no matches.

## Test plan

- No code tests. This is documentation. The verification greps above are the
  acceptance check.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `grep -n "Coming soon" README.md` returns no matches
- [ ] `grep -n "npm install\|npm run" README.md` returns no matches
- [ ] The Components section lists the names exported from `src/index.ts`
- [ ] `pnpm run format:check` exits 0
- [ ] Only `README.md` changed (`git status`)
- [ ] `plans/README.md` status row for 006 updated

## STOP conditions

Stop and report back (do not improvise) if:

- `src/index.ts` exports a meaningfully different set of components than the list
  in "Current state" (more than a name or two off) — re-derive the list and note
  the discrepancy.
- The Installation section's `npm install pickle-ui` is involved: leave the
  *consumer* install example as-is unless the operator asks otherwise (end users
  may use npm/yarn/pnpm); this plan only fixes the **Development** (contributor)
  commands and the component list.

## Maintenance notes

- When new components are added to `src/index.ts`, update the Components list
  here too — consider this the canonical contributor-facing inventory until a
  docs site exists.
- A reviewer should confirm no usage example claims a prop or sub-component that
  does not exist.
</content>
```

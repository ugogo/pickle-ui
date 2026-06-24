# Plan 010: New components and compound parts (demo gaps)

> **Executor instructions**: Follow this plan step by step. Match conventions from
> `Card.tsx`, `Progress.tsx`, and `InputGroup.tsx`. Run every verification
> command before moving on. Honor STOP conditions. When done, update this plan's
> status row in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 5133872..HEAD -- src/components src/index.ts`
> Re-derive from live `InputGroup.tsx` and `globals.css` sidebar tokens if changed.

## Status

- **Priority**: P1
- **Effort**: L
- **Risk**: LOW
- **Depends on**: none
- **Category**: feat
- **Planned at**: commit `5133872`, 2026-06-24
- **Branch**: `cursor/new-components-e448`

## Why this matters

The Demo/Dashboard story and senior UI designer review surfaced **missing
building blocks** that cannot be solved by polishing existing components alone.
Consumers currently hand-roll progress bars, grid-based table rows, sidebar
shells, and input addons — each inconsistent with the library's compound API
conventions.

**Avatar** and **Progress** were added on branch `cursor/demo-dashboard-e448`
(PR #15). This plan covers the **remaining net-new pieces** plus InputGroup
compound extensions. Merge or cherry-pick PR #15 before starting if those
components are not yet on your branch.

## Current state

### Already landed (PR #15 — verify on branch before duplicating)

- `src/components/Avatar.tsx` + stories + tests
- `src/components/Progress.tsx` + stories + tests
- Exported from `src/index.ts`

### InputGroup (`src/components/InputGroup.tsx`)

Flex wrapper with seam logic (`-ms-px`, radius stripping, focus z-index). Only
accepts `Input` children — no addon or button slots.

### Sidebar tokens (`src/globals.css`)

```css
--sidebar: ... --sidebar-foreground: ... --sidebar-primary: ...
  --sidebar-border: ...;
```

No `Sidebar` component consumes them yet.

### Demo gaps (`src/demo/dashboard/Dashboard.tsx`)

- Deployments list uses `Grid` rows — needs `Table`
- Revenue panel uses hand-rolled div bars — needs `Chart` (minimal)
- Navigation uses styled `<aside>` — needs `Sidebar` compound

## Components to build

Build in order; **one conventional commit per component group**.

### 1. InputGroup addons — extend `InputGroup.tsx`

Add compound parts (not parallel exports):

- `InputGroup.Addon` — non-interactive text or icon slot (`text-muted-foreground
border-input bg-muted px-2.5 text-sm`, shared seam/radius with inputs)
- `InputGroup.Button` — `Button` with seam-aware radius (reuse `Button` via
  `asChild` or styled `<button>` matching group focus z-index)

Update `InputGroup.stories.tsx` with prefix (`$`), suffix (`.com`), and icon addon
examples. Update `InputGroup.test.tsx`.

**Verify**: `pnpm run typecheck` exit 0; commit `feat(input-group): add Addon and Button slots`

### 2. `Table` — `src/components/Table.tsx`

Semantic HTML table with compound parts (no Base UI primitive — match shadcn
pattern):

```tsx
<Table>
  <Table.Header>
    <Table.Row>
      <Table.Head>Name</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>…</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>
```

- Wrapper: `relative w-full overflow-auto` (optional inner scroll)
- `Table.Header` → `<thead>` with `[&_tr]:border-b`
- `Table.Body` → `<tbody>` with `[&_tr:last-child]:border-0`
- `Table.Row` → `<tr>` with `hover:bg-muted/50 border-b transition-colors`
- `Table.Head` → `<th>` with `text-muted-foreground h-10 px-4 text-left text-xs font-medium uppercase tracking-wide`
- `Table.Cell` → `<td>` with `p-4 align-middle text-sm`
- Use `Text` for any demo content in stories, not raw typography elements
- `data-slot` on each part

Export `{ Table }` + part prop types from `src/index.ts`.
Ship `Table.stories.tsx` (sortable-looking static example, horizontal scroll) and
`Table.test.tsx` (renders header + row).

**Verify**: `pnpm run build` exit 0; commit `feat(table): add Table component`

### 3. `Sidebar` — `src/components/Sidebar.tsx`

Compound navigation shell consuming sidebar CSS variables:

```tsx
<Sidebar>
  <Sidebar.Header>…</Sidebar.Header>
  <Sidebar.Content>…</Sidebar.Content>
  <Sidebar.Footer>…</Sidebar.Footer>
</Sidebar>
```

- Root: `flex flex-col bg-sidebar text-sidebar-foreground border-sidebar-border
w-64 shrink-0 border-r`
- `Sidebar.Header` / `Sidebar.Footer`: `border-sidebar-border border-b` / `border-t
p-4`
- `Sidebar.Content`: flex-1 overflow hidden; wrap children in `ScrollArea` by
  default or document that consumers should pass `ScrollArea`
- `Sidebar.Group`, `Sidebar.GroupLabel`, `Sidebar.Menu`, `Sidebar.MenuItem` —
  optional but recommended for nav lists (render slots only; no routing logic)

Stories: compose with `Button asChild` + `<a>`, `Avatar`, `ScrollArea` mirroring
demo sidebar anatomy without importing demo code.

**Verify**: commit `feat(sidebar): add Sidebar compound component`

### 4. `Chart` — `src/components/Chart.tsx` (minimal)

Lightweight **bar chart primitive** using existing `--chart-*` tokens — no
recharts/chart.js dependency.

```tsx
<Chart value={series} max={100}>
  <Chart.BarChart>
    <Chart.Bar dataKey="value" />
  </Chart.BarChart>
  <Chart.XAxis />
</Chart>
```

Minimum viable API:

- `Chart` root context holding `{ items: { label: string; value: number }[] }`
- `Chart.BarChart` — flex row of bars, `items-end`, `gap-2`, fixed height container
- `Chart.Bar` — `bg-chart-1` rounded-t bar, height from value/max
- `Chart.XAxis` — row of `Text tone="muted" variant="small"` labels

Keep API small; document that full charting libraries can wrap later. Stories:
monthly revenue bars matching demo data shape.

**Verify**: commit `feat(chart): add minimal bar chart primitive`

## Scope

**In scope**:

- **Edit** `InputGroup.tsx`, `InputGroup.stories.tsx`, `InputGroup.test.tsx`
- **New** `Table.tsx`, `Table.stories.tsx`, `Table.test.tsx`
- **New** `Sidebar.tsx`, `Sidebar.stories.tsx`, `Sidebar.test.tsx`
- **New** `Chart.tsx`, `Chart.stories.tsx`, `Chart.test.tsx`
- **Edit** `src/index.ts` — export new components + types (alphabetical)
- **Edit** `src/globals.css` — add `@source` if new folders need Tailwind scan
  (unlikely under `src/components/`)

**Out of scope**:

- Refining existing component tokens/states — plan 009
- Exporting form `Label`/`Field` — plan 008 completion (branch
  `cursor/form-elements-e448`, depends on this plan)
- Rewriting `src/demo/dashboard/` — optional follow-up after 009+010 land

## Git workflow

- Branch: `cursor/new-components-e448`
- Conventional Commits, one per component group (see steps above)
- Push: `git push -u origin cursor/new-components-e448`
- Open draft PR against `main`

## Test plan

Model after `Card.test.tsx` and `Progress.test.tsx`:

- **Table**: renders `<table>`, header cell text, body cell text
- **Sidebar**: renders root with `data-slot="sidebar"`, header/footer slots
- **Chart**: renders correct number of bars for series length
- **InputGroup.Addon**: renders addon text adjacent to input with shared border

## Done criteria

- [ ] `InputGroup.Addon` and `InputGroup.Button` attached via `Object.assign`
- [ ] `Table`, `Sidebar`, `Chart` exported from `src/index.ts` with types
- [ ] Each new component has `*.stories.tsx` using `Story.Layout` / `Story.Section`
- [ ] `pnpm run typecheck`, `test`, `lint`, `build` all exit 0
- [ ] React Doctor pre-commit score 100/100 (do not commit `storybook-static/`)
- [ ] `plans/README.md` row for 010 updated

## STOP conditions

- PR #15 Avatar/Progress are missing on your branch and you cannot merge/cherry-pick —
  stop and report; do not re-implement duplicates
- Base UI adds an official Table primitive that conflicts — stop and report; prefer
  Base UI if stable
- Chart scope expands beyond bar primitive — stop and split to a follow-up plan

## Maintenance notes

- Plan 008 (`cursor/form-elements-e448`) should branch **from** this branch so
  Form/InputGroup stories can reference `InputGroup.Addon`
- Plan 009 polish should run after 010 merges to avoid rebase churn
- Dashboard demo (`src/demo/`) should be updated in a separate PR once 009+010+008
  are on `main`

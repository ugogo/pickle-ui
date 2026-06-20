# AGENTS.md

Guidance for AI agents (and humans) working in this repository.

## Project

**pickle-ui** — a React component library built with [Base UI](https://base-ui.com), [shadcn/ui](https://ui.shadcn.com), [Tailwind CSS](https://tailwindcss.com) (v4), and [reui](https://github.com/reui/reui). Exported components live in `src/components`, internal building blocks in `src/components/_internal`, shared helpers in `src/lib`, and each exported component ships a `*.stories.tsx` for Storybook.

## Tooling

- **Package manager:** pnpm (use `pnpm`, not `npm`/`yarn`).
- **Dev / Storybook:** `pnpm run dev` (Storybook on port 6006).
- **Typecheck:** `pnpm run typecheck`.
- **Build library:** `pnpm run build`.

## Releases

- Releases run through the manually triggered `Release` GitHub Actions workflow. Do not run `release-it` locally.
- Trigger a release with `gh workflow run release.yml -f bump=<patch|minor|major>`, then monitor it with `gh run watch --exit-status`.
- The workflow runs non-interactively and owns the version commit, npm publication, tag push, and GitHub Release.
- npm Trusted Publishing must be configured once for the `ugogo/pickle-ui` repository and `.github/workflows/release.yml`. Do not add an npm token to repository secrets.
- The workflow must retain `contents: write` for git/GitHub releases and `id-token: write` for npm Trusted Publishing.

## Component layout

- **Exported components** — one top-level file per component in `src/components` (e.g. `Button.tsx`, `Slider.tsx`), each with a co-located `*.stories.tsx` for Storybook. Export every exported component and its types from `src/index.ts`; that file is the library's public API.
- **Internal components** — helpers and Storybook-only utilities that are not part of the public API belong in `src/components/_internal` (e.g. `Story.tsx`, `VisuallyHiddenInput.tsx`). Do not export these from `src/index.ts`.
- **Co-located modules** — when an exported component has a lower-level building block consumers may compose directly, keep it alongside the facade in `src/components` (e.g. `ColorPicker.tsx` + `ColorPickerPrimitive.tsx`) and export both from `src/index.ts`.
- Stories import internal utilities from `./_internal/…`; exported components import internal modules the same way (e.g. `./_internal/VisuallyHiddenInput`).

## Component API

- Use [Base UI](https://base-ui.com) for headless component primitives. Do not introduce new `radix-ui` imports or dependencies; if generated code uses Radix primitives, convert it to Base UI before committing.
- Prefer compound component APIs for component slots and helpers. Attach related parts to the parent component, e.g. `Slider.Value` or `Slider.Marks`, rather than exporting parallel names like `SliderValue` or `SliderMarks`.
- Use the shared `Text` component for headings and text content in exported components and Storybook stories instead of raw typography elements such as `h1`–`h6`, `p`, and `span`.
- Storybook stories should demonstrate the compound API consumers are expected to use.

## Commit convention

This repo follows [Conventional Commits](https://www.conventionalcommits.org/). Every commit subject must be:

```
<type>(<optional scope>): <description>
```

**Types:**

| Type       | Use for                                                 |
| ---------- | ------------------------------------------------------- |
| `feat`     | A new feature (e.g. a new component)                    |
| `fix`      | A bug fix                                               |
| `docs`     | Documentation only                                      |
| `style`    | Formatting / whitespace, no code-meaning change         |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `perf`     | Performance improvement                                 |
| `test`     | Adding or updating tests / stories                      |
| `build`    | Build system or dependency changes                      |
| `ci`       | CI configuration                                        |
| `chore`    | Maintenance, scaffolding, tooling                       |

**Rules:**

- Subject in the imperative mood, lowercase, no trailing period (e.g. `feat: add Button component`, not `Added Button.`).
- Keep the subject ≤ ~72 characters; put detail in the body.
- Use a scope when it adds clarity: `feat(button): add ghost variant`.
- Breaking changes: add `!` after the type/scope (`feat!:`) and/or a `BREAKING CHANGE:` footer.

**Examples:**

```
feat(button): add ghost and link variants
fix: resolve @/ alias in Storybook vite config
docs: document commit convention in AGENTS.md
chore: add README and project config
build: bump React, Vite, and TypeScript to latest
```

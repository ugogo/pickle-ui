# AGENTS.md

Guidance for AI agents (and humans) working in this repository.

## Project

**pickle-ui** — a React component library built with [shadcn/ui](https://ui.shadcn.com), [Tailwind CSS](https://tailwindcss.com) (v4), and [reui](https://github.com/reui/reui). Components live in `src/components`, shared helpers in `src/lib`, and each component ships a `*.stories.tsx` for Storybook.

## Tooling

- **Package manager:** pnpm (use `pnpm`, not `npm`/`yarn`).
- **Dev / Storybook:** `pnpm run dev` (Storybook on port 6006).
- **Typecheck:** `pnpm run typecheck`.
- **Build library:** `pnpm run build`.

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

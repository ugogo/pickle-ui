# Pickle UI

A React component library built with [Base UI](https://base-ui.com), [shadcn/ui](https://ui.shadcn.com), [Tailwind CSS](https://tailwindcss.com), and [reui](https://github.com/reui/reui).

## Features

- **Composable components** — Built for flexibility and reuse
- **Base UI primitives** — Headless behavior and accessibility foundation
- **Tailwind CSS** — Utility-first styling with full customization
- **TypeScript** — Full type safety out of the box
- **Accessible** — WCAG compliant components

## Installation

```bash
npm install pickle-ui
```

## Usage

```tsx
import { Button } from 'pickle-ui';

export function App() {
  return <Button>Click me</Button>;
}
```

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

## Releasing

Releases are published to npm and tagged with a matching GitHub Release whose
notes are generated from the commit subjects since the previous tag — so keep
[commit messages clean](AGENTS.md) (they _are_ the changelog).

```bash
pnpm run release      # pick the bump (patch / minor / major / …) from the menu
```

This bumps the version, commits `chore(release): v<version>`, creates an
annotated tag, pushes, publishes to npm, and cuts the GitHub Release.

One-time setup per machine:

- **Log in to npm:** `npm login`.
- **Provide a GitHub token** so the GitHub Release is created automatically. Use
  your existing [`gh`](https://cli.github.com) login:

  ```bash
  # macOS / Linux — add to ~/.zshrc or ~/.bashrc
  export GITHUB_TOKEN=$(gh auth token)
  ```

  ```powershell
  # Windows — add to your PowerShell profile ($PROFILE)
  $env:GITHUB_TOKEN = gh auth token
  ```

  Without a token it still works — release-it falls back to opening a prefilled
  GitHub Release page for you to publish manually.

Run releases from `main` with a clean working tree.

## License

MIT

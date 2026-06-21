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
npm install pickle-ui tailwindcss
```

## Usage

```tsx
import { Button } from 'pickle-ui';

export function App() {
  return <Button>Click me</Button>;
}
```

Pickle currently requires Tailwind CSS v4. Import Pickle after Tailwind in your
application stylesheet:

```css
@import 'tailwindcss';
@import 'pickle-ui/styles.css';
```

The Pickle stylesheet registers the library's component sources and supplies
its theme tokens, variants, and utilities. Your existing Tailwind pipeline
compiles everything; no additional Pickle config or copied `globals.css` is
required.

### Theming

Pickle ships its default light theme on `:root` and dark theme on `.dark`.
Override semantic CSS variables after the Pickle stylesheet to customize it:

```css
:root {
  --primary: oklch(0.55 0.18 145);
  --primary-foreground: white;
  --radius: 0.75rem;
}
```

Add `class="dark"` to an ancestor to use the bundled dark defaults. You can
override the same variables under `.dark` for a custom dark theme.

### Fonts

Pickle loads no font files and uses Tailwind's system sans and monospace stacks
by default. If your application already provides custom fonts, connect them to
Pickle by overriding the Tailwind font variables:

```css
@theme {
  --font-sans: 'Your Sans Font', ui-sans-serif, system-ui, sans-serif;
  --font-heading: var(--font-sans);
  --font-mono: 'Your Mono Font', ui-monospace, monospace;
}
```

How those fonts are loaded remains entirely up to the application. Pickle adds
no font files, packages, or network requests to consumer bundles.

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
pnpm run test
pnpm run lint
```

## Releasing

Releases are published to npm and tagged with a matching GitHub Release whose
notes are generated from the commit subjects since the previous tag — so keep
[commit messages clean](AGENTS.md) (they _are_ the changelog).

Releases are run through the manually dispatched `Release` GitHub Actions
workflow. Choose a patch, minor, or major bump there; the workflow owns the
version commit, npm publication, tag, and GitHub Release.

## License

MIT

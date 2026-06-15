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

## License

MIT

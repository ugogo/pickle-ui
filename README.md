# Pickle UI

A React component library built with Base UI and Tailwind CSS v4.

## Use Pickle UI

Install Pickle and Tailwind:

```bash
pnpm add pickle-ui tailwindcss
```

To match Pickle's Storybook typography, install Geist and JetBrains Mono:

```bash
pnpm add @fontsource-variable/geist @fontsource/jetbrains-mono
```

Then load the fonts and your application stylesheet from the application entry
point:

```tsx
import '@fontsource-variable/geist/wght.css';
import '@fontsource/jetbrains-mono/latin-400.css';
import './app.css';
```

Create `app.css`:

```css
@import 'tailwindcss';
@import 'pickle-ui/styles.css';

@theme {
  --font-sans: 'Geist Variable', ui-sans-serif, system-ui, sans-serif;
  --font-heading: var(--font-sans);
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
}

@layer base {
  body {
    @apply bg-background text-foreground;
  }

  html {
    @apply font-sans antialiased;
  }
}
```

Import components from `pickle-ui`:

```tsx
import { Button } from 'pickle-ui';

export function App() {
  return <Button>Click me</Button>;
}
```

Pickle supplies its component styles, light theme, and `.dark` theme. Add the
`dark` class to an ancestor to enable dark mode:

```tsx
<div className="dark">
  <App />
</div>
```

Override Pickle's semantic variables after the imports to customize the theme:

```css
:root {
  --primary: oklch(0.55 0.18 145);
  --primary-foreground: white;
  --radius: 0.75rem;
}
```

The font packages are optional. Omit their imports and the `@theme` block to
use Tailwind's system font stacks.

## Development

```bash
pnpm install
pnpm run dev        # Storybook on http://localhost:6006
pnpm run build
pnpm run typecheck
pnpm run test
pnpm run lint
```

## Releasing

Run the manually dispatched `Release` GitHub Actions workflow and choose a
patch, minor, or major bump. The workflow publishes the npm package, version
commit, tag, and GitHub Release.

## License

MIT

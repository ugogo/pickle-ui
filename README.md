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

For smaller bundles, import only the components you need via subpath exports:

```tsx
import { Button } from 'pickle-ui/button';
import { Form } from 'pickle-ui/form';
```

Subpaths use the same named exports as the root entry (for example `Button` from
`pickle-ui/button`, not a default export). Available subpaths match the public
API in `src/index.ts`, using kebab-case names such as `color-picker`,
`radio-group`, and `scroll-area`.

Pickle supplies its component styles, light theme, and `.dark` theme. Add the
`dark` class to an ancestor to enable dark mode:

```tsx
<div className="dark">
  <App />
</div>
```

Use `Form` as a React Hook Form-only compound API. Pass the return value from
`useForm` to the `form` prop; form-aware controls read that provider and either
inherit the nearest `Form.Field` name or accept their own `name` prop.

```tsx
import { useForm } from 'react-hook-form';
import { Form } from 'pickle-ui/form';

type SignUpValues = {
  email: string;
  role: string;
};

export function SignUpForm() {
  const form = useForm<SignUpValues>({
    defaultValues: { email: '', role: 'designer' },
  });

  return (
    <Form form={form} onSubmit={(values) => console.log(values)}>
      <Form.Field label="Email" name="email">
        <Form.Input autoComplete="email" />
      </Form.Field>

      <Form.Field label="Role" name="role">
        <Form.Select>
          <Form.Select.Trigger>
            <Form.Select.Value placeholder="Select a role" />
          </Form.Select.Trigger>
          <Form.Select.Content>
            <Form.Select.Item value="designer">Designer</Form.Select.Item>
            <Form.Select.Item value="engineer">Engineer</Form.Select.Item>
          </Form.Select.Content>
        </Form.Select>
      </Form.Field>

      <Form.Button type="submit">Save</Form.Button>
    </Form>
  );
}
```

The font packages are optional. Omit their imports and the `@theme` block to
use Tailwind's system font stacks.

## Theming

Pickle is styled with Tailwind utilities that resolve to a small set of CSS
variables. There are four ways to customize components, from the broadest to
the most targeted.

### 1. Override the design tokens

Every color, radius, and font in Pickle reads from a variable declared in
`pickle-ui/styles.css`. Redefine the ones you need after the import; the
cascade does the rest, and `.dark` overrides work the same way:

```css
@import 'tailwindcss';
@import 'pickle-ui/styles.css';

:root {
  --primary: oklch(0.55 0.18 145);
  --primary-foreground: white;
  --radius: 0.75rem;
}

.dark {
  --primary: oklch(0.8 0.16 145);
  --primary-foreground: oklch(0.2 0.05 145);
}
```

Each token is also exposed as a Tailwind color (`bg-primary`,
`text-muted-foreground`, `border-sidebar-border`, …) so your own markup can
share Pickle's palette.

Tokens follow one naming rule: `--x` is a fill and `--x-foreground` is the text
placed on that fill. Status colors (`destructive`, `info`, `success`,
`warning`) add a `-subtle` pair for tinted surfaces such as badges and
alerts: `--x-subtle` is the tint and `--x-subtle-foreground` is the readable
text on it, which also works as colored text on a neutral surface.

| Token                                               | Used for                                                                                   |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `--background`, `--foreground`                      | Page background and default text.                                                          |
| `--card`, `--card-foreground`                       | `Card` surface and text.                                                                   |
| `--popover`, `--popover-foreground`                 | Floating surfaces: `Popover`, `Select`, `Combobox`, outline buttons.                       |
| `--primary`, `--primary-foreground`                 | Solid primary actions and the text on them.                                                |
| `--secondary`, `--secondary-foreground`             | Secondary buttons and badges.                                                              |
| `--muted`, `--muted-foreground`                     | Subdued backgrounds and secondary text.                                                    |
| `--accent`, `--accent-foreground`                   | Hover and highlighted rows (menu items, ghost buttons).                                    |
| `--destructive`, `--info`, `--success`, `--warning` | Solid status fills, borders, and rings. Each has a `-foreground` for the text on the fill. |
| `--destructive-subtle`, `--info-subtle`, …          | Tinted status surfaces. Each has a `-subtle-foreground` for the text on the tint.          |
| `--border`, `--input`, `--ring`                     | Default borders, form control borders, focus rings.                                        |
| `--sidebar-*`                                       | The `Sidebar` surface, text, borders, and accents.                                         |
| `--chart-1` … `--chart-5`                           | Categorical chart colors.                                                                  |
| `--radius`                                          | Base radius. `rounded-sm` through `rounded-2xl` derive from it.                            |
| `--font-sans`, `--font-heading`, `--font-mono`      | Font stacks. Declare them in your `@theme` block.                                          |

Pickle avoids raw Tailwind palette colors on themed surfaces, so changing
a token updates every component that depends on it.

### 2. Pass `className`

Every component accepts `className`, merged with `tailwind-merge` so your
utilities win over Pickle's defaults without specificity tricks:

```tsx
<Button className="rounded-full px-6">Get started</Button>
<Card.Title className="text-2xl">Overview</Card.Title>
```

The same `cn` helper Pickle uses internally is exported, so you can compose
conditional classes the same way:

```tsx
import { cn } from 'pickle-ui/cn';

<Badge className={cn('uppercase', isNew && 'animate-pulse')}>New</Badge>;
```

### 3. Reuse the variant functions

Components built on variants export their `class-variance-authority` function
(`buttonVariants`, `badgeVariants`, `textVariants`, `groupVariants`,
`inputGroupAddonVariants`). Apply Pickle's styling to any element, or extend a
variant without wrapping the component:

```tsx
import { buttonVariants } from 'pickle-ui/button';
import { cn } from 'pickle-ui/cn';

<a className={buttonVariants({ variant: 'outline', size: 'sm' })} href="/docs">
  Docs
</a>;

<button
  className={cn(
    buttonVariants({ variant: 'ghost' }),
    'text-info-subtle-foreground',
  )}
>
  Info
</button>;
```

### 4. Target `data-slot` in CSS

Every rendered part carries a stable `data-slot` attribute (`button`, `card`,
`card-title`, `select-item`, `checkbox-indicator`, …). Use it for global rules
or to reach parts that do not take their own `className`:

```css
@layer components {
  [data-slot='card'] {
    @apply shadow-lg;
  }

  [data-slot='checkbox-indicator'] svg {
    stroke-width: 3;
  }
}
```

`data-slot` names are part of the public API and follow the component name in
kebab-case, so a renaming is a breaking change.

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

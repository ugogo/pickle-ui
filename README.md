# Pickle UI

A React component library built with Base UI and Tailwind CSS v4.

Browse every component in the [Storybook](https://ugogo.github.io/pickle-ui/).

## Use Pickle UI

Install Pickle with its peer dependencies. React Hook Form is only used by
the `Form` components, but it is declared as a peer so your package manager
expects it:

```bash
pnpm add pickle-ui tailwindcss react-hook-form
```

Pickle requires Tailwind CSS v4 and React 18 or 19.

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

The font packages are optional. Omit their imports and the `@theme` block to
use Tailwind's system font stacks.

You do not need to add Pickle to your Tailwind `@source` list: the stylesheet
declares its own component sources, so every class Pickle uses is generated
alongside yours.

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
`pickle-ui/button`, not a default export).

| Subpath                                  | Exports                                                                                                |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `pickle-ui/alert`                        | `Alert` with `Icon`, `Title`, `Description`, `Action`                                                  |
| `pickle-ui/alert-dialog`                 | `AlertDialog` with `Trigger`, `Content`, `Header`, `Title`, `Description`, `Footer`, `Close`           |
| `pickle-ui/avatar`                       | `Avatar` with `Image`, `Fallback`, `Group`                                                             |
| `pickle-ui/badge`                        | `Badge`, `badgeVariants`                                                                               |
| `pickle-ui/button`                       | `Button`, `buttonVariants`                                                                             |
| `pickle-ui/card`                         | `Card` with `Header`, `Title`, `Description`, `Action`, `Content`, `Footer`                            |
| `pickle-ui/checkbox`                     | `Checkbox` with `Label`                                                                                |
| `pickle-ui/color-picker`                 | `ColorPicker` with `Trigger`, `Content`, `Area`, `HueSlider`, `AlphaSlider`, `Swatch`, `Input`, …      |
| `pickle-ui/combobox`                     | `Combobox` with `Input`, `Content`, `List`, `Item`, `Chips`, …                                         |
| `pickle-ui/dialog`                       | `Dialog` with `Trigger`, `Content`, `Header`, `Title`, `Description`, `Footer`, `Close`                |
| `pickle-ui/flex`, `pickle-ui/grid`       | `Flex`, `Grid` layout primitives                                                                       |
| `pickle-ui/x-stack`, `pickle-ui/y-stack` | `XStack`, `YStack` row and column shorthands                                                           |
| `pickle-ui/form`                         | `Form` with `Field`, `Label`, `Description`, `Error`, `Button` and every React Hook Form-bound control |
| `pickle-ui/group`                        | `Group` with `Separator`, `Text`, for attached button and input groups                                 |
| `pickle-ui/input`                        | `Input`                                                                                                |
| `pickle-ui/input-group`                  | `InputGroup` with `Input`, `Addon`, `Button`, `Text`                                                   |
| `pickle-ui/menu`                         | `Menu` with `Trigger`, `Content`, `Item`, `CheckboxItem`, `RadioGroup`, `Sub`, `Shortcut`, …           |
| `pickle-ui/popover`                      | `Popover` with `Trigger`, `Content`, `Header`, `Title`, `Description`, `Anchor`                        |
| `pickle-ui/progress`                     | `Progress` with `Label`, `Value`, `Track`, `Indicator`                                                 |
| `pickle-ui/radio-group`                  | `RadioGroup` with `Item`                                                                               |
| `pickle-ui/scroll-area`                  | `ScrollArea` with `Viewport`, `Scrollbar`, `Thumb`, `Corner`                                           |
| `pickle-ui/select`                       | `Select` with `Trigger`, `Value`, `Content`, `Item`, `Group`, …                                        |
| `pickle-ui/separator`                    | `Separator`                                                                                            |
| `pickle-ui/sidebar`                      | `Sidebar` with `Header`, `Content`, `Footer`, `Group`, `Menu`, …                                       |
| `pickle-ui/slider`                       | `Slider` with `Label`, `Value`, `Marks`                                                                |
| `pickle-ui/spinner`                      | `Spinner`                                                                                              |
| `pickle-ui/switch`                       | `Switch` with `Label`                                                                                  |
| `pickle-ui/table`                        | `Table` with `Header`, `Body`, `Footer`, `Row`, `Head`, `Cell`, `Caption`                              |
| `pickle-ui/text`                         | `Text`, `textVariants` for headings and body copy                                                      |
| `pickle-ui/textarea`                     | `Textarea`, growing with its content                                                                   |
| `pickle-ui/toast`                        | `Toast` with `Provider`, `useToast` and the `manager` for toasts outside React                         |
| `pickle-ui/tooltip`                      | `Tooltip` with `Trigger`, `Content`, `Provider`                                                        |
| `pickle-ui/cn`                           | `cn` class helper, `SlotClassNames` type                                                               |
| `pickle-ui/theme`                        | `createTheme`, `themeToCss`                                                                            |

Interactive components and their parts take Base UI's `render` prop to swap
the element they render, for example
`<Button render={<a href="/docs" />}>Docs</Button>` or
`<Popover.Trigger render={<Button variant="outline" />}>Edit</Popover.Trigger>`.
`Text` and the layout primitives take `as` to change their tag. Parts are
reached through their component (`Popover.Title`), never imported under their
own names.
Icons are plain SVG children: any icon library works, and buttons, badges and
input addons size and space the SVG for you.

Pickle supplies its component styles, light theme, and `.dark` theme. Add the
`dark` class to an ancestor to enable dark mode:

```tsx
<div className="dark">
  <App />
</div>
```

Pickle only reacts to that class, never to `prefers-color-scheme` on its own,
so you decide how the scheme is chosen. To follow the system preference, mirror
the media query onto the root element:

```ts
const media = window.matchMedia('(prefers-color-scheme: dark)');
const sync = () =>
  document.documentElement.classList.toggle('dark', media.matches);
sync();
media.addEventListener('change', sync);
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

`pickle-ui/styles.css` is the sum of two files you can also import on their
own:

- `pickle-ui/theme.css` holds the tokens only: the Tailwind theme mapping and
  the light and dark values. Import it to share Pickle's palette in a project
  that does not use the components.
- `pickle-ui/base.css` holds everything else: animation and variant plugins,
  the `.dark` variant, the `Text` type scale, shared utilities, and element
  resets. Import it with a token set of your own instead of `theme.css`.

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
| `--text-h1` … `--text-code`                         | `Text` sizes (`h1`–`h4`, `lead`, `body`, `small`, `code`), each with a `--line-height`.    |
| `--font-sans`, `--font-heading`, `--font-mono`      | Font stacks. Declare them in your `@theme` block.                                          |

Pickle avoids raw Tailwind palette colors on themed surfaces, so changing
a token updates every component that depends on it.

The `--text-*` sizes are Tailwind theme variables, so you can set them from
`:root` or from your own `@theme` block. Their line heights are ratios, so
`--text-h1: 2.25rem` scales the line height with it. `--text-body` also sizes
`Dialog` and `AlertDialog` descriptions; the compact copy in `Alert`, `Toast`
and `Card.Description` keeps `text-sm`.

### 1b. Generate a theme from a brand color

`createTheme` derives the brand-dependent tokens (`--primary`,
`--primary-foreground`, `--ring`, and their sidebar counterparts) for both
schemes from one color, picking a readable foreground automatically. Radius
and fonts pass through. Everything else keeps the defaults from `theme.css`.

```ts
import { createTheme, themeToCss } from 'pickle-ui/theme';

const theme = createTheme({
  fonts: { sans: 'Inter, sans-serif' },
  primary: '#16a34a',
  primaryDark: '#4ade80', // optional, defaults to a lighter primary
  radius: '0.5rem',
});

themeToCss(theme);
// :root { --primary: oklch(…); --primary-foreground: oklch(1 0 0); … }
// .dark { … }
```

Write that string to a stylesheet at build time, or apply a scheme at runtime
by spreading its variables as inline styles:

```tsx
<div className="dark" style={theme.dark}>
  <App />
</div>
```

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

Components that render several parts from one props object also take a
`classNames` object keyed by slot, so you can reach an inner part without
global CSS. Keys match the suffix of the part's `data-slot` attribute:

```tsx
<Checkbox
  classNames={{ indicator: 'bg-success', label: 'text-muted-foreground' }}
  label="Remember me"
/>

<Slider classNames={{ thumb: 'size-6', track: 'h-2' }} defaultValue={40} />

<Input className="w-64" classNames={{ input: 'font-mono' }} />
```

| Component         | Slots                                    |
| ----------------- | ---------------------------------------- |
| `Button`          | `loadingIndicator`                       |
| `Checkbox`        | `field`, `indicator`, `label`            |
| `Combobox.Chip`   | `remove`                                 |
| `Combobox.Item`   | `indicator`                              |
| `Input`           | `input` (`className` styles the wrapper) |
| `RadioGroup.Item` | `indicator`, `label`                     |
| `Select.Item`     | `indicator`                              |
| `Select.Trigger`  | `icon`                                   |
| `Slider`          | `control`, `indicator`, `thumb`, `track` |
| `Switch`          | `field`, `label`, `thumb`                |

The `SlotClassNames<'a' | 'b'>` type is exported for wrappers that forward
these props.

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

Merge them with `pickle-ui/cn`. A stock `tailwind-merge` reads `text-h1` …
`text-code` from `textVariants` as colors and drops them next to one, so a
`cn` of your own must declare them as font sizes:

```ts
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ['body', 'code', 'h1', 'h2', 'h3', 'h4', 'lead', 'small'],
    },
  },
});
```

### 4. Target `data-slot` in CSS

Every rendered part carries a stable `data-slot` attribute (`button`, `card`,
`card-title`, `select-item`, `checkbox-indicator`, …). Use it for global rules
or to reach parts that do not take their own `className`.

Parts with visual variants also expose the resolved value as a data
attribute, defaults included, so a rule can target one variant or size. The
attribute sits on the slot listed here:

| Component                               | `data-slot`                                    | Attributes                                                                   |
| --------------------------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------- |
| `Button`, `Badge`                       | `button`, `badge`                              | `data-variant`, `data-size`                                                  |
| `Alert`, `Menu.Item`                    | `alert`, `menu-item`                           | `data-variant`                                                               |
| `Text`                                  | `text`                                         | `data-variant`, plus `data-tone`, `data-weight` and `data-truncate` when set |
| `Dialog.Content`, `AlertDialog.Content` | `dialog-content`, `alert-dialog-content`       | `data-size`                                                                  |
| `Input`, `Textarea`                     | `input-control`, `textarea-control` (wrappers) | `data-size`                                                                  |
| `Checkbox`                              | `checkbox`                                     | `data-size`                                                                  |
| `RadioGroup.Item`                       | `radio`                                        | `data-size`                                                                  |
| `Group`                                 | `group`                                        | `data-orientation`                                                           |
| `InputGroup.Addon`                      | `input-group-addon`                            | `data-align`                                                                 |
| `Toast.Provider`                        | `toast-viewport`                               | `data-position`                                                              |

Write these rules in `@layer utilities`. Pickle styles parts with utility
classes, and Tailwind orders its layers `theme, base, components, utilities`,
so a rule in `@layer components` loses to them:

```css
@layer utilities {
  [data-slot='card'] {
    @apply shadow-lg;
  }

  [data-slot='button'][data-size='md'] {
    @apply h-9;
  }

  [data-slot='button'][data-variant='default'] {
    @apply border-indigo-600 bg-indigo-600 hover:bg-indigo-600/90;
  }

  [data-slot='checkbox-indicator'] svg {
    stroke-width: 3;
  }
}
```

A global rule like these wins over a `className` on a single instance too; mark
the one-off utility important (`className="shadow-none!"`) to beat it.

`data-slot` names and these data attribute values are part of the public API
and follow the component and prop names in kebab-case, so renaming one is a
breaking change.

## Upgrading from 0.x

The next major release renames a few styling APIs. Search your code for these
and update them:

- **Status tokens.** `--destructive-foreground`, `--info-foreground`,
  `--success-foreground` and `--warning-foreground` now hold the text color for
  a solid fill (white, or amber-950 for warning). Tinted text such as
  `text-destructive-foreground` on a badge becomes
  `text-destructive-subtle-foreground`, and tinted backgrounds like
  `bg-destructive/8` become `bg-destructive-subtle`, which already adapts to
  dark mode.
- **Chart palette.** The light `--chart-1` … `--chart-5` values changed to
  match the dark hues (blue, emerald, amber, purple, rose). Override them if
  your charts relied on the previous colors.
- **Slot class props.** `labelClassName` on `Checkbox`, `Switch` and
  `RadioGroup.Item` becomes `classNames={{ label }}`; `thumbClassName` and
  `trackClassName` on `Slider` become `classNames={{ thumb, track }}`.
- **Stylesheet.** `pickle-ui/styles.css` is unchanged as the entry point. It is
  now split into `pickle-ui/theme.css` and `pickle-ui/base.css`, and no longer
  depends on the `shadcn` package.

## Development

```bash
pnpm install
pnpm run dev        # Storybook on http://localhost:6006, theme toggle in the toolbar
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

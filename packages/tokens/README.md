# @pickle-ui/tokens

Pickle UI's design tokens as Tailwind CSS v4 theme variables: the light and
dark colors, the radius scale and the type scale. It also ships
`createTheme`, which derives a theme from a brand color for both platforms.
`@pickle-ui/react` imports them, so web apps using the components already
have them. So do React Native apps importing
`@pickle-ui/react-native/styles.css`.

## Web

To use the tokens without the components, import them after Tailwind:

```css
@import 'tailwindcss';
@import '@pickle-ui/tokens/theme.css';
```

Every token becomes a utility (`bg-primary`, `text-muted-foreground`,
`rounded-lg`, …). Add the `dark` class to an ancestor to switch to the dark
values. Override a variable after the import to retheme; `.dark` overrides
work the same way. See the `@pickle-ui/react` README for the token list and
theming options.

## React Native

With [Uniwind](https://uniwind.dev), import `native.css` after Uniwind:

```css
@import 'tailwindcss';
@import 'uniwind';
@import '@pickle-ui/tokens/native.css';
```

The values are Uniwind's `light` and `dark` themes, so they follow the system
color scheme or `Uniwind.setTheme()`.

`native.css` holds the values; `theme.css` imports it and maps the `dark`
theme to the `.dark` class for the web.

## Type scale

`typography.css` holds the sizes behind `Text`'s variants, `--text-h1` …
`--text-code`, each with a line height written as a ratio. Both component
packages import it from their `base.css`, so it comes with the components
whatever color tokens you use. Import it after Tailwind to get the
`text-h1` … `text-code` utilities without the components:

```css
@import '@pickle-ui/tokens/typography.css';
```

## Theme

`@pickle-ui/tokens/theme` exports `createTheme`, which derives the
brand-dependent tokens (`--primary`, `--primary-foreground`, `--ring` and
their sidebar counterparts) for the light and dark themes from one color,
and `themeToCss`, which writes the result as CSS rules for the web. The
component packages re-export them as `@pickle-ui/react/theme` and
`@pickle-ui/react-native/theme`; import from there in an app.

```ts
import { createTheme } from '@pickle-ui/tokens/theme';

const theme = createTheme({ primary: '#16a34a', radius: '0.5rem' });
// theme.light['--primary'] === 'oklch(…)', theme.dark['--primary'] === 'oklch(…)'
```

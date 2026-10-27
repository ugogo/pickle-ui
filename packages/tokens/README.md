# @pickle-ui/tokens

Pickle UI's design tokens as Tailwind CSS v4 theme variables: the light and
dark colors and the radius scale. `@pickle-ui/react` imports them, so apps
using the components already have them.

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

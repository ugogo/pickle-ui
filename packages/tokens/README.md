# @pickle-ui/tokens

Pickle UI's design tokens as Tailwind CSS v4 theme variables: the light and
dark colors and the radius scale, in a single `theme.css`. `@pickle-ui/react`
imports it, so apps using the components already have it.

To use the tokens without the components, import them after Tailwind:

```css
@import 'tailwindcss';
@import '@pickle-ui/tokens/theme.css';
```

Every token becomes a utility (`bg-primary`, `text-muted-foreground`,
`rounded-lg`, …). Override a variable after the import to retheme; `.dark`
overrides work the same way. See the `@pickle-ui/react` README for the token
list and theming options.

# @pickle-ui/tokens

## 1.0.0-beta.7

### Minor Changes

- 8fddb92: Align `@pickle-ui/react-native` with the web components. `@pickle-ui/tokens/typography.css` now holds the `Text` type scale (`--text-h1` … `--text-code`), shared by both packages' `base.css`. `Text` uses it and adds the `code` variant, `weight` and `truncate`; `Button` takes the web's dimensions (with a `hitSlop` to a 44pt touch target), adds the `destructive-outline` and `link` variants, the `xs`, `xl` and `icon-*` sizes, `loading` with the web's ring spinner and icon children; `Badge` gets every web variant and the `sm` / `md` / `lg` sizes; `Card` adds `Card.Action` and `Card.Footer` and the web's spacing, radius and title size.
- 0dab42a: Move `createTheme` and `themeToCss` to `@pickle-ui/tokens/theme`, so both platforms derive a theme from the same brand color. `@pickle-ui/react/theme` still exports both, and `@pickle-ui/react-native/theme` now exports `createTheme`. Fix `createTheme`'s `fonts.heading`, which the `font-heading` utility ignored: it now reads `--font-heading` and falls back to `--font-sans`.

## 1.0.0-beta.6

### Minor Changes

- d6036be: Add `@pickle-ui/tokens/native.css` for React Native apps using Uniwind. The light and dark values are now Uniwind themes; `theme.css` imports them and keeps the `.dark` class working on the web. The `dark` variant in `@pickle-ui/react/base.css` now also matches the element that carries the `.dark` class.

## 1.0.0-beta.5

### Patch Changes

- 7dbfc2a: Publish the design tokens as `@pickle-ui/tokens`. `@pickle-ui/react` now installs it and its `theme.css` re-exports `@pickle-ui/tokens/theme.css`, so existing imports keep working.

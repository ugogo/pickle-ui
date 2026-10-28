# @pickle-ui/react-native

## 1.0.0-beta.1

### Minor Changes

- 8fddb92: Align `@pickle-ui/react-native` with the web components. `@pickle-ui/tokens/typography.css` now holds the `Text` type scale (`--text-h1` … `--text-code`), shared by both packages' `base.css`. `Text` uses it and adds the `code` variant, `weight` and `truncate`; `Button` takes the web's dimensions (with a `hitSlop` to a 44pt touch target), adds the `destructive-outline` and `link` variants, the `xs`, `xl` and `icon-*` sizes, `loading` with the web's ring spinner and icon children; `Badge` gets every web variant and the `sm` / `md` / `lg` sizes; `Card` adds `Card.Action` and `Card.Footer` and the web's spacing, radius and title size.
- 0dab42a: Move `createTheme` and `themeToCss` to `@pickle-ui/tokens/theme`, so both platforms derive a theme from the same brand color. `@pickle-ui/react/theme` still exports both, and `@pickle-ui/react-native/theme` now exports `createTheme`. Fix `createTheme`'s `fonts.heading`, which the `font-heading` utility ignored: it now reads `--font-heading` and falls back to `--font-sans`.

### Patch Changes

- Updated dependencies [8fddb92]
- Updated dependencies [0dab42a]
  - @pickle-ui/tokens@1.0.0-beta.7

## 1.0.0-beta.0

### Major Changes

- f7d1414: Add `@pickle-ui/react-native`: `Badge`, `Button`, `Card`, `Text`, `cn` and `useColorToken` for Expo apps, styled with Pickle's tokens through Uniwind.

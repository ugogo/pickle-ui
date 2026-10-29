# @pickle-ui/react

## 1.0.0-beta.9

### Patch Changes

- f3d2abe: Fix the findings of react-doctor 0.9: `useLazyRef` no longer writes to a ref while rendering, the hidden form input follows its control's size through `useSyncExternalStore` instead of an effect, and `Input`, `Checkbox` and `Card.Header` are split into smaller pieces with the same output.

## 1.0.0-beta.8

### Patch Changes

- 0dab42a: Move `createTheme` and `themeToCss` to `@pickle-ui/tokens/theme`, so both platforms derive a theme from the same brand color. `@pickle-ui/react/theme` still exports both, and `@pickle-ui/react-native/theme` now exports `createTheme`. Fix `createTheme`'s `fonts.heading`, which the `font-heading` utility ignored: it now reads `--font-heading` and falls back to `--font-sans`.
- Updated dependencies [8fddb92]
- Updated dependencies [0dab42a]
  - @pickle-ui/tokens@1.0.0-beta.7

## 1.0.0-beta.7

### Patch Changes

- 220989a: Add a `@pickle-ui/source` export condition that points at the TypeScript sources, and use relative imports inside `src`.

## 1.0.0-beta.6

### Patch Changes

- d6036be: Add `@pickle-ui/tokens/native.css` for React Native apps using Uniwind. The light and dark values are now Uniwind themes; `theme.css` imports them and keeps the `.dark` class working on the web. The `dark` variant in `@pickle-ui/react/base.css` now also matches the element that carries the `.dark` class.
- Updated dependencies [d6036be]
  - @pickle-ui/tokens@1.0.0-beta.6

## 1.0.0-beta.5

### Patch Changes

- 7dbfc2a: Publish the design tokens as `@pickle-ui/tokens`. `@pickle-ui/react` now installs it and its `theme.css` re-exports `@pickle-ui/tokens/theme.css`, so existing imports keep working.
- Updated dependencies [7dbfc2a]
  - @pickle-ui/tokens@1.0.0-beta.5

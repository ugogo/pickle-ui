# @pickle-ui/tokens

## 1.0.0-beta.6

### Minor Changes

- d6036be: Add `@pickle-ui/tokens/native.css` for React Native apps using Uniwind. The light and dark values are now Uniwind themes; `theme.css` imports them and keeps the `.dark` class working on the web. The `dark` variant in `@pickle-ui/react/base.css` now also matches the element that carries the `.dark` class.

## 1.0.0-beta.5

### Patch Changes

- 7dbfc2a: Publish the design tokens as `@pickle-ui/tokens`. `@pickle-ui/react` now installs it and its `theme.css` re-exports `@pickle-ui/tokens/theme.css`, so existing imports keep working.

---
'@pickle-ui/tokens': minor
'@pickle-ui/react': patch
'@pickle-ui/react-native': minor
---

Move `createTheme` and `themeToCss` to `@pickle-ui/tokens/theme`, so both platforms derive a theme from the same brand color. `@pickle-ui/react/theme` still exports both, and `@pickle-ui/react-native/theme` now exports `createTheme`. Fix `createTheme`'s `fonts.heading`, which the `font-heading` utility ignored: it now reads `--font-heading` and falls back to `--font-sans`.

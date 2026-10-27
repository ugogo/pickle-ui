---
'@pickle-ui/tokens': minor
'@pickle-ui/react': patch
---

Add `@pickle-ui/tokens/native.css` for React Native apps using Uniwind. The light and dark values are now Uniwind themes; `theme.css` imports them and keeps the `.dark` class working on the web. The `dark` variant in `@pickle-ui/react/base.css` now also matches the element that carries the `.dark` class.

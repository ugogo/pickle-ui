---
'@pickle-ui/react': patch
'@pickle-ui/tokens': patch
---

Publish the design tokens as `@pickle-ui/tokens`. `@pickle-ui/react` now installs it and its `theme.css` re-exports `@pickle-ui/tokens/theme.css`, so existing imports keep working.

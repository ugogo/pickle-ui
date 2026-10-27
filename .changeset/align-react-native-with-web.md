---
'@pickle-ui/tokens': minor
'@pickle-ui/react-native': minor
---

Align `@pickle-ui/react-native` with the web components. `@pickle-ui/tokens/typography.css` now holds the `Text` type scale (`--text-h1` … `--text-code`), shared by both packages' `base.css`. `Text` uses it and adds the `code` variant, `weight` and `truncate`; `Button` takes the web's dimensions (with a `hitSlop` to a 44pt touch target), adds the `destructive-outline` and `link` variants, the `xs`, `xl` and `icon-*` sizes, `loading` and icon children; `Badge` gets every web variant and the `sm` / `md` / `lg` sizes; `Card` adds `Card.Action` and `Card.Footer` and the web's spacing, radius and title size.

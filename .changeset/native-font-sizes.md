---
'@pickle-ui/react-native': patch
---

Set `Button` labels to the text sizes `@pickle-ui/react` uses from `sm` up: 14px at `md` (was 16px), 12px at `xs` and 16px at `xl`. The web's larger phone sizes only stop iOS Safari zooming into focused fields, which native apps don't do.

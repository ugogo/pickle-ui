---
'@pickle-ui/react': patch
---

A loading `Button` no longer announces « Loading »: its spinner is `aria-hidden`, since the button already reports it is busy through `disabled` and `aria-disabled`.

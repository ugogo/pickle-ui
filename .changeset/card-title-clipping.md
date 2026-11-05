---
'@pickle-ui/react-native': patch
---

Stop clipping the top of `Card.Title` on iOS: it keeps the type scale's line height instead of `leading-none`.

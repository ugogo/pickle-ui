---
'@pickle-ui/react': patch
'@pickle-ui/react-native': patch
---

Fix the findings of react-doctor 0.9: `useLazyRef` no longer writes to a ref while rendering, the hidden form input follows its control's size through `useSyncExternalStore` instead of an effect, and `Input`, `Checkbox` and `Card.Header` are split into smaller pieces with the same output.

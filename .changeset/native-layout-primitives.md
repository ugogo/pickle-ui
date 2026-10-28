---
'@pickle-ui/react-native': minor
---

Add `Flex`, `XStack`, `YStack`, `Grid` and `Separator`, with the props of `@pickle-ui/react` except `as`. `Grid` is built from rows of equal cells, since React Native has no CSS grid: items can't stretch to their cell's height (give them `flex-1`), and the `dense` flows place them like `row` and `column`.

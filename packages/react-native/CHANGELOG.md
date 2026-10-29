# @pickle-ui/react-native

## 1.0.0-beta.3

### Minor Changes

- b77221b: Apply the app's font: every component that renders text (`Text`, `Card.Title` and `Card.Description`, `Badge` and `Button` labels, `Input`, `Textarea`, `InputGroup`, the `Checkbox` and `RadioGroup.Item` labels and the `Form` parts) now uses `--font-sans`, and `h1`, `h2` and `Card.Title` use `--font-heading`, like `@pickle-ui/react`. Set `--font-sans` to one family name and load its faces with expo-font. Without it, text keeps the system font: `styles.css` and `base.css` give the font variables native defaults, so a `font-sans`, `font-heading` or `font-mono` class no longer overflows the stack when the app sets no font.

### Patch Changes

- f3d2abe: Fix the findings of react-doctor 0.9: `useLazyRef` no longer writes to a ref while rendering, the hidden form input follows its control's size through `useSyncExternalStore` instead of an effect, and `Input`, `Checkbox` and `Card.Header` are split into smaller pieces with the same output.

## 1.0.0-beta.2

### Minor Changes

- a064f4c: Add `Form`, the React Hook Form bindings of `@pickle-ui/react`: `Form.Field`, `Form.Input`, `Form.Textarea`, `Form.InputGroup`, `Form.Checkbox`, `Form.RadioGroup`, `Form.Button`, `Form.Label`, `Form.Description` and `Form.Error`. `react-hook-form` becomes a peer dependency, as on the web. `Form.Button` and the return key in `Form.Input` submit the form, since React Native has no `<form>`.
- 27f95b9: Add `Input`, `Textarea`, `Checkbox`, `RadioGroup`, `InputGroup` and `Spinner`, with the names and sizes of `@pickle-ui/react`. Fields take `invalid` and `disabled` props in place of the web's `aria-invalid` and `disabled` attributes, and `Checkbox` and `RadioGroup.Item` style their row and label text through `classNames.field` and `classNames.label`, since text styles don't cascade on native.
- 36c3510: Add `Flex`, `XStack`, `YStack`, `Grid` and `Separator`, with the props of `@pickle-ui/react` except `as`. `Grid` is built from rows of equal cells, since React Native has no CSS grid: items can't stretch to their cell's height (give them `flex-1`), and the `dense` flows place them like `row` and `column`.

### Patch Changes

- 56c867e: Set `Button` labels to the text sizes `@pickle-ui/react` uses from `sm` up: 14px at `md` (was 16px), 12px at `xs` and 16px at `xl`. The web's larger phone sizes only stop iOS Safari zooming into focused fields, which native apps don't do.

## 1.0.0-beta.1

### Minor Changes

- 8fddb92: Align `@pickle-ui/react-native` with the web components. `@pickle-ui/tokens/typography.css` now holds the `Text` type scale (`--text-h1` … `--text-code`), shared by both packages' `base.css`. `Text` uses it and adds the `code` variant, `weight` and `truncate`; `Button` takes the web's dimensions (with a `hitSlop` to a 44pt touch target), adds the `destructive-outline` and `link` variants, the `xs`, `xl` and `icon-*` sizes, `loading` with the web's ring spinner and icon children; `Badge` gets every web variant and the `sm` / `md` / `lg` sizes; `Card` adds `Card.Action` and `Card.Footer` and the web's spacing, radius and title size.
- 0dab42a: Move `createTheme` and `themeToCss` to `@pickle-ui/tokens/theme`, so both platforms derive a theme from the same brand color. `@pickle-ui/react/theme` still exports both, and `@pickle-ui/react-native/theme` now exports `createTheme`. Fix `createTheme`'s `fonts.heading`, which the `font-heading` utility ignored: it now reads `--font-heading` and falls back to `--font-sans`.

### Patch Changes

- Updated dependencies [8fddb92]
- Updated dependencies [0dab42a]
  - @pickle-ui/tokens@1.0.0-beta.7

## 1.0.0-beta.0

### Major Changes

- f7d1414: Add `@pickle-ui/react-native`: `Badge`, `Button`, `Card`, `Text`, `cn` and `useColorToken` for Expo apps, styled with Pickle's tokens through Uniwind.

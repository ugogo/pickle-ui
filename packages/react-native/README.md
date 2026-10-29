# @pickle-ui/react-native

Pickle UI components for React Native apps built with Expo, styled with
Pickle's tokens through [Uniwind](https://uniwind.dev). They reuse the names
of `@pickle-ui/react` (`variant`, `size`, `tone`, `Card.Header`, …) with
the same dimensions, on React Native primitives.

Browse them in the [Storybook](https://ugogo.github.io/pickle-ui/react-native/),
rendered in the browser through react-native-web.

## Use Pickle UI

In an Expo app, install the package with Uniwind and Tailwind:

```bash
npx expo install @pickle-ui/react-native@beta uniwind tailwindcss
```

Point Uniwind's Metro plugin at your stylesheet in `metro.config.js`:

```js
const { getDefaultConfig } = require('expo/metro-config');
const { withUniwindConfig } = require('uniwind/metro');

module.exports = withUniwindConfig(getDefaultConfig(__dirname), {
  cssEntryFile: './src/global.css',
  dtsFile: './src/uniwind-types.d.ts',
});
```

Import Pickle's stylesheet in `src/global.css`, and import that file once
from your root layout:

```css
@import '@pickle-ui/react-native/styles.css';
```

`styles.css` brings Tailwind, Uniwind, the tokens and the components' classes,
so don't import `tailwindcss` or `uniwind` again. Uniwind compiles each
imported stylesheet on its own to find themes, and the tokens only compile
after Tailwind and Uniwind, which is why they come from the same file.

To bring your own token set, import its pieces instead: `tailwindcss`,
`uniwind`, your tokens as Uniwind themes, then
`@pickle-ui/react-native/base.css`, which adds the components to Uniwind's
content sources, the `Text` type scale and the font defaults.

To use your app's font, set `--font-sans` to one family name after the import
(`@theme { --font-sans: 'Nunito'; }`) and load its faces under that name with
expo-font; each text's weight picks its face. Headings follow, unless you also
set `--font-heading`. Without `--font-sans`, text keeps the system font.

Then use the components:

```tsx
import { Button, Card, Text } from '@pickle-ui/react-native';

export function Welcome() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Welcome</Card.Title>
        <Card.Description>Pickle UI on iOS and Android.</Card.Description>
      </Card.Header>
      <Card.Content>
        <Button onPress={() => {}}>Get started</Button>
      </Card.Content>
    </Card>
  );
}
```

[`examples/mobile`](../../examples/mobile) is a complete app with the setup
steps, token overrides and runtime brand colors.

## Exports

Each export is also available from its own subpath.

| Export          | Subpath                                   | Notes                                                                                                                                                                                                                              |
| --------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Badge`         | `@pickle-ui/react-native/badge`           | `variant`: `default`, `secondary`, `outline`, `destructive`, `info`, `success`, `warning`, `error` and the statuses `pending`, `submitted`, `inProgress`, `inReview`, `failed`, `expired`; `size`: `sm`, `md`, `lg`                |
| `Button`        | `@pickle-ui/react-native/button`          | `variant`: `default`, `secondary`, `destructive`, `destructive-outline`, `outline`, `ghost`, `link`; `size`: `xs` … `xl`, `icon-xs` … `icon-xl`; `loading`                                                                         |
| `Card`          | `@pickle-ui/react-native/card`            | Parts: `Card.Header`, `Card.Title`, `Card.Description`, `Card.Action`, `Card.Content`, `Card.Footer`                                                                                                                               |
| `Checkbox`      | `@pickle-ui/react-native/checkbox`        | `checked` / `defaultChecked` / `onCheckedChange`, `indeterminate`, `invalid`, `disabled`, `label`; `size`: `md`, `sm`; `classNames`: `field`, `indicator`, `label`                                                                 |
| `Flex`          | `@pickle-ui/react-native/flex`            | A row by default, like the web; `direction`, `wrap`, `align`, `justify`, `gap`, `gapX`, `gapY`                                                                                                                                     |
| `Form`          | `@pickle-ui/react-native/form`            | React Hook Form bindings: `Form.Field` (`label`, `description`, `error`), `Form.Input`, `Form.Textarea`, `Form.InputGroup`, `Form.Checkbox`, `Form.RadioGroup`, `Form.Button`, `Form.Label`, `Form.Description`, `Form.Error`      |
| `Grid`          | `@pickle-ui/react-native/grid`            | Equal columns built from rows of cells (no CSS grid on native): `columns`, `rows`, `flow`, `gap`, `gapX`, `gapY`, `align`, `justify`, `placeContent`, `placeItems`; items can't stretch to their cell's height, give them `flex-1` |
| `Input`         | `@pickle-ui/react-native/input`           | `size`: `sm`, `md`, `lg`, the `Button` heights; `invalid`, `disabled`, `unstyled`; `classNames.input`                                                                                                                              |
| `InputGroup`    | `@pickle-ui/react-native/input-group`     | Parts: `InputGroup.Input`, `InputGroup.Addon` (`align`: `inline-start`, `inline-end`, `block-start`, `block-end`), `InputGroup.Button`, `InputGroup.Text`                                                                          |
| `RadioGroup`    | `@pickle-ui/react-native/radio-group`     | `value` / `defaultValue` / `onValueChange`, `disabled`; parts: `RadioGroup.Item` (`value`, `label`, `invalid`, `disabled`, `size`: `md`, `sm`; `classNames`: `field`, `indicator`, `label`)                                        |
| `Separator`     | `@pickle-ui/react-native/separator`       | `orientation`: `horizontal`, `vertical`; `role="separator"`, announced on the web only                                                                                                                                             |
| `Spinner`       | `@pickle-ui/react-native/spinner`         | Announced as "Loading": `accessibilityLabel` renames it, `aria-hidden` makes it decorative; size it with `size-*` and color it with `text-*`                                                                                       |
| `Text`          | `@pickle-ui/react-native/text`            | `variant`: `h1` … `h4`, `lead`, `body`, `small`, `code`; `tone`: `muted`, `primary`, `destructive`; `weight`: `normal`, `bold`; `truncate`                                                                                         |
| `Textarea`      | `@pickle-ui/react-native/textarea`        | Grows with its content from three lines; `size`, `invalid`, `disabled`; `classNames.textarea`                                                                                                                                      |
| `XStack`        | `@pickle-ui/react-native/x-stack`         | `Flex` as a row                                                                                                                                                                                                                    |
| `YStack`        | `@pickle-ui/react-native/y-stack`         | `Flex` as a column                                                                                                                                                                                                                 |
| `createTheme`   | `@pickle-ui/react-native/theme`           | Derives a theme from a brand color, the same as on the web; apply it with `ScopedVariables`                                                                                                                                        |
| `cn`            | `@pickle-ui/react-native/cn`              | Joins class names; later classes win, and `text-h1` … `text-code` count as font sizes                                                                                                                                              |
| `useColorToken` | `@pickle-ui/react-native/use-color-token` | Reads a token as a color string, for props that don't take a `className`                                                                                                                                                           |

Every component takes the props of the React Native element it renders,
`className` included, and merges your `className` last.

Form fields take `invalid` and `disabled` props where the web reads the
`aria-invalid` and `disabled` attributes, and draw the web's focus ring while
they have focus. Text styles don't cascade on native, so `Checkbox` and
`RadioGroup.Item` style the row around the control with `classNames.field`
and the label text with `classNames.label`; pass `label` rather than a
separate label element, which couldn't toggle the control.

`Form` needs `react-hook-form` (a peer dependency). React Native has no
`<form>`, so `Form` takes `onSubmit` and runs it through `handleSubmit` when
`Form.Button` is pressed, or when the return key is pressed in a
`Form.Input`, like Enter on the web. Give `Form.Button` an `onPress` for
another action. A `Form.Field` label names its control and focuses it when
pressed.

`Button` and `Badge` wrap text children in their label and render other
children, such as icons, as they are. Icons don't inherit the label's color on
native, so pass it to the icon, for example with `useColorToken`. Give an
icon-only button an `icon*` size and an `accessibilityLabel`. Buttons keep the web's dimensions and the text sizes it uses from `sm` up (14px at `md`), and a `hitSlop` stretches each size to a
44pt touch target, as the web's `pointer-coarse` hit area does. Headings (`h1` … `h4`)
are announced as headers.

`Text` sizes come from the shared type scale (`--text-h1` … `--text-code` in
`@pickle-ui/tokens/typography.css`); override them like any token. Every
component's text uses `--font-sans`, and `h1`, `h2` and `Card.Title` use
`--font-heading`, like the web; `code` keeps the platform's monospace font.

## Theming

The tokens are Uniwind themes. Override them in `global.css` inside
`@variant light` and `@variant dark` blocks, declaring each variable in both
themes, or at runtime with Uniwind's `ScopedVariables` and
`Uniwind.updateCSSVariables`. See the
[`@pickle-ui/tokens` README](../tokens/README.md#react-native).

To brand an app at runtime, derive the tokens from one color with
`createTheme` and apply the set for the active theme:

```tsx
import { createTheme } from '@pickle-ui/react-native/theme';
import { ScopedVariables, useUniwind } from 'uniwind';

const brand = createTheme({ primary: '#2563eb' });

export function Branded({ children }: { children: React.ReactNode }) {
  const { theme } = useUniwind();
  return <ScopedVariables variables={brand[theme]}>{children}</ScopedVariables>;
}
```

The values are `oklch()` colors: Uniwind resolves them in `className`
utilities (`bg-primary`), but React Native can't read them from a `style`
prop, so draw with the tokens rather than the raw values. Fonts from
`createTheme` apply too, but React Native reads one family name, not a stack.

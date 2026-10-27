# @pickle-ui/tokens

Pickle UI's design tokens as data: the semantic colors for the light and dark
schemes, the radius scale and the type scale. Every Pickle package derives its
styles from them.

This package is private for now. It will be published when
`@pickle-ui/react-native` starts consuming it.

## What it exports

| Export                             | Contents                                                                                       |
| ---------------------------------- | ---------------------------------------------------------------------------------------------- |
| `colorTokens`                      | Each token's value per scheme, as a palette color, another token, an opacity or a `color-mix`. |
| `colorTokenNames`                  | Token names in stylesheet order (`background`, `foreground`, `card`, …).                       |
| `resolveColors(scheme)`            | Every token resolved to a concrete `#rrggbb` or `#rrggbbaa`, for React Native.                 |
| `themeCss()`                       | The Tailwind v4 stylesheet `@pickle-ui/react` ships as `theme.css`.                            |
| `colorValueToCss(value)`           | One token value as its CSS expression.                                                         |
| `palette`                          | The Tailwind palette families the tokens use, in OKLCH.                                        |
| `radius`, `radiusOffsets`, `radii` | The base radius, each step's offset from it, and each step resolved, in px.                    |
| `typeScale`                        | `fontSize` and `lineHeight` for each `Text` variant, in px.                                    |

```ts
import { radii, resolveColors, typeScale } from '@pickle-ui/tokens';

const colors = resolveColors('dark');

const card = {
  backgroundColor: colors.card,
  borderColor: colors.border,
  borderRadius: radii.lg,
};
const title = { color: colors['card-foreground'], ...typeScale.h4 };
```

## Changing a token

1. Edit the value in `src/colors.ts` or `src/scale.ts`.
2. Run `pnpm --filter @pickle-ui/tokens generate` to rewrite
   `packages/react/src/theme.css`.
3. Commit both files. The tokens tests fail while the stylesheet and the tokens
   disagree, so CI catches a forgotten step.

The web stylesheet keeps token references (`var(--color-neutral-800)`,
`--alpha(…)`, `color-mix(…)`), so overriding a variable still cascades.
`resolveColors` computes the same expressions in sRGB, gamut-mapping wide-gamut
palette colors in OKLCH like browsers do.

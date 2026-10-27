import {
  colorTokenNames,
  type ColorTokens,
  colorTokens,
  type ColorValue,
  radius,
  radiusOffsets,
} from './tokens';

const HEADER = `/**
 * Pickle design tokens: Tailwind theme mapping plus light and dark values.
 * Import this file alone to reuse the tokens without Pickle's base styles,
 * or override any variable after importing \`@pickle-ui/react/styles.css\`.
 *
 * Generated from \`@pickle-ui/tokens\`: do not edit it by hand. Change the
 * tokens in \`packages/tokens/src\`, then run
 * \`pnpm --filter @pickle-ui/tokens generate\`.
 */`;

// The skeleton animation is web-only, so it is written here rather than
// modeled as a token.
const SKELETON_ANIMATION = `  --animate-skeleton: skeleton 2s -1s infinite linear;
  @keyframes skeleton {
    to {
      background-position: -200% 0;
    }
  }`;

/**
 * The Tailwind v4 stylesheet `@pickle-ui/react` ships as `theme.css`: the
 * `@theme inline` mapping that turns each token into a utility (`bg-primary`,
 * `rounded-lg`, …), the light values on `:root` and the dark values on
 * `.dark`. The output is not formatted; run it through Prettier first.
 */
export function themeCss(): string {
  const radiusSteps = Object.entries(radiusOffsets)
    .sort(([, a], [, b]) => a - b)
    .map(([step, offset]) => `  --radius-${step}: ${radiusCss(offset)};`);

  const mapping = [
    '  --font-sans: var(--font-sans);',
    '  --font-heading: var(--font-sans);',
    '  --font-mono: var(--font-mono);',
    ...colorTokenNames.map((name) => `  --color-${name}: var(--${name});`),
    ...radiusSteps,
    SKELETON_ANIMATION,
  ];

  return [
    HEADER,
    `@theme inline {\n${mapping.join('\n')}\n}`,
    block(':root', colorTokens.light, [`  --radius: ${radius / 16}rem;`]),
    block('.dark', colorTokens.dark),
  ].join('\n\n');
}

function block(selector: string, tokens: ColorTokens, extra: string[] = []) {
  const lines = colorTokenNames.map(
    (name) => `  --${name}: ${colorValueToCss(tokens[name])};`,
  );

  return `${selector} {\n${[...extra, ...lines].join('\n')}\n}`;
}

function colorValueToCss(value: ColorValue): string {
  switch (value.type) {
    case 'alpha':
      return `--alpha(${colorValueToCss(value.color)} / ${value.percent}%)`;
    case 'mix':
      return `color-mix(in srgb, ${colorValueToCss(value.color)} ${value.percent}%, ${colorValueToCss(value.with)})`;
    case 'palette':
      return `var(--color-${value.name})`;
    case 'token':
      return `var(--${value.name})`;
  }
}

function radiusCss(offset: number) {
  if (offset === 0) return 'var(--radius)';

  return `calc(var(--radius) ${offset < 0 ? '-' : '+'} ${Math.abs(offset)}px)`;
}

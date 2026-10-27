import {
  colorTokenNames,
  type ColorTokens,
  colorTokens,
  type ColorValue,
} from './colors';
import { radius, radiusOffsets, type RadiusStep } from './scale';

const RADIUS_STEPS: RadiusStep[] = ['sm', 'md', 'lg', 'xl', '2xl'];

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

/** A token value as the CSS expression the web stylesheet declares. */
export function colorValueToCss(value: ColorValue): string {
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

/**
 * The Tailwind v4 stylesheet for the tokens: the `@theme inline` mapping that
 * turns each token into a utility (`bg-primary`, `rounded-lg`, …), the light
 * values on `:root` and the dark values on `.dark`. The output is not
 * formatted; run it through Prettier before writing it to disk.
 */
export function themeCss(): string {
  const mapping = [
    '  --font-sans: var(--font-sans);',
    '  --font-heading: var(--font-sans);',
    '  --font-mono: var(--font-mono);',
    ...colorTokenNames.map((name) => `  --color-${name}: var(--${name});`),
    ...RADIUS_STEPS.map((step) => `  --radius-${step}: ${radiusCss(step)};`),
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

function radiusCss(step: RadiusStep) {
  const offset = radiusOffsets[step];

  if (offset === 0) return 'var(--radius)';

  return `calc(var(--radius) ${offset < 0 ? '-' : '+'} ${Math.abs(offset)}px)`;
}

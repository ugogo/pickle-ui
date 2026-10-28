/**
 * Theme generator: derives Pickle's brand-dependent tokens from a single
 * primary color so apps can theme the library without hand-writing CSS
 * variables. Tokens that do not depend on the brand (neutrals, status colors)
 * keep the values from `native.css`. Platform-free: the web applies the result
 * with `themeToCss` or as a `style`, React Native with Uniwind's
 * `ScopedVariables` or `Uniwind.updateCSSVariables`.
 */

import {
  clampChroma,
  converter,
  formatCss,
  type Oklch,
  parse,
  wcagContrast,
} from 'culori';

type Theme = {
  dark: ThemeVariables;
  light: ThemeVariables;
};

type ThemeCssOptions = {
  darkSelector?: string;
  lightSelector?: string;
};

type ThemeFonts = {
  heading?: string;
  mono?: string;
  sans?: string;
};

type ThemeOptions = {
  /** Font stacks, written to `--font-sans`, `--font-heading` and `--font-mono`. */
  fonts?: ThemeFonts;
  /** Brand color in any CSS notation (hex, rgb, hsl, oklch, …). */
  primary: string;
  /** Brand color for the dark scheme. Defaults to a lighter version of `primary`. */
  primaryDark?: string;
  /** Base radius, e.g. `'0.5rem'`. Every `rounded-*` scale derives from it. */
  radius?: string;
};

type ThemeVariables = Record<`--${string}`, string>;

const toOklch = converter('oklch');

const LIGHT_FOREGROUND: Oklch = { c: 0, h: 0, l: 1, mode: 'oklch' };
const DARK_FOREGROUND: Oklch = { c: 0.006, h: 285.9, l: 0.21, mode: 'oklch' };

/**
 * Build the light and dark token sets for a brand color. On the web, apply
 * the result with `themeToCss` in a stylesheet, or spread `theme.light` /
 * `theme.dark` as the `style` of a wrapper element. On React Native, pass the
 * set for the active scheme to Uniwind's `ScopedVariables`; fonts don't apply
 * there.
 */
export function createTheme(options: ThemeOptions): Theme {
  const primary = parseColor(options.primary, 'primary');
  const primaryDark = options.primaryDark
    ? parseColor(options.primaryDark, 'primaryDark')
    : lightenForDark(primary);
  const shared = sharedVariables(options);

  return {
    dark: { ...shared, ...brandVariables(primaryDark) },
    light: { ...shared, ...brandVariables(primary) },
  };
}

/** Serialize a theme as CSS rules for the light and dark selectors. */
export function themeToCss(
  theme: Theme,
  { darkSelector = '.dark', lightSelector = ':root' }: ThemeCssOptions = {},
): string {
  const block = (selector: string, variables: ThemeVariables) =>
    `${selector} {\n${Object.entries(variables)
      .map(([name, value]) => `  ${name}: ${value};`)
      .join('\n')}\n}`;

  return `${block(lightSelector, theme.light)}\n\n${block(darkSelector, theme.dark)}\n`;
}

function brandVariables(primary: Oklch): ThemeVariables {
  const foreground = foregroundFor(primary);

  return {
    '--primary': format(primary),
    '--primary-foreground': format(foreground),
    '--ring': format({ ...primary, c: primary.c * 0.6 }),
    '--sidebar-primary': format(primary),
    '--sidebar-primary-foreground': format(foreground),
    '--sidebar-ring': format({ ...primary, c: primary.c * 0.6 }),
  };
}

/** White or near-black, whichever reads better on the given fill. */
function foregroundFor(fill: Oklch) {
  return wcagContrast(fill, LIGHT_FOREGROUND) >=
    wcagContrast(fill, DARK_FOREGROUND)
    ? LIGHT_FOREGROUND
    : DARK_FOREGROUND;
}

function format(color: Oklch) {
  return formatCss(clampChroma(color, 'oklch'));
}

/** Lift a brand color so it stays vivid on dark surfaces. */
function lightenForDark(color: Oklch): Oklch {
  return {
    ...color,
    c: color.c * 0.92,
    l: Math.min(Math.max(color.l + 0.12, 0.6), 0.85),
  };
}

function parseColor(value: string, name: string): Oklch {
  const color = parse(value);

  if (!color) {
    throw new Error(`createTheme: ${name} is not a valid CSS color: ${value}`);
  }

  return toOklch(color);
}

function sharedVariables({ fonts, radius }: ThemeOptions): ThemeVariables {
  const variables: ThemeVariables = {};

  if (radius) variables['--radius'] = radius;
  if (fonts?.sans) variables['--font-sans'] = fonts.sans;
  if (fonts?.heading) variables['--font-heading'] = fonts.heading;
  if (fonts?.mono) variables['--font-mono'] = fonts.mono;

  return variables;
}

export type {
  Theme,
  ThemeCssOptions,
  ThemeFonts,
  ThemeOptions,
  ThemeVariables,
};

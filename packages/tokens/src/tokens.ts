/** Base corner radius in px. The stylesheet writes it as `--radius` in rem. */
export const radius = 10;

/**
 * Each radius step as an offset from `radius`, in px. The stylesheet keeps
 * the steps relative (`calc(var(--radius) - 4px)`), so overriding `--radius`
 * rescales them all.
 */
export const radiusOffsets = {
  '2xl': 8,
  lg: 0,
  md: -2,
  sm: -4,
  xl: 4,
} as const;

/**
 * Pickle's semantic color tokens, in the order the stylesheet declares them.
 * `--x` is a fill and `--x-foreground` is the text placed on that fill; status
 * colors add a `-subtle` pair for tinted surfaces.
 */
export const colorTokenNames = [
  'background',
  'foreground',
  'card',
  'card-foreground',
  'popover',
  'popover-foreground',
  'primary',
  'primary-foreground',
  'secondary',
  'secondary-foreground',
  'muted',
  'muted-foreground',
  'accent',
  'accent-foreground',
  'destructive',
  'destructive-foreground',
  'destructive-subtle',
  'destructive-subtle-foreground',
  'info',
  'info-foreground',
  'info-subtle',
  'info-subtle-foreground',
  'success',
  'success-foreground',
  'success-subtle',
  'success-subtle-foreground',
  'warning',
  'warning-foreground',
  'warning-subtle',
  'warning-subtle-foreground',
  'border',
  'input',
  'ring',
  'chart-1',
  'chart-2',
  'chart-3',
  'chart-4',
  'chart-5',
  'sidebar',
  'sidebar-foreground',
  'sidebar-primary',
  'sidebar-primary-foreground',
  'sidebar-accent',
  'sidebar-accent-foreground',
  'sidebar-border',
  'sidebar-ring',
] as const;

export type ColorToken = (typeof colorTokenNames)[number];

export type ColorTokens = Record<ColorToken, ColorValue>;

/**
 * How a token derives its color. Each kind maps to one CSS form, so the
 * stylesheet keeps the references (overriding `--color-neutral-800` or
 * `--background` still cascades), and a platform without CSS variables can
 * still compute the color.
 */
export type ColorValue =
  /** `--alpha(<color> / <percent>%)`: the color at `percent` opacity. */
  | { color: ColorValue; percent: number; type: 'alpha' }
  /** `color-mix(in srgb, <color> <percent>%, <with>)`. */
  | { color: ColorValue; percent: number; type: 'mix'; with: ColorValue }
  /** `var(--<name>)`: another token of the same scheme. */
  | { name: ColorToken; type: 'token' }
  /** `var(--color-<name>)`: a Tailwind palette color. */
  | { name: PaletteColor; type: 'palette' };

/** A Tailwind CSS v4 palette color, written as `var(--color-<name>)`. */
type PaletteColor =
  | 'black'
  | 'white'
  | `${'amber' | 'blue' | 'emerald' | 'neutral' | 'purple' | 'red' | 'rose'}-${50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950}`;

function alpha(color: ColorValue, percent: number): ColorValue {
  return { color, percent, type: 'alpha' };
}

function mix(
  color: ColorValue,
  percent: number,
  other: ColorValue,
): ColorValue {
  return { color, percent, type: 'mix', with: other };
}

function palette(name: PaletteColor): ColorValue {
  return { name, type: 'palette' };
}

function token(name: ColorToken): ColorValue {
  return { name, type: 'token' };
}

const black = palette('black');
const white = palette('white');

const light: ColorTokens = {
  accent: alpha(black, 4),
  'accent-foreground': palette('neutral-800'),
  background: white,
  border: alpha(black, 8),
  card: white,
  'card-foreground': palette('neutral-800'),
  'chart-1': palette('blue-600'),
  'chart-2': palette('emerald-600'),
  'chart-3': palette('amber-600'),
  'chart-4': palette('purple-600'),
  'chart-5': palette('rose-600'),
  destructive: palette('red-500'),
  'destructive-foreground': white,
  'destructive-subtle': alpha(token('destructive'), 8),
  'destructive-subtle-foreground': palette('red-700'),
  foreground: palette('neutral-800'),
  info: palette('blue-500'),
  'info-foreground': white,
  'info-subtle': alpha(token('info'), 8),
  'info-subtle-foreground': palette('blue-700'),
  input: alpha(black, 10),
  muted: alpha(black, 4),
  'muted-foreground': mix(palette('neutral-500'), 90, black),
  popover: white,
  'popover-foreground': palette('neutral-800'),
  primary: palette('neutral-800'),
  'primary-foreground': palette('neutral-50'),
  ring: palette('neutral-400'),
  secondary: alpha(black, 4),
  'secondary-foreground': palette('neutral-800'),
  sidebar: palette('neutral-50'),
  'sidebar-accent': alpha(black, 4),
  'sidebar-accent-foreground': palette('neutral-800'),
  'sidebar-border': alpha(black, 6),
  'sidebar-foreground': mix(palette('neutral-800'), 64, token('sidebar')),
  'sidebar-primary': palette('neutral-800'),
  'sidebar-primary-foreground': palette('neutral-50'),
  'sidebar-ring': palette('neutral-400'),
  success: palette('emerald-500'),
  'success-foreground': white,
  'success-subtle': alpha(token('success'), 8),
  'success-subtle-foreground': palette('emerald-700'),
  warning: palette('amber-500'),
  'warning-foreground': palette('amber-950'),
  'warning-subtle': alpha(token('warning'), 8),
  'warning-subtle-foreground': palette('amber-700'),
};

const dark: ColorTokens = {
  accent: alpha(white, 4),
  'accent-foreground': palette('neutral-100'),
  background: mix(palette('neutral-950'), 96, white),
  border: alpha(white, 6),
  card: mix(token('background'), 98, white),
  'card-foreground': palette('neutral-100'),
  'chart-1': palette('blue-500'),
  'chart-2': palette('emerald-500'),
  'chart-3': palette('amber-500'),
  'chart-4': palette('purple-500'),
  'chart-5': palette('rose-500'),
  destructive: mix(palette('red-500'), 90, white),
  'destructive-foreground': white,
  'destructive-subtle': alpha(token('destructive'), 16),
  'destructive-subtle-foreground': palette('red-400'),
  foreground: palette('neutral-100'),
  info: palette('blue-500'),
  'info-foreground': white,
  'info-subtle': alpha(token('info'), 16),
  'info-subtle-foreground': palette('blue-400'),
  input: alpha(white, 8),
  muted: alpha(white, 4),
  'muted-foreground': mix(palette('neutral-500'), 90, white),
  popover: mix(token('background'), 96, white),
  'popover-foreground': palette('neutral-100'),
  primary: palette('neutral-100'),
  'primary-foreground': palette('neutral-800'),
  ring: palette('neutral-500'),
  secondary: alpha(white, 4),
  'secondary-foreground': palette('neutral-100'),
  sidebar: mix(palette('neutral-950'), 97, white),
  'sidebar-accent': alpha(white, 4),
  'sidebar-accent-foreground': palette('neutral-100'),
  'sidebar-border': alpha(white, 5),
  'sidebar-foreground': mix(palette('neutral-100'), 64, token('sidebar')),
  'sidebar-primary': palette('neutral-100'),
  'sidebar-primary-foreground': palette('neutral-800'),
  'sidebar-ring': palette('neutral-500'),
  success: palette('emerald-500'),
  'success-foreground': white,
  'success-subtle': alpha(token('success'), 16),
  'success-subtle-foreground': palette('emerald-400'),
  warning: palette('amber-500'),
  'warning-foreground': palette('amber-950'),
  'warning-subtle': alpha(token('warning'), 16),
  'warning-subtle-foreground': palette('amber-400'),
};

/** Every color token's value for the light and dark schemes. */
export const colorTokens = { dark, light };

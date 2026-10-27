import {
  converter,
  formatHex,
  formatHex8,
  interpolate,
  parse,
  type Rgb,
  toGamut,
} from 'culori';

import {
  type ColorScheme,
  type ColorToken,
  colorTokenNames,
  colorTokens,
  type ColorValue,
} from './colors';
import { palette } from './palette';

const toRgb = converter('rgb');
const toSrgbGamut = toGamut('rgb', 'oklch');

/**
 * Every color token of a scheme as a concrete sRGB color: `#rrggbb`, or
 * `#rrggbbaa` when it is translucent. For platforms without CSS variables,
 * such as React Native. Palette colors outside sRGB are gamut-mapped in
 * OKLCH, as browsers do.
 */
export function resolveColors(scheme: ColorScheme): Record<ColorToken, string> {
  const tokens = colorTokens[scheme];
  const cache = new Map<ColorToken, Rgb>();

  const resolve = (value: ColorValue): Rgb => {
    switch (value.type) {
      case 'alpha': {
        const color = resolve(value.color);
        return { ...color, alpha: (color.alpha ?? 1) * (value.percent / 100) };
      }
      case 'mix':
        // color-mix(in srgb, a p%, b) weighs `a` by p and `b` by the rest.
        return toRgb(
          interpolate(
            [resolve(value.color), resolve(value.with)],
            'rgb',
          )(1 - value.percent / 100),
        );
      case 'palette':
        return toRgb(parse(palette[value.name])!);
      case 'token': {
        const cached = cache.get(value.name);
        if (cached) return cached;

        const color = resolve(tokens[value.name]);
        cache.set(value.name, color);
        return color;
      }
    }
  };

  return Object.fromEntries(
    colorTokenNames.map((name) => {
      const color = toSrgbGamut(resolve({ name, type: 'token' }));
      const opaque = (color.alpha ?? 1) >= 1;

      return [name, opaque ? formatHex(color) : formatHex8(color)];
    }),
  ) as Record<ColorToken, string>;
}

import { fileURLToPath } from 'node:url';
import { format, resolveConfig } from 'prettier';
import { describe, expect, it } from 'vitest';

import { colorValueToCss, themeCss } from './css';

const REACT_THEME = fileURLToPath(
  new URL('../../react/src/theme.css', import.meta.url),
);

describe('themeCss', () => {
  // `@pickle-ui/react` ships the generated file: this fails when it drifts
  // from the tokens, and `pnpm --filter @pickle-ui/tokens generate` rewrites it.
  it('matches the stylesheet @pickle-ui/react ships', async () => {
    const config = await resolveConfig(REACT_THEME);
    const css = await format(themeCss(), { ...config, filepath: REACT_THEME });

    await expect(css).toMatchFileSnapshot(REACT_THEME);
  });
});

describe('colorValueToCss', () => {
  it('writes each kind of value as its CSS form', () => {
    expect(colorValueToCss({ name: 'neutral-800', type: 'palette' })).toBe(
      'var(--color-neutral-800)',
    );
    expect(colorValueToCss({ name: 'background', type: 'token' })).toBe(
      'var(--background)',
    );
    expect(
      colorValueToCss({
        color: { name: 'black', type: 'palette' },
        percent: 4,
        type: 'alpha',
      }),
    ).toBe('--alpha(var(--color-black) / 4%)');
    expect(
      colorValueToCss({
        color: { name: 'neutral-500', type: 'palette' },
        percent: 90,
        type: 'mix',
        with: { name: 'white', type: 'palette' },
      }),
    ).toBe(
      'color-mix(in srgb, var(--color-neutral-500) 90%, var(--color-white))',
    );
  });
});

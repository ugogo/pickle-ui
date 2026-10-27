import { describe, expect, it } from 'vitest';

import { colorTokenNames } from './colors';
import { resolveColors } from './resolve';

describe('resolveColors', () => {
  it.each(['light', 'dark'] as const)(
    'resolves every %s token to a hex color',
    (scheme) => {
      const colors = resolveColors(scheme);

      expect(Object.keys(colors)).toEqual([...colorTokenNames]);
      for (const value of Object.values(colors)) {
        expect(value).toMatch(/^#[0-9a-f]{6}([0-9a-f]{2})?$/);
      }
    },
  );

  it('resolves palette references, opacity and mixes', () => {
    const light = resolveColors('light');
    const dark = resolveColors('dark');

    expect(light.background).toBe('#ffffff');
    expect(light['destructive-foreground']).toBe('#ffffff');
    // black at 4% opacity
    expect(light.secondary).toBe('#0000000a');
    // the dark card mixes the dark background with 2% white
    expect(dark.card).not.toBe(dark.background);
    expect(dark.card).toMatch(/^#[0-9a-f]{6}$/);
  });

  it('follows token references within the scheme', () => {
    const light = resolveColors('light');

    // destructive-subtle is destructive at 8% opacity
    expect(light['destructive-subtle'].slice(0, 7)).toBe(light.destructive);
    expect(light['destructive-subtle'].slice(7)).toBe('14');
  });
});

import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { describe, expect, it } from 'vitest';

import { palette } from './palette';

const tailwindTheme = readFileSync(
  createRequire(import.meta.url).resolve('tailwindcss/theme.css'),
  'utf8',
);

describe('palette', () => {
  it.each(Object.entries(palette))('matches Tailwind for %s', (name, value) => {
    expect(tailwindTheme).toContain(`--color-${name}: ${value};`);
  });
});

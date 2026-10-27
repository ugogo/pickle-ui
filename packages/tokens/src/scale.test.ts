import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

import { radii, typeScale } from './scale';

const baseCss = readFileSync(
  new URL('../../react/src/base.css', import.meta.url),
  'utf8',
);

/** Evaluate a CSS number or a `calc(a / b)` ratio. */
function evaluate(value: string) {
  const ratio = /^calc\(([\d.]+) \/ ([\d.]+)\)$/.exec(value);

  return ratio ? Number(ratio[1]) / Number(ratio[2]) : Number(value);
}

describe('typeScale', () => {
  // `@pickle-ui/react`'s base.css writes the scale by hand; keep it in step.
  it.each(Object.entries(typeScale))(
    'matches base.css for %s',
    (step, { fontSize, lineHeight }) => {
      const size = new RegExp(`--text-${step}: ([\\d.]+)rem;`).exec(baseCss);
      const leading = new RegExp(`--text-${step}--line-height: ([^;]+);`).exec(
        baseCss,
      );

      expect(Number(size?.[1]) * 16).toBe(fontSize);
      expect(evaluate(leading?.[1] ?? '') * fontSize).toBeCloseTo(lineHeight);
    },
  );
});

describe('radii', () => {
  it('resolves every step against the base radius', () => {
    expect(radii).toEqual({ '2xl': 18, lg: 10, md: 8, sm: 6, xl: 14 });
  });
});

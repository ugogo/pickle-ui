import { describe, expect, it } from 'vitest';

import {
  colorToString,
  hexToRgb,
  hslToRgb,
  hsvToRgb,
  parseColorString,
  rgbToHex,
  rgbToHsl,
  rgbToHsv,
} from './color';

describe('hex <-> rgb', () => {
  it('parses a primary hex to rgb', () => {
    expect(hexToRgb('#ff0000')).toEqual({ a: 1, b: 0, g: 0, r: 255 });
  });

  it('applies an explicit alpha', () => {
    expect(hexToRgb('#ff0000', 0.5)).toEqual({ a: 0.5, b: 0, g: 0, r: 255 });
  });

  it('falls back to black for an unparseable string', () => {
    expect(hexToRgb('not-a-color')).toEqual({ a: 1, b: 0, g: 0, r: 0 });
  });

  it('serializes rgb back to hex', () => {
    expect(rgbToHex({ a: 1, b: 0, g: 0, r: 255 })).toBe('#ff0000');
  });
});

describe('rgb <-> hsv', () => {
  it('converts a primary to hsv', () => {
    expect(rgbToHsv({ a: 1, b: 0, g: 0, r: 255 })).toEqual({
      a: 1,
      h: 0,
      s: 100,
      v: 100,
    });
  });

  it('converts hsv green back to rgb', () => {
    expect(hsvToRgb({ a: 1, h: 120, s: 100, v: 100 })).toEqual({
      a: 1,
      b: 0,
      g: 255,
      r: 0,
    });
  });

  // Documents CURRENT behavior: achromatic colors report hue 0 (red).
  // Plan 004 changes this to preserve a caller-supplied hue. When 004 lands,
  // this assertion is expected to be updated there.
  it('reports hue 0 for white (achromatic)', () => {
    expect(rgbToHsv({ a: 1, b: 255, g: 255, r: 255 })).toEqual({
      a: 1,
      h: 0,
      s: 0,
      v: 100,
    });
  });
});

describe('rgb <-> hsl', () => {
  it('converts a primary to hsl', () => {
    expect(rgbToHsl({ a: 1, b: 0, g: 0, r: 255 })).toEqual({
      h: 0,
      l: 50,
      s: 100,
    });
  });

  it('converts hsl green back to rgb', () => {
    expect(hslToRgb({ h: 120, l: 50, s: 100 })).toEqual({
      a: 1,
      b: 0,
      g: 255,
      r: 0,
    });
  });
});

describe('parseColorString', () => {
  it('parses an rgb() string', () => {
    expect(parseColorString('rgb(255, 0, 0)')).toEqual({
      a: 1,
      b: 0,
      g: 0,
      r: 255,
    });
  });

  it('parses an hsb() string (handled by the custom parser)', () => {
    expect(parseColorString('hsb(120, 100%, 100%)')).toEqual({
      a: 1,
      b: 0,
      g: 255,
      r: 0,
    });
  });

  it('returns null for an unparseable string', () => {
    expect(parseColorString('definitely not a color')).toBeNull();
  });
});

describe('colorToString', () => {
  it('formats opaque rgb without the alpha channel', () => {
    expect(colorToString({ a: 1, b: 0, g: 0, r: 255 }, 'rgb')).toBe(
      'rgb(255, 0, 0)',
    );
  });

  it('formats translucent rgb with the alpha channel', () => {
    expect(colorToString({ a: 0.5, b: 0, g: 0, r: 255 }, 'rgb')).toBe(
      'rgba(255, 0, 0, 0.5)',
    );
  });

  it('defaults to hex', () => {
    expect(colorToString({ a: 1, b: 0, g: 0, r: 0 })).toBe('#000000');
  });
});

describe('rgbToHsv hue preservation', () => {
  it('uses the fallback hue for an achromatic color', () => {
    // White has no intrinsic hue; without a fallback it reports 0.
    expect(rgbToHsv({ a: 1, b: 255, g: 255, r: 255 }, 200)).toEqual({
      a: 1,
      h: 200,
      s: 0,
      v: 100,
    });
  });

  it('ignores the fallback when the color has a real hue', () => {
    expect(rgbToHsv({ a: 1, b: 0, g: 255, r: 0 }, 200)).toEqual({
      a: 1,
      h: 120,
      s: 100,
      v: 100,
    });
  });

  it('still defaults to hue 0 with no fallback (backward compatible)', () => {
    expect(rgbToHsv({ a: 1, b: 128, g: 128, r: 128 })).toMatchObject({ h: 0 });
  });
});

/**
 * Color helpers for the color picker.
 *
 * culori performs every color-space conversion and string parse. The functions
 * here are thin adapters that translate between culori's normalized shape
 * (`{ mode, r/g/b: 0–1, alpha: 0–1 }`) and the integer/percentage shape the UI
 * works in (`ColorValue` with 0–255 channels, HSL/HSV in degrees/percent), plus
 * rounding and null-hue handling for greys.
 */

/* eslint-disable perfectionist/sort-objects, perfectionist/sort-object-types, perfectionist/sort-interfaces, perfectionist/sort-modules, perfectionist/sort-switch-case -- color values read best in their conventional order (RGBA/HSVA channels, culori's mode-first shape, rgb↔x conversion pairs, format precedence) rather than alphabetically. */

import { converter, formatHex, type Hsv, parse, type Rgb } from 'culori';

export const colorFormats = ['hex', 'rgb', 'hsl', 'hsb'] as const;

export type ColorFormat = (typeof colorFormats)[number];

export interface ColorValue {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface HSVColorValue {
  h: number;
  s: number;
  v: number;
  a: number;
}

const toRgb = converter('rgb');
const toHsl = converter('hsl');
const toHsv = converter('hsv');

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function alphaToValue(alpha: number | undefined) {
  return clamp(alpha ?? 1, 0, 1);
}

function parseAlphaValue(value: string | undefined, isPercent?: string) {
  if (!value) return 1;

  const alpha = Number.parseFloat(value);
  return alphaToValue(isPercent ? alpha / 100 : alpha);
}

function toCuloriRgb(color: ColorValue): Rgb {
  return {
    mode: 'rgb',
    r: color.r / 255,
    g: color.g / 255,
    b: color.b / 255,
    alpha: color.a,
  };
}

function fromCuloriRgb(color: Rgb): ColorValue {
  return {
    r: Math.round(clamp(color.r, 0, 1) * 255),
    g: Math.round(clamp(color.g, 0, 1) * 255),
    b: Math.round(clamp(color.b, 0, 1) * 255),
    a: alphaToValue(color.alpha),
  };
}

/** culori does not parse the `hsb()`/`hsba()` notation, so handle it ourselves. */
function parseHsbString(value: string): Hsv | null {
  const numberPattern = String.raw`([+-]?(?:\d+\.?\d*|\.\d+))`;
  const hsbMatch = new RegExp(
    String.raw`^hsba?\(\s*${numberPattern}(?:deg)?(?:\s*,\s*|\s+)${numberPattern}%(?:\s*,\s*|\s+)${numberPattern}%(?:\s*(?:,|\/)\s*${numberPattern}(%)?)?\s*\)$`,
    'i',
  ).exec(value);

  if (!hsbMatch) return null;

  return {
    mode: 'hsv',
    h: Number.parseFloat(hsbMatch[1] ?? '0'),
    s: clamp(Number.parseFloat(hsbMatch[2] ?? '0') / 100, 0, 1),
    v: clamp(Number.parseFloat(hsbMatch[3] ?? '0') / 100, 0, 1),
    alpha: parseAlphaValue(hsbMatch[4], hsbMatch[5]),
  };
}

export function hexToRgb(hex: string, alpha?: number): ColorValue {
  const color = parse(hex);
  const rgb = color ? toRgb(color) : undefined;

  return rgb
    ? { ...fromCuloriRgb(rgb), a: alpha ?? 1 }
    : { r: 0, g: 0, b: 0, a: alpha ?? 1 };
}

export function isColorEqual(a: ColorValue, b: ColorValue) {
  return a.r === b.r && a.g === b.g && a.b === b.b && a.a === b.a;
}

export function isHsvEqual(a: HSVColorValue, b: HSVColorValue) {
  return a.h === b.h && a.s === b.s && a.v === b.v && a.a === b.a;
}

export function rgbToHex(color: ColorValue): string {
  return formatHex(toCuloriRgb(color)) ?? '#000000';
}

export function rgbToHsv(color: ColorValue, fallbackHue = 0): HSVColorValue {
  const hsv = toHsv(toCuloriRgb(color));

  return {
    h: Math.round(hsv.h ?? fallbackHue),
    s: Math.round(hsv.s * 100),
    v: Math.round(hsv.v * 100),
    a: alphaToValue(hsv.alpha),
  };
}

export function hsvToRgb(hsv: HSVColorValue): ColorValue {
  return fromCuloriRgb(
    toRgb({
      mode: 'hsv',
      h: hsv.h,
      s: hsv.s / 100,
      v: hsv.v / 100,
      alpha: hsv.a,
    }),
  );
}

export function rgbToHsl(color: ColorValue) {
  const hsl = toHsl(toCuloriRgb(color));

  return {
    h: Math.round(hsl.h ?? 0),
    s: Math.round(hsl.s * 100),
    l: Math.round(hsl.l * 100),
  };
}

export function hslToRgb(
  hsl: { h: number; s: number; l: number },
  alpha = 1,
): ColorValue {
  return fromCuloriRgb(
    toRgb({
      mode: 'hsl',
      h: hsl.h,
      s: hsl.s / 100,
      l: hsl.l / 100,
      alpha,
    }),
  );
}

export function colorToString(
  color: ColorValue,
  format: ColorFormat = 'hex',
): string {
  switch (format) {
    case 'hex':
      return rgbToHex(color);
    case 'rgb':
      return color.a < 1
        ? `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
        : `rgb(${color.r}, ${color.g}, ${color.b})`;
    case 'hsl': {
      const hsl = rgbToHsl(color);
      return color.a < 1
        ? `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${color.a})`
        : `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    }
    case 'hsb': {
      const hsv = rgbToHsv(color);
      return color.a < 1
        ? `hsba(${hsv.h}, ${hsv.s}%, ${hsv.v}%, ${color.a})`
        : `hsb(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`;
    }
    default:
      return rgbToHex(color);
  }
}

export function parseColorString(value: string): ColorValue | null {
  const trimmed = value.trim();
  const color = parseHsbString(trimmed) ?? parse(trimmed);
  const rgb = color ? toRgb(color) : undefined;

  return rgb ? fromCuloriRgb(rgb) : null;
}

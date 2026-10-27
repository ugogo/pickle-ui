/** Base corner radius in px. The web stylesheet writes it as `--radius` in rem. */
export const radius = 10;

/**
 * Each radius step as an offset from `radius`, in px. On the web the steps
 * stay relative (`calc(var(--radius) - 4px)`), so overriding `--radius`
 * rescales them all.
 */
export const radiusOffsets = {
  '2xl': 8,
  lg: 0,
  md: -2,
  sm: -4,
  xl: 4,
} as const;

export type RadiusStep = keyof typeof radiusOffsets;

/** Each radius step resolved against the base `radius`, in px. */
export const radii = Object.fromEntries(
  Object.entries(radiusOffsets).map(([step, offset]) => [
    step,
    radius + offset,
  ]),
) as Record<RadiusStep, number>;

/**
 * The type scale behind `Text`'s variants, in px. The web stylesheet writes
 * `fontSize` in rem and `lineHeight` as a ratio of it.
 */
export const typeScale = {
  body: { fontSize: 14, lineHeight: 21 },
  code: { fontSize: 12, lineHeight: 16 },
  h1: { fontSize: 30, lineHeight: 36 },
  h2: { fontSize: 24, lineHeight: 32 },
  h3: { fontSize: 20, lineHeight: 28 },
  h4: { fontSize: 18, lineHeight: 28 },
  lead: { fontSize: 16, lineHeight: 24 },
  small: { fontSize: 12, lineHeight: 12 },
} as const;

export type TypeScaleStep = keyof typeof typeScale;

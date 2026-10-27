import { useCSSVariable } from 'uniwind';

/**
 * Reads a token as a color string, for props that take a color instead of a
 * className (navigation options, `Switch`, `placeholderTextColor`).
 * `useColorToken('primary')` returns the value behind `bg-primary`, or
 * `undefined` when the token doesn't exist, so a typo never turns into the
 * color `"undefined"`.
 */
export function useColorToken(name: string): string | undefined {
  const value = useCSSVariable(`--${name}`);
  return typeof value === 'string' ? value : undefined;
}

import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * Teaches tailwind-merge Pickle's theme scales: `text-body`, `text-h1`, … are
 * font sizes, so they must not be mistaken for text colors and dropped next
 * to one.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ['body', 'code', 'h1', 'h2', 'h3', 'h4', 'lead', 'small'],
    },
  },
});

/**
 * Per-slot class overrides for components that render several parts from a
 * single props object. Keys match the suffix of each part's `data-slot`.
 */
export type SlotClassNames<Slot extends string> = Partial<Record<Slot, string>>;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

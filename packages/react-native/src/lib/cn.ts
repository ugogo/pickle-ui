import { extendTailwindMerge } from 'tailwind-merge';

/**
 * Teaches tailwind-merge Pickle's type scale: `text-body`, `text-h1`, … are
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

/** Joins class names; later classes win, like `@pickle-ui/react/cn`. */
export function cn(...classes: Array<false | null | string | undefined>) {
  return twMerge(classes.filter(Boolean).join(' '));
}

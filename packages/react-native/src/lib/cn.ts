import { twMerge } from 'tailwind-merge';

/** Joins class names; later classes win, like `@pickle-ui/react/cn`. */
export function cn(...classes: Array<false | null | string | undefined>) {
  return twMerge(classes.filter(Boolean).join(' '));
}

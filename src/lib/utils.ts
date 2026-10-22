import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Per-slot class overrides for components that render several parts from a
 * single props object. Keys match the suffix of each part's `data-slot`.
 */
export type SlotClassNames<Slot extends string> = Partial<Record<Slot, string>>;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

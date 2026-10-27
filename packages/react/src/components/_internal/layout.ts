import { cn } from '@/lib/utils';

const alignClasses = {
  baseline: 'items-baseline',
  center: 'items-center',
  end: 'items-end',
  start: 'items-start',
  stretch: 'items-stretch',
} as const;

const gapClasses = {
  0: 'gap-0',
  0.5: 'gap-0.5',
  1: 'gap-1',
  1.5: 'gap-1.5',
  2: 'gap-2',
  2.5: 'gap-2.5',
  3: 'gap-3',
  3.5: 'gap-3.5',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
  8: 'gap-8',
  10: 'gap-10',
  12: 'gap-12',
  16: 'gap-16',
} as const;

const gapXClasses = {
  0: 'gap-x-0',
  0.5: 'gap-x-0.5',
  1: 'gap-x-1',
  1.5: 'gap-x-1.5',
  2: 'gap-x-2',
  2.5: 'gap-x-2.5',
  3: 'gap-x-3',
  3.5: 'gap-x-3.5',
  4: 'gap-x-4',
  5: 'gap-x-5',
  6: 'gap-x-6',
  8: 'gap-x-8',
  10: 'gap-x-10',
  12: 'gap-x-12',
  16: 'gap-x-16',
} as const;

const gapYClasses = {
  0: 'gap-y-0',
  0.5: 'gap-y-0.5',
  1: 'gap-y-1',
  1.5: 'gap-y-1.5',
  2: 'gap-y-2',
  2.5: 'gap-y-2.5',
  3: 'gap-y-3',
  3.5: 'gap-y-3.5',
  4: 'gap-y-4',
  5: 'gap-y-5',
  6: 'gap-y-6',
  8: 'gap-y-8',
  10: 'gap-y-10',
  12: 'gap-y-12',
  16: 'gap-y-16',
} as const;

const justifyClasses = {
  around: 'justify-around',
  between: 'justify-between',
  center: 'justify-center',
  end: 'justify-end',
  evenly: 'justify-evenly',
  start: 'justify-start',
} as const;

type LayoutAlign = keyof typeof alignClasses;
type LayoutGap = keyof typeof gapClasses;
type LayoutJustify = keyof typeof justifyClasses;

type LayoutStyleProps = {
  align?: LayoutAlign;
  gap?: LayoutGap;
  gapX?: LayoutGap;
  gapY?: LayoutGap;
  justify?: LayoutJustify;
};

function getLayoutClasses({
  align,
  gap,
  gapX,
  gapY,
  justify,
}: LayoutStyleProps) {
  return cn(
    align === undefined ? undefined : alignClasses[align],
    gap === undefined ? undefined : gapClasses[gap],
    gapX === undefined ? undefined : gapXClasses[gapX],
    gapY === undefined ? undefined : gapYClasses[gapY],
    justify === undefined ? undefined : justifyClasses[justify],
  );
}

export { getLayoutClasses };
export type { LayoutStyleProps };

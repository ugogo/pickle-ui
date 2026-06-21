import * as React from 'react';

import { cn } from '@/lib/utils';

import { getLayoutClasses, type LayoutStyleProps } from './_internal/layout';

const columnClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
  9: 'grid-cols-9',
  10: 'grid-cols-10',
  11: 'grid-cols-11',
  12: 'grid-cols-12',
} as const;

const flowClasses = {
  column: 'grid-flow-col',
  'column-dense': 'grid-flow-col-dense',
  dense: 'grid-flow-dense',
  row: 'grid-flow-row',
  'row-dense': 'grid-flow-row-dense',
} as const;

const placeContentClasses = {
  around: 'place-content-around',
  baseline: 'place-content-baseline',
  between: 'place-content-between',
  center: 'place-content-center',
  end: 'place-content-end',
  evenly: 'place-content-evenly',
  start: 'place-content-start',
  stretch: 'place-content-stretch',
} as const;

const placeItemsClasses = {
  baseline: 'place-items-baseline',
  center: 'place-items-center',
  end: 'place-items-end',
  start: 'place-items-start',
  stretch: 'place-items-stretch',
} as const;

const rowClasses = {
  1: 'grid-rows-1',
  2: 'grid-rows-2',
  3: 'grid-rows-3',
  4: 'grid-rows-4',
  5: 'grid-rows-5',
  6: 'grid-rows-6',
  7: 'grid-rows-7',
  8: 'grid-rows-8',
  9: 'grid-rows-9',
  10: 'grid-rows-10',
  11: 'grid-rows-11',
  12: 'grid-rows-12',
} as const;

type GridProps = LayoutStyleProps &
  Omit<React.ComponentProps<'div'>, keyof LayoutStyleProps> & {
    as?: React.ElementType;
    columns?: keyof typeof columnClasses;
    flow?: keyof typeof flowClasses;
    placeContent?: keyof typeof placeContentClasses;
    placeItems?: keyof typeof placeItemsClasses;
    rows?: keyof typeof rowClasses;
  };

function Grid({
  align,
  as,
  className,
  columns,
  flow,
  gap,
  gapX,
  gapY,
  justify,
  placeContent,
  placeItems,
  ref,
  rows,
  ...props
}: GridProps) {
  const Component = as ?? 'div';

  return (
    <Component
      className={cn(
        'grid',
        getLayoutClasses({ align, gap, gapX, gapY, justify }),
        columns === undefined ? undefined : columnClasses[columns],
        flow === undefined ? undefined : flowClasses[flow],
        placeContent === undefined
          ? undefined
          : placeContentClasses[placeContent],
        placeItems === undefined ? undefined : placeItemsClasses[placeItems],
        rows === undefined ? undefined : rowClasses[rows],
        className,
      )}
      data-slot="grid"
      ref={ref}
      {...props}
    />
  );
}

export { Grid };
export type { GridProps };

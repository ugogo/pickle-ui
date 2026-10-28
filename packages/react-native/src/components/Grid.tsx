import { Children } from 'react';
import { View } from 'react-native';

import { cn } from '../lib/cn';
import {
  gapXClasses,
  gapYClasses,
  type LayoutAlign,
  type LayoutGap,
} from './_internal/layout';

// React Native has no CSS grid, so `Grid` places its children itself: one row
// of equal `flex-1` cells per grid row, spaced by `gapX`, and the rows stacked
// and spaced by `gapY`. Cells left empty in the last row or column keep their
// width, so every column stays the same size.

type GridPlacement = 'center' | 'end' | 'start' | 'stretch';
type GridTrackCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

// Cells are columns: `items-*` places an item across the cell's width and
// `justify-*` down its height. A cell can't stretch an item vertically; give
// the item `flex-1` to fill its cell's height.
const horizontalClasses = {
  baseline: 'items-start',
  center: 'items-center',
  end: 'items-end',
  start: 'items-start',
  stretch: 'items-stretch',
} as const;

const verticalClasses = {
  baseline: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  start: 'justify-start',
  stretch: 'justify-start',
} as const;

export type GridProps = React.ComponentProps<typeof View> & {
  /** Places each item down its cell, like CSS `align-items`. */
  align?: LayoutAlign;
  columns?: GridTrackCount;
  /** Fills rows first (`row`) or columns first (`column`). */
  flow?: 'column' | 'row';
  gap?: LayoutGap;
  gapX?: LayoutGap;
  gapY?: LayoutGap;
  /** Places each item across and down its cell, like CSS `place-items`. */
  placeItems?: GridPlacement;
  /** Number of rows filled before a new column starts, with `flow="column"`. */
  rows?: GridTrackCount;
};

/**
 * Lays its children out in equal columns, like `Grid` in @pickle-ui/react.
 * Items fill their cell's width by default and the cells of a row share its
 * height.
 */
export function Grid({
  align,
  children,
  className,
  columns,
  flow = 'row',
  gap,
  gapX = gap,
  gapY = gap,
  placeItems,
  rows,
  ...props
}: GridProps) {
  const items = Children.toArray(children);
  const rowCount =
    flow === 'column'
      ? Math.min(rows ?? 1, items.length)
      : Math.ceil(items.length / (columns ?? 1));
  const columnCount =
    flow === 'column'
      ? Math.max(columns ?? 1, Math.ceil(items.length / (rows ?? 1)))
      : (columns ?? 1);
  const vertical = placeItems ?? align;

  return (
    <View
      className={cn(
        gapY === undefined ? undefined : gapYClasses[gapY],
        className,
      )}
      {...props}
    >
      {Array.from({ length: rowCount }, (_, row) => (
        <View
          className={cn(
            'flex-row',
            gapX === undefined ? undefined : gapXClasses[gapX],
          )}
          key={row}
        >
          {Array.from({ length: columnCount }, (_, column) => {
            const item =
              items[
                flow === 'column'
                  ? column * rowCount + row
                  : row * columnCount + column
              ];

            return (
              <View
                className={cn(
                  'flex-1',
                  placeItems !== undefined && horizontalClasses[placeItems],
                  vertical !== undefined && verticalClasses[vertical],
                )}
                key={column}
              >
                {item}
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
}

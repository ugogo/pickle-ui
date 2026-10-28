import { Children, Fragment, isValidElement, type ReactNode } from 'react';
import { View } from 'react-native';

import { cn } from '../lib/cn';
import {
  gapXClasses,
  gapYClasses,
  type LayoutAlign,
  type LayoutGap,
  type LayoutJustify,
} from './_internal/layout';

// React Native has no CSS grid, so `Grid` places its children itself: one row
// of equal `flex-1` cells per grid row, spaced by `gapX`, and the rows stacked
// and spaced by `gapY`. Empty cells and rows keep their size, so every column
// stays the same width and `rows` keeps its tracks, as on the web.

type GridFlow = 'column' | 'column-dense' | 'dense' | 'row' | 'row-dense';
type GridPlaceContent = 'baseline' | 'stretch' | LayoutJustify;
type GridTrackCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

// Cells are columns: `items-*` places an item across the cell's width and
// `justify-*` down its height. A cell can't stretch an item vertically, so
// `stretch` and `baseline` place it at the top; give the item `flex-1` to fill
// its cell's height.
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

// Distributes the rows down the grid and the cells along each row, like CSS
// `align-content` and `justify-content`. Cells share each row's width, so only
// a grid taller than its rows shows the difference; `stretch` grows the rows
// into that height instead.
const contentClasses = {
  around: 'justify-around',
  baseline: 'justify-start',
  between: 'justify-between',
  center: 'justify-center',
  end: 'justify-end',
  evenly: 'justify-evenly',
  start: 'justify-start',
  stretch: 'justify-start',
} as const;

export type GridProps = React.ComponentProps<typeof View> & {
  /**
   * Places each item down its cell, like CSS `align-items`. `stretch` and
   * `baseline` place it at the top: give the item `flex-1` to fill the cell.
   */
  align?: LayoutAlign;
  columns?: GridTrackCount;
  /**
   * Fills rows first (`row`) or columns first (`column`). Items can't span
   * cells on native, so the `dense` flows place them like `row` and `column`.
   */
  flow?: GridFlow;
  gap?: LayoutGap;
  gapX?: LayoutGap;
  gapY?: LayoutGap;
  /** Distributes the cells along each row, like CSS `justify-content`. */
  justify?: LayoutJustify;
  /** Distributes the rows and the cells, like CSS `place-content`. */
  placeContent?: GridPlaceContent;
  /** Places each item across and down its cell, like CSS `place-items`. */
  placeItems?: LayoutAlign;
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
  justify,
  placeContent,
  placeItems,
  rows,
  ...props
}: GridProps) {
  const items = flattenChildren(children);
  const byColumn = flow === 'column' || flow === 'column-dense';
  const rowCount = byColumn
    ? (rows ?? 1)
    : Math.max(rows ?? 0, Math.ceil(items.length / (columns ?? 1)));
  const columnCount = byColumn
    ? Math.max(columns ?? 1, Math.ceil(items.length / rowCount))
    : (columns ?? 1);
  const vertical = placeItems ?? align;
  const distribution = placeContent ?? justify;

  return (
    <View
      className={cn(
        gapY === undefined ? undefined : gapYClasses[gapY],
        placeContent === undefined ? undefined : contentClasses[placeContent],
        className,
      )}
      {...props}
    >
      {Array.from({ length: rowCount }, (_, row) => (
        <View
          className={cn(
            'flex-row',
            gapX === undefined ? undefined : gapXClasses[gapX],
            distribution === undefined
              ? undefined
              : contentClasses[distribution],
            placeContent === 'stretch' ? 'grow' : undefined,
          )}
          key={row}
        >
          {Array.from({ length: columnCount }, (_, column) => (
            <View
              className={cn(
                'flex-1',
                placeItems === undefined
                  ? undefined
                  : horizontalClasses[placeItems],
                vertical === undefined ? undefined : verticalClasses[vertical],
              )}
              key={column}
            >
              {
                items[
                  byColumn
                    ? column * rowCount + row
                    : row * columnCount + column
                ]
              }
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

/** The grid items, with fragments opened up as on the web. */
function flattenChildren(children: ReactNode): ReactNode[] {
  return Children.toArray(children).flatMap((child) =>
    isValidElement<{ children?: ReactNode }>(child) && child.type === Fragment
      ? flattenChildren(child.props.children)
      : [child],
  );
}

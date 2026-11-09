import * as React from 'react';

import { cn } from '../lib/utils';
import { getLayoutClasses, type LayoutStyleProps } from './_internal/layout';
import { Separator } from './Separator';

const directionClasses = {
  column: 'flex-col',
  'column-reverse': 'flex-col-reverse',
  row: 'flex-row',
  'row-reverse': 'flex-row-reverse',
} as const;

const wrapClasses = {
  nowrap: 'flex-nowrap',
  wrap: 'flex-wrap',
  'wrap-reverse': 'flex-wrap-reverse',
} as const;

type FlexProps = LayoutStyleProps &
  Omit<React.ComponentProps<'div'>, keyof LayoutStyleProps> & {
    as?: React.ElementType;
    direction?: keyof typeof directionClasses;
    /**
     * Renders a separator between each two children. `true` renders a
     * decorative `Separator` across the direction of the flex. A function
     * renders what it returns, given the separator's index and that
     * orientation; give a decorative node `aria-hidden`.
     */
    separator?: boolean | RenderSeparator;
    wrap?: keyof typeof wrapClasses;
  };

type RenderSeparator = (details: {
  index: number;
  orientation: SeparatorOrientation;
}) => React.ReactNode;

type SeparatorOrientation = 'horizontal' | 'vertical';

function Flex({
  align,
  as,
  children,
  className,
  direction,
  gap,
  gapX,
  gapY,
  justify,
  ref,
  separator = false,
  wrap,
  ...props
}: FlexProps) {
  const Component = as ?? 'div';
  const orientation = direction?.startsWith('column')
    ? 'horizontal'
    : 'vertical';

  return (
    <Component
      className={cn(
        'flex',
        getLayoutClasses({ align, gap, gapX, gapY, justify }),
        direction === undefined ? undefined : directionClasses[direction],
        wrap === undefined ? undefined : wrapClasses[wrap],
        className,
      )}
      data-slot="flex"
      ref={ref}
      {...props}
    >
      {separator
        ? separate(
            children,
            orientation,
            separator === true ? renderSeparator : separator,
          )
        : children}
    </Component>
  );
}

const renderSeparator: RenderSeparator = ({ orientation }) => (
  <Separator aria-hidden orientation={orientation} />
);

function separate(
  children: React.ReactNode,
  orientation: SeparatorOrientation,
  render: RenderSeparator,
) {
  // `toArray` drops empty children; `map` then keys each fragment by its child.
  return React.Children.map(
    React.Children.toArray(children),
    (child, index) => (
      <React.Fragment>
        {index > 0 && render({ index: index - 1, orientation })}
        {child}
      </React.Fragment>
    ),
  );
}

export { Flex };
export type { FlexProps };

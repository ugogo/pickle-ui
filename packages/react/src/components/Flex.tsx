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
     * Renders a decorative `Separator` between each two children, across the
     * direction of the flex.
     */
    separator?: boolean;
    wrap?: keyof typeof wrapClasses;
  };

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
      {separator ? separate(children, orientation) : children}
    </Component>
  );
}

function separate(
  children: React.ReactNode,
  orientation: 'horizontal' | 'vertical',
) {
  return React.Children.toArray(children).flatMap((child, index) => {
    if (index === 0) return [child];
    const key = React.isValidElement(child) ? child.key : index;
    return [
      <Separator
        aria-hidden
        key={`separator-${key}`}
        orientation={orientation}
      />,
      child,
    ];
  });
}

export { Flex };
export type { FlexProps };

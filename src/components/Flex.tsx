import * as React from 'react';

import { cn } from '@/lib/utils';

import { getLayoutClasses, type LayoutStyleProps } from './_internal/layout';

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
    wrap?: keyof typeof wrapClasses;
  };

function Flex({
  align,
  as,
  className,
  direction,
  gap,
  gapX,
  gapY,
  justify,
  ref,
  wrap,
  ...props
}: FlexProps) {
  const Component = as ?? 'div';

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
    />
  );
}

export { Flex };
export type { FlexProps };

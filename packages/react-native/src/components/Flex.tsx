import { Children, isValidElement } from 'react';
import { View } from 'react-native';

import { cn } from '../lib/cn';
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

export type FlexProps = LayoutStyleProps &
  Omit<React.ComponentProps<typeof View>, keyof LayoutStyleProps> & {
    direction?: keyof typeof directionClasses;
    /**
     * Renders a decorative `Separator` between each two children, across the
     * direction of the flex.
     */
    separator?: boolean;
    wrap?: keyof typeof wrapClasses;
  };

/**
 * A `View` laid out with flexbox props, like `Flex` in @pickle-ui/react. It
 * defaults to a row, as on the web, where React Native's `View` stacks its
 * children in a column.
 */
export function Flex({
  align,
  children,
  className,
  direction = 'row',
  gap,
  gapX,
  gapY,
  justify,
  separator = false,
  wrap,
  ...props
}: FlexProps) {
  const orientation = direction.startsWith('column')
    ? 'horizontal'
    : 'vertical';

  return (
    <View
      className={cn(
        getLayoutClasses({ align, gap, gapX, gapY, justify }),
        directionClasses[direction],
        wrap === undefined ? undefined : wrapClasses[wrap],
        className,
      )}
      {...props}
    >
      {separator ? separate(children, orientation) : children}
    </View>
  );
}

function separate(
  children: React.ReactNode,
  orientation: 'horizontal' | 'vertical',
) {
  return Children.toArray(children).flatMap((child, index) => {
    if (index === 0) return [child];
    const key = isValidElement(child) ? child.key : index;
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

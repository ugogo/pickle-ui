import { View } from 'react-native';

import { cn } from '../lib/cn';
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

export type FlexProps = LayoutStyleProps &
  Omit<React.ComponentProps<typeof View>, keyof LayoutStyleProps> & {
    direction?: keyof typeof directionClasses;
    wrap?: keyof typeof wrapClasses;
  };

/**
 * A `View` laid out with flexbox props, like `Flex` in @pickle-ui/react. It
 * defaults to a row, as on the web, where React Native's `View` stacks its
 * children in a column.
 */
export function Flex({
  align,
  className,
  direction = 'row',
  gap,
  gapX,
  gapY,
  justify,
  wrap,
  ...props
}: FlexProps) {
  return (
    <View
      className={cn(
        getLayoutClasses({ align, gap, gapX, gapY, justify }),
        directionClasses[direction],
        wrap === undefined ? undefined : wrapClasses[wrap],
        className,
      )}
      {...props}
    />
  );
}

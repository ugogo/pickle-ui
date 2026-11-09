import { Children, Fragment } from 'react';
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
      {separator
        ? separate(
            children,
            orientation,
            separator === true ? renderSeparator : separator,
          )
        : children}
    </View>
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
  return Children.map(Children.toArray(children), (child, index) => (
    <Fragment>
      {index > 0 && render({ index: index - 1, orientation })}
      {child}
    </Fragment>
  ));
}

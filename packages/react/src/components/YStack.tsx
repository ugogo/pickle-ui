import { cn } from '../lib/utils';
import { type RenderSeparator, separate } from './_internal/separate';
import { Flex, type FlexProps } from './Flex';

type YStackProps = Omit<FlexProps, 'direction'> & {
  /**
   * Renders a separator between each two children: a decorative `Separator`
   * for `true`, or what a function returns, given the separator's index and
   * its orientation. Give a decorative node `aria-hidden`.
   */
  separator?: boolean | RenderSeparator;
};

function YStack({
  children,
  className,
  ref,
  separator,
  ...props
}: YStackProps) {
  return (
    <Flex
      className={cn('flex-col', className)}
      data-slot="y-stack"
      ref={ref}
      {...props}
    >
      {separate(children, 'horizontal', separator)}
    </Flex>
  );
}

export { YStack };
export type { YStackProps };

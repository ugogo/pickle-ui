import { cn } from '../lib/utils';
import { type RenderSeparator, separate } from './_internal/separate';
import { Flex, type FlexProps } from './Flex';

type XStackProps = Omit<FlexProps, 'direction'> & {
  /**
   * Renders a separator between each two children: a decorative `Separator`
   * for `true`, or what a function returns, given the separator's index and
   * its orientation. Give a decorative node `aria-hidden`.
   */
  separator?: boolean | RenderSeparator;
};

function XStack({
  children,
  className,
  ref,
  separator,
  ...props
}: XStackProps) {
  return (
    <Flex
      className={cn('flex-row', className)}
      data-slot="x-stack"
      ref={ref}
      {...props}
    >
      {separate(children, 'vertical', separator)}
    </Flex>
  );
}

export { XStack };
export type { XStackProps };

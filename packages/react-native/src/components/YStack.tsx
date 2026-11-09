import { type RenderSeparator, separate } from './_internal/separate';
import { Flex, type FlexProps } from './Flex';

export type YStackProps = Omit<FlexProps, 'direction'> & {
  /**
   * Renders a separator between each two children: a decorative `Separator`
   * for `true`, or what a function returns, given the separator's index and
   * its orientation. Give a decorative node `aria-hidden`.
   */
  separator?: boolean | RenderSeparator;
};

export function YStack({ children, separator, ...props }: YStackProps) {
  return (
    <Flex direction="column" {...props}>
      {separate(children, 'horizontal', separator)}
    </Flex>
  );
}

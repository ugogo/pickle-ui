import { type RenderSeparator, separate } from './_internal/separate';
import { Flex, type FlexProps } from './Flex';

export type XStackProps = Omit<FlexProps, 'direction'> & {
  /**
   * Renders a separator between each two children: a decorative `Separator`
   * for `true`, or what a function returns, given the separator's index and
   * its orientation. Give a decorative node `aria-hidden`.
   */
  separator?: boolean | RenderSeparator;
};

export function XStack({ children, separator, ...props }: XStackProps) {
  return (
    <Flex direction="row" {...props}>
      {separate(children, 'vertical', separator)}
    </Flex>
  );
}

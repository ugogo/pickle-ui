import { Flex, type FlexProps } from './Flex';

type XStackProps = Omit<FlexProps, 'direction'>;

function XStack(props: XStackProps) {
  return <Flex data-slot="x-stack" direction="row" {...props} />;
}

export { XStack };
export type { XStackProps };

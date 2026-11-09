import { Flex, type FlexProps } from './Flex';

type YStackProps = Omit<FlexProps, 'direction'>;

function YStack(props: YStackProps) {
  return <Flex data-slot="y-stack" direction="column" {...props} />;
}

export { YStack };
export type { YStackProps };

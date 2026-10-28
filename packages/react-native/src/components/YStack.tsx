import { Flex, type FlexProps } from './Flex';

export type YStackProps = Omit<FlexProps, 'direction'>;

export function YStack(props: YStackProps) {
  return <Flex direction="column" {...props} />;
}

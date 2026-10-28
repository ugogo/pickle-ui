import { Flex, type FlexProps } from './Flex';

export type XStackProps = Omit<FlexProps, 'direction'>;

export function XStack(props: XStackProps) {
  return <Flex direction="row" {...props} />;
}

import { cn } from '@/lib/utils';

import { Flex, type FlexProps } from './Flex';

type XStackProps = Omit<FlexProps, 'direction'>;

function XStack({ className, ref, ...props }: XStackProps) {
  return (
    <Flex
      className={cn('flex-row', className)}
      data-slot="x-stack"
      ref={ref}
      {...props}
    />
  );
}

export { XStack };
export type { XStackProps };

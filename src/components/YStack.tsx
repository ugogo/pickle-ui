import { cn } from '@/lib/utils';

import { Flex, type FlexProps } from './Flex';

type YStackProps = Omit<FlexProps, 'direction'>;

function YStack({ className, ref, ...props }: YStackProps) {
  return (
    <Flex
      className={cn('flex-col', className)}
      data-slot="y-stack"
      ref={ref}
      {...props}
    />
  );
}

export { YStack };
export type { YStackProps };

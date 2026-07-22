import { IconLoader2 } from '@tabler/icons-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

type SpinnerProps = React.ComponentProps<typeof IconLoader2>;

function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <IconLoader2
      aria-label="Loading"
      className={cn('animate-spin', className)}
      role="status"
      {...props}
    />
  );
}

export { Spinner };
export type { SpinnerProps };

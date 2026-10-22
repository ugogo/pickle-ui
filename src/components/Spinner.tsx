import { IconLoader2 } from '@tabler/icons-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

type SpinnerProps = React.ComponentProps<typeof IconLoader2>;

/**
 * Announced as a loading status by default. Pass `aria-hidden` when visible
 * text already says what is loading, and it becomes purely decorative.
 */
function Spinner({
  'aria-hidden': ariaHidden,
  className,
  ...props
}: SpinnerProps) {
  const decorative = ariaHidden === true || ariaHidden === 'true';

  return (
    <IconLoader2
      aria-hidden={ariaHidden}
      aria-label={decorative ? undefined : 'Loading'}
      className={cn('animate-spin', className)}
      role={decorative ? undefined : 'status'}
      {...props}
    />
  );
}

export { Spinner };
export type { SpinnerProps };

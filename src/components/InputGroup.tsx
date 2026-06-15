import * as React from 'react';

import { cn } from '@/lib/utils';

type InputGroupProps = React.ComponentProps<'div'>;

/**
 * Seams its `Input` children into a single control. Radii and overlapping
 * borders are derived from each input's position via `:first-child` /
 * `:last-child`, so the children stay plain `Input`s with no extra props.
 */
function InputGroup({ className, ...props }: InputGroupProps) {
  return (
    <div
      className={cn(
        'flex items-center [&>input]:focus-visible:z-10 [&>input:not(:first-child)]:-ms-px [&>input:not(:first-child)]:rounded-s-none [&>input:not(:last-child)]:rounded-e-none',
        className,
      )}
      data-slot="input-group"
      {...props}
    />
  );
}

export { InputGroup };
export type { InputGroupProps };

import * as React from 'react';

import { cn } from '@/lib/utils';

type LabelProps = Omit<React.ComponentProps<'label'>, 'htmlFor'> & {
  htmlFor: string;
};

function Label({ className, htmlFor, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        'text-sm leading-none font-medium select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className,
      )}
      data-slot="label"
      htmlFor={htmlFor}
      {...props}
    />
  );
}

export { Label };
export type { LabelProps };

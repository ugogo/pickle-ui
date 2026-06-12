import * as React from 'react';

import { cn } from '@/lib/utils';

type InputProps = React.ComponentProps<'input'>;

function Input({ className, type, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'border-input bg-background placeholder:text-muted-foreground aria-invalid:border-destructive aria-invalid:ring-destructive/20 focus-ring h-8 w-full min-w-0 rounded-md border px-2.5 py-1 text-sm file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      data-slot="input"
      type={type}
      {...props}
    />
  );
}

export { Input };
export type { InputProps };

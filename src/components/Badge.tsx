import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-lg px-2.5 py-1.5 text-sm leading-none font-medium whitespace-nowrap [&>svg]:pointer-events-none [&>svg]:size-4 [&>svg]:shrink-0',
  {
    defaultVariants: {
      variant: 'primary',
    },
    variants: {
      variant: {
        destructive:
          'bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300',
        expired:
          'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300',
        failed: 'bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300',
        inProgress:
          'bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300',
        inReview:
          'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300',
        outline: 'border-border text-foreground border',
        pending:
          'bg-orange-50 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300',
        primary: 'bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300',
        secondary:
          'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300',
        submitted:
          'bg-violet-50 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300',
        success: 'bg-success text-success-foreground',
      },
    },
  },
);

interface BadgeProps
  extends React.ComponentProps<'span'>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant }), className)}
      data-slot="badge"
      {...props}
    />
  );
}

export { Badge, badgeVariants };
export type { BadgeProps };

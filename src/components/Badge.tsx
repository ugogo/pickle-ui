import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-sm border border-transparent font-medium outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-64 [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-3 [&_svg]:pointer-events-none [&_svg]:shrink-0 [button&,a&]:cursor-pointer [button&,a&]:pointer-coarse:after:absolute [button&,a&]:pointer-coarse:after:size-full [button&,a&]:pointer-coarse:after:min-h-11 [button&,a&]:pointer-coarse:after:min-w-11",
  {
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
    variants: {
      size: {
        lg: 'h-5.5 min-w-5.5 px-[calc(--spacing(1.5)-1px)] text-sm',
        md: 'h-4.5 min-w-4.5 px-[calc(--spacing(1)-1px)] text-xs',
        sm: 'h-4 min-w-4 rounded-[.25rem] px-[calc(--spacing(1)-1px)] text-[.625rem]',
      },
      variant: {
        default:
          'bg-primary text-primary-foreground [button&,a&]:hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground [button&,a&]:hover:bg-destructive/90',
        error: 'bg-destructive-subtle text-destructive-subtle-foreground',
        expired:
          'bg-secondary text-secondary-foreground [button&,a&]:hover:bg-secondary/90',
        failed: 'bg-destructive-subtle text-destructive-subtle-foreground',
        info: 'bg-info-subtle text-info-subtle-foreground',
        inProgress: 'bg-info-subtle text-info-subtle-foreground',
        inReview: 'bg-warning-subtle text-warning-subtle-foreground',
        outline:
          'border-input bg-background text-foreground dark:bg-input/32 [button&,a&]:hover:bg-accent/50 dark:[button&,a&]:hover:bg-input/48',
        pending: 'bg-warning-subtle text-warning-subtle-foreground',
        secondary:
          'bg-secondary text-secondary-foreground [button&,a&]:hover:bg-secondary/90',
        submitted: 'bg-info-subtle text-info-subtle-foreground',
        success: 'bg-success-subtle text-success-subtle-foreground',
        warning: 'bg-warning-subtle text-warning-subtle-foreground',
      },
    },
  },
);

interface BadgeProps
  extends React.ComponentProps<'span'>, VariantProps<typeof badgeVariants> {}

function Badge({ className, size, variant, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ size, variant }), className)}
      data-slot="badge"
      {...props}
    />
  );
}

export { Badge, badgeVariants };
export type { BadgeProps };

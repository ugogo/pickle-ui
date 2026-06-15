import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-md text-sm focus-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:[shape-rendering:geometricPrecision]',
  {
    defaultVariants: {
      size: 'md',
      variant: 'primary',
    },
    variants: {
      size: {
        lg: 'h-9 rounded-md px-3.5 has-[>svg:only-child]:w-9 has-[>svg:only-child]:px-0',
        md: 'h-8 rounded-md px-2.5 has-[>svg:only-child]:w-8 has-[>svg:only-child]:px-0',
        sm: 'h-7 rounded-md px-2 has-[>svg:only-child]:w-7 has-[>svg:only-child]:px-0',
      },
      variant: {
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      },
    },
  },
);

export interface ButtonProps
  extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {}

/**
 * A button whose only child is a lone icon (`svg`) is squared automatically via
 * the `has-[>svg:only-child]` selector, so an icon-only button works at any
 * size without a dedicated `icon` variant.
 */
function Button({
  className,
  ref,
  size,
  type = 'button',
  variant,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ className, size, variant }))}
      ref={ref}
      type={type}
      {...props}
    />
  );
}

export { Button, buttonVariants };

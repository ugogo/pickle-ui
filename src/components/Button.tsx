import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'relative inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-md text-sm focus-ring transition-[background-color,color,box-shadow,scale] duration-150 ease-out after:absolute after:left-1/2 after:top-1/2 after:min-h-10 after:min-w-10 after:-translate-x-1/2 after:-translate-y-1/2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:[shape-rendering:geometricPrecision]',
  {
    defaultVariants: {
      size: 'md',
      variant: 'primary',
    },
    variants: {
      size: {
        lg: 'h-9 rounded-md px-4 data-icon-only:w-9 data-icon-only:px-0',
        md: 'h-8 rounded-md px-3 data-icon-only:w-8 data-icon-only:px-0',
      },
      variant: {
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        outline:
          'surface-shadow bg-background hover:bg-accent hover:text-accent-foreground hover:[box-shadow:var(--shadow-border-hover)]',
        primary:
          'primary-shadow bg-primary text-primary-foreground hover:bg-primary/90 hover:[box-shadow:var(--shadow-primary-hover)] focus-visible:ring-primary/40',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      },
    },
  },
);

export interface ButtonProps
  extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  /** Disables tactile press scaling when motion would be distracting. */
  static?: boolean;
}

/**
 * A button whose only child is a lone icon (`svg`) is squared automatically via
 * the `has-[>svg:only-child]` selector, so an icon-only button works at any
 * size without a dedicated `icon` variant.
 */
function Button({
  children,
  className,
  ref,
  size,
  static: isStatic = false,
  type = 'button',
  variant,
  ...props
}: ButtonProps) {
  const iconOnly =
    React.Children.count(children) === 1 && React.isValidElement(children);

  return (
    <button
      className={cn(
        buttonVariants({ className, size, variant }),
        !isStatic && 'active:not-disabled:scale-[0.96]',
      )}
      data-icon-only={iconOnly ? '' : undefined}
      data-slot="button"
      ref={ref}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export { Button, buttonVariants };

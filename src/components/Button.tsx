import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-md text-sm focus-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:[shape-rendering:geometricPrecision]',
  {
    compoundVariants: [
      { className: 'w-7 px-0', iconOnly: true, size: 'sm' },
      { className: 'w-8 px-0', iconOnly: true, size: 'md' },
      { className: 'w-9 px-0', iconOnly: true, size: 'lg' },
    ],
    defaultVariants: {
      size: 'md',
      variant: 'primary',
    },
    variants: {
      iconOnly: {
        false: '',
        true: '',
      },
      size: {
        lg: 'h-9 rounded-md px-3.5',
        md: 'h-8 rounded-md px-2.5',
        sm: 'h-7 rounded-md px-2',
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
  extends
    Omit<
      React.ComponentProps<'button'>,
      keyof VariantProps<typeof buttonVariants>
    >,
    Omit<VariantProps<typeof buttonVariants>, 'iconOnly'> {}

function Button({
  children,
  className,
  ref,
  size,
  type = 'button',
  variant,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        buttonVariants({
          className,
          iconOnly: isIconOnly(children),
          size,
          variant,
        }),
      )}
      ref={ref}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

/**
 * Detects a button whose content is only icon(s) — i.e. it has children but
 * none of them is text. Such buttons get a squared size automatically, so an
 * icon-only button works at any size without a dedicated `icon` variant.
 */
function isIconOnly(children: React.ReactNode) {
  const items = React.Children.toArray(children);
  return (
    items.length > 0 &&
    items.every(
      (child) => typeof child !== 'string' && typeof child !== 'number',
    )
  );
}

export { Button, buttonVariants };

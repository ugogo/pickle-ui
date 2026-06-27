import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { Slot } from './_internal/Slot';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-md text-sm focus-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:[shape-rendering:geometricPrecision] cursor-pointer',
  {
    defaultVariants: {
      size: 'md',
      variant: 'primary',
    },
    variants: {
      size: {
        lg: 'h-9 rounded-md px-4 data-icon-only:w-9 data-icon-only:px-0',
        md: 'h-8 rounded-md px-3 data-icon-only:w-8 data-icon-only:px-0',
        sm: 'h-7 rounded-md px-2 data-icon-only:w-7 data-icon-only:px-0',
      },
      variant: {
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
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
  extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

/**
 * A button whose only child is a lone icon (`svg`) is squared automatically via
 * the `has-[>svg:only-child]` selector, so an icon-only button works at any
 * size without a dedicated `icon` variant.
 *
 * Use `asChild` to render a semantic element such as an anchor while keeping
 * button styling.
 */
function Button({
  asChild = false,
  children,
  className,
  ref,
  size,
  type = 'button',
  variant,
  ...props
}: ButtonProps) {
  const iconOnly = !asChild && isIconOnlyChild(children);
  const classes = cn(buttonVariants({ className, size, variant }));

  if (asChild) {
    const child = React.Children.only(children);

    if (!React.isValidElement(child)) {
      throw new Error('Button with asChild expects a single React element.');
    }

    const childChildren = (child.props as { children?: React.ReactNode })
      .children;
    const childIconOnly =
      React.Children.count(childChildren) === 1 &&
      React.isValidElement(childChildren) &&
      childChildren.type === 'svg';

    return (
      <Slot
        className={classes}
        data-icon-only={childIconOnly ? '' : undefined}
        data-slot="button"
        ref={ref}
        {...props}
      >
        {child}
      </Slot>
    );
  }

  return (
    <button
      className={classes}
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

function isIconOnlyChild(children: React.ReactNode) {
  return (
    React.Children.count(children) === 1 &&
    React.isValidElement(children) &&
    children.type === 'svg'
  );
}

export { Button, buttonVariants };

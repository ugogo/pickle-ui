import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const textVariants = cva('', {
  defaultVariants: {
    variant: 'body',
  },
  variants: {
    tone: {
      destructive: 'text-destructive',
      muted: 'text-muted-foreground',
      primary: 'text-primary',
    },
    truncate: {
      false: '',
      true: 'truncate',
    },
    variant: {
      body: 'text-body',
      code: 'font-mono text-code bg-muted rounded px-2 py-1',
      h1: 'font-heading text-h1 font-semibold tracking-tight',
      h2: 'font-heading text-h2 font-semibold tracking-tight',
      h3: 'text-h3 font-semibold',
      h4: 'text-h4 font-medium',
      lead: 'text-lead',
      small: 'text-small',
    },
    weight: {
      bold: 'font-semibold',
      normal: 'font-normal',
    },
  },
});

const variantElement: Record<
  NonNullable<VariantProps<typeof textVariants>['variant']>,
  React.ElementType
> = {
  body: 'p',
  code: 'code',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  lead: 'p',
  small: 'span',
};

export type TextProps = React.ComponentProps<'p'> &
  VariantProps<typeof textVariants> & {
    as?: React.ElementType;
  };

function Text({
  as,
  className,
  ref,
  tone,
  truncate,
  variant = 'body',
  weight,
  ...props
}: TextProps) {
  const resolvedVariant = variant ?? 'body';
  const Component = as ?? variantElement[resolvedVariant];
  return (
    <Component
      className={cn(
        textVariants({ tone, truncate, variant, weight }),
        className,
      )}
      data-slot="text"
      data-tone={tone ?? undefined}
      data-variant={resolvedVariant}
      data-weight={weight ?? undefined}
      ref={ref}
      {...props}
    />
  );
}

export { Text, textVariants };

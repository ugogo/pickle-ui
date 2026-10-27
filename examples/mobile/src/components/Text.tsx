import { cva, type VariantProps } from 'class-variance-authority';
import { Text as NativeText } from 'react-native';

import { cn } from '../lib/cn';

// Same variant and tone names as `Text` in @pickle-ui/react.
const textVariants = cva('text-foreground', {
  defaultVariants: { variant: 'body' },
  variants: {
    tone: {
      destructive: 'text-destructive',
      muted: 'text-muted-foreground',
      primary: 'text-primary',
    },
    variant: {
      body: 'text-sm',
      h1: 'text-3xl font-semibold tracking-tight',
      h2: 'text-2xl font-semibold tracking-tight',
      h3: 'text-xl font-semibold',
      h4: 'text-lg font-medium',
      lead: 'text-base',
      small: 'text-xs',
    },
  },
});

type TextProps = React.ComponentProps<typeof NativeText> &
  VariantProps<typeof textVariants>;

export function Text({ className, tone, variant, ...props }: TextProps) {
  return (
    <NativeText
      className={cn(textVariants({ tone, variant }), className)}
      {...props}
    />
  );
}

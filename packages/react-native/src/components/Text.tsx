import { cva, type VariantProps } from 'class-variance-authority';
import { Text as NativeText, Platform, StyleSheet } from 'react-native';

import { cn } from '../lib/cn';

// Same variants, tones and weights as `Text` in @pickle-ui/react, sized by the
// shared type scale (`@pickle-ui/tokens/typography.css`).
const textVariants = cva('text-foreground', {
  defaultVariants: { variant: 'body' },
  variants: {
    tone: {
      destructive: 'text-destructive',
      muted: 'text-muted-foreground',
      primary: 'text-primary',
    },
    variant: {
      body: 'text-body',
      code: 'text-code bg-muted self-start overflow-hidden rounded px-2 py-1',
      h1: 'text-h1 font-semibold tracking-tight',
      h2: 'text-h2 font-semibold tracking-tight',
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

const HEADINGS = new Set(['h1', 'h2', 'h3', 'h4']);

// Uniwind passes `font-mono`'s web font stack through as is, which native
// fonts don't resolve, so `code` names each platform's monospace font.
const styles = StyleSheet.create({
  code: { fontFamily: Platform.select({ default: 'monospace', ios: 'Menlo' }) },
});

export type TextProps = React.ComponentProps<typeof NativeText> &
  VariantProps<typeof textVariants> & {
    /** Cuts the text to one line with an ellipsis. */
    truncate?: boolean;
  };

export function Text({
  className,
  style,
  tone,
  truncate,
  variant = 'body',
  weight,
  ...props
}: TextProps) {
  return (
    <NativeText
      accessibilityRole={
        variant && HEADINGS.has(variant) ? 'header' : undefined
      }
      className={cn(textVariants({ tone, variant, weight }), className)}
      numberOfLines={truncate ? 1 : undefined}
      style={variant === 'code' ? [styles.code, style] : style}
      {...props}
    />
  );
}

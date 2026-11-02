import { cva, type VariantProps } from 'class-variance-authority';
import { createContext, use } from 'react';
import { Text as NativeText, Platform, StyleSheet } from 'react-native';

import { cn } from '../lib/cn';

const textVariants = cva('', {
  compoundVariants: [
    {
      className: 'self-start overflow-hidden rounded px-2 py-1',
      nested: false,
      variant: 'code',
    },
  ],
  variants: {
    // A nested Text inherits its parent's color, font and size, so it only
    // sets what its props ask for. Padding and radius don't apply inline.
    nested: {
      false: 'text-foreground font-sans',
      true: '',
    },
    tone: {
      destructive: 'text-destructive',
      muted: 'text-muted-foreground',
      primary: 'text-primary',
    },
    variant: {
      body: 'text-body',
      code: 'text-code bg-muted',
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

const HEADINGS = new Set(['h1', 'h2', 'h3', 'h4']);

const TextNestingContext = createContext(false);

const styles = StyleSheet.create({
  code: { fontFamily: Platform.select({ default: 'monospace', ios: 'Menlo' }) },
});

export type TextProps = Omit<VariantProps<typeof textVariants>, 'nested'> &
  React.ComponentProps<typeof NativeText> & {
    /** Cuts the text to one line with an ellipsis. Ignored on a nested Text. */
    truncate?: boolean;
  };

export function Text({
  className,
  style,
  tone,
  truncate,
  variant,
  weight,
  ...props
}: TextProps) {
  const nested = use(TextNestingContext);
  // Only a top-level Text defaults to `body`; a nested one keeps its parent's.
  const resolvedVariant = variant === undefined && !nested ? 'body' : variant;

  const text = (
    <NativeText
      accessibilityRole={
        !nested && resolvedVariant && HEADINGS.has(resolvedVariant)
          ? 'header'
          : undefined
      }
      className={cn(
        textVariants({ nested, tone, variant: resolvedVariant, weight }),
        className,
      )}
      numberOfLines={truncate && !nested ? 1 : undefined}
      style={resolvedVariant === 'code' ? [styles.code, style] : style}
      {...props}
    />
  );

  return nested ? text : <TextNestingContext value>{text}</TextNestingContext>;
}

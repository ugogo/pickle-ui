import { cva, type VariantProps } from 'class-variance-authority';
import { Children, isValidElement } from 'react';
import { Text, View } from 'react-native';

import { cn } from '../lib/cn';

// Same variants and sizes as `Badge` in @pickle-ui/react.
const badgeVariants = cva(
  'flex-row items-center justify-center gap-1 self-start rounded-sm border border-transparent',
  {
    defaultVariants: { size: 'md', variant: 'default' },
    variants: {
      size: {
        lg: 'h-5.5 min-w-5.5 px-1.5',
        md: 'h-4.5 min-w-4.5 px-1',
        sm: 'h-4 min-w-4 rounded px-1',
      },
      variant: {
        default: 'bg-primary',
        destructive: 'bg-destructive',
        error: 'bg-destructive-subtle',
        expired: 'bg-secondary',
        failed: 'bg-destructive-subtle',
        info: 'bg-info-subtle',
        inProgress: 'bg-info-subtle',
        inReview: 'bg-warning-subtle',
        outline: 'border-input bg-background dark:bg-input/32',
        pending: 'bg-warning-subtle',
        secondary: 'bg-secondary',
        submitted: 'bg-info-subtle',
        success: 'bg-success-subtle',
        warning: 'bg-warning-subtle',
      },
    },
  },
);

const labelVariants = cva('font-medium', {
  defaultVariants: { size: 'md', variant: 'default' },
  variants: {
    size: {
      lg: 'text-sm',
      md: 'text-xs',
      sm: 'text-[10px]',
    },
    variant: {
      default: 'text-primary-foreground',
      destructive: 'text-destructive-foreground',
      error: 'text-destructive-subtle-foreground',
      expired: 'text-secondary-foreground',
      failed: 'text-destructive-subtle-foreground',
      info: 'text-info-subtle-foreground',
      inProgress: 'text-info-subtle-foreground',
      inReview: 'text-warning-subtle-foreground',
      outline: 'text-foreground',
      pending: 'text-warning-subtle-foreground',
      secondary: 'text-secondary-foreground',
      submitted: 'text-info-subtle-foreground',
      success: 'text-success-subtle-foreground',
      warning: 'text-warning-subtle-foreground',
    },
  },
});

export type BadgeProps = React.ComponentProps<typeof View> &
  VariantProps<typeof badgeVariants> & {
    /** Text is wrapped in the label; other children, such as icons, render as they are. */
    children: React.ReactNode;
    labelClassName?: string;
  };

export function Badge({
  children,
  className,
  labelClassName,
  size = 'md',
  variant = 'default',
  ...props
}: BadgeProps) {
  return (
    <View
      className={cn(badgeVariants({ size, variant }), className)}
      {...props}
    >
      {Children.map(children, (child) =>
        typeof child === 'string' || typeof child === 'number' ? (
          <Text
            className={cn(labelVariants({ size, variant }), labelClassName)}
          >
            {child}
          </Text>
        ) : isValidElement(child) ? (
          child
        ) : null,
      )}
    </View>
  );
}

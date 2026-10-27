import { cva, type VariantProps } from 'class-variance-authority';
import { Children, isValidElement } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

import { cn } from '../lib/cn';

// Same variants and sizes as `Button` in @pickle-ui/react, with native
// heights: `md` and up meet the 40pt minimum, and `hitSlop` stretches the
// smaller ones to a 44pt touch target.
const buttonVariants = cva(
  'flex-row items-center justify-center rounded-lg border disabled:opacity-64',
  {
    defaultVariants: { size: 'md', variant: 'default' },
    variants: {
      size: {
        icon: 'size-10',
        'icon-lg': 'size-11',
        'icon-sm': 'size-8',
        'icon-xl': 'size-12',
        'icon-xs': 'size-7 rounded-md',
        lg: 'h-11 px-5',
        md: 'h-10 px-4',
        sm: 'h-8 px-3',
        xl: 'h-12 px-6',
        xs: 'h-7 rounded-md px-2.5',
      },
      variant: {
        default:
          'border-primary bg-primary shadow-primary/24 shadow-xs active:bg-primary/90 disabled:shadow-none',
        destructive:
          'border-destructive bg-destructive shadow-destructive/24 shadow-xs active:bg-destructive/90 disabled:shadow-none',
        'destructive-outline':
          'border-input bg-popover active:border-destructive/32 active:bg-destructive/4 dark:bg-input/32 shadow-xs shadow-black/5 disabled:shadow-none',
        ghost: 'active:bg-accent border-transparent',
        link: 'border-transparent',
        outline:
          'border-input bg-popover active:bg-accent/50 dark:bg-input/32 dark:active:bg-input/64 shadow-xs shadow-black/5 disabled:shadow-none',
        secondary: 'bg-secondary active:bg-secondary/80 border-transparent',
      },
    },
  },
);

// The gap between an icon and the label, also kept while `loading` hides them.
const contentVariants = cva('', {
  defaultVariants: { size: 'md' },
  variants: {
    size: {
      icon: '',
      'icon-lg': '',
      'icon-sm': '',
      'icon-xl': '',
      'icon-xs': '',
      lg: 'gap-2',
      md: 'gap-2',
      sm: 'gap-1.5',
      xl: 'gap-2',
      xs: 'gap-1',
    },
  },
});

const labelVariants = cva('font-medium', {
  compoundVariants: [
    { className: 'underline', pressed: true, variant: 'link' },
  ],
  defaultVariants: { size: 'md', variant: 'default' },
  variants: {
    pressed: { false: '', true: '' },
    size: {
      icon: 'text-base',
      'icon-lg': 'text-base',
      'icon-sm': 'text-base',
      'icon-xl': 'text-lg',
      'icon-xs': 'text-sm',
      lg: 'text-base',
      md: 'text-base',
      sm: 'text-sm',
      xl: 'text-lg',
      xs: 'text-sm',
    },
    variant: {
      default: 'text-primary-foreground',
      destructive: 'text-destructive-foreground',
      'destructive-outline': 'text-destructive-subtle-foreground',
      ghost: 'text-foreground',
      link: 'text-foreground',
      outline: 'text-foreground',
      secondary: 'text-secondary-foreground',
    },
  },
});

const spinnerColor = {
  default: 'accent-primary-foreground',
  destructive: 'accent-destructive-foreground',
  'destructive-outline': 'accent-foreground',
  ghost: 'accent-foreground',
  link: 'accent-foreground',
  outline: 'accent-foreground',
  secondary: 'accent-secondary-foreground',
} as const;

type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>['size']>;

// Half the gap between each size and a 44pt touch target.
const HIT_SLOP: Record<ButtonSize, number> = {
  icon: 2,
  'icon-lg': 0,
  'icon-sm': 6,
  'icon-xl': 0,
  'icon-xs': 8,
  lg: 0,
  md: 2,
  sm: 6,
  xl: 0,
  xs: 8,
};

export type ButtonProps = Omit<
  React.ComponentProps<typeof Pressable>,
  'children'
> &
  VariantProps<typeof buttonVariants> & {
    /**
     * Text is wrapped in the label; other children, such as icons, render as
     * they are. Icon-only buttons need an `icon*` size and an
     * `accessibilityLabel`.
     */
    children: React.ReactNode;
    labelClassName?: string;
    /** Shows a spinner in place of the content and disables the button. */
    loading?: boolean;
  };

export function Button({
  accessibilityState,
  children,
  className,
  disabled,
  labelClassName,
  loading = false,
  size = 'md',
  variant = 'default',
  ...props
}: ButtonProps) {
  const isDisabled = Boolean(disabled || loading);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{
        ...accessibilityState,
        busy: loading,
        disabled: isDisabled,
      }}
      className={cn(
        buttonVariants({ size, variant }),
        contentVariants({ size }),
        className,
      )}
      disabled={isDisabled}
      hitSlop={size ? HIT_SLOP[size] : undefined}
      {...props}
    >
      {({ pressed }) => {
        const content = Children.map(children, (child) =>
          typeof child === 'string' || typeof child === 'number' ? (
            <Text
              className={cn(
                labelVariants({ pressed, size, variant }),
                labelClassName,
              )}
            >
              {child}
            </Text>
          ) : isValidElement(child) ? (
            child
          ) : null,
        );

        if (!loading) return content;

        return (
          <>
            <View
              className={cn(
                'flex-row items-center opacity-0',
                contentVariants({ size }),
              )}
            >
              {content}
            </View>
            <ActivityIndicator
              className="absolute"
              colorClassName={variant ? spinnerColor[variant] : undefined}
              size="small"
            />
          </>
        );
      }}
    </Pressable>
  );
}

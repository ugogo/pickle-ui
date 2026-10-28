import { cva, type VariantProps } from 'class-variance-authority';
import { Children, isValidElement } from 'react';
import { type Insets, Pressable, Text, View } from 'react-native';

import { cn } from '../lib/cn';
import { Spinner } from './_internal/Spinner';

// Same variants, sizes and dimensions as `Button` in @pickle-ui/react on a
// phone, with its text sizes from `sm` up. Like the web's `pointer-coarse` hit area, `hitSlop` stretches every
// size to a 44pt touch target. Paddings leave room for the 1pt border.
const buttonVariants = cva(
  'flex-row items-center justify-center gap-2 rounded-lg border disabled:opacity-64',
  {
    defaultVariants: { size: 'md', variant: 'default' },
    variants: {
      size: {
        icon: 'size-8',
        'icon-lg': 'size-9',
        'icon-sm': 'size-7',
        'icon-xl': 'size-10',
        'icon-xs': 'size-6 rounded-md',
        lg: 'h-9 px-[13px]',
        md: 'h-8 px-[11px]',
        sm: 'h-7 gap-1.5 px-[9px]',
        xl: 'h-10 px-[15px]',
        xs: 'h-6 gap-1 rounded-md px-[7px]',
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

const labelVariants = cva('font-medium', {
  compoundVariants: [
    { className: 'underline', pressed: true, variant: 'link' },
  ],
  defaultVariants: { size: 'md', variant: 'default' },
  variants: {
    pressed: { false: '', true: '' },
    // The web's sizes from `sm` up, not its larger phone sizes, which only
    // stop iOS Safari zooming into focused fields.
    size: {
      icon: 'text-sm',
      'icon-lg': 'text-sm',
      'icon-sm': 'text-sm',
      'icon-xl': 'text-sm',
      'icon-xs': 'text-sm',
      lg: 'text-sm',
      md: 'text-sm',
      sm: 'text-sm',
      xl: 'text-base',
      xs: 'text-xs',
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

const spinnerVariants = cva('', {
  variants: {
    variant: {
      default: 'border-primary-foreground',
      destructive: 'border-destructive-foreground',
      'destructive-outline': 'border-foreground',
      ghost: 'border-foreground',
      link: 'border-foreground',
      outline: 'border-foreground',
      secondary: 'border-secondary-foreground',
    },
  },
});

// The web's 1px inner highlight on solid buttons. Uniwind draws
// `inset-shadow` outside the view, so a top border on an overlay stands in.
const highlightVariants = cva('absolute inset-0 rounded-lg border-t', {
  variants: {
    pressed: { false: 'border-white/16', true: 'border-black/8' },
    size: {
      icon: '',
      'icon-lg': '',
      'icon-sm': '',
      'icon-xl': '',
      'icon-xs': 'rounded-md',
      lg: '',
      md: '',
      sm: '',
      xl: '',
      xs: 'rounded-md',
    },
  },
});

type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>['size']>;

// Half the gap between each size and a 44pt touch target, vertical only for
// buttons with a label, whose width already reaches it.
const HIT_SLOP: Record<ButtonSize, Insets | number> = {
  icon: 6,
  'icon-lg': 4,
  'icon-sm': 8,
  'icon-xl': 2,
  'icon-xs': 10,
  lg: { bottom: 4, top: 4 },
  md: { bottom: 6, top: 6 },
  sm: { bottom: 8, top: 8 },
  xl: { bottom: 2, top: 2 },
  xs: { bottom: 10, top: 10 },
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
  const isSolid = variant === 'default' || variant === 'destructive';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{
        ...accessibilityState,
        busy: loading,
        disabled: isDisabled,
      }}
      className={cn(buttonVariants({ size, variant }), className)}
      disabled={isDisabled}
      hitSlop={size ? HIT_SLOP[size] : undefined}
      {...props}
    >
      {({ pressed }) => (
        <>
          {isSolid && !isDisabled ? (
            <View
              className={highlightVariants({ pressed, size })}
              pointerEvents="none"
            />
          ) : null}
          {/* While loading, the content stays in place, invisible, so the
              button keeps its width under the spinner. */}
          {Children.map(children, (child) =>
            typeof child === 'string' || typeof child === 'number' ? (
              <Text
                className={cn(
                  labelVariants({ pressed, size, variant }),
                  loading && 'opacity-0',
                  labelClassName,
                )}
              >
                {child}
              </Text>
            ) : isValidElement(child) ? (
              loading ? (
                <View className="opacity-0">{child}</View>
              ) : (
                child
              )
            ) : null,
          )}
          {loading ? (
            <View className="absolute">
              <Spinner className={spinnerVariants({ variant })} />
            </View>
          ) : null}
        </>
      )}
    </Pressable>
  );
}

import { cva, type VariantProps } from 'class-variance-authority';
import { Pressable, Text } from 'react-native';

import { cn } from '../lib/cn';

// Same variant and size names as `Button` in @pickle-ui/react.
const buttonVariants = cva(
  'flex-row items-center justify-center gap-2 rounded-lg border active:opacity-80 disabled:opacity-60',
  {
    defaultVariants: { size: 'md', variant: 'default' },
    variants: {
      size: {
        lg: 'h-11 px-5',
        md: 'h-10 px-4',
        sm: 'h-8 px-3',
      },
      variant: {
        default: 'border-primary bg-primary',
        destructive: 'border-destructive bg-destructive',
        ghost: 'border-transparent active:bg-accent',
        outline: 'border-input bg-popover',
        secondary: 'border-transparent bg-secondary',
      },
    },
  },
);

const labelVariants = cva('font-medium', {
  defaultVariants: { size: 'md', variant: 'default' },
  variants: {
    size: { lg: 'text-base', md: 'text-sm', sm: 'text-xs' },
    variant: {
      default: 'text-primary-foreground',
      destructive: 'text-destructive-foreground',
      ghost: 'text-foreground',
      outline: 'text-foreground',
      secondary: 'text-secondary-foreground',
    },
  },
});

export type ButtonProps = Omit<
  React.ComponentProps<typeof Pressable>,
  'children'
> &
  VariantProps<typeof buttonVariants> & {
    children: string;
    labelClassName?: string;
  };

export function Button({
  children,
  className,
  labelClassName,
  size,
  variant,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      className={cn(buttonVariants({ size, variant }), className)}
      {...props}
    >
      <Text className={cn(labelVariants({ size, variant }), labelClassName)}>
        {children}
      </Text>
    </Pressable>
  );
}

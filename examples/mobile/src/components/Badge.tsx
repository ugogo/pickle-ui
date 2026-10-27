import { cva, type VariantProps } from 'class-variance-authority';
import { Text, View } from 'react-native';

import { cn } from '../lib/cn';

// Status variants use the `-subtle` token pairs, like `Badge` on the web.
const badgeVariants = cva('self-start rounded-sm px-1.5 py-0.5', {
  defaultVariants: { variant: 'default' },
  variants: {
    variant: {
      default: 'bg-primary',
      inProgress: 'bg-info-subtle',
      inReview: 'bg-warning-subtle',
      secondary: 'bg-secondary',
      success: 'bg-success-subtle',
    },
  },
});

const labelVariants = cva('text-xs font-medium', {
  defaultVariants: { variant: 'default' },
  variants: {
    variant: {
      default: 'text-primary-foreground',
      inProgress: 'text-info-subtle-foreground',
      inReview: 'text-warning-subtle-foreground',
      secondary: 'text-secondary-foreground',
      success: 'text-success-subtle-foreground',
    },
  },
});

type BadgeProps = React.ComponentProps<typeof View> &
  VariantProps<typeof badgeVariants> & { children: string };

export function Badge({ children, className, variant, ...props }: BadgeProps) {
  return (
    <View className={cn(badgeVariants({ variant }), className)} {...props}>
      <Text className={labelVariants({ variant })}>{children}</Text>
    </View>
  );
}

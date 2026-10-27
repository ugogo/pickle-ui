import { View } from 'react-native';

import { cn } from '../lib/cn';
import { Text } from './Text';

type TextProps = React.ComponentProps<typeof Text>;
type ViewProps = React.ComponentProps<typeof View>;

function CardContent({ className, ...props }: ViewProps) {
  return <View className={cn('gap-3 px-5', className)} {...props} />;
}

function CardDescription({ className, ...props }: TextProps) {
  return <Text className={className} tone="muted" {...props} />;
}

function CardHeader({ className, ...props }: ViewProps) {
  return <View className={cn('gap-1 px-5', className)} {...props} />;
}

function CardRoot({ className, ...props }: ViewProps) {
  return (
    <View
      className={cn(
        'border-border bg-card gap-4 rounded-xl border py-5',
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn('text-card-foreground', className)}
      variant="h4"
      {...props}
    />
  );
}

// Same compound shape as `Card` in @pickle-ui/react.
export const Card = Object.assign(CardRoot, {
  Content: CardContent,
  Description: CardDescription,
  Header: CardHeader,
  Title: CardTitle,
});

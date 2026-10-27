import { View } from 'react-native';

import { cn } from '../lib/cn';
import { Text } from './Text';

export type CardContentProps = React.ComponentProps<typeof View>;
export type CardDescriptionProps = React.ComponentProps<typeof Text>;
export type CardHeaderProps = React.ComponentProps<typeof View>;
export type CardProps = React.ComponentProps<typeof View>;
export type CardTitleProps = React.ComponentProps<typeof Text>;

function CardContent({ className, ...props }: CardContentProps) {
  return <View className={cn('gap-3 px-5', className)} {...props} />;
}

function CardDescription({ className, ...props }: CardDescriptionProps) {
  return <Text className={className} tone="muted" {...props} />;
}

function CardHeader({ className, ...props }: CardHeaderProps) {
  return <View className={cn('gap-1 px-5', className)} {...props} />;
}

function CardRoot({ className, ...props }: CardProps) {
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

function CardTitle({ className, ...props }: CardTitleProps) {
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

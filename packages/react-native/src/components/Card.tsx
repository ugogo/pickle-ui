import { Children, isValidElement } from 'react';
import { View } from 'react-native';

import { cn } from '../lib/cn';
import { Text, type TextProps } from './Text';

export type CardActionProps = React.ComponentProps<typeof View>;
export type CardContentProps = React.ComponentProps<typeof View>;
export type CardDescriptionProps = Omit<TextProps, 'tone' | 'variant'>;
export type CardFooterProps = React.ComponentProps<typeof View>;
export type CardHeaderProps = React.ComponentProps<typeof View>;
export type CardProps = React.ComponentProps<typeof View>;
export type CardTitleProps = Omit<TextProps, 'tone' | 'variant'>;

// The parts sit in a column with `gap-4` and their own side padding, which
// reproduces the web's spacing between header, content and footer.

function CardAction({ className, ...props }: CardActionProps) {
  return <View className={cn('self-start', className)} {...props} />;
}

function CardContent({ className, ...props }: CardContentProps) {
  return <View className={cn('px-6', className)} {...props} />;
}

function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <Text
      className={cn('text-sm', className)}
      tone="muted"
      variant="body"
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <View className={cn('flex-row items-center px-6', className)} {...props} />
  );
}

/**
 * Lays a `Card.Action` out beside the title and description, top-aligned,
 * like the web header's grid.
 */
function CardHeader({ children, className, ...props }: CardHeaderProps) {
  const parts = Children.toArray(children);
  const actions = parts.filter(
    (child) => isValidElement(child) && child.type === CardAction,
  );

  if (actions.length === 0) {
    return (
      <View className={cn('gap-1.5 px-6', className)} {...props}>
        {children}
      </View>
    );
  }

  return (
    <View
      className={cn('flex-row items-start gap-4 px-6', className)}
      {...props}
    >
      <View className="flex-1 gap-1.5">
        {parts.filter((child) => !actions.includes(child))}
      </View>
      {actions}
    </View>
  );
}

function CardRoot({ className, ...props }: CardProps) {
  return (
    <View
      className={cn(
        'border-border bg-card gap-4 rounded-2xl border py-6 shadow-xs shadow-black/5',
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <Text
      className={cn('text-card-foreground leading-none', className)}
      variant="h3"
      {...props}
    />
  );
}

const Card = Object.assign(CardRoot, {
  Action: CardAction,
  Content: CardContent,
  Description: CardDescription,
  Footer: CardFooter,
  Header: CardHeader,
  Title: CardTitle,
});

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};

import * as React from 'react';

import { cn } from '@/lib/utils';

import { Text, type TextProps } from './Text';

type CardActionProps = React.ComponentProps<'div'>;
type CardContentProps = React.ComponentProps<'div'>;
type CardDescriptionProps = Omit<TextProps, 'as' | 'tone' | 'variant'>;
type CardFooterProps = React.ComponentProps<'div'>;
type CardHeaderProps = React.ComponentProps<'div'>;
type CardProps = React.ComponentProps<'div'>;
type CardTitleProps = Omit<TextProps, 'as' | 'tone' | 'variant'>;

function CardAction({ className, ...props }: CardActionProps) {
  return (
    <div
      className={cn('col-start-2 row-span-2 row-start-1 self-start', className)}
      data-slot="card-action"
      {...props}
    />
  );
}

function CardContent({ className, ...props }: CardContentProps) {
  return (
    <div
      className={cn('px-6', className)}
      data-slot="card-content"
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <Text
      className={cn('col-start-1', className)}
      data-slot="card-description"
      tone="muted"
      variant="body"
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      className={cn('flex items-center px-6', className)}
      data-slot="card-footer"
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div
      className={cn(
        'grid auto-rows-min grid-cols-[1fr_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto]',
        className,
      )}
      data-slot="card-header"
      {...props}
    />
  );
}

function CardRoot({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'border-border bg-card text-card-foreground flex flex-col gap-6 rounded-lg border py-6 shadow-sm',
        className,
      )}
      data-slot="card"
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <Text
      className={cn('leading-none', className)}
      data-slot="card-title"
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
export type {
  CardActionProps,
  CardContentProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
  CardTitleProps,
};

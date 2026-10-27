import * as React from 'react';

import { cn } from '../lib/utils';
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
      className={cn(
        'col-start-2 row-span-2 row-start-1 inline-flex self-start justify-self-end',
        className,
      )}
      data-slot="card-action"
      {...props}
    />
  );
}

function CardContent({ className, ...props }: CardContentProps) {
  return (
    <div
      className={cn(
        'flex-1 p-6 in-[[data-slot=card]:has(>[data-slot=card-footer]:not(.border-t))]:pb-0 in-[[data-slot=card]:has(>[data-slot=card-header]:not(.border-b))]:pt-0',
        className,
      )}
      data-slot="card-content"
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <Text
      className={cn('text-muted-foreground text-sm', className)}
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
      className={cn(
        'flex items-center p-6 in-[[data-slot=card]:has(>[data-slot=card-content])]:pt-4',
        className,
      )}
      data-slot="card-footer"
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div
      className={cn(
        'grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 p-6 in-[[data-slot=card]:has(>[data-slot=card-content])]:pb-4 has-data-[slot=card-action]:grid-cols-[1fr_auto]',
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
        'bg-card text-card-foreground relative flex flex-col rounded-2xl border shadow-xs/5 not-dark:bg-clip-padding before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]',
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
      className={cn('font-heading leading-none font-semibold', className)}
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

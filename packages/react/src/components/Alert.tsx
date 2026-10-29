import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '../lib/utils';
import { Text, type TextProps } from './Text';

const alertVariants = cva(
  'relative grid w-full grid-cols-[1fr] items-start gap-x-3 gap-y-0.5 rounded-xl border px-3.5 py-3 text-sm has-[>[data-slot=alert-action]]:grid-cols-[1fr_auto] has-[>[data-slot=alert-icon]]:grid-cols-[auto_1fr] has-[>[data-slot=alert-icon]]:has-[>[data-slot=alert-action]]:grid-cols-[auto_1fr_auto]',
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default:
          'bg-card text-card-foreground *:data-[slot=alert-icon]:text-muted-foreground',
        destructive:
          'border-destructive/32 bg-destructive-subtle text-foreground *:data-[slot=alert-icon]:text-destructive',
        info: 'border-info/32 bg-info-subtle text-foreground *:data-[slot=alert-icon]:text-info',
        success:
          'border-success/32 bg-success-subtle text-foreground *:data-[slot=alert-icon]:text-success',
        warning:
          'border-warning/32 bg-warning-subtle text-foreground *:data-[slot=alert-icon]:text-warning',
      },
    },
  },
);

type AlertActionProps = React.ComponentProps<'div'>;
type AlertDescriptionProps = Omit<TextProps, 'as' | 'tone' | 'variant'>;
type AlertIconProps = React.ComponentProps<'div'>;
type AlertProps = React.ComponentProps<'div'> &
  VariantProps<typeof alertVariants>;
type AlertTitleProps = Omit<TextProps, 'as' | 'tone' | 'variant'>;

function AlertAction({ className, ...props }: AlertActionProps) {
  return (
    <div
      className={cn(
        'col-start-2 row-span-2 row-start-1 flex items-center gap-1.5 self-center [[data-slot=alert-icon]~&]:col-start-3',
        className,
      )}
      data-slot="alert-action"
      {...props}
    />
  );
}

function AlertDescription({ className, ...props }: AlertDescriptionProps) {
  return (
    <Text
      as="div"
      className={cn(
        'col-start-1 flex flex-col gap-2 text-sm [[data-slot=alert-icon]~&]:col-start-2',
        className,
      )}
      data-slot="alert-description"
      tone="muted"
      variant="body"
      {...props}
    />
  );
}

/**
 * Leading icon slot. Pass an SVG as children; it is sized and tinted to match
 * the alert's `variant`. The wrapper is hidden from assistive technology by
 * default since the title carries the meaning.
 */
function AlertIcon({ className, ...props }: AlertIconProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "col-start-1 row-start-1 flex h-5 items-center [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      data-slot="alert-icon"
      {...props}
    />
  );
}

/**
 * No live-region role by default, so static notices are not announced on page
 * load. When the alert appears in response to a user action, pass
 * `role="alert"` for urgent messages (failures) or `role="status"` for polite
 * ones (confirmations, info).
 */
function AlertRoot({ className, variant = 'default', ...props }: AlertProps) {
  return (
    <div
      className={cn(alertVariants({ variant }), className)}
      data-slot="alert"
      data-variant={variant}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: AlertTitleProps) {
  return (
    <Text
      as="div"
      className={cn(
        'col-start-1 text-sm leading-5 font-medium [[data-slot=alert-icon]~&]:col-start-2',
        className,
      )}
      data-slot="alert-title"
      variant="body"
      {...props}
    />
  );
}

const Alert = Object.assign(AlertRoot, {
  Action: AlertAction,
  Description: AlertDescription,
  Icon: AlertIcon,
  Title: AlertTitle,
});

export { Alert, AlertAction, AlertDescription, AlertIcon, AlertTitle };
export type {
  AlertActionProps,
  AlertDescriptionProps,
  AlertIconProps,
  AlertProps,
  AlertTitleProps,
};

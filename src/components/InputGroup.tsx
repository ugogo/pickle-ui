import * as React from 'react';

import { cn } from '@/lib/utils';

import { Button, type ButtonProps } from './Button';

type InputGroupAddonProps = React.ComponentProps<'div'>;
type InputGroupButtonProps = ButtonProps;
type InputGroupProps = React.ComponentProps<'div'>;

const inputGroupItemClasses =
  'not-first:-ms-px not-first:rounded-s-none not-last:rounded-e-none focus-visible:z-10';

/**
 * Seams its children into a single control. Radii and overlapping borders are
 * derived from each child's position via `:first-child` / `:last-child`, so
 * inputs stay plain `Input`s with no extra props.
 */
function InputGroup({ className, ...props }: InputGroupProps) {
  return (
    <div
      className={cn(
        'flex items-center',
        '[&>input:focus-visible]:z-10 [&>input:not(:first-child)]:-ms-px [&>input:not(:first-child)]:rounded-s-none [&>input:not(:last-child)]:rounded-e-none',
        '[&>[data-slot=input-group-addon]:not(:first-child)]:-ms-px [&>[data-slot=input-group-addon]:not(:first-child)]:rounded-s-none [&>[data-slot=input-group-addon]:not(:last-child)]:rounded-e-none',
        '[&>[data-slot=input-group-button]:focus-visible]:z-10 [&>[data-slot=input-group-button]:not(:first-child)]:-ms-px [&>[data-slot=input-group-button]:not(:first-child)]:rounded-s-none [&>[data-slot=input-group-button]:not(:last-child)]:rounded-e-none',
        className,
      )}
      data-slot="input-group"
      {...props}
    />
  );
}

function InputGroupAddon({ className, ...props }: InputGroupAddonProps) {
  return (
    <div
      className={cn(
        'border-input bg-muted/50 text-muted-foreground inline-flex h-8 shrink-0 items-center rounded-l-sm rounded-r-sm border px-2.5 text-sm whitespace-nowrap',
        inputGroupItemClasses,
        className,
      )}
      data-slot="input-group-addon"
      {...props}
    />
  );
}

function InputGroupButton({
  className,
  size = 'md',
  variant = 'outline',
  ...props
}: InputGroupButtonProps) {
  return (
    <Button
      className={cn(inputGroupItemClasses, className)}
      data-slot="input-group-button"
      size={size}
      variant={variant}
      {...props}
    />
  );
}

const InputGroupWithParts = Object.assign(InputGroup, {
  Addon: InputGroupAddon,
  Button: InputGroupButton,
});

export { InputGroupWithParts as InputGroup, InputGroupAddon, InputGroupButton };
export type { InputGroupAddonProps, InputGroupButtonProps, InputGroupProps };

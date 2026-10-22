'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { Button, type ButtonProps } from '../Button';
import { Input, type InputProps } from './Input';

const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text select-none items-center justify-center gap-2 leading-none [&>kbd]:rounded-[calc(var(--radius)-5px)] in-[[data-slot=input-group]:has([data-slot=input-control],[data-slot=textarea-control])]:[&_svg:not([class*='size-'])]:size-4.5 sm:in-[[data-slot=input-group]:has([data-slot=input-control],[data-slot=textarea-control])]:[&_svg:not([class*='size-'])]:size-4 [&_svg]:-mx-0.5 not-has-[button]:**:[svg:not([class*='opacity-'])]:opacity-80",
  {
    defaultVariants: {
      align: 'inline-start',
    },
    variants: {
      align: {
        'block-end':
          'order-last w-full justify-start px-[calc(--spacing(3)-1px)] pb-[calc(--spacing(3)-1px)] [.border-t]:pt-[calc(--spacing(3)-1px)] [[data-size=sm]+&]:px-[calc(--spacing(2.5)-1px)]',
        'block-start':
          'order-first w-full justify-start px-[calc(--spacing(3)-1px)] pt-[calc(--spacing(3)-1px)] [.border-b]:pb-[calc(--spacing(3)-1px)] [[data-size=sm]+&]:px-[calc(--spacing(2.5)-1px)]',
        'inline-end':
          'order-last pe-[calc(--spacing(3)-1px)] has-[>:last-child[data-slot=badge]]:-me-1.5 has-[>button]:-me-2 has-[>kbd:last-child]:me-[-0.35rem] [[data-size=sm]+&]:pe-[calc(--spacing(2.5)-1px)]',
        'inline-start':
          'order-first ps-[calc(--spacing(3)-1px)] has-[>:last-child[data-slot=badge]]:-ms-1.5 has-[>button]:-ms-2 has-[>kbd:last-child]:ms-[-0.35rem] [[data-size=sm]+&]:ps-[calc(--spacing(2.5)-1px)]',
      },
    },
  },
);

type InputGroupAddonProps = React.ComponentProps<'div'> &
  VariantProps<typeof inputGroupAddonVariants>;

type InputGroupButtonProps = ButtonProps &
  VariantProps<typeof inputGroupAddonVariants>;

type InputGroupInputProps = InputProps;

type InputGroupProps = React.ComponentProps<'div'>;

type InputGroupTextProps = React.ComponentProps<'span'>;

function InputGroupAddon({
  align = 'inline-start',
  className,
  ...props
}: InputGroupAddonProps) {
  return (
    // react-doctor-disable-next-line react-doctor/no-static-element-interactions -- mousedown delegates focus to the grouped input without making the addon itself a separate control
    <div
      className={cn(inputGroupAddonVariants({ align }), className)}
      data-align={align}
      data-slot="input-group-addon"
      onMouseDown={(event) => {
        const target = event.target as HTMLElement;
        const isInteractive = target.closest(
          "button, a, input, select, textarea, [role='button'], [role='combobox'], [role='listbox'], [data-slot='select-trigger']",
        );

        if (isInteractive) {
          return;
        }

        event.preventDefault();

        const parent = event.currentTarget.parentElement;
        const input = parent?.querySelector<
          HTMLInputElement | HTMLTextAreaElement
        >('input, textarea');

        if (input && !parent?.querySelector('input:focus, textarea:focus')) {
          input.focus();
        }
      }}
      {...props}
    />
  );
}

function InputGroupButton({
  align = 'inline-end',
  className,
  size = 'icon-xs',
  variant = 'ghost',
  ...props
}: InputGroupButtonProps) {
  return (
    <InputGroupAddon align={align} className={className}>
      <Button size={size} variant={variant} {...props} />
    </InputGroupAddon>
  );
}

function InputGroupInput({ className, ...props }: InputGroupInputProps) {
  return <Input className={className} unstyled {...props} />;
}

function InputGroupRoot({ className, ...props }: InputGroupProps) {
  return (
    <div
      className={cn(
        // Divide adjacent inputs, like Group.Separator does between Inputs.
        '[&>[data-slot=input-control]~[data-slot=input-control]>[data-slot=input]]:border-input [&>[data-slot=input-control]~[data-slot=input-control]>[data-slot=input]]:border-s',
        'border-input bg-background text-foreground ring-ring/24 has-[input:focus-visible]:has-[input[aria-invalid]]:border-destructive/64 has-[input:focus-visible]:has-[input[aria-invalid]]:ring-destructive/16 has-[input[aria-invalid]]:border-destructive/36 has-[input:focus-visible]:border-ring dark:bg-input/32 dark:has-[input[aria-invalid]]:ring-destructive/24 relative inline-flex h-8 w-full min-w-0 items-center rounded-lg border text-base shadow-xs/5 transition-shadow not-dark:bg-clip-padding before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] not-has-[input:disabled]:not-has-[input:focus-visible]:not-has-[input[aria-invalid]]:before:shadow-[0_1px_--theme(--color-black/4%)] has-[input:disabled]:opacity-64 has-[input:disabled,input:focus-visible,input[aria-invalid]]:shadow-none has-[input:focus-visible]:ring-[3px] sm:text-sm dark:not-has-[input:disabled]:not-has-[input:focus-visible]:not-has-[input[aria-invalid]]:before:shadow-[0_-1px_--theme(--color-white/6%)] has-data-[align=inline-end]:**:[[data-size=sm]_input]:pe-1.5 has-data-[align=inline-start]:**:[[data-size=sm]_input]:ps-1.5 *:[[data-slot=input-control]]:contents *:[[data-slot=input-control]]:before:hidden has-data-[align=inline-end]:**:[input]:pe-2 has-data-[align=inline-start]:**:[input]:ps-2',
        className,
      )}
      data-slot="input-group"
      // react-doctor-disable-next-line react-doctor/prefer-tag-over-role -- role="group" is the correct ARIA pattern for composite input controls
      role="group"
      {...props}
    />
  );
}

function InputGroupText({ className, ...props }: InputGroupTextProps) {
  return (
    <span
      className={cn(
        "text-muted-foreground line-clamp-1 flex items-center gap-2 leading-none whitespace-nowrap [&_svg]:pointer-events-none [&_svg]:-mx-0.5 in-[[data-slot=input-group]:has([data-slot=input-control])]:[&_svg:not([class*='size-'])]:size-4.5 sm:in-[[data-slot=input-group]:has([data-slot=input-control])]:[&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

const InputGroup = Object.assign(InputGroupRoot, {
  Addon: InputGroupAddon,
  Button: InputGroupButton,
  Input: InputGroupInput,
  Text: InputGroupText,
});

export {
  InputGroup,
  InputGroupAddon,
  inputGroupAddonVariants,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
};
export type {
  InputGroupAddonProps,
  InputGroupButtonProps,
  InputGroupInputProps,
  InputGroupProps,
  InputGroupTextProps,
};

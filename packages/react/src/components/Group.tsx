'use client';

import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '../lib/utils';
import { Separator, type SeparatorProps } from './Separator';

const groupVariants = cva(
  'flex w-fit *:focus-visible:z-1 has-[>[data-slot=group]]:gap-2 *:has-focus-visible:z-1 dark:*:[[data-slot=separator]:has(~button:hover):not(:has(~[data-slot=separator]~[data-slot]:hover)),[data-slot=separator]:has(~[data-slot][data-pressed]):not(:has(~[data-slot=separator]~[data-slot][data-pressed]))]:before:bg-input/64 dark:*:[button:hover~[data-slot=separator]:not([data-slot]:hover~[data-slot=separator]~[data-slot=separator]),[data-slot][data-pressed]~[data-slot=separator]:not([data-slot][data-pressed]~[data-slot=separator]~[data-slot=separator])]:before:bg-input/64',
  {
    defaultVariants: {
      orientation: 'horizontal',
    },
    variants: {
      orientation: {
        horizontal:
          '*:pointer-coarse:after:min-w-auto *:data-slot:has-[~[data-slot]]:rounded-e-none *:data-slot:has-[~[data-slot]]:border-e-0 *:data-slot:not-data-[slot=separator]:has-[~[data-slot]]:before:-end-[0.5px] *:data-slot:has-[~[data-slot]]:before:rounded-e-none *:[[data-slot]~[data-slot]:not([data-slot=separator])]:before:-start-[0.5px] *:[[data-slot]~[data-slot]]:rounded-s-none *:[[data-slot]~[data-slot]]:border-s-0 *:[[data-slot]~[data-slot]]:before:rounded-s-none',
        vertical:
          'flex-col *:pointer-coarse:after:min-h-auto *:data-slot:has-[~[data-slot]]:rounded-b-none *:data-slot:has-[~[data-slot]]:border-b-0 *:data-slot:not-data-[slot=separator]:has-[~[data-slot]]:before:-bottom-[0.5px] *:data-slot:not-data-[slot=separator]:has-[~[data-slot]]:before:hidden *:data-slot:has-[~[data-slot]]:before:rounded-b-none dark:*:last:before:hidden dark:*:first:before:block *:[[data-slot]~[data-slot]:not([data-slot=separator])]:before:-top-[0.5px] *:[[data-slot]~[data-slot]]:rounded-t-none *:[[data-slot]~[data-slot]]:border-t-0 *:[[data-slot]~[data-slot]]:before:rounded-t-none',
      },
    },
  },
);

type GroupProps = React.ComponentProps<'div'> &
  VariantProps<typeof groupVariants>;

type GroupSeparatorProps = SeparatorProps;

type GroupTextProps = useRender.ComponentProps<'div'>;

function GroupRoot({
  className,
  orientation = 'horizontal',
  ...props
}: GroupProps) {
  return (
    <div
      className={cn(groupVariants({ orientation }), className)}
      data-orientation={orientation}
      data-slot="group"
      // react-doctor-disable-next-line react-doctor/prefer-tag-over-role -- role="group" is the correct ARIA pattern for grouped controls
      role="group"
      {...props}
    />
  );
}

function GroupSeparator({
  className,
  orientation = 'vertical',
  ...props
}: GroupSeparatorProps) {
  return (
    <Separator
      className={cn(
        'bg-input has-[+[data-slot=input-control]:focus-within,+[data-slot=input-group]:focus-within,+[data-slot=select-trigger]:focus-visible+*,+[data-slot=number-field]:focus-within]:bg-ring dark:before:bg-input/32 [[data-slot=input-control]:focus-within+&,[data-slot=input-group]:focus-within+&,[data-slot=select-trigger]:focus-visible+*+&,[data-slot=number-field]:focus-within+&,[data-slot=number-field]:focus-within+input+&]:bg-ring pointer-events-none relative z-2 before:absolute before:inset-0 has-[+[data-slot=input-control]:focus-within,+[data-slot=input-group]:focus-within,+[data-slot=select-trigger]:focus-visible+*,+[data-slot=number-field]:focus-within]:translate-x-px [[data-slot=input-control]:focus-within+&,[data-slot=input-group]:focus-within+&,[data-slot=select-trigger]:focus-visible+*+&,[data-slot=number-field]:focus-within+input+&]:-translate-x-px',
        className,
      )}
      orientation={orientation}
      {...props}
    />
  );
}

function GroupText({ className, render, ...props }: GroupTextProps) {
  const defaultProps = {
    className: cn(
      'border-input bg-muted text-muted-foreground relative inline-flex h-8 items-center gap-2 rounded-lg border px-[calc(--spacing(3)-1px)] text-base whitespace-nowrap shadow-xs/5 outline-none transition-shadow not-dark:bg-clip-padding before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/6%)] sm:text-sm dark:bg-input/64 dark:before:shadow-[0_-1px_--theme(--color-white/6%)] [&_svg:not([class*="size-"])]:size-4 [&_svg]:-mx-0.5 [&_svg]:shrink-0',
      className,
    ),
    'data-slot': 'group-text',
  };

  return useRender({
    defaultTagName: 'div',
    props: mergeProps(defaultProps, props),
    render,
  });
}

const Group = Object.assign(GroupRoot, {
  Separator: GroupSeparator,
  Text: GroupText,
});

export { Group, GroupRoot, GroupSeparator, GroupText, groupVariants };
export type { GroupProps, GroupSeparatorProps, GroupTextProps };

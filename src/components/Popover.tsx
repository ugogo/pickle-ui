import { Popover as PopoverPrimitive } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/lib/utils';

type PopoverAnchorProps = React.ComponentProps<typeof PopoverPrimitive.Anchor>;
type PopoverContentProps = React.ComponentProps<
  typeof PopoverPrimitive.Content
>;
type PopoverDescriptionProps = React.ComponentProps<'p'>;
type PopoverHeaderProps = React.ComponentProps<'div'>;
type PopoverProps = React.ComponentProps<typeof PopoverPrimitive.Root>;
type PopoverTitleProps = React.ComponentProps<'h2'>;
type PopoverTriggerProps = React.ComponentProps<
  typeof PopoverPrimitive.Trigger
>;

function PopoverAnchor({ ...props }: PopoverAnchorProps) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

function PopoverContent({
  align = 'center',
  className,
  sideOffset = 4,
  ...props
}: PopoverContentProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align={align}
        className={cn(
          'border-border bg-popover text-popover-foreground data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 z-50 flex w-72 origin-(--radix-popover-content-transform-origin) flex-col gap-4 rounded-md border p-4 text-sm shadow-lg duration-100 outline-none',
          className,
        )}
        data-slot="popover-content"
        sideOffset={sideOffset}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

function PopoverDescription({ className, ...props }: PopoverDescriptionProps) {
  return (
    <p
      className={cn('text-muted-foreground', className)}
      data-slot="popover-description"
      {...props}
    />
  );
}

function PopoverHeader({ className, ...props }: PopoverHeaderProps) {
  return (
    <div
      className={cn('flex flex-col gap-1 text-sm', className)}
      data-slot="popover-header"
      {...props}
    />
  );
}

function PopoverRoot({ ...props }: PopoverProps) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTitle({ className, ...props }: PopoverTitleProps) {
  return (
    <h2
      className={cn('text-base font-medium', className)}
      data-slot="popover-title"
      {...props}
    />
  );
}

function PopoverTrigger({ ...props }: PopoverTriggerProps) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

const Popover = Object.assign(PopoverRoot, {
  Anchor: PopoverAnchor,
  Content: PopoverContent,
  Description: PopoverDescription,
  Header: PopoverHeader,
  Title: PopoverTitle,
  Trigger: PopoverTrigger,
});

export {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
};
export type {
  PopoverAnchorProps,
  PopoverContentProps,
  PopoverDescriptionProps,
  PopoverHeaderProps,
  PopoverProps,
  PopoverTitleProps,
  PopoverTriggerProps,
};

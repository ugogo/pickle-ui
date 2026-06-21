import { Popover as PopoverPrimitive } from '@base-ui/react/popover';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { Text } from './Text';

type PopoverAnchorProps = React.ComponentProps<'div'>;
type PopoverContentProps = Pick<
  React.ComponentProps<typeof PopoverPrimitive.Positioner>,
  'align' | 'side' | 'sideOffset'
> &
  React.ComponentProps<typeof PopoverPrimitive.Popup> & {
    asChild?: boolean;
  };
type PopoverDescriptionProps = React.ComponentProps<'p'>;
type PopoverHeaderProps = React.ComponentProps<'div'>;
type PopoverProps = React.ComponentProps<typeof PopoverPrimitive.Root>;
type PopoverTitleProps = React.ComponentProps<'h2'>;
type PopoverTriggerProps = React.ComponentProps<
  typeof PopoverPrimitive.Trigger
> & {
  asChild?: boolean;
};

function PopoverAnchor({ ...props }: PopoverAnchorProps) {
  return <div data-slot="popover-anchor" {...props} />;
}

function PopoverContent({
  align = 'center',
  asChild,
  children,
  className,
  side = 'bottom',
  sideOffset = 4,
  ...props
}: PopoverContentProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={align}
        side={side}
        sideOffset={sideOffset}
      >
        <PopoverPrimitive.Popup
          className={cn(
            'elevated-shadow bg-popover text-popover-foreground data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 z-50 flex w-72 origin-(--transform-origin) flex-col gap-4 rounded-lg p-4 text-sm duration-100 outline-none',
            className,
          )}
          data-slot="popover-content"
          render={asChild ? (children as React.ReactElement) : undefined}
          {...props}
        >
          {asChild ? undefined : children}
        </PopoverPrimitive.Popup>
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

function PopoverDescription({ className, ...props }: PopoverDescriptionProps) {
  return (
    <Text
      as="p"
      className={className}
      data-slot="popover-description"
      tone="muted"
      variant="body"
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
  return <PopoverPrimitive.Root {...props} />;
}

function PopoverTitle({ children, className, ...props }: PopoverTitleProps) {
  return (
    <Text
      as="h2"
      className={className}
      data-slot="popover-title"
      variant="h4"
      {...props}
    >
      {children}
    </Text>
  );
}

function PopoverTrigger({ asChild, children, ...props }: PopoverTriggerProps) {
  return (
    <PopoverPrimitive.Trigger
      data-slot="popover-trigger"
      render={asChild ? (children as React.ReactElement) : undefined}
      {...props}
    >
      {asChild ? undefined : children}
    </PopoverPrimitive.Trigger>
  );
}

const Popover = Object.assign(PopoverRoot, {
  Anchor: PopoverAnchor,
  Close: PopoverPrimitive.Close,
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

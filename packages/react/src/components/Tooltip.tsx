import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip';
import * as React from 'react';

import { cn } from '../lib/utils';

type TooltipContentProps = Pick<
  React.ComponentProps<typeof TooltipPrimitive.Positioner>,
  'align' | 'alignOffset' | 'side' | 'sideOffset'
> &
  React.ComponentProps<typeof TooltipPrimitive.Popup>;
type TooltipProps = React.ComponentProps<typeof TooltipPrimitive.Root>;
type TooltipProviderProps = React.ComponentProps<
  typeof TooltipPrimitive.Provider
>;
type TooltipTriggerProps = React.ComponentProps<
  typeof TooltipPrimitive.Trigger
>;

function TooltipContent({
  align = 'center',
  alignOffset = 0,
  children,
  className,
  side = 'top',
  sideOffset = 6,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        className="z-50"
        side={side}
        sideOffset={sideOffset}
      >
        <TooltipPrimitive.Popup
          className={cn(
            'bg-foreground text-background data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 relative z-50 w-fit max-w-xs origin-(--transform-origin) rounded-md px-2 py-1 text-xs text-balance duration-100',
            className,
          )}
          data-slot="tooltip-content"
          {...props}
        >
          {children}
          <TooltipPrimitive.Arrow
            className="bg-foreground size-2 rotate-45 rounded-[1px] data-[side=bottom]:-top-1 data-[side=left]:-right-1 data-[side=right]:-left-1 data-[side=top]:-bottom-1"
            data-slot="tooltip-arrow"
          />
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

function TooltipProvider({ ...props }: TooltipProviderProps) {
  return <TooltipPrimitive.Provider {...props} />;
}

function TooltipRoot({ ...props }: TooltipProps) {
  return <TooltipPrimitive.Root {...props} />;
}

function TooltipTrigger({ ...props }: TooltipTriggerProps) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

const Tooltip = Object.assign(TooltipRoot, {
  Content: TooltipContent,
  Provider: TooltipProvider,
  Trigger: TooltipTrigger,
});

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
export type {
  TooltipContentProps,
  TooltipProps,
  TooltipProviderProps,
  TooltipTriggerProps,
};

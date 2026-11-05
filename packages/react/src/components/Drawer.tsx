import { Drawer as DrawerPrimitive } from '@base-ui/react/drawer';
import { IconX } from '@tabler/icons-react';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '../lib/utils';
import {
  dialogDescriptionClassName,
  dialogTitleClassName,
} from './_internal/dialog-styles';
import { Button } from './Button';

// iOS sheet curve, as in coss ui's Drawer. Transforms are written as
// `transform` because Base UI sets an inline `transform` while the drawer is
// dragged; Tailwind's `translate-*` utilities write `translate`, which would
// add to it.
const drawerMotion =
  'duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none';

const drawerBackdropClassName = cn(
  'fixed inset-0 z-50 bg-black/32 opacity-[calc(1-var(--drawer-swipe-progress,0))] backdrop-blur-sm transition-opacity data-ending-style:opacity-0 data-starting-style:opacity-0 data-swiping:duration-0',
  drawerMotion,
);

const drawerViewportClassName = 'fixed inset-0 z-50 flex justify-end';

const drawerPopupVariants = cva(
  cn(
    'bg-popover text-popover-foreground relative flex w-[calc(100%-3rem)] min-w-0 flex-col shadow-lg/5 outline-none not-dark:bg-clip-padding',
    'transition-transform data-ending-style:duration-[calc(var(--drawer-swipe-strength,1)*400ms)] data-swiping:select-none',
    drawerMotion,
    '[transform:translateX(var(--drawer-swipe-movement-x,0px))] data-ending-style:[transform:translateX(calc(100%+var(--inset,0px)))] data-starting-style:[transform:translateX(calc(100%+var(--inset,0px)))]',
  ),
  {
    defaultVariants: {
      size: 'md',
      variant: 'inset',
    },
    variants: {
      size: {
        lg: 'max-w-xl',
        md: 'max-w-md',
        sm: 'max-w-sm',
      },
      variant: {
        // Edge to edge; fills the gap past the screen edge when a drag pulls
        // the drawer inwards.
        attached:
          'after:bg-popover rounded-s-2xl border-s after:pointer-events-none after:absolute after:inset-y-0 after:start-full after:w-12 **:data-[slot=drawer-footer]:rounded-es-[calc(var(--radius-2xl)-1px)]',
        // Floats inside the viewport, `--inset` away from its edges.
        inset:
          'my-(--inset) me-(--inset) rounded-2xl border [--inset:--spacing(2)] sm:[--inset:--spacing(4)] **:data-[slot=drawer-footer]:rounded-b-[calc(var(--radius-2xl)-1px)]',
        straight:
          'after:bg-popover border-s after:pointer-events-none after:absolute after:inset-y-0 after:start-full after:w-12',
      },
    },
  },
);

type DrawerCloseProps = React.ComponentProps<typeof DrawerPrimitive.Close>;

type DrawerContentProps = React.ComponentProps<typeof DrawerPrimitive.Popup> & {
  /** Accessible name of the close icon button. Defaults to `"Close"`. */
  closeLabel?: string;
  /** Renders a close icon button in the top-right corner. Defaults to `true`. */
  showCloseButton?: boolean;
  /** Maximum width of the drawer. Defaults to `md`. */
  size?: DrawerSize;
  /**
   * `inset` floats the drawer away from the viewport's edges, `attached`
   * docks it to the right edge with rounded inner corners, and `straight`
   * docks it without rounding. Defaults to `inset`.
   */
  variant?: DrawerVariant;
};
type DrawerDescriptionProps = React.ComponentProps<
  typeof DrawerPrimitive.Description
>;
type DrawerFooterProps = React.ComponentProps<'div'>;
type DrawerHeaderProps = React.ComponentProps<'div'>;
type DrawerPanelProps = React.ComponentProps<typeof DrawerPrimitive.Content>;
// The drawer always slides in from the right, so the swipe direction is fixed
// and the snap points, which only apply to vertical drawers, are left out.
type DrawerProps = Omit<
  React.ComponentProps<typeof DrawerPrimitive.Root>,
  | 'defaultSnapPoint'
  | 'onSnapPointChange'
  | 'snapPoint'
  | 'snapPoints'
  | 'snapToSequentialPoints'
  | 'swipeDirection'
>;
type DrawerSize = NonNullable<VariantProps<typeof drawerPopupVariants>['size']>;
type DrawerTitleProps = React.ComponentProps<typeof DrawerPrimitive.Title>;
type DrawerTriggerProps = React.ComponentProps<typeof DrawerPrimitive.Trigger>;
type DrawerVariant = NonNullable<
  VariantProps<typeof drawerPopupVariants>['variant']
>;

function DrawerClose({ ...props }: DrawerCloseProps) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function DrawerContent({
  children,
  className,
  closeLabel = 'Close',
  showCloseButton = true,
  size = 'md',
  variant = 'inset',
  ...props
}: DrawerContentProps) {
  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Backdrop
        className={drawerBackdropClassName}
        data-slot="drawer-backdrop"
      />
      <DrawerPrimitive.Viewport className={drawerViewportClassName}>
        <DrawerPrimitive.Popup
          className={cn(drawerPopupVariants({ size, variant }), className)}
          data-size={size}
          data-slot="drawer-content"
          data-variant={variant}
          {...props}
        >
          {children}
          {showCloseButton ? (
            <DrawerPrimitive.Close
              aria-label={closeLabel}
              className="absolute end-3 top-3"
              data-slot="drawer-close"
              render={<Button size="icon-sm" variant="ghost" />}
            >
              <IconX />
            </DrawerPrimitive.Close>
          ) : null}
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPrimitive.Portal>
  );
}

function DrawerDescription({ className, ...props }: DrawerDescriptionProps) {
  return (
    <DrawerPrimitive.Description
      className={cn(dialogDescriptionClassName, className)}
      data-slot="drawer-description"
      {...props}
    />
  );
}

function DrawerFooter({ className, ...props }: DrawerFooterProps) {
  return (
    <div
      className={cn(
        'bg-muted/72 mt-auto flex flex-col-reverse gap-2 border-t px-6 py-4 sm:flex-row sm:justify-end',
        className,
      )}
      data-slot="drawer-footer"
      {...props}
    />
  );
}

function DrawerHeader({ className, ...props }: DrawerHeaderProps) {
  return (
    <div
      className={cn('flex flex-col gap-1.5 p-6 pe-12', className)}
      data-slot="drawer-header"
      {...props}
    />
  );
}

/** The scrolling body between the header and the footer. Mouse drags in it select text instead of moving the drawer. */
function DrawerPanel({ className, ...props }: DrawerPanelProps) {
  return (
    <DrawerPrimitive.Content
      className={cn(
        'min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-6 first:pt-6',
        className,
      )}
      data-slot="drawer-panel"
      {...props}
    />
  );
}

function DrawerRoot(props: DrawerProps) {
  return <DrawerPrimitive.Root swipeDirection="right" {...props} />;
}

function DrawerTitle({ className, ...props }: DrawerTitleProps) {
  return (
    <DrawerPrimitive.Title
      className={cn(dialogTitleClassName, className)}
      data-slot="drawer-title"
      {...props}
    />
  );
}

function DrawerTrigger({ ...props }: DrawerTriggerProps) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

const Drawer = Object.assign(DrawerRoot, {
  Close: DrawerClose,
  Content: DrawerContent,
  Description: DrawerDescription,
  Footer: DrawerFooter,
  Header: DrawerHeader,
  Panel: DrawerPanel,
  Title: DrawerTitle,
  Trigger: DrawerTrigger,
});

export { Drawer };
export type {
  DrawerCloseProps,
  DrawerContentProps,
  DrawerDescriptionProps,
  DrawerFooterProps,
  DrawerHeaderProps,
  DrawerPanelProps,
  DrawerProps,
  DrawerTitleProps,
  DrawerTriggerProps,
};

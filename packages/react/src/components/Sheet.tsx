'use client';

import { Drawer as DrawerPrimitive } from '@base-ui/react/drawer';
import { IconX } from '@tabler/icons-react';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { useMediaQuery } from '../hooks/use-media-query';
import { cn } from '../lib/utils';
import {
  dialogDescriptionClassName,
  dialogFooterClassName,
  dialogHeaderClassName,
  dialogTitleClassName,
} from './_internal/dialog-styles';
import { Button } from './Button';

// Tailwind's `sm` breakpoint: the sheet slides in from the right from here up,
// and from the bottom below it.
const SIDE_SHEET_QUERY = '(min-width: 40rem)';

// iOS sheet curve. Transforms are written as `transform` because Base UI sets an
// inline `transform` while the sheet is dragged; Tailwind's `translate-*`
// utilities write `translate`, which would add to it.
const sheetMotion =
  'duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none';

const sheetBackdropClassName = cn(
  'fixed inset-0 z-50 bg-black/32 opacity-[calc(1-var(--drawer-swipe-progress,0))] backdrop-blur-sm transition-opacity data-ending-style:opacity-0 data-starting-style:opacity-0 data-swiping:duration-0',
  sheetMotion,
);

const sheetViewportClassName =
  'fixed inset-0 z-50 flex items-end sm:items-stretch sm:justify-end sm:p-3';

const sheetPopupVariants = cva(
  cn(
    'bg-popover text-popover-foreground relative flex w-full min-w-0 flex-col border shadow-lg/5 outline-none not-dark:bg-clip-padding',
    'transition-transform data-ending-style:duration-[calc(var(--drawer-swipe-strength,1)*400ms)] data-swiping:select-none',
    sheetMotion,
    // Bottom sheet. It bleeds below the viewport so a drag past the top shows
    // more sheet instead of the page.
    '-mb-(--bleed) max-h-[calc(100dvh-env(safe-area-inset-top)-2.5rem+var(--bleed))] rounded-t-3xl border-x-0 border-b-0 pb-(--bleed) [--bleed:3rem]',
    '[transform:translateY(var(--drawer-swipe-movement-y,0px))] data-ending-style:[transform:translateY(calc(100%-var(--bleed)))] data-starting-style:[transform:translateY(calc(100%-var(--bleed)))]',
    // Side sheet, floating inside the viewport's padding.
    'sm:mb-0 sm:max-h-none sm:rounded-2xl sm:border sm:pb-0',
    'sm:[transform:translateX(var(--drawer-swipe-movement-x,0px))] sm:data-ending-style:[transform:translateX(calc(100%+1rem))] sm:data-starting-style:[transform:translateX(calc(100%+1rem))]',
  ),
  {
    defaultVariants: {
      size: 'md',
    },
    variants: {
      size: {
        lg: 'sm:max-w-xl',
        md: 'sm:max-w-md',
        sm: 'sm:max-w-sm',
      },
    },
  },
);

type SheetCloseProps = React.ComponentProps<typeof DrawerPrimitive.Close>;

type SheetContentProps = React.ComponentProps<typeof DrawerPrimitive.Popup> & {
  /** Accessible name of the close icon button. Defaults to `"Close"`. */
  closeLabel?: string;
  /** Renders a close icon button in the top-right corner. Defaults to `true`. */
  showCloseButton?: boolean;
  /** Maximum width of the side sheet. The bottom sheet is always full width. Defaults to `md`. */
  size?: SheetSize;
};
type SheetDescriptionProps = React.ComponentProps<
  typeof DrawerPrimitive.Description
>;
type SheetFooterProps = React.ComponentProps<'div'>;
type SheetHeaderProps = React.ComponentProps<'div'>;
// The swipe direction follows the layout, and snap points only apply to the
// bottom sheet, so neither is configurable.
type SheetProps = Omit<
  React.ComponentProps<typeof DrawerPrimitive.Root>,
  | 'defaultSnapPoint'
  | 'onSnapPointChange'
  | 'snapPoint'
  | 'snapPoints'
  | 'snapToSequentialPoints'
  | 'swipeDirection'
>;
type SheetSize = NonNullable<VariantProps<typeof sheetPopupVariants>['size']>;
type SheetTitleProps = React.ComponentProps<typeof DrawerPrimitive.Title>;
type SheetTriggerProps = React.ComponentProps<typeof DrawerPrimitive.Trigger>;

function SheetClose({ ...props }: SheetCloseProps) {
  return <DrawerPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetContent({
  children,
  className,
  closeLabel = 'Close',
  showCloseButton = true,
  size = 'md',
  ...props
}: SheetContentProps) {
  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Backdrop
        className={sheetBackdropClassName}
        data-slot="sheet-backdrop"
      />
      <DrawerPrimitive.Viewport className={sheetViewportClassName}>
        <DrawerPrimitive.Popup
          className={cn(sheetPopupVariants({ size }), className)}
          data-size={size}
          data-slot="sheet-content"
          {...props}
        >
          <div
            aria-hidden
            className="bg-muted-foreground/25 mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full sm:hidden"
            data-slot="sheet-handle"
          />
          {/* Mouse drags here select text instead of moving the sheet. */}
          <DrawerPrimitive.Content className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain px-6 pt-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:pt-6 sm:pb-6">
            {children}
          </DrawerPrimitive.Content>
          {showCloseButton ? (
            <DrawerPrimitive.Close
              aria-label={closeLabel}
              className="absolute end-3 top-3"
              data-slot="sheet-close"
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

function SheetDescription({ className, ...props }: SheetDescriptionProps) {
  return (
    <DrawerPrimitive.Description
      className={cn(dialogDescriptionClassName, className)}
      data-slot="sheet-description"
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: SheetFooterProps) {
  return (
    <div
      className={cn(dialogFooterClassName, 'mt-auto pt-2', className)}
      data-slot="sheet-footer"
      {...props}
    />
  );
}

function SheetHeader({ className, ...props }: SheetHeaderProps) {
  return (
    <div
      className={cn(dialogHeaderClassName, className)}
      data-slot="sheet-header"
      {...props}
    />
  );
}

function SheetRoot(props: SheetProps) {
  const isSideSheet = useMediaQuery(SIDE_SHEET_QUERY);

  return (
    <DrawerPrimitive.Root
      swipeDirection={isSideSheet ? 'right' : 'down'}
      {...props}
    />
  );
}

function SheetTitle({ className, ...props }: SheetTitleProps) {
  return (
    <DrawerPrimitive.Title
      className={cn(dialogTitleClassName, className)}
      data-slot="sheet-title"
      {...props}
    />
  );
}

function SheetTrigger({ ...props }: SheetTriggerProps) {
  return <DrawerPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

const Sheet = Object.assign(SheetRoot, {
  Close: SheetClose,
  Content: SheetContent,
  Description: SheetDescription,
  Footer: SheetFooter,
  Header: SheetHeader,
  Title: SheetTitle,
  Trigger: SheetTrigger,
});

export { Sheet };
export type {
  SheetCloseProps,
  SheetContentProps,
  SheetDescriptionProps,
  SheetFooterProps,
  SheetHeaderProps,
  SheetProps,
  SheetTitleProps,
  SheetTriggerProps,
};

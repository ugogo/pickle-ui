import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { IconX } from '@tabler/icons-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

import {
  dialogBackdropClassName,
  dialogDescriptionClassName,
  dialogFooterClassName,
  dialogHeaderClassName,
  dialogPopupVariants,
  type DialogSize,
  dialogTitleClassName,
  dialogViewportClassName,
} from './_internal/dialog-styles';
import { Button } from './Button';

type DialogCloseProps = React.ComponentProps<typeof DialogPrimitive.Close>;
type DialogContentProps = React.ComponentProps<typeof DialogPrimitive.Popup> & {
  /** Accessible name of the close icon button. Defaults to `"Close"`. */
  closeLabel?: string;
  /** Renders a close icon button in the top-right corner. Defaults to `true`. */
  showCloseButton?: boolean;
  /** Maximum width of the dialog. Defaults to `md`. */
  size?: DialogSize;
};
type DialogDescriptionProps = React.ComponentProps<
  typeof DialogPrimitive.Description
>;
type DialogFooterProps = React.ComponentProps<'div'>;
type DialogHeaderProps = React.ComponentProps<'div'>;
type DialogProps = React.ComponentProps<typeof DialogPrimitive.Root>;
type DialogTitleProps = React.ComponentProps<typeof DialogPrimitive.Title>;
type DialogTriggerProps = React.ComponentProps<typeof DialogPrimitive.Trigger>;

function DialogClose({ ...props }: DialogCloseProps) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogContent({
  children,
  className,
  closeLabel = 'Close',
  showCloseButton = true,
  size = 'md',
  ...props
}: DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop
        className={dialogBackdropClassName}
        data-slot="dialog-backdrop"
      />
      <DialogPrimitive.Viewport className={dialogViewportClassName}>
        <DialogPrimitive.Popup
          className={cn(dialogPopupVariants({ size }), className)}
          data-size={size}
          data-slot="dialog-content"
          {...props}
        >
          {children}
          {showCloseButton ? (
            <DialogPrimitive.Close
              aria-label={closeLabel}
              className="absolute end-3 top-3"
              data-slot="dialog-close"
              render={<Button size="icon-sm" variant="ghost" />}
            >
              <IconX />
            </DialogPrimitive.Close>
          ) : null}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Viewport>
    </DialogPrimitive.Portal>
  );
}

function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return (
    <DialogPrimitive.Description
      className={cn(dialogDescriptionClassName, className)}
      data-slot="dialog-description"
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: DialogFooterProps) {
  return (
    <div
      className={cn(dialogFooterClassName, className)}
      data-slot="dialog-footer"
      {...props}
    />
  );
}

function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return (
    <div
      className={cn(dialogHeaderClassName, className)}
      data-slot="dialog-header"
      {...props}
    />
  );
}

function DialogRoot({ ...props }: DialogProps) {
  return <DialogPrimitive.Root {...props} />;
}

function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <DialogPrimitive.Title
      className={cn(dialogTitleClassName, className)}
      data-slot="dialog-title"
      {...props}
    />
  );
}

function DialogTrigger({ ...props }: DialogTriggerProps) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

const Dialog = Object.assign(DialogRoot, {
  Close: DialogClose,
  Content: DialogContent,
  Description: DialogDescription,
  Footer: DialogFooter,
  Header: DialogHeader,
  Title: DialogTitle,
  Trigger: DialogTrigger,
});

export { Dialog };
export type {
  DialogCloseProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogProps,
  DialogTitleProps,
  DialogTriggerProps,
};

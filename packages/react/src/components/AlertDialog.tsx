import { AlertDialog as AlertDialogPrimitive } from '@base-ui/react/alert-dialog';
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import * as React from 'react';

import { cn } from '../lib/utils';
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

type AlertDialogCloseProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Close
>;
type AlertDialogContentProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Popup
> & {
  /** Maximum width of the dialog. Defaults to `md`. */
  size?: DialogSize;
};
type AlertDialogDescriptionProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Description
>;
type AlertDialogFooterProps = React.ComponentProps<'div'>;
type AlertDialogHeaderProps = React.ComponentProps<'div'>;
type AlertDialogProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Root
> & {
  /**
   * Keeps the dialog open when the backdrop is clicked, so it only closes
   * through `AlertDialog.Close` or Escape. Defaults to `false`: a backdrop
   * click closes the dialog.
   */
  disablePointerDismissal?: boolean;
};
type AlertDialogTitleProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Title
>;
type AlertDialogTriggerProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Trigger
>;

function AlertDialogClose({ ...props }: AlertDialogCloseProps) {
  return (
    <AlertDialogPrimitive.Close data-slot="alert-dialog-close" {...props} />
  );
}

function AlertDialogContent({
  className,
  size = 'md',
  ...props
}: AlertDialogContentProps) {
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Backdrop
        className={dialogBackdropClassName}
        data-slot="alert-dialog-backdrop"
      />
      <AlertDialogPrimitive.Viewport className={dialogViewportClassName}>
        <AlertDialogPrimitive.Popup
          className={cn(dialogPopupVariants({ size }), className)}
          data-size={size}
          data-slot="alert-dialog-content"
          // The Dialog root used for pointer dismissal would render `dialog`.
          role="alertdialog"
          {...props}
        />
      </AlertDialogPrimitive.Viewport>
    </AlertDialogPrimitive.Portal>
  );
}

function AlertDialogDescription({
  className,
  ...props
}: AlertDialogDescriptionProps) {
  return (
    <AlertDialogPrimitive.Description
      className={cn(dialogDescriptionClassName, className)}
      data-slot="alert-dialog-description"
      {...props}
    />
  );
}

function AlertDialogFooter({ className, ...props }: AlertDialogFooterProps) {
  return (
    <div
      className={cn(dialogFooterClassName, className)}
      data-slot="alert-dialog-footer"
      {...props}
    />
  );
}

function AlertDialogHeader({ className, ...props }: AlertDialogHeaderProps) {
  return (
    <div
      className={cn(dialogHeaderClassName, className)}
      data-slot="alert-dialog-header"
      {...props}
    />
  );
}

function AlertDialogRoot({
  disablePointerDismissal = false,
  ...props
}: AlertDialogProps) {
  if (disablePointerDismissal) {
    return <AlertDialogPrimitive.Root {...props} />;
  }

  // Base UI's alert dialog always ignores outside presses. A modal Dialog root
  // shares every part and closes on them with the `outside-press` reason.
  return (
    <DialogPrimitive.Root {...props} disablePointerDismissal={false} modal />
  );
}

function AlertDialogTitle({ className, ...props }: AlertDialogTitleProps) {
  return (
    <AlertDialogPrimitive.Title
      className={cn(dialogTitleClassName, className)}
      data-slot="alert-dialog-title"
      {...props}
    />
  );
}

function AlertDialogTrigger({ ...props }: AlertDialogTriggerProps) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  );
}

const AlertDialog = Object.assign(AlertDialogRoot, {
  Close: AlertDialogClose,
  Content: AlertDialogContent,
  Description: AlertDialogDescription,
  Footer: AlertDialogFooter,
  Header: AlertDialogHeader,
  Title: AlertDialogTitle,
  Trigger: AlertDialogTrigger,
});

export { AlertDialog };
export type {
  AlertDialogCloseProps,
  AlertDialogContentProps,
  AlertDialogDescriptionProps,
  AlertDialogFooterProps,
  AlertDialogHeaderProps,
  AlertDialogProps,
  AlertDialogTitleProps,
  AlertDialogTriggerProps,
};

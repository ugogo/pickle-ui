'use client';

import { Toast as ToastPrimitive } from '@base-ui/react/toast';
import {
  IconAlertCircle,
  IconAlertTriangle,
  IconCircleCheck,
  IconInfoCircle,
  IconX,
} from '@tabler/icons-react';
import { cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { buttonVariants } from './Button';
import { Spinner } from './Spinner';
import { Text } from './Text';

type SwipeDirection = 'down' | 'left' | 'right' | 'up';

type ToastActionProps = React.ComponentProps<typeof ToastPrimitive.Action>;
type ToastCloseProps = React.ComponentProps<typeof ToastPrimitive.Close>;
type ToastDescriptionProps = React.ComponentProps<
  typeof ToastPrimitive.Description
>;
type ToastObject = ToastPrimitive.Root.ToastObject;
type ToastPosition =
  | 'bottom-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'top-left'
  | 'top-right';
type ToastProviderProps = React.ComponentProps<
  typeof ToastPrimitive.Provider
> & {
  /**
   * Accessible name of each toast's close button.
   * @default 'Close'
   */
  closeLabel?: string;
  /**
   * Where the toast stack is anchored in the window.
   * @default 'bottom-right'
   */
  position?: ToastPosition;
};
type ToastTitleProps = React.ComponentProps<typeof ToastPrimitive.Title>;

/**
 * Global toast manager, usable outside React (`Toast.manager.add({ … })`).
 * `Toast.Provider` subscribes to it, so mount a single provider per app.
 */
const toastManager = ToastPrimitive.createToastManager();

const swipeDirections: Record<ToastPosition, SwipeDirection[]> = {
  'bottom-center': ['down'],
  'bottom-left': ['down', 'left'],
  'bottom-right': ['down', 'right'],
  'top-center': ['up'],
  'top-left': ['up', 'left'],
  'top-right': ['up', 'right'],
};

const toastViewportVariants = cva(
  'fixed z-50 flex w-[calc(100%-var(--spacing)*8)] max-w-90 outline-none',
  {
    defaultVariants: {
      position: 'bottom-right',
    },
    variants: {
      position: {
        'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 [--toast-dir:-1]',
        'bottom-left': 'bottom-4 left-4 [--toast-dir:-1]',
        'bottom-right': 'right-4 bottom-4 [--toast-dir:-1]',
        'top-center': 'top-4 left-1/2 -translate-x-1/2 [--toast-dir:1]',
        'top-left': 'top-4 left-4 [--toast-dir:1]',
        'top-right': 'top-4 right-4 [--toast-dir:1]',
      },
    },
  },
);

const toastIcons: Record<string, React.ReactNode> = {
  error: <IconAlertCircle className="text-destructive" />,
  info: <IconInfoCircle className="text-info" />,
  loading: <Spinner aria-hidden className="text-muted-foreground" />,
  success: <IconCircleCheck className="text-success" />,
  warning: <IconAlertTriangle className="text-warning" />,
};

function ToastAction({ className, ...props }: ToastActionProps) {
  return (
    <ToastPrimitive.Action
      className={cn(
        buttonVariants({ size: 'xs', variant: 'outline' }),
        className,
      )}
      data-slot="toast-action"
      {...props}
    />
  );
}

function ToastClose({
  'aria-label': ariaLabel = 'Close',
  children,
  className,
  ...props
}: ToastCloseProps) {
  return (
    <ToastPrimitive.Close
      aria-label={ariaLabel}
      className={cn(
        buttonVariants({ size: 'icon-xs', variant: 'ghost' }),
        'text-muted-foreground hover:text-foreground -me-1',
        className,
      )}
      data-slot="toast-close"
      {...props}
    >
      {children ?? <IconX />}
    </ToastPrimitive.Close>
  );
}

function ToastDescription({ className, ...props }: ToastDescriptionProps) {
  return (
    <ToastPrimitive.Description
      className={cn('leading-5', className)}
      data-slot="toast-description"
      render={<Text tone="muted" variant="body" />}
      {...props}
    />
  );
}

function ToastList({
  closeLabel,
  position,
}: {
  closeLabel: string;
  position: ToastPosition;
}) {
  const { toasts } = ToastPrimitive.useToastManager();

  return toasts.map((toast) => (
    <ToastRoot
      closeLabel={closeLabel}
      key={toast.id}
      swipeDirection={swipeDirections[position]}
      toast={toast}
    />
  ));
}

/**
 * Mount once near the root of the app. Renders `children` plus the portalled
 * viewport that stacks toasts added through `Toast.manager` or
 * `Toast.useToast()`. A toast's `type` (`success`, `error`, `warning`,
 * `info`, `loading`) picks its icon.
 */
function ToastProvider({
  children,
  closeLabel = 'Close',
  position = 'bottom-right',
  toastManager: manager = toastManager,
  ...props
}: ToastProviderProps) {
  return (
    <ToastPrimitive.Provider toastManager={manager} {...props}>
      {children}
      <ToastPrimitive.Portal>
        <ToastPrimitive.Viewport
          className={toastViewportVariants({ position })}
          data-position={position}
          data-slot="toast-viewport"
        >
          <ToastList closeLabel={closeLabel} position={position} />
        </ToastPrimitive.Viewport>
      </ToastPrimitive.Portal>
    </ToastPrimitive.Provider>
  );
}

/** A single toast; `Toast.Provider` renders one per queued toast. */
function ToastRoot({
  closeLabel,
  swipeDirection,
  toast,
}: {
  closeLabel: string;
  swipeDirection: SwipeDirection[];
  toast: ToastObject;
}) {
  const icon = toast.type ? toastIcons[toast.type] : undefined;

  return (
    <ToastPrimitive.Root
      className={cn(
        // Stack geometry, driven by Base UI's --toast-* variables and the
        // viewport's --toast-dir (-1 stacks upwards, 1 stacks downwards).
        '[--toast-expanded-y:calc(var(--toast-dir)*(var(--toast-offset-y)+var(--toast-index)*var(--toast-gap))+var(--toast-swipe-movement-y))] [--toast-gap:--spacing(3)] [--toast-peek:--spacing(3)] [--toast-scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--toast-shrink:calc(1-var(--toast-scale))] [--toast-stack-height:var(--toast-frontmost-height,var(--toast-height))]',
        'absolute inset-x-0 z-[calc(1000-var(--toast-index))] h-(--toast-stack-height) w-full select-none in-[[data-position^=bottom]]:bottom-0 in-[[data-position^=bottom]]:origin-bottom in-[[data-position^=top]]:top-0 in-[[data-position^=top]]:origin-top data-expanded:h-(--toast-height)',
        'translate-x-(--toast-swipe-movement-x) translate-y-[calc(var(--toast-swipe-movement-y)+var(--toast-dir)*(var(--toast-index)*var(--toast-peek)+var(--toast-shrink)*var(--toast-stack-height)))] scale-(--toast-scale) data-expanded:translate-y-(--toast-expanded-y) data-expanded:scale-100',
        'transition-[translate,scale,opacity,height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:opacity-0 data-limited:opacity-0 data-starting-style:translate-y-[calc(var(--toast-dir)*-150%)] [&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:translate-y-[calc(var(--toast-dir)*-150%)]',
        'data-ending-style:data-[swipe-direction=down]:translate-y-[calc(var(--toast-swipe-movement-y)+150%)] data-ending-style:data-[swipe-direction=left]:translate-x-[calc(var(--toast-swipe-movement-x)-150%)] data-ending-style:data-[swipe-direction=left]:translate-y-(--toast-expanded-y) data-ending-style:data-[swipe-direction=right]:translate-x-[calc(var(--toast-swipe-movement-x)+150%)] data-ending-style:data-[swipe-direction=right]:translate-y-(--toast-expanded-y) data-ending-style:data-[swipe-direction=up]:translate-y-[calc(var(--toast-swipe-movement-y)-150%)]',
        // Keeps the stack expanded while the pointer crosses the gap.
        "after:absolute after:inset-x-0 after:h-[calc(var(--toast-gap)+1px)] after:content-[''] in-[[data-position^=bottom]]:after:top-full in-[[data-position^=top]]:after:bottom-full",
        'bg-popover text-popover-foreground rounded-xl border bg-clip-padding text-sm shadow-lg/5',
      )}
      data-slot="toast"
      swipeDirection={swipeDirection}
      toast={toast}
    >
      <ToastPrimitive.Content className="flex items-start gap-2.5 overflow-hidden px-3.5 py-3 transition-opacity duration-250 data-behind:pointer-events-none data-behind:opacity-0 data-expanded:pointer-events-auto data-expanded:opacity-100">
        {icon ? (
          <div
            aria-hidden
            className="flex h-5 shrink-0 items-center [&_svg]:size-4"
            data-slot="toast-icon"
          >
            {icon}
          </div>
        ) : null}
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <ToastTitle />
          <ToastDescription />
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <ToastAction />
          <ToastClose aria-label={closeLabel} />
        </div>
      </ToastPrimitive.Content>
    </ToastPrimitive.Root>
  );
}

function ToastTitle({ className, ...props }: ToastTitleProps) {
  return (
    <ToastPrimitive.Title
      className={cn('leading-5 font-medium', className)}
      data-slot="toast-title"
      render={<Text as="h2" variant="body" />}
      {...props}
    />
  );
}

/**
 * Returns the toast manager of the nearest `Toast.Provider`: `add`, `close`,
 * `update`, `promise` and the current `toasts`.
 */
function useToast() {
  return ToastPrimitive.useToastManager();
}

/**
 * Toasts are added imperatively, so `Toast` groups the provider and the two
 * ways to reach its manager rather than rendering a toast itself.
 */
const Toast = {
  manager: toastManager,
  Provider: ToastProvider,
  useToast,
};

export { Toast };
export type { ToastProviderProps };

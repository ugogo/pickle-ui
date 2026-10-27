import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';
import { textVariants } from '../Text';

/** Shared look for `Dialog` and `AlertDialog`; not part of the public API. */

const dialogBackdropClassName =
  'fixed inset-0 z-50 bg-black/32 backdrop-blur-sm duration-200 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0';

const dialogViewportClassName =
  'fixed inset-0 z-50 flex flex-col items-center overflow-y-auto p-4 sm:p-6';

const dialogPopupVariants = cva(
  'bg-popover text-popover-foreground relative my-auto flex w-full min-w-0 flex-col gap-4 rounded-2xl border p-6 shadow-lg/5 duration-200 outline-none not-dark:bg-clip-padding before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]',
  {
    defaultVariants: {
      size: 'md',
    },
    variants: {
      size: {
        lg: 'max-w-2xl',
        md: 'max-w-lg',
        sm: 'max-w-sm',
      },
    },
  },
);

const dialogHeaderClassName = 'flex flex-col gap-1.5 text-center sm:text-start';

const dialogFooterClassName =
  'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end';

const dialogTitleClassName = cn(
  textVariants({ variant: 'h4' }),
  'font-heading leading-snug font-semibold',
);

const dialogDescriptionClassName = textVariants({
  tone: 'muted',
  variant: 'body',
});

type DialogSize = NonNullable<VariantProps<typeof dialogPopupVariants>['size']>;

export {
  dialogBackdropClassName,
  dialogDescriptionClassName,
  dialogFooterClassName,
  dialogHeaderClassName,
  dialogPopupVariants,
  dialogTitleClassName,
  dialogViewportClassName,
};
export type { DialogSize };

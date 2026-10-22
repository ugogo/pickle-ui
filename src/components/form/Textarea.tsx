import * as React from 'react';

import { cn, type SlotClassNames } from '@/lib/utils';

type TextareaProps = React.ComponentProps<'textarea'> & {
  /** Class overrides for the inner `textarea`; `className` styles the control wrapper. */
  classNames?: SlotClassNames<'textarea'>;
  size?: 'lg' | 'md' | 'sm';
};

/**
 * Grows with its content (`field-sizing: content`) from three lines. Set
 * `rows` or a height class on `classNames.textarea` to change the minimum.
 * The control takes the width of its container, never the width of its text.
 */
function Textarea({
  className,
  classNames,
  size = 'md',
  ...props
}: TextareaProps) {
  return (
    <span
      className={cn(
        'border-input bg-background text-foreground ring-ring/24 has-focus-visible:has-aria-invalid:border-destructive/64 has-focus-visible:has-aria-invalid:ring-destructive/16 has-aria-invalid:border-destructive/36 has-focus-visible:border-ring dark:bg-input/32 dark:has-aria-invalid:ring-destructive/24 relative inline-flex w-full rounded-lg border text-base shadow-xs/5 transition-shadow [contain:inline-size] not-dark:bg-clip-padding before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] not-has-disabled:not-has-focus-visible:not-has-aria-invalid:before:shadow-[0_1px_--theme(--color-black/4%)] has-focus-visible:ring-[3px] has-disabled:opacity-64 has-[:disabled,:focus-visible,[aria-invalid]]:shadow-none sm:text-sm dark:not-has-disabled:not-has-focus-visible:not-has-aria-invalid:before:shadow-[0_-1px_--theme(--color-white/6%)]',
        className,
      )}
      data-size={size}
      data-slot="textarea-control"
    >
      <textarea
        className={cn(
          'placeholder:text-muted-foreground/72 field-sizing-content min-h-17.5 w-full resize-none rounded-[inherit] px-[calc(--spacing(3)-1px)] py-[calc(--spacing(1.5)-1px)] outline-none',
          size === 'sm' &&
            'min-h-16 px-[calc(--spacing(2.5)-1px)] py-[calc(--spacing(1)-1px)]',
          size === 'lg' && 'min-h-18 py-[calc(--spacing(2)-1px)]',
          classNames?.textarea,
        )}
        data-slot="textarea"
        {...props}
      />
    </span>
  );
}

export { Textarea };
export type { TextareaProps };

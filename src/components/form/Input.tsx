'use client';

import { Input as InputPrimitive } from '@base-ui/react/input';
import * as React from 'react';

import { cn, type SlotClassNames } from '@/lib/utils';

const inputControlHeights = {
  lg: 'h-10',
  md: 'h-8',
  sm: 'h-7',
} as const;

type InputProps = Omit<
  InputPrimitive.Props & React.RefAttributes<HTMLInputElement>,
  'size'
> & {
  /** Class overrides for the inner `input`; `className` styles the control wrapper. */
  classNames?: SlotClassNames<'input'>;
  nativeInput?: boolean;
  size?: 'lg' | 'md' | 'sm' | number;
  unstyled?: boolean;
};

function Input({
  className,
  classNames,
  nativeInput = false,
  size = 'md',
  style,
  unstyled = false,
  ...props
}: InputProps) {
  const resolvedSize = typeof size === 'number' ? 'md' : size;
  const inputClassName = cn(
    unstyled
      ? cn(
          'h-8 w-full min-w-0 rounded-[inherit] px-[calc(--spacing(3)-1px)] leading-none outline-none [transition:background-color_5000000s_ease-in-out_0s] placeholder:text-muted-foreground/72',
          resolvedSize === 'sm' && 'h-7 px-[calc(--spacing(2.5)-1px)]',
          resolvedSize === 'lg' && 'h-10 px-[calc(--spacing(3.5)-1px)]',
        )
      : cn(
          'h-full min-h-0 w-full rounded-[inherit] px-[calc(--spacing(3)-1px)] leading-none outline-none [transition:background-color_5000000s_ease-in-out_0s] placeholder:text-muted-foreground/72',
          resolvedSize === 'sm' && 'px-[calc(--spacing(2.5)-1px)]',
          resolvedSize === 'lg' && 'px-[calc(--spacing(3.5)-1px)]',
        ),
    props.type === 'search' &&
      '[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none',
    props.type === 'file' &&
      'text-muted-foreground file:me-3 file:bg-transparent file:font-medium file:text-foreground file:text-sm',
    classNames?.input,
  );

  return (
    <span
      className={
        cn(
          !unstyled &&
            cn(
              inputControlHeights[resolvedSize],
              'border-input bg-background text-foreground ring-ring/24 has-focus-visible:has-aria-invalid:border-destructive/64 has-focus-visible:has-aria-invalid:ring-destructive/16 has-aria-invalid:border-destructive/36 has-focus-visible:border-ring has-autofill:bg-foreground/4 dark:bg-input/32 dark:has-autofill:bg-foreground/8 dark:has-aria-invalid:ring-destructive/24 relative inline-flex w-full rounded-lg border text-base shadow-xs/5 transition-shadow not-dark:bg-clip-padding before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] not-has-disabled:not-has-focus-visible:not-has-aria-invalid:before:shadow-[0_1px_--theme(--color-black/4%)] has-focus-visible:ring-[3px] has-disabled:opacity-64 has-[:disabled,:focus-visible,[aria-invalid]]:shadow-none sm:text-sm dark:not-has-disabled:not-has-focus-visible:not-has-aria-invalid:before:shadow-[0_-1px_--theme(--color-white/6%)]',
            ),
          className,
        ) || undefined
      }
      data-size={size}
      data-slot="input-control"
    >
      {nativeInput ? (
        <input
          className={inputClassName}
          data-slot="input"
          size={typeof size === 'number' ? size : undefined}
          style={typeof style === 'function' ? undefined : style}
          {...props}
        />
      ) : (
        <InputPrimitive
          className={inputClassName}
          data-slot="input"
          size={typeof size === 'number' ? size : undefined}
          style={style}
          {...props}
        />
      )}
    </span>
  );
}

export { Input, InputPrimitive };
export type { InputProps };

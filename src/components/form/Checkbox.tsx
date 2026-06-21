'use client';

import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';
import { IconCheck, IconMinus } from '@tabler/icons-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

type CheckboxLabelProps = Omit<React.ComponentProps<'label'>, 'htmlFor'> & {
  htmlFor: string;
};

type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root> & {
  label?: React.ReactNode;
  labelClassName?: string;
};

function CheckboxControl({
  className,
  nativeButton = true,
  // react-doctor-disable-next-line react-doctor/control-has-associated-label -- consumers provide aria-label/aria-labelledby, or CheckboxRoot wires this button to the sibling label by id
  render = <button type="button" />,
  ...props
}: Omit<CheckboxProps, 'label' | 'labelClassName'>) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        'peer group/checkbox aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 border-input bg-background data-checked:bg-primary data-checked:border-primary data-checked:text-primary-foreground data-indeterminate:bg-primary data-indeterminate:border-primary data-indeterminate:text-primary-foreground focus-ring relative inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-sm border transition-[background-color,border-color,box-shadow] duration-150 ease-out after:absolute after:top-1/2 after:left-1/2 after:size-10 after:-translate-x-1/2 after:-translate-y-1/2 aria-invalid:ring-[3px] data-disabled:cursor-not-allowed data-disabled:opacity-50',
        className,
      )}
      data-slot="checkbox"
      nativeButton={nativeButton}
      render={render}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className="flex items-center justify-center text-current"
        data-slot="checkbox-indicator"
      >
        <IconCheck className="size-3 data-indeterminate:hidden [[data-indeterminate]_&]:hidden" />
        <IconMinus className="hidden size-3 [[data-indeterminate]_&]:block" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

function CheckboxLabel({ className, htmlFor, ...props }: CheckboxLabelProps) {
  return (
    <label
      className={cn(
        'text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className,
      )}
      data-slot="checkbox-label"
      htmlFor={htmlFor}
      {...props}
    />
  );
}

function CheckboxRoot({ id, label, labelClassName, ...props }: CheckboxProps) {
  const generatedId = React.useId();

  if (!label) {
    return <CheckboxControl id={id} {...props} />;
  }

  const checkboxId = id ?? generatedId;

  return (
    <div className="flex items-center gap-2" data-slot="checkbox-field">
      <CheckboxControl id={checkboxId} {...props} />
      <CheckboxLabel className={labelClassName} htmlFor={checkboxId}>
        {label}
      </CheckboxLabel>
    </div>
  );
}

const Checkbox = Object.assign(CheckboxRoot, {
  Label: CheckboxLabel,
});

export { Checkbox };
export type { CheckboxLabelProps, CheckboxProps };

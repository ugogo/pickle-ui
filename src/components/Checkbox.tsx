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
  size?: 'md' | 'sm';
};

function CheckboxControl({
  className,
  nativeButton = true,
  // react-doctor-disable-next-line react-doctor/control-has-associated-label -- consumers provide aria-label/aria-labelledby, or CheckboxRoot wires this button to the sibling label by id
  render = <button type="button" />,
  size = 'md',
  ...props
}: Omit<CheckboxProps, 'label' | 'labelClassName'>) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        'group/checkbox border-input bg-background aria-invalid:border-destructive/36 focus-visible:ring-ring focus-visible:ring-offset-background dark:not-data-checked:bg-input/32 dark:aria-invalid:ring-destructive/24 ring-ring focus-visible:aria-invalid:border-destructive/64 focus-visible:aria-invalid:ring-destructive/48 relative inline-flex shrink-0 cursor-pointer items-center justify-center rounded-[.25rem] border shadow-xs/5 transition-shadow outline-none not-dark:bg-clip-padding before:pointer-events-none before:absolute before:inset-0 before:rounded-[3px] not-data-disabled:not-data-checked:not-aria-invalid:before:shadow-[0_1px_--theme(--color-black/4%)] focus-visible:ring-2 focus-visible:ring-offset-1 data-disabled:cursor-not-allowed data-disabled:opacity-64 data-[size=md]:size-4.5 data-[size=sm]:size-3.5 sm:size-4 dark:not-data-disabled:not-data-checked:not-aria-invalid:before:shadow-[0_-1px_--theme(--color-white/6%)] [[data-disabled],[data-checked],[aria-invalid]]:shadow-none',
        className,
      )}
      data-size={size}
      data-slot="checkbox"
      nativeButton={nativeButton}
      render={render}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className="text-primary-foreground data-indeterminate:text-foreground data-checked:bg-primary absolute -inset-px flex items-center justify-center rounded-[.25rem] data-unchecked:hidden"
        data-slot="checkbox-indicator"
      >
        <IconCheck className="group-data-[size=md]/checkbox:size-3 group-data-[size=sm]/checkbox:size-2.5 data-indeterminate:hidden [[data-indeterminate]_&]:hidden" />
        <IconMinus className="hidden group-data-[size=md]/checkbox:size-3 group-data-[size=sm]/checkbox:size-2.5 [[data-indeterminate]_&]:block" />
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

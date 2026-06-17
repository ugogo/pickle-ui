'use client';

import { Radio as RadioPrimitive } from '@base-ui/react/radio';
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group';
import * as React from 'react';

import { cn } from '@/lib/utils';

type RadioGroupItemProps = React.ComponentProps<typeof RadioPrimitive.Root> & {
  label?: React.ReactNode;
  labelClassName?: string;
  size?: 'default' | 'sm';
};

type RadioGroupProps = React.ComponentProps<typeof RadioGroupPrimitive>;

function RadioGroupItem({
  id,
  label,
  labelClassName,
  ...props
}: RadioGroupItemProps) {
  const generatedId = React.useId();

  if (!label) {
    return <RadioGroupItemControl id={id} {...props} />;
  }

  const itemId = id ?? generatedId;

  return (
    <div className="flex items-center gap-2" data-slot="radio-field">
      <RadioGroupItemControl id={itemId} {...props} />
      <RadioGroupItemLabel className={labelClassName} htmlFor={itemId}>
        {label}
      </RadioGroupItemLabel>
    </div>
  );
}

function RadioGroupItemControl({
  className,
  size = 'default',
  ...props
}: Omit<RadioGroupItemProps, 'label' | 'labelClassName'>) {
  return (
    <RadioPrimitive.Root
      className={cn(
        'peer group/radio aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 border-input bg-background data-checked:border-primary focus-ring inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border aria-invalid:ring-[3px] data-disabled:cursor-not-allowed data-disabled:opacity-50 data-[size=default]:size-4 data-[size=sm]:size-3.5',
        className,
      )}
      data-size={size}
      data-slot="radio"
      {...props}
    >
      <RadioPrimitive.Indicator
        className="bg-primary rounded-full group-data-[size=default]/radio:size-2 group-data-[size=sm]/radio:size-1.5"
        data-slot="radio-indicator"
      />
    </RadioPrimitive.Root>
  );
}

function RadioGroupItemLabel({
  className,
  htmlFor,
  ...props
}: Omit<React.ComponentProps<'label'>, 'htmlFor'> & { htmlFor: string }) {
  return (
    <label
      className={cn(
        'text-sm leading-none font-medium select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className,
      )}
      data-slot="radio-label"
      htmlFor={htmlFor}
      {...props}
    />
  );
}

function RadioGroupRoot({ className, ...props }: RadioGroupProps) {
  return (
    <RadioGroupPrimitive
      className={cn('grid gap-2', className)}
      data-slot="radio-group"
      {...props}
    />
  );
}

const RadioGroupItemWithLabel = Object.assign(RadioGroupItem, {
  Label: RadioGroupItemLabel,
});

const RadioGroup = Object.assign(RadioGroupRoot, {
  Item: RadioGroupItemWithLabel,
});

export { RadioGroup };
export type { RadioGroupItemProps, RadioGroupProps };

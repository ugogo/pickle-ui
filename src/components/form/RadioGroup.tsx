'use client';

import { Radio as RadioPrimitive } from '@base-ui/react/radio';
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group';
import * as React from 'react';

import { cn } from '@/lib/utils';

type RadioGroupItemProps = React.ComponentProps<typeof RadioPrimitive.Root> & {
  label?: React.ReactNode;
  labelClassName?: string;
};

type RadioGroupProps = React.ComponentProps<typeof RadioGroupPrimitive>;

function RadioGroupItem({
  className,
  disabled,
  id,
  label,
  labelClassName,
  ...props
}: RadioGroupItemProps) {
  if (!label) {
    return <RadioGroupItemControl className={className} id={id} {...props} />;
  }

  return (
    <RadioGroupItemLabel className={labelClassName} disabled={disabled}>
      <RadioGroupItemControl
        className={className}
        disabled={disabled}
        id={id}
        {...props}
      />
      {label}
    </RadioGroupItemLabel>
  );
}

function RadioGroupItemControl({ className, ...props }: RadioGroupItemProps) {
  return (
    <RadioPrimitive.Root
      className={cn(
        'peer group/radio aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 border-input bg-background data-checked:border-primary focus-ring inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-full border aria-invalid:ring-[3px] data-disabled:cursor-not-allowed data-disabled:opacity-50',
        className,
      )}
      data-slot="radio"
      {...props}
    >
      <RadioPrimitive.Indicator
        className="bg-primary size-2 rounded-full"
        data-slot="radio-indicator"
      />
    </RadioPrimitive.Root>
  );
}

function RadioGroupItemLabel({
  className,
  disabled,
  ...props
}: React.ComponentProps<'label'> & { disabled?: boolean }) {
  return (
    // react-doctor-disable-next-line react-doctor/label-has-associated-control -- Base UI radios are not native inputs, so the label must wrap the control for click and screen-reader association
    <label
      className={cn(
        'flex cursor-pointer items-center gap-2 text-sm leading-none font-medium',
        disabled && 'text-muted-foreground cursor-not-allowed',
        'has-[>[data-slot=radio][data-disabled]]:text-muted-foreground has-[>[data-slot=radio][data-disabled]]:cursor-not-allowed',
        className,
      )}
      data-slot="radio-label"
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

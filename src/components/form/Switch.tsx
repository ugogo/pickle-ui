'use client';

import { Switch as SwitchPrimitive } from '@base-ui/react/switch';
import * as React from 'react';

import { cn } from '@/lib/utils';

type SwitchLabelProps = Omit<React.ComponentProps<'label'>, 'htmlFor'> & {
  htmlFor: string;
};
type SwitchProps = React.ComponentProps<typeof SwitchPrimitive.Root> & {
  label?: React.ReactNode;
  labelClassName?: string;
};

function SwitchControl({
  className,
  ...props
}: Omit<SwitchProps, 'label' | 'labelClassName'>) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        'peer group/switch aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80 focus-ring relative inline-flex h-[18px] w-8 shrink-0 items-center rounded-full border border-transparent p-px transition-[background-color,box-shadow] duration-150 ease-out after:absolute after:-inset-x-3 after:-inset-y-3 aria-invalid:ring-[3px] data-disabled:cursor-not-allowed data-disabled:opacity-50',
        className,
      )}
      data-slot="switch"
      {...props}
    >
      <SwitchPrimitive.Thumb
        className="bg-background dark:data-checked:bg-primary-foreground dark:data-unchecked:bg-foreground pointer-events-none block size-3 translate-x-0 rounded-full ring-0 transition-transform data-checked:translate-x-[calc(100%+4px)]"
        data-slot="switch-thumb"
      />
    </SwitchPrimitive.Root>
  );
}

function SwitchLabel({ className, htmlFor, ...props }: SwitchLabelProps) {
  return (
    <label
      className={cn(
        'flex items-center gap-2 text-sm leading-none font-medium group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className,
      )}
      data-slot="switch-label"
      htmlFor={htmlFor}
      {...props}
    />
  );
}

function SwitchRoot({ id, label, labelClassName, ...props }: SwitchProps) {
  const generatedId = React.useId();

  if (!label) {
    return <SwitchControl id={id} {...props} />;
  }

  const switchId = id ?? generatedId;

  return (
    <div className="flex items-center gap-2" data-slot="switch-field">
      <SwitchControl id={switchId} {...props} />
      <SwitchLabel className={labelClassName} htmlFor={switchId}>
        {label}
      </SwitchLabel>
    </div>
  );
}

const Switch = Object.assign(SwitchRoot, {
  Label: SwitchLabel,
});

export { Switch };
export type { SwitchLabelProps, SwitchProps };

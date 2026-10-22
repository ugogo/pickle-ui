'use client';

import { Switch as SwitchPrimitive } from '@base-ui/react/switch';
import * as React from 'react';

import { cn } from '@/lib/utils';

type SwitchControlProps = React.ComponentProps<typeof SwitchPrimitive.Root>;
type SwitchLabelContent = Exclude<React.ReactNode, boolean | null | undefined>;
type SwitchLabelProps = Omit<React.ComponentProps<'label'>, 'htmlFor'> & {
  htmlFor: string;
};
type SwitchProps = SwitchControlProps & {
  label: SwitchLabelContent;
  labelClassName?: string;
};

function SwitchControl({ className, ...props }: SwitchControlProps) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        'focus-visible:ring-ring focus-visible:ring-offset-background data-checked:bg-primary data-unchecked:bg-input inline-flex h-[calc(var(--thumb-size)+2px)] w-[calc(var(--thumb-size)*2-2px)] shrink-0 items-center rounded-full p-px transition-[background-color,box-shadow] duration-200 outline-none [--thumb-size:--spacing(4)] focus-visible:ring-2 focus-visible:ring-offset-1 data-disabled:cursor-not-allowed data-disabled:opacity-64',
        className,
      )}
      data-slot="switch"
      {...props}
    >
      <SwitchPrimitive.Thumb
        className="bg-background pointer-events-none block aspect-square h-full origin-left rounded-(--thumb-size) shadow-sm/5 ring-0 will-change-transform [transition:translate_.15s,border-radius_.15s,scale_.1s_.1s,transform-origin_.15s] in-[[role=switch]:active,[data-slot=label]:active,[data-slot=field-label]:active]:rounded-[var(--thumb-size)/calc(var(--thumb-size)*1.1)] in-[[role=switch]:active,[data-slot=label]:active,[data-slot=field-label]:active]:not-data-disabled:scale-x-110 data-checked:origin-[var(--thumb-size)_50%] data-checked:translate-x-[calc(var(--thumb-size)-4px)]"
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

export { Switch, SwitchControl, SwitchLabel };
export type { SwitchControlProps, SwitchLabelProps, SwitchProps };

'use client';

import { Field } from '@base-ui/react/field';
import * as React from 'react';

import { cn } from '@/lib/utils';

type FormLabelProps = React.ComponentProps<typeof Field.Label>;

function FormLabel({ className, ...props }: FormLabelProps) {
  return (
    <Field.Label
      className={cn(
        'text-sm leading-none font-medium data-disabled:cursor-not-allowed data-disabled:opacity-50',
        className,
      )}
      data-slot="field-label"
      {...props}
    />
  );
}

export { FormLabel };
export type { FormLabelProps };

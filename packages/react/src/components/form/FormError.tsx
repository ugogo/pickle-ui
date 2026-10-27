'use client';

import { Field } from '@base-ui/react/field';
import * as React from 'react';

import { cn } from '@/lib/utils';

type FormErrorProps = React.ComponentProps<typeof Field.Error>;

function FormError({ className, ...props }: FormErrorProps) {
  return (
    <Field.Error
      className={cn('text-destructive text-sm font-medium', className)}
      data-slot="field-error"
      {...props}
    />
  );
}

export { FormError };
export type { FormErrorProps };

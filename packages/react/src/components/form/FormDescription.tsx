'use client';

import { Field } from '@base-ui/react/field';
import * as React from 'react';

import { cn } from '@/lib/utils';

type FormDescriptionProps = React.ComponentProps<typeof Field.Description>;

function FormDescription({ className, ...props }: FormDescriptionProps) {
  return (
    <Field.Description
      className={cn('text-muted-foreground text-sm', className)}
      data-slot="field-description"
      {...props}
    />
  );
}

export { FormDescription };
export type { FormDescriptionProps };

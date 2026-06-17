'use client';

import { Field as FieldPrimitive } from '@base-ui/react/field';
import * as React from 'react';

import { cn } from '@/lib/utils';

type FieldControlProps = React.ComponentProps<typeof FieldPrimitive.Control>;
type FieldDescriptionProps = React.ComponentProps<
  typeof FieldPrimitive.Description
>;
type FieldErrorProps = React.ComponentProps<typeof FieldPrimitive.Error>;
type FieldLabelProps = React.ComponentProps<typeof FieldPrimitive.Label>;
type FieldProps = React.ComponentProps<typeof FieldPrimitive.Root>;

function FieldControl({ ...props }: FieldControlProps) {
  return <FieldPrimitive.Control data-slot="field-control" {...props} />;
}

function FieldDescription({ className, ...props }: FieldDescriptionProps) {
  return (
    <FieldPrimitive.Description
      className={cn('text-muted-foreground text-sm', className)}
      data-slot="field-description"
      {...props}
    />
  );
}

function FieldError({ className, ...props }: FieldErrorProps) {
  return (
    <FieldPrimitive.Error
      className={cn('text-destructive text-sm font-medium', className)}
      data-slot="field-error"
      {...props}
    />
  );
}

function FieldLabel({ className, ...props }: FieldLabelProps) {
  return (
    <FieldPrimitive.Label
      className={cn(
        'text-sm leading-none font-medium select-none data-disabled:cursor-not-allowed data-disabled:opacity-50',
        className,
      )}
      data-slot="field-label"
      {...props}
    />
  );
}

function FieldRoot({ className, ...props }: FieldProps) {
  return (
    <FieldPrimitive.Root
      className={cn('grid gap-1.5', className)}
      data-slot="field"
      {...props}
    />
  );
}

const Field = Object.assign(FieldRoot, {
  Control: FieldControl,
  Description: FieldDescription,
  Error: FieldError,
  Label: FieldLabel,
});

export { Field };
export type {
  FieldControlProps,
  FieldDescriptionProps,
  FieldErrorProps,
  FieldLabelProps,
  FieldProps,
};

'use client';

import { Field as FieldPrimitive } from '@base-ui/react/field';
import * as React from 'react';

import { cn } from '@/lib/utils';

type FieldControlProps = React.ComponentProps<typeof FieldPrimitive.Control>;
type FieldDescriptionProps = React.ComponentProps<
  typeof FieldPrimitive.Description
>;
type FieldErrorProps = React.ComponentProps<typeof FieldPrimitive.Error>;
type FieldItemProps = React.ComponentProps<typeof FieldPrimitive.Item>;
type FieldLabelProps = React.ComponentProps<typeof FieldPrimitive.Label>;
type FieldProps = React.ComponentProps<typeof FieldPrimitive.Root>;
type FieldValidityProps = React.ComponentProps<typeof FieldPrimitive.Validity>;

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

function FieldItem({ className, ...props }: FieldItemProps) {
  return (
    <FieldPrimitive.Item
      className={cn('grid gap-1.5', className)}
      data-slot="field-item"
      {...props}
    />
  );
}

function FieldLabel({ className, ...props }: FieldLabelProps) {
  return (
    <FieldPrimitive.Label
      className={cn(
        'text-sm leading-none font-medium data-disabled:cursor-not-allowed data-disabled:opacity-50',
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
      className={cn('grid gap-2.5', className)}
      data-slot="field"
      {...props}
    />
  );
}

function FieldValidity({ ...props }: FieldValidityProps) {
  return <FieldPrimitive.Validity data-slot="field-validity" {...props} />;
}

const Field = Object.assign(FieldRoot, {
  Control: FieldControl,
  Description: FieldDescription,
  Error: FieldError,
  Item: FieldItem,
  Label: FieldLabel,
  Validity: FieldValidity,
});

export { Field };
export type {
  FieldControlProps,
  FieldDescriptionProps,
  FieldErrorProps,
  FieldItemProps,
  FieldLabelProps,
  FieldProps,
  FieldValidityProps,
};

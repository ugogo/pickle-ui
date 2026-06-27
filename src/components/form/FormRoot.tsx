'use client';

import * as React from 'react';
import {
  type FieldValues,
  FormProvider,
  type SubmitHandler,
  type UseFormReturn,
} from 'react-hook-form';

import { cn } from '@/lib/utils';

type FormProps<FormValues extends FieldValues = FieldValues> = Omit<
  React.ComponentProps<'form'>,
  'onSubmit'
> & {
  form: UseFormReturn<FormValues>;
  onSubmit?: SubmitHandler<FormValues>;
};

function FormRoot<FormValues extends FieldValues = FieldValues>({
  className,
  form,
  onSubmit,
  ...props
}: FormProps<FormValues>) {
  const content = (
    <form
      className={cn('space-y-6', className)}
      data-slot="form"
      noValidate
      onSubmit={onSubmit ? form.handleSubmit(onSubmit) : undefined}
      {...props}
    />
  );

  return <FormProvider {...form}>{content}</FormProvider>;
}

export { FormRoot };
export type { FormProps };

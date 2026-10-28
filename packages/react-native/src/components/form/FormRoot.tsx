import { useCallback } from 'react';
import {
  type FieldValues,
  FormProvider,
  type SubmitHandler,
  type UseFormReturn,
} from 'react-hook-form';
import { View } from 'react-native';

import { cn } from '../../lib/cn';
import { FormSubmitContext } from './Form.context';

export type FormProps<FormValues extends FieldValues = FieldValues> =
  React.ComponentProps<typeof View> & {
    form: UseFormReturn<FormValues>;
    onSubmit?: SubmitHandler<FormValues>;
  };

/**
 * React Native has no `<form>`, so the root shares a submit action:
 * `Form.Button` and the return key in `Form.Input` call it, like a submit
 * button and Enter on the web.
 */
export function FormRoot<FormValues extends FieldValues = FieldValues>({
  className,
  form,
  onSubmit,
  ...props
}: FormProps<FormValues>) {
  const submit = useCallback(() => {
    if (onSubmit) void form.handleSubmit(onSubmit)();
  }, [form, onSubmit]);

  return (
    <FormProvider {...form}>
      <FormSubmitContext value={submit}>
        <View className={cn('gap-6', className)} {...props} />
      </FormSubmitContext>
    </FormProvider>
  );
}

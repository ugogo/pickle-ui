import { useCallback, useRef } from 'react';
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
 * button and Enter on the web. One runs at a time: the return key is never
 * disabled, as a loading button is.
 */
export function FormRoot<FormValues extends FieldValues = FieldValues>({
  className,
  form,
  onSubmit,
  ...props
}: FormProps<FormValues>) {
  const submitting = useRef(false);
  const submit = useCallback(() => {
    if (!onSubmit || submitting.current) return;

    submitting.current = true;
    void form
      .handleSubmit(onSubmit)()
      .finally(() => {
        submitting.current = false;
      });
  }, [form, onSubmit]);

  return (
    <FormProvider {...form}>
      <FormSubmitContext value={submit}>
        <View className={cn('gap-6', className)} {...props} />
      </FormSubmitContext>
    </FormProvider>
  );
}

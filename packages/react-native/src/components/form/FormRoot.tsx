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
  // React Hook Form sets `isSubmitting` before its first await: a second
  // call sees it.
  const submit = () => {
    if (!onSubmit || form.formState.isSubmitting) return;
    void form.handleSubmit(onSubmit)();
  };

  return (
    <FormProvider {...form}>
      <FormSubmitContext value={submit}>
        <View className={cn('gap-6', className)} {...props} />
      </FormSubmitContext>
    </FormProvider>
  );
}

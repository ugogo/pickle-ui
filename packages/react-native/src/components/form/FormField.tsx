import { type ReactNode, useId, useMemo, useRef } from 'react';
import { useFormState } from 'react-hook-form';
import { View } from 'react-native';

import { cn } from '../../lib/cn';
import {
  FormFieldContext,
  getErrorMessage,
  useFormMethods,
} from './Form.context';
import { FormDescription } from './FormDescription';
import { FormError } from './FormError';
import { FormLabel } from './FormLabel';

export type FormFieldProps = Omit<
  React.ComponentProps<typeof View>,
  'children'
> & {
  children: ReactNode;
  description?: ReactNode;
  /** Replaces the error message React Hook Form holds for the field. */
  error?: ReactNode;
  /** Names the control and focuses it when pressed, like the web's `<label>`. */
  label?: ReactNode;
  name?: string;
};

/**
 * A labelled field bound to `name`, like `Form.Field` in @pickle-ui/react:
 * the label, the control, then the field's error or its description.
 */
export function FormField({
  children,
  className,
  description,
  error,
  label,
  name,
  ...props
}: FormFieldProps) {
  const { control, getFieldState } = useFormMethods();
  const formState = useFormState({
    control,
    disabled: !name,
    exact: true,
    name,
  });
  const fieldError = name ? getFieldState(name, formState).error : undefined;
  const errorMessage = error ?? getErrorMessage(fieldError);
  const labelId = useId();
  const controlRef = useRef<null | { focus: () => void }>(null);
  const context = useMemo(
    () => ({
      label,
      labelId: label ? labelId : undefined,
      name,
      setControl: (target: null | { focus: () => void }) => {
        controlRef.current = target;
      },
    }),
    [label, labelId, name],
  );

  return (
    <View className={cn('gap-2.5', className)} {...props}>
      {label ? (
        <FormLabel
          nativeID={labelId}
          onPress={() => controlRef.current?.focus()}
        >
          {label}
        </FormLabel>
      ) : null}
      <FormFieldContext value={context}>{children}</FormFieldContext>
      {errorMessage ? (
        <FormError>{errorMessage}</FormError>
      ) : description ? (
        <FormDescription>{description}</FormDescription>
      ) : null}
    </View>
  );
}

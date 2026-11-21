'use client';

import { Field } from '@base-ui/react/field';
import * as React from 'react';
import { useFormState } from 'react-hook-form';

import { cn } from '../../lib/utils';
import {
  FormFieldContext,
  getErrorMessage,
  useFormMethods,
} from './Form.context';
import { FormDescription } from './FormDescription';
import { FormError } from './FormError';
import { FormLabel } from './FormLabel';
import { type FormRadioGroupProps, FormRadioGroupRoot } from './FormRadioGroup';
import { type FormSelectProps, FormSelectRoot } from './FormSelect';

type FormFieldProps = Omit<
  React.ComponentProps<typeof Field.Root>,
  'children'
> & {
  children: React.ReactNode;
  controlId?: string;
  description?: React.ReactNode;
  error?: React.ReactNode;
  /**
   * Names the field's content as a group, for a list of rows, a stepper or
   * buttons. Wrap each row's control in `Form.Item`.
   */
  group?: boolean;
  label?: React.ReactNode;
};

function FormField({
  children,
  className,
  controlId: controlIdProp,
  description,
  error,
  group = false,
  label,
  ...props
}: FormFieldProps) {
  const { control, getFieldState } = useFormMethods();
  const name = props.name;
  const formState = useFormState({
    control,
    disabled: !name,
    exact: true,
    name,
  });
  const fieldError = name ? getFieldState(name, formState).error : undefined;
  const errorMessage = error ?? getErrorMessage(fieldError);
  // The label focuses the control by this id; `useId` keeps it unique across
  // forms and rows.
  const generatedControlId = React.useId();
  const controlId = controlIdProp ?? generatedControlId;
  const labelId = React.useId();
  const contextValue = React.useMemo(
    // A group's rows each keep their own id.
    () => ({ controlId: group ? undefined : controlId, name }),
    [controlId, group, name],
  );

  return (
    <Field.Root
      className={cn('grid gap-2.5', className)}
      data-slot="field"
      {...(group && {
        'aria-labelledby': label ? labelId : undefined,
        role: 'group',
      })}
      {...props}
    >
      {label ? (
        <FormFieldLabel
          controlId={controlId}
          id={labelId}
          native={!group && shouldUseNativeFieldLabel(children)}
        >
          {label}
        </FormFieldLabel>
      ) : null}
      <FormFieldContext.Provider value={contextValue}>
        {children}
      </FormFieldContext.Provider>
      {errorMessage ? (
        <FormError match>{errorMessage}</FormError>
      ) : description ? (
        <FormDescription>{description}</FormDescription>
      ) : null}
    </Field.Root>
  );
}

// Native inputs use htmlFor/id for label focus; Base UI composites and groups
// use non-native labels so their primitives can wire aria-labelledby.
function FormFieldLabel({
  children,
  controlId,
  id,
  native,
}: {
  children: React.ReactNode;
  controlId: string;
  id: string;
  native: boolean;
}) {
  return native ? (
    <FormLabel htmlFor={controlId}>{children}</FormLabel>
  ) : (
    <FormLabel id={id} nativeLabel={false} render={<span />}>
      {children}
    </FormLabel>
  );
}

function isFormRadioGroupElement(
  child: React.ReactNode,
): child is React.ReactElement<FormRadioGroupProps> {
  return React.isValidElement(child) && child.type === FormRadioGroupRoot;
}

function isFormSelectElement(
  child: React.ReactNode,
): child is React.ReactElement<FormSelectProps> {
  return React.isValidElement(child) && child.type === FormSelectRoot;
}

function shouldUseNativeFieldLabel(children: React.ReactNode) {
  return !React.Children.toArray(children).some(
    (child) => isFormRadioGroupElement(child) || isFormSelectElement(child),
  );
}

export { FormField };
export type { FormFieldProps };

import * as React from 'react';
import {
  useFormContext,
  type UseFormReturn,
  useFormState,
} from 'react-hook-form';

type FormControlProps = {
  id?: string;
};
type FormFieldContextValue = {
  controlId?: string;
  name?: string;
};
type UseFormControlPropsOptions = {
  enabled?: boolean;
};
type WithoutAriaInvalid<Props> = Omit<Props, 'aria-invalid'> & {
  'aria-invalid'?: never;
};

const FormFieldContext = React.createContext<FormFieldContextValue | null>(
  null,
);
const FormInputGroupContext = React.createContext(false);

function getErrorMessage(error: unknown): React.ReactNode {
  if (!error || typeof error !== 'object') {
    return undefined;
  }

  const message = (error as { message?: unknown }).message;

  if (
    React.isValidElement(message) ||
    typeof message === 'string' ||
    typeof message === 'number'
  ) {
    return message;
  }

  return undefined;
}

function useFieldName(name: string | undefined) {
  const field = React.useContext(FormFieldContext);

  return name ?? field?.name;
}

// React Hook Form exposes field state, but it does not attach DOM aria/id
// props to custom controls. This maps the current Form.Field onto the actual
// visible control.
function useFormControlProps(
  props: FormControlProps = {},
  { enabled = true }: UseFormControlPropsOptions = {},
) {
  const field = React.useContext(FormFieldContext);
  const { control, getFieldState } = useFormMethods();
  const name = enabled ? field?.name : undefined;
  const formState = useFormState({
    control,
    disabled: !name,
    exact: true,
    name,
  });
  const controlId = enabled ? field?.controlId : undefined;
  const invalid = name ? getFieldState(name, formState).invalid : false;

  return {
    'aria-invalid': controlId && invalid ? true : undefined,
    id: controlId ?? props.id,
  };
}

function useFormMethods() {
  const methods = useFormContext() as null | UseFormReturn;

  if (!methods) {
    throw new Error(
      'Form components must be rendered inside <Form form={form}>.',
    );
  }

  return methods;
}

function useRequiredFieldName(name: string | undefined, componentName: string) {
  const fieldName = useFieldName(name);

  if (!fieldName) {
    throw new Error(
      `${componentName} requires a name prop or a parent <Form.Field name="...">.`,
    );
  }

  return fieldName;
}

export {
  FormFieldContext,
  FormInputGroupContext,
  getErrorMessage,
  useFieldName,
  useFormControlProps,
  useFormMethods,
  useRequiredFieldName,
};
export type {
  FormControlProps,
  FormFieldContextValue,
  UseFormControlPropsOptions,
  WithoutAriaInvalid,
};

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
type WithoutAriaInvalid<Props> = Omit<Props, 'aria-invalid'> & {
  'aria-invalid'?: never;
};

const FormFieldContext = React.createContext<FormFieldContextValue | null>(
  null,
);
const FormInputGroupContext = React.createContext(false);
// The field's `onBlur`, for a binding whose root renders no focusable element:
// the part that takes focus reports the blur.
const FormFieldBlurContext = React.createContext<(() => void) | undefined>(
  undefined,
);

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

// React Hook Form tracks field state but attaches no aria or id props to
// custom controls: this maps the current Form.Field onto its visible control.
function useFormControlProps(props: FormControlProps = {}) {
  const field = React.useContext(FormFieldContext);
  const { control, getFieldState } = useFormMethods();
  const name = field?.name;
  const formState = useFormState({
    control,
    disabled: !name,
    exact: true,
    name,
  });
  const controlId = field?.controlId;
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
  FormFieldBlurContext,
  FormFieldContext,
  FormInputGroupContext,
  getErrorMessage,
  useFieldName,
  useFormControlProps,
  useFormMethods,
  useRequiredFieldName,
};
export type { FormControlProps, FormFieldContextValue, WithoutAriaInvalid };

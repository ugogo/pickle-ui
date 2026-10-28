import { createContext, isValidElement, type ReactNode, use } from 'react';
import {
  useFormContext,
  type UseFormReturn,
  useFormState,
} from 'react-hook-form';

export type FormFieldContextValue = {
  /** The field's label, used as its control's accessibility label when it is text. */
  label?: ReactNode;
  /** The `nativeID` of the field's label, for `aria-labelledby`. */
  labelId?: string;
  name?: string;
  /** Registers the control the label focuses when pressed. */
  setControl: (control: FocusTarget | null) => void;
};

type FocusTarget = { focus: () => void };

export const FormFieldContext = createContext<FormFieldContextValue | null>(
  null,
);

/** True inside `Form.InputGroup`, where `Form.Input` renders `InputGroup.Input`. */
export const FormInputGroupContext = createContext(false);

/** Submits the form, like pressing a submit button or Enter on the web. */
export const FormSubmitContext = createContext<() => void>(() => {});

export function getErrorMessage(error: unknown): ReactNode {
  if (!error || typeof error !== 'object') return undefined;

  const message = (error as { message?: unknown }).message;

  return isValidElement(message) ||
    typeof message === 'string' ||
    typeof message === 'number'
    ? message
    : undefined;
}

/**
 * React Hook Form tracks field state but has no DOM to label: this maps the
 * current `Form.Field` onto its control, naming it by the field's label and
 * marking it `invalid` while the field has an error.
 */
export function useFormControlProps() {
  const field = use(FormFieldContext);
  const { control, getFieldState } = useFormMethods();
  const name = field?.name;
  const formState = useFormState({
    control,
    disabled: !name,
    exact: true,
    name,
  });

  return {
    accessibilityLabel:
      typeof field?.label === 'string' ? field.label : undefined,
    'aria-labelledby': field?.labelId,
    invalid: name ? getFieldState(name, formState).invalid : false,
  };
}

export function useFormMethods() {
  const methods = useFormContext() as null | UseFormReturn;

  if (!methods) {
    throw new Error(
      'Form components must be rendered inside <Form form={form}>.',
    );
  }

  return methods;
}

export function useRequiredFieldName(
  name: string | undefined,
  componentName: string,
) {
  const fieldName = name ?? use(FormFieldContext)?.name;

  if (!fieldName) {
    throw new Error(
      `${componentName} requires a name prop or a parent <Form.Field name="...">.`,
    );
  }

  return fieldName;
}

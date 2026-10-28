import { use } from 'react';

import { Button, type ButtonProps } from '../Button';
import { FormSubmitContext } from './Form.context';
import { FormCheckbox, type FormCheckboxProps } from './FormCheckbox';
import { FormDescription, type FormDescriptionProps } from './FormDescription';
import { FormError, type FormErrorProps } from './FormError';
import { FormField, type FormFieldProps } from './FormField';
import { FormInput, type FormInputProps } from './FormInput';
import { FormInputGroup, type FormInputGroupProps } from './FormInputGroup';
import { FormLabel, type FormLabelProps } from './FormLabel';
import { FormRadioGroup, type FormRadioGroupProps } from './FormRadioGroup';
import { type FormProps, FormRoot } from './FormRoot';
import { FormTextarea, type FormTextareaProps } from './FormTextarea';

/**
 * A `Button` that submits the form when pressed, like the web's submit
 * button. Pass `onPress` to give it another action.
 */
function FormButton({ onPress, ...props }: ButtonProps) {
  const submit = use(FormSubmitContext);

  return <Button onPress={onPress ?? submit} {...props} />;
}

const Form = Object.assign(FormRoot, {
  Button: FormButton,
  Checkbox: FormCheckbox,
  Description: FormDescription,
  Error: FormError,
  Field: FormField,
  Input: FormInput,
  InputGroup: FormInputGroup,
  Label: FormLabel,
  RadioGroup: FormRadioGroup,
  Textarea: FormTextarea,
});

export { Form };
export type {
  FormCheckboxProps,
  FormDescriptionProps,
  FormErrorProps,
  FormFieldProps,
  FormInputGroupProps,
  FormInputProps,
  FormLabelProps,
  FormProps,
  FormRadioGroupProps,
  FormTextareaProps,
};

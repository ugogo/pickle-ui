import { use, useImperativeHandle, useRef } from 'react';
import { useController } from 'react-hook-form';
import { type TextInput } from 'react-native';

import {
  FormFieldContext,
  FormInputGroupContext,
  FormSubmitContext,
  useFormControlProps,
  useFormMethods,
  useRequiredFieldName,
} from './Form.context';
import { Input, type InputProps } from './Input';
import { InputGroup } from './InputGroup';

export type FormInputProps = Omit<
  InputProps,
  'defaultValue' | 'invalid' | 'value'
> & { name?: string };

type TextInputInstance = React.ComponentRef<typeof TextInput>;

/**
 * An `Input` bound to the field's value. The return key submits the form,
 * like Enter on the web, unless `onSubmitEditing` is set.
 */
export function FormInput({
  name: nameProp,
  onBlur,
  onChangeText,
  onSubmitEditing,
  ref,
  ...props
}: FormInputProps) {
  const name = useRequiredFieldName(nameProp, 'Form.Input');
  const { control } = useFormMethods();
  const { field } = useController({ control, name });
  const controlProps = useFormControlProps();
  const fieldContext = use(FormFieldContext);
  const isInsideInputGroup = use(FormInputGroupContext);
  const submit = use(FormSubmitContext);
  const inputRef = useRef<null | TextInputInstance>(null);
  useImperativeHandle(ref, () => inputRef.current as TextInputInstance);

  const InputComponent = isInsideInputGroup ? InputGroup.Input : Input;

  return (
    <InputComponent
      {...controlProps}
      {...props}
      onBlur={(event) => {
        field.onBlur();
        onBlur?.(event);
      }}
      onChangeText={(text) => {
        field.onChange(text);
        onChangeText?.(text);
      }}
      onSubmitEditing={onSubmitEditing ?? submit}
      ref={(node: null | TextInputInstance) => {
        inputRef.current = node;
        // React Hook Form focuses the first invalid field after a submit,
        // and the field's label focuses its input when pressed.
        field.ref(node);
        fieldContext?.setControl(node);
      }}
      value={field.value ?? ''}
    />
  );
}

import { use, useImperativeHandle, useRef } from 'react';
import { useController } from 'react-hook-form';
import { type TextInput } from 'react-native';

import {
  FormFieldContext,
  useFormControlProps,
  useFormMethods,
  useRequiredFieldName,
} from './Form.context';
import { Textarea, type TextareaProps } from './Textarea';

export type FormTextareaProps = Omit<
  TextareaProps,
  'defaultValue' | 'invalid' | 'value'
> & { name?: string };

type TextInputInstance = React.ComponentRef<typeof TextInput>;

/** A `Textarea` bound to the field's value. */
export function FormTextarea({
  name: nameProp,
  onBlur,
  onChangeText,
  ref,
  ...props
}: FormTextareaProps) {
  const name = useRequiredFieldName(nameProp, 'Form.Textarea');
  const { control } = useFormMethods();
  const { field } = useController({ control, name });
  const controlProps = useFormControlProps();
  const fieldContext = use(FormFieldContext);
  const inputRef = useRef<null | TextInputInstance>(null);
  useImperativeHandle(ref, () => inputRef.current as TextInputInstance);

  return (
    <Textarea
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
      ref={(node: null | TextInputInstance) => {
        inputRef.current = node;
        field.ref(node);
        fieldContext?.setControl(node);
      }}
      value={field.value ?? ''}
    />
  );
}

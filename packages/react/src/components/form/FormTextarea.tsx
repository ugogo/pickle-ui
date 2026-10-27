'use client';

import * as React from 'react';

import { Textarea } from '@/components/form/Textarea';

import {
  useFormControlProps,
  useFormMethods,
  useRequiredFieldName,
  type WithoutAriaInvalid,
} from './Form.context';

type FormTextareaProps = WithoutAriaInvalid<
  React.ComponentProps<typeof Textarea>
>;

function FormTextarea({
  id: idProp,
  name: nameProp,
  ...props
}: FormTextareaProps) {
  const name = useRequiredFieldName(nameProp, 'Form.Textarea');
  const methods = useFormMethods();
  const registeredProps = methods.register(name);
  const controlProps = useFormControlProps({ id: idProp });

  return (
    <Textarea {...props} {...registeredProps} {...controlProps} name={name} />
  );
}

export { FormTextarea };
export type { FormTextareaProps };

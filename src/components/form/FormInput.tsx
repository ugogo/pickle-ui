'use client';

import * as React from 'react';

import { Input } from '@/components/Input';

import {
  FormInputGroupContext,
  useFormControlProps,
  useFormMethods,
  useRequiredFieldName,
  type WithoutAriaInvalid,
} from './Form.context';

type FormInputProps = WithoutAriaInvalid<React.ComponentProps<typeof Input>>;

function FormInput({ id: idProp, name: nameProp, ...props }: FormInputProps) {
  const isInsideInputGroup = React.useContext(FormInputGroupContext);
  const name = useRequiredFieldName(nameProp, 'Form.Input');
  const methods = useFormMethods();
  const registeredProps = methods.register(name);
  const controlProps = useFormControlProps(
    { id: idProp },
    { enabled: !isInsideInputGroup },
  );

  return (
    <Input {...props} {...registeredProps} {...controlProps} name={name} />
  );
}

export { FormInput };
export type { FormInputProps };

'use client';

import * as React from 'react';

import {
  FormInputGroupContext,
  useFormControlProps,
  useFormMethods,
  useRequiredFieldName,
  type WithoutAriaInvalid,
} from './Form.context';
import { Input } from './Input';
import { InputGroupInput } from './InputGroup';

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

  const InputComponent = isInsideInputGroup ? InputGroupInput : Input;

  return (
    <InputComponent
      {...props}
      {...registeredProps}
      {...controlProps}
      name={name}
    />
  );
}

export { FormInput };
export type { FormInputProps };

'use client';

import * as React from 'react';

import { InputGroup } from '@/components/InputGroup';

import { FormFieldContext, FormInputGroupContext } from './Form.context';
import { FormInput, type FormInputProps } from './FormInput';

type FormInputGroupProps = React.ComponentProps<typeof InputGroup>;

function FormInputGroup({ children, ...props }: FormInputGroupProps) {
  const field = React.useContext(FormFieldContext);
  const childArray = React.Children.toArray(children);
  const controlIndex = field?.controlId
    ? childArray.findIndex(isFormInputElement)
    : -1;
  const controlChildren = childArray.map((child, index) => {
    if (
      index === controlIndex &&
      field?.controlId &&
      isFormInputElement(child)
    ) {
      // A group-level label should focus the first input in the group.
      return React.cloneElement(child, {
        id: field.controlId,
      });
    }

    return child;
  });

  return (
    <FormInputGroupContext.Provider value>
      <InputGroup {...props}>{controlChildren}</InputGroup>
    </FormInputGroupContext.Provider>
  );
}

function isFormInputElement(
  child: React.ReactNode,
): child is React.ReactElement<FormInputProps> {
  return React.isValidElement(child) && child.type === FormInput;
}

export { FormInputGroup };
export type { FormInputGroupProps };

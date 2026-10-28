import { Children, isValidElement } from 'react';

import { FormInputGroupContext, useFormControlProps } from './Form.context';
import { FormInput, type FormInputProps } from './FormInput';
import { InputGroup } from './InputGroup';
import { InputGroupStateContext } from './InputGroup.context';

export type FormInputGroupProps = React.ComponentProps<typeof InputGroup>;

/**
 * An `InputGroup` whose `Form.Input` renders `InputGroup.Input`, framed as
 * invalid while the field has an error.
 */
export function FormInputGroup({ children, ...props }: FormInputGroupProps) {
  const { invalid } = useFormControlProps();
  const disabled = Children.toArray(children).some(
    (child) =>
      isValidElement<FormInputProps>(child) &&
      child.type === FormInput &&
      Boolean(child.props.disabled),
  );

  return (
    <FormInputGroupContext value>
      <InputGroupStateContext value={{ disabled, invalid }}>
        <InputGroup {...props}>{children}</InputGroup>
      </InputGroupStateContext>
    </FormInputGroupContext>
  );
}

'use client';

import { useController } from 'react-hook-form';

import {
  useFormControlProps,
  useFormMethods,
  useRequiredFieldName,
  type WithoutAriaInvalid,
} from './Form.context';
import { RadioGroup, type RadioGroupProps } from './RadioGroup';

type FormRadioGroupProps = WithoutAriaInvalid<RadioGroupProps>;

function FormRadioGroupRoot({ name: nameProp, ...props }: FormRadioGroupProps) {
  const { id: idProp, ...radioGroupProps } = props;
  const { control } = useFormMethods();
  const name = useRequiredFieldName(nameProp, 'Form.RadioGroup');
  const { field } = useController({
    control,
    defaultValue: radioGroupProps.defaultValue,
    name,
  });
  const controlProps = useFormControlProps({ id: idProp });

  return (
    <RadioGroup
      {...radioGroupProps}
      {...controlProps}
      inputRef={field.ref}
      name={field.name}
      onValueChange={(value, eventDetails) => {
        field.onChange(value);
        radioGroupProps.onValueChange?.(value, eventDetails);
      }}
      value={field.value}
    />
  );
}

const FormRadioGroup = Object.assign(FormRadioGroupRoot, {
  Item: RadioGroup.Item,
});

export { FormRadioGroup, FormRadioGroupRoot };
export type { FormRadioGroupProps };

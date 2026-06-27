'use client';

import { useController } from 'react-hook-form';

import { Checkbox, type CheckboxProps } from '@/components/Checkbox';

import {
  useFormControlProps,
  useFormMethods,
  useRequiredFieldName,
  type WithoutAriaInvalid,
} from './Form.context';

type FormCheckboxProps = WithoutAriaInvalid<CheckboxProps>;

function FormCheckboxRoot({
  id: idProp,
  name: nameProp,
  ...props
}: FormCheckboxProps) {
  const { control } = useFormMethods();
  const name = useRequiredFieldName(nameProp, 'Form.Checkbox');
  const { field } = useController({
    control,
    defaultValue: props.defaultChecked ?? false,
    name,
  });
  const controlProps = useFormControlProps({ id: idProp });

  return (
    <Checkbox
      {...props}
      {...controlProps}
      checked={Boolean(field.value)}
      inputRef={field.ref}
      name={field.name}
      onCheckedChange={(checked, eventDetails) => {
        field.onChange(checked);
        props.onCheckedChange?.(checked, eventDetails);
      }}
    />
  );
}

const FormCheckbox = Object.assign(FormCheckboxRoot, {
  Label: Checkbox.Label,
});

export { FormCheckbox, FormCheckboxRoot };
export type { FormCheckboxProps };

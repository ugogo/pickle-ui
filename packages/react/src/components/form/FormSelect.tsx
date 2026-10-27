'use client';

import * as React from 'react';
import { useController } from 'react-hook-form';

import {
  useFormControlProps,
  useFormMethods,
  useRequiredFieldName,
  type WithoutAriaInvalid,
} from './Form.context';
import { Select, type SelectProps } from './Select';

type FormSelectProps = WithoutAriaInvalid<SelectProps>;

function FormSelectRoot({ name: nameProp, ...props }: FormSelectProps) {
  const { control } = useFormMethods();
  const name = useRequiredFieldName(nameProp, 'Form.Select');
  const { field } = useController({
    control,
    defaultValue: props.defaultValue,
    name,
  });

  return (
    <Select
      {...props}
      inputRef={field.ref}
      name={field.name}
      onValueChange={(value, eventDetails) => {
        field.onChange(value);
        props.onValueChange?.(value, eventDetails);
      }}
      value={field.value}
    />
  );
}

function FormSelectTrigger({
  id: idProp,
  ...props
}: WithoutAriaInvalid<React.ComponentProps<typeof Select.Trigger>>) {
  const controlProps = useFormControlProps({ id: idProp });

  return <Select.Trigger {...props} {...controlProps} />;
}

const FormSelect = Object.assign(FormSelectRoot, {
  Content: Select.Content,
  Group: Select.Group,
  GroupLabel: Select.GroupLabel,
  Item: Select.Item,
  Label: Select.Label,
  Separator: Select.Separator,
  Trigger: FormSelectTrigger,
  Value: Select.Value,
});

export { FormSelect, FormSelectRoot, FormSelectTrigger };
export type { FormSelectProps };

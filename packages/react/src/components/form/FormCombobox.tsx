'use client';

import * as React from 'react';
import { useController } from 'react-hook-form';

import { Combobox, type ComboboxProps } from './Combobox';
import {
  useFormControlProps,
  useFormMethods,
  useRequiredFieldName,
  type WithoutAriaInvalid,
} from './Form.context';

// Stable fallback so an unset multiple value keeps the same identity.
const EMPTY_VALUE: never[] = [];

type FormComboboxProps<
  Value,
  Multiple extends boolean | undefined = false,
> = WithoutAriaInvalid<ComboboxProps<Value, Multiple>>;

function FormComboboxChipsInput({
  id: idProp,
  ...props
}: WithoutAriaInvalid<React.ComponentProps<typeof Combobox.ChipsInput>>) {
  const controlProps = useFormControlProps({ id: idProp });

  return <Combobox.ChipsInput {...props} {...controlProps} />;
}

function FormComboboxInput({
  id: idProp,
  ...props
}: WithoutAriaInvalid<React.ComponentProps<typeof Combobox.Input>>) {
  const controlProps = useFormControlProps({ id: idProp });

  return <Combobox.Input {...props} {...controlProps} />;
}

function FormComboboxRoot<Value, Multiple extends boolean | undefined = false>({
  name: nameProp,
  ...props
}: FormComboboxProps<Value, Multiple>) {
  const { control } = useFormMethods();
  const name = useRequiredFieldName(nameProp, 'Form.Combobox');
  const { field } = useController({
    control,
    defaultValue: props.defaultValue,
    name,
  });

  return (
    <Combobox<Value, Multiple>
      {...props}
      inputRef={field.ref}
      name={field.name}
      onValueChange={(value, eventDetails) => {
        field.onChange(value);
        props.onValueChange?.(value, eventDetails);
      }}
      // Keep the combobox controlled while the form value is still unset.
      value={field.value ?? (props.multiple ? EMPTY_VALUE : null)}
    />
  );
}

const FormCombobox = Object.assign(FormComboboxRoot, {
  Chip: Combobox.Chip,
  Chips: Combobox.Chips,
  ChipsInput: FormComboboxChipsInput,
  Clear: Combobox.Clear,
  Collection: Combobox.Collection,
  Content: Combobox.Content,
  Empty: Combobox.Empty,
  Group: Combobox.Group,
  GroupLabel: Combobox.GroupLabel,
  Input: FormComboboxInput,
  Item: Combobox.Item,
  List: Combobox.List,
  Separator: Combobox.Separator,
  Status: Combobox.Status,
  Trigger: Combobox.Trigger,
  Value: Combobox.Value,
});

export {
  FormCombobox,
  FormComboboxChipsInput,
  FormComboboxInput,
  FormComboboxRoot,
};
export type { FormComboboxProps };

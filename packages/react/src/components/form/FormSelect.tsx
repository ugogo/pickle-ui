'use client';

import * as React from 'react';
import { useController } from 'react-hook-form';

import {
  FormFieldBlurContext,
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
    <FormFieldBlurContext.Provider value={field.onBlur}>
      <Select
        {...props}
        inputRef={field.ref}
        name={field.name}
        onValueChange={(value, eventDetails) => {
          field.onChange(value);
          props.onValueChange?.(value, eventDetails);
        }}
        // Keep the select controlled while the form value is still unset.
        value={field.value ?? null}
      />
    </FormFieldBlurContext.Provider>
  );
}

function FormSelectTrigger({
  id: idProp,
  onBlur,
  ...props
}: WithoutAriaInvalid<React.ComponentProps<typeof Select.Trigger>>) {
  const controlProps = useFormControlProps({ id: idProp });
  const onFieldBlur = React.useContext(FormFieldBlurContext);

  return (
    <Select.Trigger
      {...props}
      {...controlProps}
      onBlur={(event) => {
        // Opening the popup moves focus into it, which isn't leaving the field.
        if (!event.currentTarget.hasAttribute('data-popup-open')) {
          onFieldBlur?.();
        }
        onBlur?.(event);
      }}
    />
  );
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

'use client';

import { useController } from 'react-hook-form';

import { Switch, type SwitchProps } from '@/components/Switch';

import {
  useFormControlProps,
  useFormMethods,
  useRequiredFieldName,
  type WithoutAriaInvalid,
} from './Form.context';

type FormSwitchProps = WithoutAriaInvalid<SwitchProps>;

function FormSwitchRoot({
  id: idProp,
  name: nameProp,
  ...props
}: FormSwitchProps) {
  const { control } = useFormMethods();
  const name = useRequiredFieldName(nameProp, 'Form.Switch');
  const { field } = useController({
    control,
    defaultValue: props.defaultChecked ?? false,
    name,
  });
  const controlProps = useFormControlProps({ id: idProp });

  return (
    <Switch
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

const FormSwitch = Object.assign(FormSwitchRoot, {
  Label: Switch.Label,
});

export { FormSwitch, FormSwitchRoot };
export type { FormSwitchProps };

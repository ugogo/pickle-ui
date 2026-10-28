import { useController } from 'react-hook-form';

import { Checkbox, type CheckboxProps } from './Checkbox';
import {
  useFormControlProps,
  useFormMethods,
  useRequiredFieldName,
} from './Form.context';

export type FormCheckboxProps = Omit<CheckboxProps, 'checked' | 'invalid'> & {
  name?: string;
};

/** A `Checkbox` bound to the field's boolean value. */
export function FormCheckbox({
  name: nameProp,
  onCheckedChange,
  ...props
}: FormCheckboxProps) {
  const name = useRequiredFieldName(nameProp, 'Form.Checkbox');
  const { control } = useFormMethods();
  const { field } = useController({
    control,
    defaultValue: props.defaultChecked ?? false,
    name,
  });
  const { accessibilityLabel, invalid } = useFormControlProps();

  return (
    <Checkbox
      // A `label` already names the checkbox.
      accessibilityLabel={props.label ? undefined : accessibilityLabel}
      {...props}
      checked={Boolean(field.value)}
      invalid={invalid}
      onCheckedChange={(checked) => {
        field.onChange(checked);
        onCheckedChange?.(checked);
      }}
    />
  );
}

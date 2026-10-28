import { useController } from 'react-hook-form';

import {
  useFormControlProps,
  useFormMethods,
  useRequiredFieldName,
} from './Form.context';
import { RadioGroup, type RadioGroupProps } from './RadioGroup';

export type FormRadioGroupProps = Omit<RadioGroupProps, 'value'> & {
  name?: string;
};

/** A `RadioGroup` bound to the field's value. */
function FormRadioGroupRoot({
  name: nameProp,
  onValueChange,
  ...props
}: FormRadioGroupProps) {
  const name = useRequiredFieldName(nameProp, 'Form.RadioGroup');
  const { control } = useFormMethods();
  const { field } = useController({
    control,
    defaultValue: props.defaultValue,
    name,
  });
  const { accessibilityLabel, 'aria-labelledby': labelledBy } =
    useFormControlProps();

  return (
    <RadioGroup
      accessibilityLabel={accessibilityLabel}
      aria-labelledby={labelledBy}
      {...props}
      onValueChange={(value) => {
        field.onChange(value);
        onValueChange?.(value);
      }}
      value={field.value}
    />
  );
}

const FormRadioGroup = Object.assign(FormRadioGroupRoot, {
  Item: RadioGroup.Item,
});

export { FormRadioGroup };

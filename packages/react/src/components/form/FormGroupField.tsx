import { type FormFieldProps, FormFieldRoot } from './FormField';

type FormGroupFieldProps = Omit<FormFieldProps, 'controlId'>;

// A field whose content is not one control (a list of rows, a stepper,
// buttons): a group named by its label. Each row's control goes in Form.Item.
function FormGroupField(props: FormGroupFieldProps) {
  return <FormFieldRoot {...props} group />;
}

export { FormGroupField };
export type { FormGroupFieldProps };

import { Field } from '@base-ui/react/field';
import * as React from 'react';

import { type FormFieldProps, FormFieldRoot } from './FormField';

type FormGroupFieldItemProps = React.ComponentProps<typeof Field.Item>;
type FormGroupFieldProps = Omit<FormFieldProps, 'controlId'>;

// One row: its control gets its own label and id instead of the field's.
function FormGroupFieldItem(props: FormGroupFieldItemProps) {
  return <Field.Item data-slot="group-field-item" {...props} />;
}

// A field whose content is not one control (a list of rows, a stepper,
// buttons): a group named by its label. Each row's control goes in an Item.
function FormGroupFieldRoot(props: FormGroupFieldProps) {
  return <FormFieldRoot data-slot="group-field" {...props} group />;
}

const FormGroupField = Object.assign(FormGroupFieldRoot, {
  Item: FormGroupFieldItem,
});

export { FormGroupField };
export type { FormGroupFieldItemProps, FormGroupFieldProps };

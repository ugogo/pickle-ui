import { Field } from '@base-ui/react/field';
import * as React from 'react';

type FormItemProps = React.ComponentProps<typeof Field.Item>;

// One row of a Form.GroupField: its control gets its own label and id
// instead of the field's.
function FormItem(props: FormItemProps) {
  return <Field.Item data-slot="field-item" {...props} />;
}

export { FormItem };
export type { FormItemProps };

'use client';

import * as React from 'react';
import {
  type FieldValues,
  FormProvider,
  get,
  type SubmitHandler,
  useController,
  useFormContext,
  type UseFormReturn,
} from 'react-hook-form';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { InputGroup } from '@/components/InputGroup';
import { cn } from '@/lib/utils';

import { Checkbox, type CheckboxProps } from './Checkbox';
import { Field, type FieldProps } from './Field';
import { RadioGroup, type RadioGroupProps } from './RadioGroup';
import { Select, type SelectProps } from './Select';
import { Switch, type SwitchProps } from './Switch';

type FormCheckboxProps = CheckboxProps;
type FormFieldContextValue = {
  name?: string;
};
type FormFieldProps = Omit<FieldProps, 'children'> & {
  children: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  label?: React.ReactNode;
};
type FormInputGroupProps = React.ComponentProps<typeof InputGroup>;
type FormInputProps = React.ComponentProps<typeof Input>;
type FormProps<FormValues extends FieldValues = FieldValues> = Omit<
  React.ComponentProps<'form'>,
  'onSubmit'
> & {
  form?: UseFormReturn<FormValues>;
  onSubmit?: SubmitHandler<FormValues>;
};
type FormRadioGroupProps = RadioGroupProps;
type FormSelectProps = SelectProps;
type FormSwitchProps = SwitchProps;

const FormFieldContext = React.createContext<FormFieldContextValue | null>(
  null,
);

function FormCheckboxRoot({ name: nameProp, ...props }: FormCheckboxProps) {
  const name = useFieldName(nameProp);
  const methods = useOptionalFormContext();

  if (!methods || !name) {
    return <Checkbox name={name} {...props} />;
  }

  return <HookFormCheckbox name={name} props={props} />;
}

function FormField({
  children,
  description,
  error,
  label,
  ...props
}: FormFieldProps) {
  const methods = useOptionalFormContext();
  const name = props.name;
  const fieldError = name ? get(methods?.formState.errors, name) : undefined;
  const errorMessage = error ?? getErrorMessage(fieldError);
  const contextValue = React.useMemo(() => ({ name }), [name]);

  return (
    <Field {...props}>
      {label ? <Field.Label>{label}</Field.Label> : null}
      <FormFieldContext.Provider value={contextValue}>
        <FormFieldControl>{children}</FormFieldControl>
      </FormFieldContext.Provider>
      {errorMessage ? (
        <Field.Error match>{errorMessage}</Field.Error>
      ) : description ? (
        <Field.Description>{description}</Field.Description>
      ) : null}
    </Field>
  );
}

function FormFieldControl({ children }: { children: React.ReactNode }) {
  return renderFormFieldControl(children);
}

function FormInput({ name: nameProp, ...props }: FormInputProps) {
  const name = useFieldName(nameProp);
  const methods = useOptionalFormContext();
  const registeredProps = name ? methods?.register(name) : undefined;

  return <Input {...props} {...registeredProps} name={name} />;
}

function FormInputGroup({ children, ...props }: FormInputGroupProps) {
  return <InputGroup {...props}>{children}</InputGroup>;
}

function FormRadioGroupRoot({ name: nameProp, ...props }: FormRadioGroupProps) {
  const name = useFieldName(nameProp);
  const methods = useOptionalFormContext();

  if (!methods || !name) {
    return <RadioGroup name={name} {...props} />;
  }

  return <HookFormRadioGroup name={name} props={props} />;
}

function FormRoot<FormValues extends FieldValues = FieldValues>({
  className,
  form,
  onSubmit,
  ...props
}: FormProps<FormValues>) {
  const content = (
    <form
      className={cn('space-y-6', className)}
      data-slot="form"
      noValidate
      onSubmit={form && onSubmit ? form.handleSubmit(onSubmit) : undefined}
      {...props}
    />
  );

  if (!form) {
    return content;
  }

  return <FormProvider {...form}>{content}</FormProvider>;
}

function FormSelectRoot({ name: nameProp, ...props }: FormSelectProps) {
  const name = useFieldName(nameProp);
  const methods = useOptionalFormContext();

  if (!methods || !name) {
    return <Select name={name} {...props} />;
  }

  return <HookFormSelect name={name} props={props} />;
}

function FormSwitchRoot({ name: nameProp, ...props }: FormSwitchProps) {
  const name = useFieldName(nameProp);
  const methods = useOptionalFormContext();

  if (!methods || !name) {
    return <Switch name={name} {...props} />;
  }

  return <HookFormSwitch name={name} props={props} />;
}

function getErrorMessage(error: unknown): React.ReactNode {
  if (!error || typeof error !== 'object') {
    return undefined;
  }

  const message = (error as { message?: unknown }).message;

  if (
    React.isValidElement(message) ||
    typeof message === 'string' ||
    typeof message === 'number'
  ) {
    return message;
  }

  return undefined;
}

function HookFormCheckbox({
  name,
  props,
}: {
  name: string;
  props: Omit<FormCheckboxProps, 'name'>;
}) {
  const { field } = useController({
    defaultValue: props.defaultChecked ?? false,
    name,
  });

  return (
    <Checkbox
      {...props}
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

function HookFormRadioGroup({
  name,
  props,
}: {
  name: string;
  props: Omit<RadioGroupProps, 'name'>;
}) {
  const { field } = useController({
    defaultValue: props.defaultValue,
    name,
  });

  return (
    <RadioGroup
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

function HookFormSelect({
  name,
  props,
}: {
  name: string;
  props: Omit<FormSelectProps, 'name'>;
}) {
  const { field } = useController({
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

function HookFormSwitch({
  name,
  props,
}: {
  name: string;
  props: Omit<FormSwitchProps, 'name'>;
}) {
  const { field } = useController({
    defaultValue: props.defaultChecked ?? false,
    name,
  });

  return (
    <Switch
      {...props}
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

function renderFormFieldControl(children: React.ReactNode) {
  const childArray = React.Children.toArray(children);

  if (childArray.length !== 1) {
    return children;
  }

  const child = childArray[0];

  if (!React.isValidElement(child)) {
    return children;
  }

  if (child.type !== FormInput && child.type !== FormInputGroup) {
    return children;
  }

  return <Field.Control render={child} />;
}

function useFieldName(name: string | undefined) {
  const field = React.useContext(FormFieldContext);

  return name ?? field?.name;
}

function useOptionalFormContext() {
  return useFormContext() as null | UseFormReturn;
}

const FormFieldWithParts = Object.assign(FormField, {
  Control: Field.Control,
  Description: Field.Description,
  Error: Field.Error,
  Item: Field.Item,
  Label: Field.Label,
  Validity: Field.Validity,
});

const FormCheckbox = Object.assign(FormCheckboxRoot, {
  Label: Checkbox.Label,
});

const FormRadioGroup = Object.assign(FormRadioGroupRoot, {
  Item: RadioGroup.Item,
});

const FormSelect = Object.assign(FormSelectRoot, {
  Content: Select.Content,
  Group: Select.Group,
  GroupLabel: Select.GroupLabel,
  Item: Select.Item,
  Label: Select.Label,
  Separator: Select.Separator,
  Trigger: Select.Trigger,
  Value: Select.Value,
});

const FormSwitch = Object.assign(FormSwitchRoot, {
  Label: Switch.Label,
});

const Form = Object.assign(FormRoot, {
  Button,
  Field: FormFieldWithParts,
});

export {
  Form,
  FormCheckbox,
  FormInput,
  FormInputGroup,
  FormRadioGroup,
  FormSelect,
  FormSwitch,
};
export type {
  FormCheckboxProps,
  FormFieldProps,
  FormInputGroupProps,
  FormInputProps,
  FormProps,
  FormRadioGroupProps,
  FormSelectProps,
  FormSwitchProps,
};

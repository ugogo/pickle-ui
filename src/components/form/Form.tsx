'use client';

import { Button } from '@/components/Button';

import { FormCheckbox, type FormCheckboxProps } from './FormCheckbox';
import { FormCombobox, type FormComboboxProps } from './FormCombobox';
import { FormDescription, type FormDescriptionProps } from './FormDescription';
import { FormError, type FormErrorProps } from './FormError';
import { FormField, type FormFieldProps } from './FormField';
import { FormInput, type FormInputProps } from './FormInput';
import { FormInputGroup, type FormInputGroupProps } from './FormInputGroup';
import { FormLabel, type FormLabelProps } from './FormLabel';
import { FormRadioGroup, type FormRadioGroupProps } from './FormRadioGroup';
import { type FormProps, FormRoot } from './FormRoot';
import { FormSelect, type FormSelectProps } from './FormSelect';
import { FormSwitch, type FormSwitchProps } from './FormSwitch';
import { FormTextarea, type FormTextareaProps } from './FormTextarea';

const Form = Object.assign(FormRoot, {
  Button,
  Checkbox: FormCheckbox,
  Combobox: FormCombobox,
  Description: FormDescription,
  Error: FormError,
  Field: FormField,
  Input: FormInput,
  InputGroup: FormInputGroup,
  Label: FormLabel,
  RadioGroup: FormRadioGroup,
  Select: FormSelect,
  Switch: FormSwitch,
  Textarea: FormTextarea,
});

export { Form };
export type {
  FormCheckboxProps,
  FormComboboxProps,
  FormDescriptionProps,
  FormErrorProps,
  FormFieldProps,
  FormInputGroupProps,
  FormInputProps,
  FormLabelProps,
  FormProps,
  FormRadioGroupProps,
  FormSelectProps,
  FormSwitchProps,
  FormTextareaProps,
};

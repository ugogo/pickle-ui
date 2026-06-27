'use client';

import { Button } from '@/components/Button';

import { FormCheckbox, type FormCheckboxProps } from './FormCheckbox';
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

const Form = Object.assign(FormRoot, {
  Button,
  Checkbox: FormCheckbox,
  Description: FormDescription,
  Error: FormError,
  Field: FormField,
  Input: FormInput,
  InputGroup: FormInputGroup,
  Label: FormLabel,
  RadioGroup: FormRadioGroup,
  Select: FormSelect,
  Switch: FormSwitch,
});

export { Form };
export type {
  FormCheckboxProps,
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
};

import type { Meta, StoryObj } from '@storybook/react-vite';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';

import { Story } from '../_internal/Story';
import {
  Form,
  FormCheckbox,
  FormInput,
  FormInputGroup,
  FormRadioGroup,
  FormSelect,
  FormSwitch,
} from './Form';

const meta = {
  args: {},
  component: Form,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'components/Form',
} satisfies Meta<typeof Form>;

export default meta;

type StoryDefinition = StoryObj<typeof meta>;

const roles = [
  { label: 'Designer', value: 'designer' },
  { label: 'Engineer', value: 'engineer' },
  { label: 'Manager', value: 'manager' },
] as const;

const notificationChannels: {
  disabled?: boolean;
  label: string;
  value: string;
}[] = [
  { label: 'Email', value: 'email' },
  { label: 'SMS', value: 'sms' },
  { disabled: true, label: 'Push (coming soon)', value: 'push' },
];

const signUpSchema = z.object({
  email: z.email('Enter a valid email address.'),
  firstName: z.string().trim().min(1, 'Enter your first name.'),
  lastName: z.string().trim().min(1, 'Enter your last name.'),
  notificationChannel: z.enum(['email', 'sms']),
  password: z.string().min(8, 'Use at least 8 characters.'),
  productUpdates: z.boolean(),
  role: z.enum(['designer', 'engineer', 'manager']),
  terms: z.boolean().refine(Boolean, 'Accept the terms to continue.'),
  username: z.string().trim().min(1, 'Enter a username.'),
});

type SignUpValues = z.infer<typeof signUpSchema>;

function SignUpForm() {
  const form = useForm<SignUpValues>({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      notificationChannel: 'email',
      password: '',
      productUpdates: true,
      role: 'designer',
      terms: false,
      username: '',
    },
    resolver: zodResolver(signUpSchema),
  });

  return (
    <Form className="max-w-md" form={form} onSubmit={() => form.clearErrors()}>
      <Form.Field
        description="We'll send a confirmation link to this address."
        label="Email"
        name="email"
      >
        <FormInput autoComplete="email" inputMode="email" />
      </Form.Field>

      <Form.Field label="Username" name="username">
        <FormInput autoComplete="username" />
      </Form.Field>

      <Form.Field
        description="At least 8 characters."
        label="Password"
        name="password"
      >
        <FormInput autoComplete="new-password" type="password" />
      </Form.Field>

      <Form.Field label="Full name">
        <FormInputGroup>
          <FormInput
            aria-label="First name"
            name="firstName"
            placeholder="First"
          />
          <FormInput
            aria-label="Last name"
            name="lastName"
            placeholder="Last"
          />
        </FormInputGroup>
      </Form.Field>

      <Form.Field label="Role" name="role">
        <FormSelect>
          <FormSelect.Trigger className="w-full">
            <FormSelect.Value placeholder="Select a role" />
          </FormSelect.Trigger>
          <FormSelect.Content>
            {roles.map((role) => (
              <FormSelect.Item key={role.value} value={role.value}>
                {role.label}
              </FormSelect.Item>
            ))}
          </FormSelect.Content>
        </FormSelect>
      </Form.Field>

      <Form.Field name="productUpdates">
        <FormSwitch label="Email me about new features and releases" />
      </Form.Field>

      <Form.Field
        description="How should we reach you for account alerts?"
        label="Notification channel"
        name="notificationChannel"
      >
        <FormRadioGroup>
          {notificationChannels.map((channel) => (
            <FormRadioGroup.Item
              disabled={channel.disabled}
              key={channel.value}
              label={channel.label}
              value={channel.value}
            />
          ))}
        </FormRadioGroup>
      </Form.Field>

      <Form.Field name="terms">
        <FormCheckbox label="I agree to the terms of service and privacy policy" />
      </Form.Field>

      <Form.Button type="submit">Create account</Form.Button>
    </Form>
  );
}

export const SignUp: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-lg" title="Form">
      <Story.Section title="Sign up">
        <SignUpForm />
      </Story.Section>
    </Story.Layout>
  ),
};

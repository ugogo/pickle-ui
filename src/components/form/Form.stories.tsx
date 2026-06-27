import type { Meta, StoryObj } from '@storybook/react-vite';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';

import { Story } from '../_internal/Story';
import { Form } from './Form';

const meta = {
  args: {},
  component: Form,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'components/Form',
} satisfies Meta<typeof Form>;

export default meta;

type StoryDefinition = StoryObj;

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
        <Form.Input autoComplete="email" inputMode="email" />
      </Form.Field>

      <Form.Field label="Username" name="username">
        <Form.Input autoComplete="username" />
      </Form.Field>

      <Form.Field
        description="At least 8 characters."
        label="Password"
        name="password"
      >
        <Form.Input autoComplete="new-password" type="password" />
      </Form.Field>

      <Form.Field controlId="full-name" label="Full name">
        <Form.InputGroup>
          <Form.Input
            aria-label="First name"
            name="firstName"
            placeholder="First"
          />
          <Form.Input
            aria-label="Last name"
            name="lastName"
            placeholder="Last"
          />
        </Form.InputGroup>
      </Form.Field>

      <Form.Field label="Role" name="role">
        <Form.Select>
          <Form.Select.Trigger className="w-full">
            <Form.Select.Value placeholder="Select a role" />
          </Form.Select.Trigger>
          <Form.Select.Content>
            {roles.map((role) => (
              <Form.Select.Item key={role.value} value={role.value}>
                {role.label}
              </Form.Select.Item>
            ))}
          </Form.Select.Content>
        </Form.Select>
      </Form.Field>

      <Form.Field name="productUpdates">
        <Form.Switch label="Email me about new features and releases" />
      </Form.Field>

      <Form.Field
        description="How should we reach you for account alerts?"
        label="Notification channel"
        name="notificationChannel"
      >
        <Form.RadioGroup>
          {notificationChannels.map((channel) => (
            <Form.RadioGroup.Item
              disabled={channel.disabled}
              key={channel.value}
              label={channel.label}
              value={channel.value}
            />
          ))}
        </Form.RadioGroup>
      </Form.Field>

      <Form.Field name="terms">
        <Form.Checkbox label="I agree to the terms of service and privacy policy" />
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

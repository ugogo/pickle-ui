import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';

import { Story } from '../_internal/Story';
import { Text } from '../Text';
import { Form } from './Form';
import { InputGroup } from './InputGroup';

const meta = {
  component: Form,
  parameters: { layout: 'fullscreen' },
  title: 'components/Form',
} satisfies Meta<typeof Form>;

export default meta;

type StoryDefinition = StoryObj;

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
  bio: z.string().max(160, 'Keep it under 160 characters.'),
  email: z.email('Enter a valid email address.'),
  firstName: z.string().trim().min(1, 'Enter your first name.'),
  lastName: z.string().trim().min(1, 'Enter your last name.'),
  notificationChannel: z.enum(['email', 'sms']),
  password: z.string().min(8, 'Use at least 8 characters.'),
  terms: z.boolean().refine(Boolean, 'Accept the terms to continue.'),
  username: z.string().trim().min(1, 'Enter a username.'),
});

type SignUpValues = z.infer<typeof signUpSchema>;

function SignUpForm() {
  const form = useForm<SignUpValues>({
    defaultValues: {
      bio: '',
      email: '',
      firstName: '',
      lastName: '',
      notificationChannel: 'email',
      password: '',
      terms: false,
      username: '',
    },
    resolver: zodResolver(signUpSchema),
  });
  const [submitted, setSubmitted] = useState<null | SignUpValues>(null);

  return (
    <Form className="max-w-md" form={form} onSubmit={setSubmitted}>
      <Form.Field
        description="We'll send a confirmation link to this address."
        label="Email"
        name="email"
      >
        <Form.Input
          autoCapitalize="none"
          autoComplete="email"
          inputMode="email"
        />
      </Form.Field>

      <Form.Field label="Username" name="username">
        <Form.InputGroup>
          <InputGroup.Addon>@</InputGroup.Addon>
          <Form.Input autoCapitalize="none" autoComplete="username" />
        </Form.InputGroup>
      </Form.Field>

      <Form.Field
        description="At least 8 characters."
        label="Password"
        name="password"
      >
        <Form.Input autoComplete="new-password" secureTextEntry />
      </Form.Field>

      <Form.Field label="Full name">
        <Form.InputGroup>
          <Form.Input
            accessibilityLabel="First name"
            name="firstName"
            placeholder="First"
          />
          <Form.Input
            accessibilityLabel="Last name"
            name="lastName"
            placeholder="Last"
          />
        </Form.InputGroup>
      </Form.Field>

      <Form.Field
        description="A sentence or two for your public profile."
        label="Bio"
        name="bio"
      >
        <Form.Textarea placeholder="Tell us about yourself" />
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

      <Form.Button>Create account</Form.Button>

      {submitted ? (
        <Text tone="muted">Account created for {submitted.email}.</Text>
      ) : null}
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

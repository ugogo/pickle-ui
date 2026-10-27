import type { Meta, StoryObj } from '@storybook/react-vite';

import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
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

const defaultInterests = [
  { label: 'Design systems', value: 'design-systems' },
  { label: 'Accessibility', value: 'accessibility' },
  { label: 'Performance', value: 'performance' },
];

type Interest = (typeof defaultInterests)[number];

const signUpSchema = z.object({
  bio: z.string().max(160, 'Keep it under 160 characters.'),
  email: z.email('Enter a valid email address.'),
  firstName: z.string().trim().min(1, 'Enter your first name.'),
  interests: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .min(1, 'Pick at least one interest.'),
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
      bio: '',
      email: '',
      firstName: '',
      interests: [],
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
  const [interests, setInterests] = React.useState(defaultInterests);

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

      <Form.Field
        description="Pick from the list or type to add your own."
        label="Interests"
        name="interests"
      >
        <Form.Combobox
          items={interests}
          multiple
          onCreate={(label) => {
            const interest = { label, value: label.toLowerCase() };
            setInterests((current) => [...current, interest]);

            return interest;
          }}
        >
          <Form.Combobox.Chips>
            <Form.Combobox.Value>
              {(value: Interest[]) => (
                <>
                  {value.map((interest) => (
                    <Form.Combobox.Chip key={interest.value}>
                      {interest.label}
                    </Form.Combobox.Chip>
                  ))}
                  <Form.Combobox.ChipsInput
                    placeholder={value.length > 0 ? '' : 'Add interests…'}
                  />
                </>
              )}
            </Form.Combobox.Value>
          </Form.Combobox.Chips>
          <Form.Combobox.Content>
            <Form.Combobox.List>
              {(interest: Interest) => (
                <Form.Combobox.Item key={interest.value} value={interest}>
                  {interest.label}
                </Form.Combobox.Item>
              )}
            </Form.Combobox.List>
          </Form.Combobox.Content>
        </Form.Combobox>
      </Form.Field>

      <Form.Field
        description="A sentence or two for your public profile."
        label="Bio"
        name="bio"
      >
        <Form.Textarea placeholder="Tell us about yourself" />
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

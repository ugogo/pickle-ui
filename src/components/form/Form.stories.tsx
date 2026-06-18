import type { Meta, StoryObj } from '@storybook/react-vite';

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

export const SignUp: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-lg" title="Form">
      <Story.Section title="Sign up">
        <Form
          className="max-w-md"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <Form.Field name="email">
            <Form.Field.Label>Email</Form.Field.Label>
            <Form.Field.Control render={<Form.Input required type="email" />} />
            <Form.Field.Description>
              {"We'll send a confirmation link to this address."}
            </Form.Field.Description>
          </Form.Field>

          <Form.Field name="username">
            <Form.Field.Label>Username</Form.Field.Label>
            <Form.Field.Control render={<Form.Input required />} />
            <Form.Field.Error match="valueMissing">
              Username is required.
            </Form.Field.Error>
          </Form.Field>

          <Form.Field name="password">
            <Form.Field.Label>Password</Form.Field.Label>
            <Form.Field.Control
              render={<Form.Input minLength={8} required type="password" />}
            />
            <Form.Field.Description>
              At least 8 characters.
            </Form.Field.Description>
          </Form.Field>

          <Form.Field>
            <Form.Field.Label>Full name</Form.Field.Label>
            <Form.Field.Control
              render={
                <Form.InputGroup>
                  <Form.Input
                    aria-label="First name"
                    name="firstName"
                    placeholder="First"
                    required
                  />
                  <Form.Input
                    aria-label="Last name"
                    name="lastName"
                    placeholder="Last"
                    required
                  />
                </Form.InputGroup>
              }
            />
          </Form.Field>

          <Form.Field name="role">
            <Form.Field.Label>Role</Form.Field.Label>
            <Form.Field.Control
              render={
                <Form.Select defaultValue="designer">
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
              }
            />
          </Form.Field>

          <Form.Field>
            <Form.Field.Label>Product updates</Form.Field.Label>
            <Form.Switch
              defaultChecked
              label="Email me about new features and releases"
            />
          </Form.Field>

          <Form.Field>
            <Form.Field.Label
              id="notification-channel-label"
              nativeLabel={false}
              render={<span />}
            >
              Notification channel
            </Form.Field.Label>
            <Form.RadioGroup
              aria-labelledby="notification-channel-label"
              defaultValue="email"
              name="notificationChannel"
            >
              {notificationChannels.map((channel) => (
                <Form.RadioGroup.Item
                  disabled={channel.disabled}
                  key={channel.value}
                  label={channel.label}
                  value={channel.value}
                />
              ))}
            </Form.RadioGroup>
            <Form.Field.Description>
              How should we reach you for account alerts?
            </Form.Field.Description>
          </Form.Field>

          <Form.Field name="terms">
            <Form.Checkbox
              label="I agree to the terms of service and privacy policy"
              required
            />
            <Form.Field.Error match="valueMissing">
              You must accept the terms to continue.
            </Form.Field.Error>
          </Form.Field>

          <Form.Button type="submit">Create account</Form.Button>
        </Form>
      </Story.Section>
    </Story.Layout>
  ),
};

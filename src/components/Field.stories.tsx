import type { Meta, StoryObj } from '@storybook/react-vite';

import { Story } from './_internal/Story';
import { Checkbox } from './Checkbox';
import { Field } from './Field';
import { Input } from './Input';
import { RadioGroup } from './RadioGroup';

const meta = {
  args: {},
  component: Field,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'components/Field',
} satisfies Meta<typeof Field>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-xl" title="Field">
      <Story.Section title="Text input with description">
        <Field>
          <Field.Label>Email</Field.Label>
          <Field.Control render={<Input type="email" />} />
          <Field.Description>
            {"We'll never share your email address."}
          </Field.Description>
        </Field>
      </Story.Section>

      <Story.Section title="Required with validation error">
        <Field>
          <Field.Label>Username</Field.Label>
          <Field.Control render={<Input required />} />
          <Field.Error match="valueMissing">Username is required.</Field.Error>
        </Field>
      </Story.Section>

      <Story.Section title="With Checkbox">
        <Field>
          <Field.Label>Preferences</Field.Label>
          <Checkbox label="Receive newsletters" />
        </Field>
      </Story.Section>

      <Story.Section title="With RadioGroup">
        <Field>
          <Field.Label>Notification style</Field.Label>
          <RadioGroup defaultValue="email">
            <RadioGroup.Item label="Email" value="email" />
            <RadioGroup.Item label="SMS" value="sms" />
            <RadioGroup.Item label="Push" value="push" />
          </RadioGroup>
          <Field.Description>
            Choose how you want to be notified.
          </Field.Description>
        </Field>
      </Story.Section>
    </Story.Layout>
  ),
};

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Story } from '../_internal/Story';
import { Input } from '../Input';
import { Checkbox } from './Checkbox';
import { Field } from './Field';
import { RadioGroup } from './RadioGroup';
import { Select } from './Select';

const meta = {
  component: Field,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'components/form/Field',
} satisfies Meta<typeof Field>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-lg" title="Field">
      <Story.Section title="Input field">
        <Field name="email">
          <Field.Label>Email</Field.Label>
          <Field.Control render={<Input required type="email" />} />
          <Field.Description>Used for account notifications.</Field.Description>
          <Field.Error match="valueMissing">Email is required.</Field.Error>
        </Field>
      </Story.Section>

      <Story.Section title="Select field">
        <Field name="role">
          <Select defaultValue="designer">
            <Select.Label>Role</Select.Label>
            <div className="relative mt-2">
              <Select.Trigger className="w-56">
                <Select.Value placeholder="Select a role" />
              </Select.Trigger>
            </div>
            <Select.Content>
              <Select.Item value="designer">Designer</Select.Item>
              <Select.Item value="engineer">Engineer</Select.Item>
            </Select.Content>
          </Select>
        </Field>
      </Story.Section>

      <Story.Section title="Grouped controls">
        <Field name="contact">
          <Field.Label id="contact-label" nativeLabel={false} render={<span />}>
            Contact method
          </Field.Label>
          <RadioGroup aria-labelledby="contact-label" defaultValue="email">
            <Field.Item>
              <RadioGroup.Item label="Email" value="email" />
            </Field.Item>
            <Field.Item disabled>
              <RadioGroup.Item label="SMS" value="sms" />
            </Field.Item>
          </RadioGroup>
          <Field.Description>Choose where account alerts go.</Field.Description>
        </Field>
      </Story.Section>

      <Story.Section title="Checkbox item">
        <Field name="terms">
          <Field.Item>
            <Checkbox label="I agree to the terms" required />
          </Field.Item>
          <Field.Error match="valueMissing">Required.</Field.Error>
        </Field>
      </Story.Section>
    </Story.Layout>
  ),
};

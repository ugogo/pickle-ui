import type { Meta, StoryObj } from '@storybook/react-vite';

import { Story } from './_internal/Story';
import { RadioGroup, type RadioGroupItemProps } from './RadioGroup';

const meta = {
  args: {},
  component: RadioGroup,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'components/RadioGroup',
} satisfies Meta<typeof RadioGroup>;

export default meta;
type RadioGroupItemSize = NonNullable<RadioGroupItemProps['size']>;
type StoryDefinition = StoryObj<typeof meta>;

const SIZE_COLUMNS: { key: RadioGroupItemSize; label: string }[] = [
  { key: 'default', label: 'Default' },
  { key: 'sm', label: 'Small' },
];

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-3xl" title="RadioGroup">
      <Story.Section title="Basic">
        <RadioGroup defaultValue="option-1">
          <RadioGroup.Item label="Option 1" value="option-1" />
          <RadioGroup.Item label="Option 2" value="option-2" />
          <RadioGroup.Item label="Option 3" value="option-3" />
        </RadioGroup>
      </Story.Section>

      <Story.Section title="Sizes">
        <div className="flex gap-12">
          {SIZE_COLUMNS.map(({ key, label }) => (
            <div key={key}>
              <p className="text-muted-foreground mb-3 text-sm">{label}</p>
              <RadioGroup defaultValue="a">
                <RadioGroup.Item label="Alpha" size={key} value="a" />
                <RadioGroup.Item label="Beta" size={key} value="b" />
                <RadioGroup.Item label="Gamma" size={key} value="c" />
              </RadioGroup>
            </div>
          ))}
        </div>
      </Story.Section>

      <Story.Section title="Disabled item">
        <RadioGroup defaultValue="enabled">
          <RadioGroup.Item label="Enabled" value="enabled" />
          <RadioGroup.Item disabled label="Disabled" value="disabled" />
          <RadioGroup.Item label="Also enabled" value="enabled2" />
        </RadioGroup>
      </Story.Section>

      <Story.Section title="Disabled group">
        <RadioGroup defaultValue="a" disabled>
          <RadioGroup.Item label="Alpha" value="a" />
          <RadioGroup.Item label="Beta" value="b" />
        </RadioGroup>
      </Story.Section>

      <Story.Section title="Custom composition">
        <RadioGroup defaultValue="apple">
          <div className="flex items-center gap-2">
            <RadioGroup.Item id="radio-apple" value="apple" />
            <RadioGroup.Item.Label htmlFor="radio-apple">
              Apple
            </RadioGroup.Item.Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroup.Item id="radio-mango" value="mango" />
            <RadioGroup.Item.Label htmlFor="radio-mango">
              Mango
            </RadioGroup.Item.Label>
          </div>
        </RadioGroup>
      </Story.Section>
    </Story.Layout>
  ),
};

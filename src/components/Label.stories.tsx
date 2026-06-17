import type { Meta, StoryObj } from '@storybook/react-vite';

import { Story } from './_internal/Story';
import { Input } from './Input';
import { Label } from './Label';

const meta = {
  args: {
    htmlFor: 'demo',
  },
  component: Label,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'components/Label',
} satisfies Meta<typeof Label>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout title="Label">
      <Story.Section title="Basic">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="label-demo">Email address</Label>
          <Input id="label-demo" placeholder="you@example.com" type="email" />
        </div>
      </Story.Section>

      <Story.Section title="Disabled control">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="label-disabled">Username</Label>
          <Input disabled id="label-disabled" value="pickle" />
        </div>
      </Story.Section>
    </Story.Layout>
  ),
};

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Story } from '../_internal/Story';
import { Label } from './Label';

const meta = {
  component: Label,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'components/form/Label',
} satisfies Meta<typeof Label>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

export const All: StoryDefinition = {
  args: {
    htmlFor: 'story-label-input',
  },
  render: () => (
    <Story.Layout className="max-w-lg" title="Label">
      <Story.Section title="Standalone label">
        <div className="grid gap-2">
          <Label htmlFor="story-label-input">Email</Label>
          <input
            className="border-input bg-background focus-ring h-8 rounded-md border px-2.5 text-sm"
            id="story-label-input"
            type="email"
          />
        </div>
      </Story.Section>
    </Story.Layout>
  ),
};

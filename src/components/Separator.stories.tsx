import type { Meta, StoryObj } from '@storybook/react-vite';

import { Story } from './_internal/Story';
import { Separator } from './Separator';
import { Text } from './Text';

const meta = {
  component: Separator,
  parameters: { layout: 'fullscreen' },
  title: 'components/Separator',
} satisfies Meta<typeof Separator>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-3xl" title="Separator">
      <Story.Section title="Horizontal">
        <div className="flex max-w-sm flex-col gap-3">
          <Text variant="body">Account</Text>
          <Separator />
          <Text tone="muted" variant="body">
            Manage your profile and preferences.
          </Text>
        </div>
      </Story.Section>
      <Story.Section title="Vertical">
        <div className="flex h-5 items-center gap-3">
          <Text variant="body">Docs</Text>
          <Separator orientation="vertical" />
          <Text variant="body">Components</Text>
          <Separator orientation="vertical" />
          <Text variant="body">Theming</Text>
        </div>
      </Story.Section>
    </Story.Layout>
  ),
};

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Story } from './_internal/Story';
import { Separator } from './Separator';
import { Text } from './Text';
import { XStack } from './XStack';
import { YStack } from './YStack';

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
        <YStack className="max-w-sm" gap={3}>
          <Text>Account</Text>
          <Separator />
          <Text tone="muted">Manage your profile and preferences.</Text>
        </YStack>
      </Story.Section>
      <Story.Section title="Vertical">
        <XStack align="center" className="h-5" gap={3}>
          <Text>Docs</Text>
          <Separator orientation="vertical" />
          <Text>Components</Text>
          <Separator orientation="vertical" />
          <Text>Theming</Text>
        </XStack>
      </Story.Section>
    </Story.Layout>
  ),
};

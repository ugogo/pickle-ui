import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { View } from 'react-native';

import { Story } from './_internal/Story';
import { Drawer } from './Drawer';
import { Input } from './form/Input';
import { Text } from './Text';

const meta = {
  component: Drawer,
  parameters: { layout: 'fullscreen' },
  title: 'components/Drawer',
} satisfies Meta<typeof Drawer>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

const ACTIVITY = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  label: `Deployment #${240 - index}`,
}));

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-5xl" title="Drawer">
      <Story.Section title="Basic">
        <Text tone="muted">
          A bottom sheet that follows the finger and closes when dragged past
          half its height or flung down.
        </Text>
        <View className="flex-row flex-wrap gap-3">
          <Drawer>
            <Drawer.Trigger variant="outline">Edit profile</Drawer.Trigger>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Edit profile</Drawer.Title>
                <Drawer.Description>
                  Make changes to your profile, then save when you are done.
                </Drawer.Description>
              </Drawer.Header>
              <Drawer.Panel contentContainerClassName="gap-4">
                <View className="gap-2">
                  <Text className="text-sm font-medium">Name</Text>
                  <Input defaultValue="Ada Lovelace" />
                </View>
                <View className="gap-2">
                  <Text className="text-sm font-medium">Username</Text>
                  <Input defaultValue="@ada" />
                </View>
              </Drawer.Panel>
              <Drawer.Footer>
                <Drawer.Close variant="outline">Cancel</Drawer.Close>
                <Drawer.Close>Save changes</Drawer.Close>
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer>

          <Drawer>
            <Drawer.Trigger variant="outline">
              Without close button
            </Drawer.Trigger>
            <Drawer.Content showCloseButton={false}>
              <Drawer.Header>
                <Drawer.Title>Share link</Drawer.Title>
                <Drawer.Description>
                  Anyone with the link can view this project.
                </Drawer.Description>
              </Drawer.Header>
              <Drawer.Panel>
                <Input readOnly value="https://pickle-ui.dev/p/8f2a" />
              </Drawer.Panel>
              <Drawer.Footer>
                <Drawer.Close>Done</Drawer.Close>
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer>
        </View>
      </Story.Section>

      <Story.Section title="Long content">
        <Text tone="muted">
          The panel scrolls; once it is back at the top, a drag down moves the
          sheet.
        </Text>
        <View className="flex-row">
          <Drawer>
            <Drawer.Trigger variant="outline">Show activity</Drawer.Trigger>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Activity</Drawer.Title>
                <Drawer.Description>
                  The last 24 deployments.
                </Drawer.Description>
              </Drawer.Header>
              <Drawer.Panel contentContainerClassName="gap-2">
                {ACTIVITY.map(({ id, label }) => (
                  <View
                    className="border-border rounded-lg border px-3 py-2"
                    key={id}
                  >
                    <Text>{label}</Text>
                  </View>
                ))}
              </Drawer.Panel>
            </Drawer.Content>
          </Drawer>
        </View>
      </Story.Section>
    </Story.Layout>
  ),
};

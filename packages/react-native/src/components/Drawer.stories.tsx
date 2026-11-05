import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { View } from 'react-native';

import { type ComponentMatrixCellProps, Story } from './_internal/Story';
import { Drawer, type DrawerContentProps } from './Drawer';
import { Input } from './form/Input';
import { Text } from './Text';

const meta = {
  component: Drawer,
  parameters: { layout: 'fullscreen' },
  title: 'components/Drawer',
} satisfies Meta<typeof Drawer>;

export default meta;
type Content = 'form' | 'list' | 'plain';

type StoryDefinition = StoryObj<typeof meta>;

const VARIANT_ROWS: {
  description: string;
  key: NonNullable<DrawerContentProps['variant']>;
  label: string;
}[] = [
  {
    description: 'Floats away from the screen edges',
    key: 'inset',
    label: 'Inset (default)',
  },
  {
    description: 'Docked to the bottom edge, rounded top',
    key: 'attached',
    label: 'Attached',
  },
  {
    description: 'Docked to the bottom edge, square',
    key: 'straight',
    label: 'Straight',
  },
];

const CONTENT_COLUMNS: { description: string; key: Content; label: string }[] =
  [
    { description: 'Header, panel and footer', key: 'form', label: 'Form' },
    {
      description: 'Scroll the panel; from its top, drag down to close',
      key: 'list',
      label: 'Long content',
    },
    {
      description: 'showCloseButton={false}, no footer',
      key: 'plain',
      label: 'Without close button',
    },
  ];

const ACTIVITY = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  label: `Deployment #${240 - index}`,
}));

function DrawerCell({ column, row }: ComponentMatrixCellProps) {
  const content = column.key as Content;

  return (
    <Drawer>
      <Drawer.Trigger variant="outline">Open</Drawer.Trigger>
      <Drawer.Content
        showCloseButton={content !== 'plain'}
        variant={row.key as DrawerContentProps['variant']}
      >
        {content === 'form' ? (
          <>
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
          </>
        ) : null}
        {content === 'list' ? (
          <>
            <Drawer.Header>
              <Drawer.Title>Activity</Drawer.Title>
              <Drawer.Description>The last 24 deployments.</Drawer.Description>
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
          </>
        ) : null}
        {content === 'plain' ? (
          <>
            <Drawer.Header>
              <Drawer.Title>Share link</Drawer.Title>
              <Drawer.Description>
                Anyone with the link can view this project. Swipe down or tap
                outside to close.
              </Drawer.Description>
            </Drawer.Header>
            <Drawer.Panel>
              <Input readOnly value="https://pickle-ui.dev/p/8f2a" />
            </Drawer.Panel>
          </>
        ) : null}
      </Drawer.Content>
    </Drawer>
  );
}

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-5xl" title="Drawer">
      <Story.Section title="Variants">
        <Text tone="muted">
          A bottom sheet that follows the finger and closes when dragged past
          half its height or flung down.
        </Text>
        <Story.Matrix
          Cell={DrawerCell}
          columns={CONTENT_COLUMNS}
          rows={VARIANT_ROWS}
        />
      </Story.Section>
    </Story.Layout>
  ),
};

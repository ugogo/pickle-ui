import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  IconLayoutDashboard,
  IconSearch,
  IconSettings,
} from '@tabler/icons-react';

import { Story } from './_internal/Story';
import { Sidebar } from './Sidebar';
import { Text } from './Text';
import { XStack } from './XStack';
import { YStack } from './YStack';

const meta = {
  component: Sidebar,
  parameters: { layout: 'fullscreen' },
  title: 'components/Sidebar',
} satisfies Meta<typeof Sidebar>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-4xl" title="Sidebar">
      <Story.Section title="Navigation shell">
        <Sidebar className="h-96">
          <Sidebar.Header>
            <XStack align="center" gap={3}>
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex size-8 items-center justify-center rounded-md text-sm font-semibold">
                P
              </div>
              <YStack gap={0.5}>
                <Text variant="h4" weight="bold">
                  Pickle
                </Text>
                <Text tone="muted" variant="small">
                  Workspace
                </Text>
              </YStack>
            </XStack>
          </Sidebar.Header>
          <Sidebar.Content>
            <Sidebar.Menu aria-label="Workspace navigation">
              <Sidebar.MenuList>
                <Sidebar.MenuItem>
                  <Sidebar.MenuLink aria-current="page" href="#dashboard">
                    <IconLayoutDashboard stroke={1.75} />
                    Dashboard
                  </Sidebar.MenuLink>
                </Sidebar.MenuItem>
                <Sidebar.MenuItem>
                  <Sidebar.MenuLink href="#search">
                    <IconSearch stroke={1.75} />
                    Search
                  </Sidebar.MenuLink>
                </Sidebar.MenuItem>
                <Sidebar.MenuItem>
                  <Sidebar.MenuLink href="#settings">
                    <IconSettings stroke={1.75} />
                    Settings
                  </Sidebar.MenuLink>
                </Sidebar.MenuItem>
              </Sidebar.MenuList>
            </Sidebar.Menu>
          </Sidebar.Content>
          <Sidebar.Footer>
            <XStack align="center" gap={3}>
              <div className="bg-sidebar-accent text-sidebar-accent-foreground flex size-8 items-center justify-center rounded-md text-sm font-semibold">
                U
              </div>
              <YStack gap={0.5}>
                <Text className="font-medium" variant="small">
                  Ugo Onali
                </Text>
                <Text tone="muted" variant="small">
                  Pro workspace
                </Text>
              </YStack>
            </XStack>
          </Sidebar.Footer>
        </Sidebar>
      </Story.Section>
    </Story.Layout>
  ),
};

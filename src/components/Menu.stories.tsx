import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  IconCreditCard,
  IconLogout,
  IconMail,
  IconMessage,
  IconSettings,
  IconUser,
  IconUserPlus,
} from '@tabler/icons-react';
import { useState } from 'react';

import { Story } from './_internal/Story';
import { Button } from './Button';
import { Menu } from './Menu';

const meta = {
  component: Menu,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'components/Menu',
} satisfies Meta<typeof Menu>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

function AccountMenu() {
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivity, setShowActivity] = useState(false);
  const [theme, setTheme] = useState('system');

  return (
    <Menu>
      <Menu.Trigger render={<Button variant="outline" />}>
        My account
      </Menu.Trigger>
      <Menu.Content className="w-56">
        <Menu.Group>
          <Menu.GroupLabel>Account</Menu.GroupLabel>
          <Menu.Item>
            <IconUser />
            Profile
            <Menu.Shortcut>⇧⌘P</Menu.Shortcut>
          </Menu.Item>
          <Menu.Item>
            <IconCreditCard />
            Billing
            <Menu.Shortcut>⌘B</Menu.Shortcut>
          </Menu.Item>
          <Menu.Item>
            <IconSettings />
            Settings
            <Menu.Shortcut>⌘,</Menu.Shortcut>
          </Menu.Item>
          <Menu.Sub>
            <Menu.SubTrigger>
              <IconUserPlus />
              Invite users
            </Menu.SubTrigger>
            <Menu.SubContent>
              <Menu.Item>
                <IconMail />
                Email
              </Menu.Item>
              <Menu.Item>
                <IconMessage />
                Message
              </Menu.Item>
            </Menu.SubContent>
          </Menu.Sub>
        </Menu.Group>
        <Menu.Separator />
        <Menu.Group>
          <Menu.GroupLabel>View</Menu.GroupLabel>
          <Menu.CheckboxItem
            checked={showStatusBar}
            onCheckedChange={setShowStatusBar}
          >
            Status bar
          </Menu.CheckboxItem>
          <Menu.CheckboxItem
            checked={showActivity}
            onCheckedChange={setShowActivity}
          >
            Activity panel
          </Menu.CheckboxItem>
        </Menu.Group>
        <Menu.Separator />
        <Menu.Group>
          <Menu.GroupLabel>Theme</Menu.GroupLabel>
          <Menu.RadioGroup
            onValueChange={(value) => setTheme(value as string)}
            value={theme}
          >
            <Menu.RadioItem value="light">Light</Menu.RadioItem>
            <Menu.RadioItem value="dark">Dark</Menu.RadioItem>
            <Menu.RadioItem value="system">System</Menu.RadioItem>
          </Menu.RadioGroup>
        </Menu.Group>
        <Menu.Separator />
        <Menu.Item variant="destructive">
          <IconLogout />
          Log out
          <Menu.Shortcut>⇧⌘Q</Menu.Shortcut>
        </Menu.Item>
      </Menu.Content>
    </Menu>
  );
}

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-6xl" title="Menu">
      <Story.Section title="Account menu">
        <AccountMenu />
      </Story.Section>
      <Story.Section title="Alignment">
        <div className="flex gap-4">
          {(['start', 'center', 'end'] as const).map((align) => (
            <Menu key={align}>
              <Menu.Trigger render={<Button variant="outline" />}>
                Align {align}
              </Menu.Trigger>
              <Menu.Content align={align}>
                <Menu.Item>Rename</Menu.Item>
                <Menu.Item>Duplicate</Menu.Item>
                <Menu.Item disabled>Archive</Menu.Item>
                <Menu.Separator />
                <Menu.Item variant="destructive">Delete</Menu.Item>
              </Menu.Content>
            </Menu>
          ))}
        </div>
      </Story.Section>
    </Story.Layout>
  ),
};

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Story } from './_internal/Story';
import { Button } from './Button';
import { Drawer, type DrawerContentProps } from './Drawer';
import { Input } from './form/Input';
import { Text } from './Text';

const meta = {
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'components/Drawer',
} satisfies Meta<typeof Drawer>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

const SIZES: {
  label: string;
  size: NonNullable<DrawerContentProps['size']>;
}[] = [
  { label: 'Small', size: 'sm' },
  { label: 'Medium', size: 'md' },
  { label: 'Large', size: 'lg' },
];

const ACTIVITY = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  label: `Deployment #${240 - index}`,
}));

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-5xl" title="Drawer">
      <Story.Section title="Basic">
        <div className="flex flex-wrap gap-3">
          <Drawer>
            <Drawer.Trigger render={<Button variant="outline" />}>
              Edit profile
            </Drawer.Trigger>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Edit profile</Drawer.Title>
                <Drawer.Description>
                  Make changes to your profile, then save when you are done.
                </Drawer.Description>
              </Drawer.Header>
              <Drawer.Panel className="grid content-start gap-4">
                <label className="grid gap-2 text-sm font-medium">
                  Name
                  <Input defaultValue="Ada Lovelace" />
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  Username
                  <Input defaultValue="@ada" />
                </label>
              </Drawer.Panel>
              <Drawer.Footer>
                <Drawer.Close render={<Button variant="outline" />}>
                  Cancel
                </Drawer.Close>
                <Button type="submit">Save changes</Button>
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer>

          <Drawer>
            <Drawer.Trigger render={<Button variant="outline" />}>
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
                <Drawer.Close render={<Button />}>Done</Drawer.Close>
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer>
        </div>
      </Story.Section>

      <Story.Section title="Long content">
        <Text tone="muted">
          The panel scrolls between a fixed header and footer.
        </Text>
        <Drawer>
          <Drawer.Trigger render={<Button variant="outline" />}>
            Show activity
          </Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Activity</Drawer.Title>
              <Drawer.Description>The last 24 deployments.</Drawer.Description>
            </Drawer.Header>
            <Drawer.Panel className="grid content-start gap-2">
              {ACTIVITY.map(({ id, label }) => (
                <div className="rounded-lg border px-3 py-2" key={id}>
                  <Text variant="body">{label}</Text>
                </div>
              ))}
            </Drawer.Panel>
            <Drawer.Footer>
              <Drawer.Close render={<Button variant="outline" />}>
                Close
              </Drawer.Close>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer>
      </Story.Section>

      <Story.Section title="Sizes">
        <div className="flex flex-wrap gap-3">
          {SIZES.map(({ label, size }) => (
            <Drawer key={size}>
              <Drawer.Trigger render={<Button variant="outline" />}>
                {label}
              </Drawer.Trigger>
              <Drawer.Content size={size}>
                <Drawer.Header>
                  <Drawer.Title>{label} drawer</Drawer.Title>
                  <Drawer.Description>
                    The size controls the maximum width of the drawer.
                  </Drawer.Description>
                </Drawer.Header>
                <Drawer.Footer>
                  <Drawer.Close render={<Button />}>Close</Drawer.Close>
                </Drawer.Footer>
              </Drawer.Content>
            </Drawer>
          ))}
        </div>
      </Story.Section>
    </Story.Layout>
  ),
};

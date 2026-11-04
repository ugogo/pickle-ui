import type { Meta, StoryObj } from '@storybook/react-vite';

import { Story } from './_internal/Story';
import { Button } from './Button';
import { Input } from './form/Input';
import { Sheet, type SheetContentProps } from './Sheet';
import { Text } from './Text';

const meta = {
  component: Sheet,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'components/Sheet',
} satisfies Meta<typeof Sheet>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

const SIZES: {
  label: string;
  size: NonNullable<SheetContentProps['size']>;
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
    <Story.Layout className="max-w-5xl" title="Sheet">
      <Story.Section title="Basic">
        <Text tone="muted">
          Slides in from the right on wide screens and from the bottom on
          phones, where it follows a downward swipe and closes past half its
          height.
        </Text>
        <div className="flex flex-wrap gap-3">
          <Sheet>
            <Sheet.Trigger render={<Button variant="outline" />}>
              Edit profile
            </Sheet.Trigger>
            <Sheet.Content>
              <Sheet.Header>
                <Sheet.Title>Edit profile</Sheet.Title>
                <Sheet.Description>
                  Make changes to your profile, then save when you are done.
                </Sheet.Description>
              </Sheet.Header>
              <div className="grid gap-4">
                <label className="grid gap-2 text-sm font-medium">
                  Name
                  <Input defaultValue="Ada Lovelace" />
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  Username
                  <Input defaultValue="@ada" />
                </label>
              </div>
              <Sheet.Footer>
                <Sheet.Close render={<Button variant="outline" />}>
                  Cancel
                </Sheet.Close>
                <Button type="submit">Save changes</Button>
              </Sheet.Footer>
            </Sheet.Content>
          </Sheet>

          <Sheet>
            <Sheet.Trigger render={<Button variant="outline" />}>
              Without close button
            </Sheet.Trigger>
            <Sheet.Content showCloseButton={false}>
              <Sheet.Header>
                <Sheet.Title>Share link</Sheet.Title>
                <Sheet.Description>
                  Anyone with the link can view this project.
                </Sheet.Description>
              </Sheet.Header>
              <Input readOnly value="https://pickle-ui.dev/p/8f2a" />
              <Sheet.Footer>
                <Sheet.Close render={<Button />}>Done</Sheet.Close>
              </Sheet.Footer>
            </Sheet.Content>
          </Sheet>
        </div>
      </Story.Section>

      <Story.Section title="Long content">
        <Sheet>
          <Sheet.Trigger render={<Button variant="outline" />}>
            Show activity
          </Sheet.Trigger>
          <Sheet.Content>
            <Sheet.Header>
              <Sheet.Title>Activity</Sheet.Title>
              <Sheet.Description>
                The content scrolls; on phones, a swipe down from the top of the
                list closes the sheet.
              </Sheet.Description>
            </Sheet.Header>
            <div className="grid gap-2">
              {ACTIVITY.map(({ id, label }) => (
                <div className="rounded-lg border px-3 py-2" key={id}>
                  <Text variant="body">{label}</Text>
                </div>
              ))}
            </div>
          </Sheet.Content>
        </Sheet>
      </Story.Section>

      <Story.Section title="Sizes">
        <Text tone="muted">
          The size sets the side sheet&apos;s maximum width. The bottom sheet is
          always full width.
        </Text>
        <div className="flex flex-wrap gap-3">
          {SIZES.map(({ label, size }) => (
            <Sheet key={size}>
              <Sheet.Trigger render={<Button variant="outline" />}>
                {label}
              </Sheet.Trigger>
              <Sheet.Content size={size}>
                <Sheet.Header>
                  <Sheet.Title>{label} sheet</Sheet.Title>
                  <Sheet.Description>
                    The size controls the maximum width of the sheet.
                  </Sheet.Description>
                </Sheet.Header>
                <Sheet.Footer>
                  <Sheet.Close render={<Button />}>Close</Sheet.Close>
                </Sheet.Footer>
              </Sheet.Content>
            </Sheet>
          ))}
        </div>
      </Story.Section>
    </Story.Layout>
  ),
};

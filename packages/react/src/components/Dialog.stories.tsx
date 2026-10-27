import type { Meta, StoryObj } from '@storybook/react-vite';

import { Story } from './_internal/Story';
import { Button } from './Button';
import { Dialog, type DialogContentProps } from './Dialog';
import { Input } from './form/Input';
import { Text } from './Text';

const meta = {
  component: Dialog,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'components/Dialog',
} satisfies Meta<typeof Dialog>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

const SIZES: {
  label: string;
  size: NonNullable<DialogContentProps['size']>;
}[] = [
  { label: 'Small', size: 'sm' },
  { label: 'Medium', size: 'md' },
  { label: 'Large', size: 'lg' },
];

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-5xl" title="Dialog">
      <Story.Section title="Basic">
        <div className="flex flex-wrap gap-3">
          <Dialog>
            <Dialog.Trigger render={<Button variant="outline" />}>
              Show details
            </Dialog.Trigger>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Release notes</Dialog.Title>
                <Dialog.Description>
                  What changed in version 1.0.
                </Dialog.Description>
              </Dialog.Header>
              <Text>
                Dialogs now share their look with alert dialogs, animate in and
                out, and keep focus inside until they close.
              </Text>
              <Dialog.Footer>
                <Dialog.Close render={<Button />}>Got it</Dialog.Close>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog>

          <Dialog>
            <Dialog.Trigger render={<Button variant="outline" />}>
              Without close button
            </Dialog.Trigger>
            <Dialog.Content showCloseButton={false}>
              <Dialog.Header>
                <Dialog.Title>Session expiring</Dialog.Title>
                <Dialog.Description>
                  You will be signed out in two minutes.
                </Dialog.Description>
              </Dialog.Header>
              <Dialog.Footer>
                <Dialog.Close render={<Button variant="outline" />}>
                  Sign out
                </Dialog.Close>
                <Dialog.Close render={<Button />}>Stay signed in</Dialog.Close>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog>
        </div>
      </Story.Section>

      <Story.Section title="Form">
        <Dialog>
          <Dialog.Trigger render={<Button variant="outline" />}>
            Edit profile
          </Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Edit profile</Dialog.Title>
              <Dialog.Description>
                Make changes to your profile, then save when you are done.
              </Dialog.Description>
            </Dialog.Header>
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
            <Dialog.Footer>
              <Dialog.Close render={<Button variant="outline" />}>
                Cancel
              </Dialog.Close>
              <Button type="submit">Save changes</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog>
      </Story.Section>

      <Story.Section title="Sizes">
        <div className="flex flex-wrap gap-3">
          {SIZES.map(({ label, size }) => (
            <Dialog key={size}>
              <Dialog.Trigger render={<Button variant="outline" />}>
                {label}
              </Dialog.Trigger>
              <Dialog.Content size={size}>
                <Dialog.Header>
                  <Dialog.Title>{label} dialog</Dialog.Title>
                  <Dialog.Description>
                    The size controls the maximum width of the dialog.
                  </Dialog.Description>
                </Dialog.Header>
                <Dialog.Footer>
                  <Dialog.Close render={<Button />}>Close</Dialog.Close>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog>
          ))}
        </div>
      </Story.Section>
    </Story.Layout>
  ),
};

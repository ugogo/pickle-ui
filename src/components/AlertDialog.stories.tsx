import type { Meta, StoryObj } from '@storybook/react-vite';

import { Story } from './_internal/Story';
import { AlertDialog, type AlertDialogContentProps } from './AlertDialog';
import { Button } from './Button';

const meta = {
  component: AlertDialog,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'components/AlertDialog',
} satisfies Meta<typeof AlertDialog>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

const SIZES: {
  label: string;
  size: NonNullable<AlertDialogContentProps['size']>;
}[] = [
  { label: 'Small', size: 'sm' },
  { label: 'Medium', size: 'md' },
  { label: 'Large', size: 'lg' },
];

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-5xl" title="AlertDialog">
      <Story.Section title="Destructive confirm">
        <AlertDialog>
          <AlertDialog.Trigger
            render={<Button variant="destructive-outline" />}
          >
            Delete project
          </AlertDialog.Trigger>
          <AlertDialog.Content>
            <AlertDialog.Header>
              <AlertDialog.Title>Delete this project?</AlertDialog.Title>
              <AlertDialog.Description>
                This permanently deletes the project and its deployments. This
                action cannot be undone.
              </AlertDialog.Description>
            </AlertDialog.Header>
            <AlertDialog.Footer>
              <AlertDialog.Close render={<Button variant="outline" />}>
                Cancel
              </AlertDialog.Close>
              <AlertDialog.Close render={<Button variant="destructive" />}>
                Delete project
              </AlertDialog.Close>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </Story.Section>

      <Story.Section title="Sizes">
        <div className="flex flex-wrap gap-3">
          {SIZES.map(({ label, size }) => (
            <AlertDialog key={size}>
              <AlertDialog.Trigger render={<Button variant="outline" />}>
                {label}
              </AlertDialog.Trigger>
              <AlertDialog.Content size={size}>
                <AlertDialog.Header>
                  <AlertDialog.Title>Discard changes?</AlertDialog.Title>
                  <AlertDialog.Description>
                    Your unsaved edits will be lost.
                  </AlertDialog.Description>
                </AlertDialog.Header>
                <AlertDialog.Footer>
                  <AlertDialog.Close render={<Button variant="outline" />}>
                    Keep editing
                  </AlertDialog.Close>
                  <AlertDialog.Close render={<Button />}>
                    Discard
                  </AlertDialog.Close>
                </AlertDialog.Footer>
              </AlertDialog.Content>
            </AlertDialog>
          ))}
        </div>
      </Story.Section>
    </Story.Layout>
  ),
};

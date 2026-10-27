import type { Meta, StoryObj } from '@storybook/react-vite';

import { type ComponentMatrixCellProps, Story } from './_internal/Story';
import {
  AlertDialog,
  type AlertDialogContentProps,
  type AlertDialogProps,
} from './AlertDialog';
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

const SIZE_COLUMNS: {
  key: NonNullable<AlertDialogContentProps['size']>;
  label: string;
}[] = [
  { key: 'sm', label: 'Small' },
  { key: 'md', label: 'Medium (default)' },
  { key: 'lg', label: 'Large' },
];

const CONTENT_ROWS = [
  { description: 'One-line title', key: 'short', label: 'Short title' },
  {
    description: 'Title wraps onto several lines',
    key: 'long',
    label: 'Long title',
  },
  {
    description: 'Destructive action button',
    key: 'destructive',
    label: 'Destructive',
  },
];

const CONTENT: Record<
  string,
  { action: string; description: string; title: string; trigger: string }
> = {
  destructive: {
    action: 'Delete project',
    description:
      'This permanently deletes the project and its deployments. This action cannot be undone.',
    title: 'Delete this project?',
    trigger: 'Delete',
  },
  long: {
    action: 'Archive',
    description:
      'Members keep their exported data. You can restore the workspace within 30 days.',
    title: 'Archive this workspace and remove access for every member?',
    trigger: 'Archive',
  },
  short: {
    action: 'Discard',
    description: 'Your unsaved edits will be lost.',
    title: 'Discard changes?',
    trigger: 'Discard',
  },
};

const DISMISSAL_COLUMNS: {
  description: string;
  key: 'false' | 'true';
  label: string;
}[] = [
  {
    description: 'Default',
    key: 'false',
    label: 'Backdrop click closes',
  },
  {
    description: 'disablePointerDismissal',
    key: 'true',
    label: 'Backdrop click ignored',
  },
];

const DISMISSAL_ROWS = [
  {
    description: 'Click outside the dialog once it is open',
    key: 'backdrop',
    label: 'Backdrop click',
  },
];

function AlertDialogDismissalCell({ column }: ComponentMatrixCellProps) {
  const disablePointerDismissal: AlertDialogProps['disablePointerDismissal'] =
    column.key === 'true';

  return (
    <AlertDialog disablePointerDismissal={disablePointerDismissal}>
      <AlertDialog.Trigger render={<Button variant="outline" />}>
        Leave page
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Leave this page?</AlertDialog.Title>
          <AlertDialog.Description>
            {disablePointerDismissal
              ? 'Clicking outside does nothing. Pick an action.'
              : 'Clicking outside closes this dialog and keeps you on the page.'}
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Close render={<Button variant="outline" />}>
            Stay
          </AlertDialog.Close>
          <AlertDialog.Close render={<Button />}>Leave</AlertDialog.Close>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
}

function AlertDialogMatrixCell({ column, row }: ComponentMatrixCellProps) {
  const content = CONTENT[row.key];
  const destructive = row.key === 'destructive';

  return (
    <AlertDialog>
      <AlertDialog.Trigger
        render={
          <Button variant={destructive ? 'destructive-outline' : 'outline'} />
        }
      >
        {content.trigger}
      </AlertDialog.Trigger>
      <AlertDialog.Content
        size={column.key as NonNullable<AlertDialogContentProps['size']>}
      >
        <AlertDialog.Header>
          <AlertDialog.Title>{content.title}</AlertDialog.Title>
          <AlertDialog.Description>
            {content.description}
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Close render={<Button variant="outline" />}>
            Cancel
          </AlertDialog.Close>
          <AlertDialog.Close
            render={
              <Button variant={destructive ? 'destructive' : 'default'} />
            }
          >
            {content.action}
          </AlertDialog.Close>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
}

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-5xl" title="AlertDialog">
      <Story.Section title="Sizes and content">
        <Story.Matrix
          Cell={AlertDialogMatrixCell}
          columns={SIZE_COLUMNS}
          rows={CONTENT_ROWS}
        />
      </Story.Section>

      <Story.Section title="Backdrop dismissal">
        <Story.Matrix
          Cell={AlertDialogDismissalCell}
          columns={DISMISSAL_COLUMNS}
          rows={DISMISSAL_ROWS}
        />
      </Story.Section>
    </Story.Layout>
  ),
};

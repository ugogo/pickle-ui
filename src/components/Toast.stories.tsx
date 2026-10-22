import type { Meta, StoryObj } from '@storybook/react-vite';

import * as React from 'react';

import { Story } from './_internal/Story';
import { Button } from './Button';
import { Text } from './Text';
import { Toast, type ToastProviderProps } from './Toast';

const meta = {
  component: Toast.Provider,
  parameters: { layout: 'fullscreen' },
  title: 'components/Toast',
} satisfies Meta<typeof Toast.Provider>;

export default meta;
type Position = NonNullable<ToastProviderProps['position']>;
type StoryDefinition = StoryObj<typeof meta>;

const POSITIONS: Position[] = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];

const TYPES = [
  {
    description: 'Your changes have been saved.',
    title: 'Saved',
    type: 'success',
  },
  {
    description: 'We could not reach the server.',
    title: 'Upload failed',
    type: 'error',
  },
  {
    description: 'Your session expires in 5 minutes.',
    title: 'Heads up',
    type: 'warning',
  },
  {
    description: 'A new version is available.',
    title: 'Update ready',
    type: 'info',
  },
  {
    description: 'Neutral toasts render without an icon.',
    title: 'Event created',
    type: undefined,
  },
] as const;

function HookTriggers() {
  const toast = Toast.useToast();

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() => {
          const id = toast.add({
            actionProps: {
              children: 'Undo',
              onClick: () => toast.close(id),
            },
            description: 'The file was moved to the trash.',
            title: 'File deleted',
          });
        }}
        variant="outline"
      >
        With action
      </Button>
      <Button
        onClick={() =>
          toast.promise(wait(2000), {
            error: 'Could not publish.',
            loading: { description: 'Publishing your post…', title: 'Busy' },
            success: { description: 'Your post is live.', title: 'Published' },
          })
        }
        variant="outline"
      >
        Promise (resolves)
      </Button>
      <Button
        onClick={() =>
          toast
            .promise(wait(2000, true), {
              error: { description: 'Try again later.', title: 'Failed' },
              loading: { description: 'Publishing your post…', title: 'Busy' },
              success: 'Your post is live.',
            })
            .catch(() => undefined)
        }
        variant="outline"
      >
        Promise (rejects)
      </Button>
    </div>
  );
}

function ToastDemo() {
  const [position, setPosition] = React.useState<Position>('bottom-right');

  return (
    <Toast.Provider position={position}>
      <Story.Layout className="max-w-3xl" title="Toast">
        <Story.Section title="Types (global manager)">
          <Text className="mb-4" tone="muted">
            <Text as="code" variant="code">
              Toast.manager.add()
            </Text>{' '}
            works anywhere, including outside React.
          </Text>
          <div className="flex flex-wrap gap-2">
            {TYPES.map(({ description, title, type }) => (
              <Button
                key={title}
                onClick={() => Toast.manager.add({ description, title, type })}
                variant="outline"
              >
                {type ?? 'default'}
              </Button>
            ))}
          </div>
        </Story.Section>

        <Story.Section title="Action and promise (Toast.useToast)">
          <HookTriggers />
        </Story.Section>

        <Story.Section title="Position">
          <div className="flex flex-wrap gap-2">
            {POSITIONS.map((value) => (
              <Button
                key={value}
                onClick={() => {
                  setPosition(value);
                  Toast.manager.add({ title: `Toasts now appear ${value}` });
                }}
                variant={value === position ? 'default' : 'outline'}
              >
                {value}
              </Button>
            ))}
          </div>
        </Story.Section>
      </Story.Layout>
    </Toast.Provider>
  );
}

function wait(ms: number, fail = false) {
  return new Promise<void>((resolve, reject) =>
    setTimeout(() => (fail ? reject(new Error('Failed')) : resolve()), ms),
  );
}

export const All: StoryDefinition = {
  render: () => <ToastDemo />,
};

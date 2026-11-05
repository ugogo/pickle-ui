import type { Meta, StoryObj } from '@storybook/react-vite';

import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';

import { type ComponentMatrixCellProps, Story } from './_internal/Story';
import { Button } from './Button';
import { Drawer, type DrawerContentProps } from './Drawer';
import { Form } from './form/Form';
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
type Content = 'form' | 'list' | 'plain';

type StoryDefinition = StoryObj<typeof meta>;

const VARIANT_ROWS: {
  description: string;
  key: NonNullable<DrawerContentProps['variant']>;
  label: string;
}[] = [
  {
    description: 'Floats away from the viewport edges',
    key: 'inset',
    label: 'Inset (default)',
  },
  {
    description: 'Docked to the right edge, rounded inside',
    key: 'attached',
    label: 'Attached',
  },
  {
    description: 'Docked to the right edge, square',
    key: 'straight',
    label: 'Straight',
  },
];

const CONTENT_COLUMNS: { description: string; key: Content; label: string }[] =
  [
    { description: 'Header, panel and footer', key: 'form', label: 'Form' },
    {
      description: 'The panel scrolls between header and footer',
      key: 'list',
      label: 'Long content',
    },
    {
      description: 'showCloseButton, no footer',
      key: 'plain',
      label: 'With close button',
    },
  ];

const SIZE_COLUMNS: {
  description: string;
  key: NonNullable<DrawerContentProps['size']>;
  label: string;
}[] = [
  { description: 'max-w-sm', key: 'sm', label: 'Small' },
  { description: 'max-w-md', key: 'md', label: 'Medium (default)' },
  { description: 'max-w-xl', key: 'lg', label: 'Large' },
];

const profileSchema = z.object({
  name: z.string().trim().min(1, 'Enter your name.'),
  username: z.string().trim().min(2, 'Use at least 2 characters.'),
});

const ACTIVITY = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  label: `Deployment #${240 - index}`,
}));

function DrawerExample({
  content,
  size,
  trigger,
  variant,
}: {
  content: Content;
  size?: DrawerContentProps['size'];
  trigger: string;
  variant?: DrawerContentProps['variant'];
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Drawer onOpenChange={setOpen} open={open}>
      <Drawer.Trigger render={<Button variant="outline" />}>
        {trigger}
      </Drawer.Trigger>
      <Drawer.Content
        showCloseButton={content === 'plain'}
        size={size}
        variant={variant}
      >
        {content === 'form' ? (
          <ProfileForm onSaved={() => setOpen(false)} />
        ) : null}
        {content === 'list' ? (
          <>
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
          </>
        ) : null}
        {content === 'plain' ? (
          <>
            <Drawer.Header>
              <Drawer.Title>Share link</Drawer.Title>
              <Drawer.Description>
                Anyone with the link can view this project. Press Escape or
                click outside to close.
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

/**
 * A `Form` around the header, panel and footer, so `Form.Button` in the footer
 * submits it. `contents` (and no `space-y`) keeps the three parts laid out
 * by the drawer.
 */
function ProfileForm({ onSaved }: { onSaved: () => void }) {
  const form = useForm<z.infer<typeof profileSchema>>({
    defaultValues: { name: 'Ada Lovelace', username: 'ada' },
    resolver: zodResolver(profileSchema),
  });

  return (
    <Form className="contents space-y-0" form={form} onSubmit={onSaved}>
      <Drawer.Header>
        <Drawer.Title>Edit profile</Drawer.Title>
        <Drawer.Description>
          Make changes to your profile, then save when you are done.
        </Drawer.Description>
      </Drawer.Header>
      <Drawer.Panel className="space-y-6">
        <Form.Field label="Name" name="name">
          <Form.Input autoComplete="name" />
        </Form.Field>
        <Form.Field
          description="Shown on your public profile."
          label="Username"
          name="username"
        >
          <Form.Input autoComplete="username" />
        </Form.Field>
      </Drawer.Panel>
      <Drawer.Footer>
        <Drawer.Close render={<Button variant="outline" />}>
          Cancel
        </Drawer.Close>
        <Form.Button type="submit">Save changes</Form.Button>
      </Drawer.Footer>
    </Form>
  );
}

function SizeCell({ column }: ComponentMatrixCellProps) {
  return (
    <DrawerExample
      content="form"
      size={column.key as DrawerContentProps['size']}
      trigger="Open"
    />
  );
}

function VariantCell({ column, row }: ComponentMatrixCellProps) {
  return (
    <DrawerExample
      content={column.key as Content}
      trigger="Open"
      variant={row.key as DrawerContentProps['variant']}
    />
  );
}

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-5xl" title="Drawer">
      <Story.Section title="Variants">
        <Story.Matrix
          Cell={VariantCell}
          columns={CONTENT_COLUMNS}
          rows={VARIANT_ROWS}
        />
      </Story.Section>

      <Story.Section title="Sizes">
        <Story.Matrix
          Cell={SizeCell}
          columns={SIZE_COLUMNS}
          rows={[
            {
              description: 'Maximum width of the drawer',
              key: 'size',
              label: 'size',
            },
          ]}
        />
      </Story.Section>
    </Story.Layout>
  ),
};

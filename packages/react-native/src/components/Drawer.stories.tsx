import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { z } from 'zod/v4';

import { type ComponentMatrixCellProps, Story } from './_internal/Story';
import { Drawer } from './Drawer';
import { Form } from './form/Form';
import { Input } from './form/Input';
import { Text } from './Text';

const meta = {
  component: Drawer,
  parameters: { layout: 'fullscreen' },
  title: 'components/Drawer',
} satisfies Meta<typeof Drawer>;

export default meta;
type ExampleContent = 'close-button' | 'form' | 'list';

type StoryDefinition = StoryObj<typeof meta>;

const CONTENT_COLUMNS: {
  description: string;
  key: ExampleContent;
  label: string;
}[] = [
  { description: 'Header, panel and footer', key: 'form', label: 'Form' },
  {
    description: 'Scroll the panel; from its top, drag down to close',
    key: 'list',
    label: 'Long content',
  },
  {
    description: 'showCloseButton, no footer',
    key: 'close-button',
    label: 'With close button',
  },
];

const profileSchema = z.object({
  name: z.string().trim().min(1, 'Enter your name.'),
  username: z.string().trim().min(2, 'Use at least 2 characters.'),
});

const ACTIVITY = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  label: `Deployment #${240 - index}`,
}));

function DrawerCell({ column }: ComponentMatrixCellProps) {
  const content = column.key as ExampleContent;
  const [open, setOpen] = useState(false);

  return (
    <Drawer onOpenChange={setOpen} open={open}>
      <Drawer.Trigger variant="outline">Open</Drawer.Trigger>
      <Drawer.Content showCloseButton={content === 'close-button'}>
        {content === 'form' ? (
          <ProfileForm onSaved={() => setOpen(false)} />
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
            <Drawer.Footer>
              <Drawer.Close variant="outline">Close</Drawer.Close>
            </Drawer.Footer>
          </>
        ) : null}
        {content === 'close-button' ? (
          <>
            <Drawer.Header>
              <Drawer.Title>Share link</Drawer.Title>
              <Drawer.Description>
                Anyone with the link can view this project.
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
 * submits it. `shrink` lets the panel scroll inside the sheet's max height,
 * and `gap-0` leaves the parts' own spacing.
 */
function ProfileForm({ onSaved }: { onSaved: () => void }) {
  const form = useForm<z.infer<typeof profileSchema>>({
    defaultValues: { name: 'Ada Lovelace', username: 'ada' },
    resolver: zodResolver(profileSchema),
  });

  return (
    <Form className="shrink gap-0" form={form} onSubmit={onSaved}>
      <Drawer.Header>
        <Drawer.Title>Edit profile</Drawer.Title>
        <Drawer.Description>
          Make changes to your profile, then save when you are done.
        </Drawer.Description>
      </Drawer.Header>
      <Drawer.Panel contentContainerClassName="gap-6">
        <Form.Field label="Name" name="name">
          <Form.Input autoComplete="name" />
        </Form.Field>
        <Form.Field
          description="Shown on your public profile."
          label="Username"
          name="username"
        >
          <Form.Input autoCapitalize="none" autoComplete="username" />
        </Form.Field>
      </Drawer.Panel>
      <Drawer.Footer>
        <Drawer.Close variant="outline">Cancel</Drawer.Close>
        <Form.Button>Save changes</Form.Button>
      </Drawer.Footer>
    </Form>
  );
}

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-5xl" title="Drawer">
      <Story.Section title="Content">
        <Text tone="muted">
          The platform&apos;s bottom sheet, through Expo UI. It sizes itself to
          its content and closes when swiped down.
        </Text>
        <Story.Matrix
          Cell={DrawerCell}
          columns={CONTENT_COLUMNS}
          rows={[
            {
              description: 'Swipe down or tap outside to close',
              key: 'default',
              label: 'Default',
            },
          ]}
        />
      </Story.Section>
    </Story.Layout>
  ),
};

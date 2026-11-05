import type { Meta, StoryObj } from '@storybook/react-vite';

import { type ComponentMatrixCellProps, Story } from './_internal/Story';
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
      description: 'showCloseButton={false}, no footer',
      key: 'plain',
      label: 'Without close button',
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
  return (
    <Drawer>
      <Drawer.Trigger render={<Button variant="outline" />}>
        {trigger}
      </Drawer.Trigger>
      <Drawer.Content
        showCloseButton={content !== 'plain'}
        size={size}
        variant={variant}
      >
        {content === 'form' ? (
          <>
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
          </>
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

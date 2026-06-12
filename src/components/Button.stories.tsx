import type { Meta, StoryObj } from '@storybook/react-vite';

import { IconPlus } from '@tabler/icons-react';

import { Button, type ButtonProps } from './Button';
import { ComponentMatrix, Section, StoryLayout } from './story-utils';

const meta = {
  component: Button,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'components/Button',
} satisfies Meta<typeof Button>;

export default meta;
type ButtonVariant = NonNullable<ButtonProps['variant']>;
type Story = StoryObj<typeof meta>;

const STATE_COLUMNS: {
  key: string;
  label: string;
  props: Partial<ButtonProps>;
}[] = [
  { key: 'default', label: 'Default', props: {} },
  { key: 'hover', label: 'Hover', props: { className: 'pseudo-hover' } },
  {
    key: 'focus',
    label: 'Focus',
    props: { className: 'pseudo-focus-visible' },
  },
  { key: 'active', label: 'Active', props: { className: 'pseudo-active' } },
  { key: 'disabled', label: 'Disabled', props: { disabled: true } },
];

const STATE_PROPS = Object.fromEntries(
  STATE_COLUMNS.map((state) => [state.key, state.props]),
) as Record<string, Partial<ButtonProps>>;

const VARIANT_ROWS: {
  key: ButtonVariant;
  label: string;
}[] = [
  { key: 'primary', label: 'Primary' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'destructive', label: 'Destructive' },
  { key: 'outline', label: 'Outline' },
  { key: 'ghost', label: 'Ghost' },
  { key: 'link', label: 'Link' },
];

export const All: Story = {
  render: () => (
    <StoryLayout className="max-w-6xl" title="Button">
      <Section title="Variants and states">
        <ComponentMatrix
          columns={STATE_COLUMNS}
          renderCell={(row, column) => (
            <Button
              variant={row.key as ButtonVariant}
              {...STATE_PROPS[column.key]}
            >
              Button
            </Button>
          )}
          rows={VARIANT_ROWS}
        />
      </Section>

      <Section title="Content patterns">
        <ComponentMatrix
          columns={[
            { key: 'primary', label: 'Primary' },
            { key: 'outline', label: 'Outline' },
            { key: 'ghost', label: 'Ghost' },
          ]}
          renderCell={(row, column) => {
            const variant = column.key as ButtonVariant;

            if (row.key === 'icon') {
              return (
                <Button aria-label="Add" size="icon" variant={variant}>
                  <IconPlus stroke={2} />
                </Button>
              );
            }

            return (
              <Button variant={variant}>
                {row.key === 'with-icon' ? <IconPlus stroke={2} /> : null}
                Add
              </Button>
            );
          }}
          rows={[
            { key: 'text', label: 'Text' },
            { key: 'with-icon', label: 'Icon and text' },
            { key: 'icon', label: 'Icon only' },
          ]}
        />
      </Section>
    </StoryLayout>
  ),
};

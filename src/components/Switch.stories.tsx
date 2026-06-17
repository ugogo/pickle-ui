import type { Meta, StoryObj } from '@storybook/react-vite';

import { type ComponentMatrixCellProps, Story } from './_internal/Story';
import { Switch, type SwitchProps } from './Switch';

const meta = {
  component: Switch,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'components/Switch',
} satisfies Meta<typeof Switch>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;
type SwitchSize = NonNullable<SwitchProps['size']>;

const STATE_COLUMNS: {
  key: string;
  label: string;
  props: Partial<SwitchProps>;
}[] = [
  { key: 'unchecked', label: 'Unchecked', props: {} },
  { key: 'checked', label: 'Checked', props: { defaultChecked: true } },
  {
    key: 'focus',
    label: 'Focus',
    props: { className: 'pseudo-focus-visible', defaultChecked: true },
  },
  {
    key: 'invalid',
    label: 'Invalid',
    props: { 'aria-invalid': true, defaultChecked: true },
  },
  { key: 'disabled', label: 'Disabled', props: { disabled: true } },
];

const SIZE_ROWS: {
  key: SwitchSize;
  label: string;
}[] = [
  { key: 'default', label: 'Default' },
  { key: 'sm', label: 'Small' },
];

const STATE_PROPS = Object.fromEntries(
  STATE_COLUMNS.map((state) => [state.key, state.props]),
) as Record<string, Partial<SwitchProps>>;

function SwitchStateCell({ column, row }: ComponentMatrixCellProps) {
  return (
    <Switch
      aria-label={`${row.label} ${column.label}`}
      size={row.key as SwitchSize}
      {...STATE_PROPS[column.key]}
    />
  );
}

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-5xl" title="Switch">
      <Story.Section title="Sizes and states">
        <Story.Matrix
          Cell={SwitchStateCell}
          cellWidth="9rem"
          columns={STATE_COLUMNS}
          rows={SIZE_ROWS}
        />
      </Story.Section>

      <Story.Section title="Label">
        <Switch
          defaultChecked
          id="switch-notifications"
          label="Notifications"
        />
      </Story.Section>

      <Story.Section title="Labeled disabled states">
        <div className="flex flex-col items-start justify-start gap-3">
          <Switch
            disabled
            id="switch-disabled-unchecked"
            label="Disabled (Unchecked)"
          />
          <Switch
            defaultChecked
            disabled
            id="switch-disabled-checked"
            label="Disabled (Checked)"
          />
        </div>
      </Story.Section>

      <Story.Section title="Custom composition">
        <div className="flex items-start gap-3">
          <Switch id="switch-composed" />
          <div className="grid gap-1">
            <Switch.Label htmlFor="switch-composed">
              Weekly summary
            </Switch.Label>
            <p className="text-muted-foreground text-sm">
              Send a summary of account activity every Friday.
            </p>
          </div>
        </div>
      </Story.Section>
    </Story.Layout>
  ),
};

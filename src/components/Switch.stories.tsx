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
type StoryDefinition = StoryObj;

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

const STATE_PROPS = Object.fromEntries(
  STATE_COLUMNS.map((state) => [state.key, state.props]),
) as Record<string, Partial<SwitchProps>>;

function SwitchStateCell({ column }: ComponentMatrixCellProps) {
  return <Switch label={column.label} {...STATE_PROPS[column.key]} />;
}

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-5xl" title="Switch">
      <Story.Section title="States">
        <Story.Matrix
          Cell={SwitchStateCell}
          cellWidth="9rem"
          columns={STATE_COLUMNS}
          rows={[{ key: 'switch', label: 'Switch' }]}
        />
      </Story.Section>

      <Story.Section title="Label">
        <Switch defaultChecked id="story-switch-label" label="Notifications" />
      </Story.Section>
    </Story.Layout>
  ),
};

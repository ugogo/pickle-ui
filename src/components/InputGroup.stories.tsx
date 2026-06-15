import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from './Input';
import { InputGroup } from './InputGroup';
import { type ComponentMatrixCellProps, Story } from './Story';

const meta = {
  component: InputGroup,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'components/InputGroup',
} satisfies Meta<typeof InputGroup>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

const STATE_COLUMNS = [
  { key: 'default', label: 'Default' },
  { key: 'disabled', label: 'Disabled' },
  { key: 'invalid', label: 'Invalid' },
];

const COMPOSITION_ROWS = [
  {
    description: 'Single input keeps the standard radius',
    key: 'isolated',
    label: 'Isolated',
  },
  {
    description: 'Leading and trailing inputs',
    key: 'pair',
    label: 'Two inputs',
  },
  {
    description: 'Leading, middle, and trailing inputs',
    key: 'trio',
    label: 'Three inputs',
  },
];

function InputGroupMatrixCell({ column, row }: ComponentMatrixCellProps) {
  const inputProps = {
    'aria-invalid': column.key === 'invalid' || undefined,
    disabled: column.key === 'disabled',
  };

  if (row.key === 'isolated') {
    return (
      <InputGroup className="w-full max-w-[15rem]">
        <Input
          aria-label="Standalone value"
          defaultValue="Standalone"
          {...inputProps}
        />
      </InputGroup>
    );
  }

  if (row.key === 'pair') {
    return (
      <InputGroup className="w-full max-w-[15rem]">
        <Input
          aria-label="Hex value"
          className="font-mono"
          defaultValue="#40c080"
          {...inputProps}
        />
        <Input aria-label="Alpha" defaultValue="100" {...inputProps} />
      </InputGroup>
    );
  }

  return (
    <InputGroup className="w-full max-w-[15rem]">
      <Input aria-label="Red" defaultValue="64" {...inputProps} />
      <Input aria-label="Green" defaultValue="128" {...inputProps} />
      <Input aria-label="Blue" defaultValue="192" {...inputProps} />
    </InputGroup>
  );
}

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-5xl" title="InputGroup">
      <Story.Section title="Composition and states">
        <Story.Matrix
          Cell={InputGroupMatrixCell}
          cellClassName="justify-stretch"
          cellWidth="16rem"
          columns={STATE_COLUMNS}
          rows={COMPOSITION_ROWS}
        />
      </Story.Section>
    </Story.Layout>
  ),
};

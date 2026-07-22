import type { Meta, StoryObj } from '@storybook/react-vite';

import { IconEye, IconEyeOff, IconSearch } from '@tabler/icons-react';
import * as React from 'react';

import { type ComponentMatrixCellProps, Story } from './_internal/Story';
import { Button } from './Button';
import { InputGroup } from './InputGroup';

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

const PATTERN_ROWS = [
  {
    description: 'Leading icon addon',
    key: 'search',
    label: 'Search',
  },
  {
    description: 'Trailing visibility toggle',
    key: 'password',
    label: 'Password',
  },
  {
    description: 'Leading text addon',
    key: 'currency',
    label: 'Currency',
  },
  {
    description: 'Trailing text addon',
    key: 'domain',
    label: 'Domain',
  },
  {
    description: 'Adjacent inputs with a divider',
    key: 'multi-input',
    label: 'Multi-input',
  },
];

function InputGroupMatrixCell({ column, row }: ComponentMatrixCellProps) {
  const inputProps = {
    'aria-invalid': column.key === 'invalid' || undefined,
    disabled: column.key === 'disabled',
  };

  if (row.key === 'search') {
    return (
      <InputGroup className="w-full max-w-64">
        <InputGroup.Addon>
          <IconSearch aria-hidden size={16} />
        </InputGroup.Addon>
        <InputGroup.Input
          aria-label="Search"
          placeholder="Search…"
          type="search"
          {...inputProps}
        />
      </InputGroup>
    );
  }

  if (row.key === 'password') {
    return (
      <PasswordInputGroupCell
        disabled={column.key === 'disabled'}
        invalid={column.key === 'invalid'}
      />
    );
  }

  if (row.key === 'currency') {
    return (
      <InputGroup className="w-full max-w-64">
        <InputGroup.Addon>$</InputGroup.Addon>
        <InputGroup.Input
          aria-label="Amount in USD"
          defaultValue="1200"
          {...inputProps}
        />
      </InputGroup>
    );
  }

  if (row.key === 'domain') {
    return (
      <InputGroup className="w-full max-w-64">
        <InputGroup.Input
          aria-label="Pickle subdomain ending in .dev"
          defaultValue="pickle"
          {...inputProps}
        />
        <InputGroup.Addon align="inline-end">.dev</InputGroup.Addon>
      </InputGroup>
    );
  }

  return (
    <InputGroup className="w-full max-w-64">
      <InputGroup.Input
        aria-label="Hex color value"
        className="flex-1 font-mono"
        defaultValue="#40c080"
        {...inputProps}
      />
      <InputGroup.Input
        aria-label="Alpha transparency percentage"
        className="w-14"
        defaultValue="100"
        {...inputProps}
      />
    </InputGroup>
  );
}

function PasswordInputGroupCell({
  disabled,
  invalid,
}: {
  disabled?: boolean;
  invalid?: boolean;
}) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <InputGroup className="w-full max-w-64">
      <InputGroup.Input
        aria-invalid={invalid || undefined}
        aria-label="Password with toggle visibility"
        disabled={disabled}
        placeholder="Enter your password"
        type={showPassword ? 'text' : 'password'}
      />
      <InputGroup.Addon align="inline-end">
        <Button
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          disabled={disabled}
          onClick={() => setShowPassword((visible) => !visible)}
          size="icon-xs"
          type="button"
          variant="ghost"
        >
          {showPassword ? (
            <IconEyeOff aria-hidden size={16} />
          ) : (
            <IconEye aria-hidden size={16} />
          )}
        </Button>
      </InputGroup.Addon>
    </InputGroup>
  );
}

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-6xl" title="InputGroup">
      <Story.Section title="Patterns and states">
        <Story.Matrix
          Cell={InputGroupMatrixCell}
          cellClassName="justify-stretch"
          cellWidth="16rem"
          columns={STATE_COLUMNS}
          rows={PATTERN_ROWS}
        />
      </Story.Section>
    </Story.Layout>
  ),
};

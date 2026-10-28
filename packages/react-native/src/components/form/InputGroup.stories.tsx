import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { IconEye, IconEyeOff, IconSearch } from '@tabler/icons-react-native';
import { useState } from 'react';

import { type ComponentMatrixCellProps, Story } from '../_internal/Story';
import { InputGroup } from './InputGroup';

const meta = {
  component: InputGroup,
  parameters: { layout: 'fullscreen' },
  title: 'components/form/InputGroup',
} satisfies Meta<typeof InputGroup>;

export default meta;
type StoryDefinition = StoryObj<typeof meta>;

const STATE_COLUMNS = [
  { key: 'default', label: 'Default' },
  { key: 'disabled', label: 'Disabled' },
  { key: 'invalid', label: 'Invalid' },
];

const PATTERN_ROWS = [
  { description: 'Leading icon addon', key: 'search', label: 'Search' },
  {
    description: 'Trailing visibility toggle',
    key: 'password',
    label: 'Password',
  },
  { description: 'Leading text addon', key: 'currency', label: 'Currency' },
  { description: 'Trailing text addon', key: 'domain', label: 'Domain' },
];

function InputGroupMatrixCell({ column, row }: ComponentMatrixCellProps) {
  const inputProps = {
    disabled: column.key === 'disabled',
    invalid: column.key === 'invalid',
  };

  if (row.key === 'search') {
    return (
      <InputGroup>
        <InputGroup.Addon>
          <Story.Icon icon={IconSearch} />
        </InputGroup.Addon>
        <InputGroup.Input
          accessibilityLabel="Search"
          inputMode="search"
          placeholder="Search…"
          {...inputProps}
        />
      </InputGroup>
    );
  }

  if (row.key === 'password') {
    return <PasswordInputGroupCell {...inputProps} />;
  }

  if (row.key === 'currency') {
    return (
      <InputGroup>
        <InputGroup.Addon>$</InputGroup.Addon>
        <InputGroup.Input
          accessibilityLabel="Amount in USD"
          defaultValue="1200"
          inputMode="decimal"
          {...inputProps}
        />
      </InputGroup>
    );
  }

  return (
    <InputGroup>
      <InputGroup.Input
        accessibilityLabel="Pickle subdomain ending in .dev"
        defaultValue="pickle"
        {...inputProps}
      />
      <InputGroup.Addon align="inline-end">.dev</InputGroup.Addon>
    </InputGroup>
  );
}

function PasswordInputGroupCell({
  disabled,
  invalid,
}: {
  disabled: boolean;
  invalid: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputGroup>
      <InputGroup.Input
        accessibilityLabel="Password with toggle visibility"
        disabled={disabled}
        invalid={invalid}
        placeholder="Enter your password"
        secureTextEntry={!showPassword}
      />
      <InputGroup.Button
        accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
        disabled={disabled}
        onPress={() => setShowPassword((visible) => !visible)}
      >
        <Story.Icon icon={showPassword ? IconEyeOff : IconEye} />
      </InputGroup.Button>
    </InputGroup>
  );
}

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-6xl" title="InputGroup">
      <Story.Section title="Patterns and states">
        <Story.Matrix
          Cell={InputGroupMatrixCell}
          cellClassName="items-stretch"
          columns={STATE_COLUMNS}
          rows={PATTERN_ROWS}
        />
      </Story.Section>
    </Story.Layout>
  ),
};

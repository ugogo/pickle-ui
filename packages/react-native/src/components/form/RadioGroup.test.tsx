import { fireEvent, render, screen } from '@testing-library/react-native';

import { RadioGroup } from './RadioGroup';

describe('RadioGroup', () => {
  it('renders a group of radios named by their labels', async () => {
    await render(
      <RadioGroup accessibilityLabel="Plan">
        <RadioGroup.Item label="Option A" value="a" />
        <RadioGroup.Item label="Option B" value="b" />
      </RadioGroup>,
    );

    expect(screen.getByLabelText('Plan')).toHaveProp('role', 'radiogroup');
    expect(screen.getByRole('radio', { name: 'Option A' })).toBeOnTheScreen();
    expect(screen.getByRole('radio', { name: 'Option B' })).toBeOnTheScreen();
  });

  it('selects defaultValue on mount', async () => {
    await render(
      <RadioGroup defaultValue="b">
        <RadioGroup.Item label="Option A" value="a" />
        <RadioGroup.Item label="Option B" value="b" />
      </RadioGroup>,
    );

    expect(screen.getByRole('radio', { name: 'Option B' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Option A' })).not.toBeChecked();
  });

  it('selecting one item deselects the others', async () => {
    const onValueChange = jest.fn();
    await render(
      <RadioGroup defaultValue="a" onValueChange={onValueChange}>
        <RadioGroup.Item label="Option A" value="a" />
        <RadioGroup.Item label="Option B" value="b" />
      </RadioGroup>,
    );

    await fireEvent.press(screen.getByText('Option B'));

    expect(screen.getByRole('radio', { name: 'Option B' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Option A' })).not.toBeChecked();
    expect(onValueChange).toHaveBeenCalledWith('b');
  });

  it('follows the value prop when controlled', async () => {
    const onValueChange = jest.fn();
    await render(
      <RadioGroup onValueChange={onValueChange} value="a">
        <RadioGroup.Item label="Option A" value="a" />
        <RadioGroup.Item label="Option B" value="b" />
      </RadioGroup>,
    );

    await fireEvent.press(screen.getByRole('radio', { name: 'Option B' }));

    expect(onValueChange).toHaveBeenCalledWith('b');
    expect(screen.getByRole('radio', { name: 'Option A' })).toBeChecked();
  });

  it('disables every item when the group is disabled', async () => {
    const onValueChange = jest.fn();
    await render(
      <RadioGroup disabled onValueChange={onValueChange}>
        <RadioGroup.Item label="Option A" value="a" />
        <RadioGroup.Item disabled={false} label="Option B" value="b" />
      </RadioGroup>,
    );

    await fireEvent.press(screen.getByRole('radio', { name: 'Option A' }));

    expect(screen.getByRole('radio', { name: 'Option A' })).toBeDisabled();
    expect(screen.getByRole('radio', { name: 'Option B' })).toBeDisabled();
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('styles the row and the label text through classNames', async () => {
    await render(
      <RadioGroup>
        <RadioGroup.Item
          classNames={{ field: 'min-h-11', label: 'text-base font-normal' }}
          label="Option A"
          value="a"
        />
      </RadioGroup>,
    );

    expect(screen.getByRole('radio', { name: 'Option A' })).toHaveProp(
      'className',
      expect.stringContaining('min-h-11'),
    );
    expect(screen.getByText('Option A')).toHaveProp(
      'className',
      expect.stringContaining('text-base font-normal'),
    );
  });
});

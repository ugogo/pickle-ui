import { fireEvent, render, screen } from '@testing-library/react-native';

import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders unchecked by default', async () => {
    await render(<Checkbox accessibilityLabel="Accept" />);

    expect(screen.getByRole('checkbox', { name: 'Accept' })).not.toBeChecked();
  });

  it('toggles on press', async () => {
    await render(<Checkbox accessibilityLabel="Accept" />);
    const checkbox = screen.getByRole('checkbox', { name: 'Accept' });

    await fireEvent.press(checkbox);
    expect(checkbox).toBeChecked();

    await fireEvent.press(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('is named by its label, which toggles it', async () => {
    const onCheckedChange = jest.fn();
    await render(
      <Checkbox label="Accept terms" onCheckedChange={onCheckedChange} />,
    );

    await fireEvent.press(screen.getByText('Accept terms'));

    expect(
      screen.getByRole('checkbox', { name: 'Accept terms' }),
    ).toBeChecked();
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('follows the checked prop when controlled', async () => {
    const onCheckedChange = jest.fn();
    await render(
      <Checkbox
        accessibilityLabel="Accept"
        checked={false}
        onCheckedChange={onCheckedChange}
      />,
    );

    await fireEvent.press(screen.getByRole('checkbox'));

    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('reports the mixed state when indeterminate', async () => {
    await render(<Checkbox accessibilityLabel="Partial" indeterminate />);

    expect(
      screen.getByRole('checkbox', { name: 'Partial' }),
    ).toBePartiallyChecked();
  });

  it('is disabled and ignores presses', async () => {
    await render(<Checkbox accessibilityLabel="Accept" disabled />);
    const checkbox = screen.getByRole('checkbox', { name: 'Accept' });

    await fireEvent.press(checkbox);

    expect(checkbox).toBeDisabled();
    expect(checkbox).not.toBeChecked();
  });

  it('reaches a 44pt touch target', async () => {
    await render(
      <>
        <Checkbox accessibilityLabel="Box" />
        <Checkbox label="Row" size="sm" />
      </>,
    );

    expect(screen.getByRole('checkbox', { name: 'Box' })).toHaveProp(
      'hitSlop',
      13,
    );
    expect(screen.getByRole('checkbox', { name: 'Row' })).toHaveProp(
      'hitSlop',
      { bottom: 15, top: 15 },
    );
  });
});

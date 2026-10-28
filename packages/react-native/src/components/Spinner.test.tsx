import { render, screen } from '@testing-library/react-native';

import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('announces that something is loading', async () => {
    await render(<Spinner />);

    expect(
      screen.getByRole('progressbar', { name: 'Loading' }),
    ).toBeOnTheScreen();
  });

  it('accepts a custom accessible name', async () => {
    await render(<Spinner accessibilityLabel="Saving" />);

    expect(
      screen.getByRole('progressbar', { name: 'Saving' }),
    ).toBeOnTheScreen();
  });

  it('is decorative when aria-hidden', async () => {
    await render(<Spinner aria-hidden testID="spinner" />);

    expect(screen.queryByRole('progressbar')).toBeNull();
    expect(
      screen.getByTestId('spinner', { includeHiddenElements: true }),
    ).not.toHaveProp('accessibilityLabel');
  });
});

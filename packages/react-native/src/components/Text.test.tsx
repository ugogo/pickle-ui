import { render, screen } from '@testing-library/react-native';

import { Text } from './Text';

describe('Text', () => {
  it('renders its children', async () => {
    await render(<Text tone="muted">Hello</Text>);

    expect(screen.getByText('Hello')).toBeOnTheScreen();
  });

  it('announces heading variants as headers', async () => {
    await render(
      <>
        <Text variant="h2">Projects</Text>
        <Text variant="lead">Everything in flight</Text>
      </>,
    );

    expect(screen.getByRole('header', { name: 'Projects' })).toBeOnTheScreen();
    expect(
      screen.queryByRole('header', { name: 'Everything in flight' }),
    ).toBeNull();
  });

  it('cuts truncated text to one line', async () => {
    await render(<Text truncate>A long project name</Text>);

    expect(screen.getByText('A long project name')).toHaveProp(
      'numberOfLines',
      1,
    );
  });

  it('sets the code variant in a monospace font', async () => {
    await render(
      <Text style={{ color: 'red' }} variant="code">
        pnpm test
      </Text>,
    );

    expect(screen.getByText('pnpm test')).toHaveStyle({
      color: 'red',
      fontFamily: expect.any(String),
    });
  });
});

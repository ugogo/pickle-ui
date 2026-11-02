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

  it('lets a nested Text inherit its parent and set only its own props', async () => {
    await render(
      <Text tone="muted" variant="h2">
        Ship <Text weight="bold">today</Text>
      </Text>,
    );

    expect(screen.getByText('today')).toHaveProp('className', 'font-semibold');
  });

  it('keeps a nested code run inline', async () => {
    await render(
      <Text>
        Run <Text variant="code">pnpm test</Text>
      </Text>,
    );

    expect(screen.getByText('pnpm test')).toHaveProp(
      'className',
      'text-code bg-muted',
    );
  });

  it('does not announce or truncate a nested Text', async () => {
    await render(
      <Text>
        Read{' '}
        <Text truncate variant="h3">
          Projects
        </Text>
      </Text>,
    );

    expect(screen.queryByRole('header')).toBeNull();
    expect(screen.getByText('Projects')).not.toHaveProp('numberOfLines', 1);
  });
});

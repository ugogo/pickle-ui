import { render, screen } from '@testing-library/react-native';
import { View } from 'react-native';

import { YStack } from './YStack';

describe('YStack', () => {
  it('renders a column with the Flex props', async () => {
    await render(<YStack gap={2} justify="center" testID="stack" />);

    expect(
      String(screen.getByTestId('stack').props.className).split(' '),
    ).toEqual(expect.arrayContaining(['flex-col', 'justify-center', 'gap-2']));
  });

  it('renders horizontal separators between its children', async () => {
    await render(
      <YStack separator testID="stack">
        <View />
        <View />
        <View />
      </YStack>,
    );

    const separators = screen
      .getByTestId('stack')
      .children.filter(
        (child) =>
          typeof child !== 'string' && child.props.role === 'separator',
      );
    expect(separators).toHaveLength(2);
    expect(separators[0]).toHaveProp(
      'className',
      expect.stringContaining('h-px w-full'),
    );
    expect(separators[0]).toHaveProp('aria-hidden', true);
  });
});

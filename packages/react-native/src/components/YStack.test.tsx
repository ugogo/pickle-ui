import { render, screen } from '@testing-library/react-native';

import { YStack } from './YStack';

describe('YStack', () => {
  it('renders a column with the Flex props', async () => {
    await render(<YStack gap={2} justify="center" testID="stack" />);

    expect(
      String(screen.getByTestId('stack').props.className).split(' '),
    ).toEqual(expect.arrayContaining(['flex-col', 'justify-center', 'gap-2']));
  });
});

import { render, screen } from '@testing-library/react-native';

import { XStack } from './XStack';

describe('XStack', () => {
  it('renders a row with the Flex props', async () => {
    await render(<XStack align="center" gap={2} testID="stack" />);

    expect(
      String(screen.getByTestId('stack').props.className).split(' '),
    ).toEqual(expect.arrayContaining(['flex-row', 'items-center', 'gap-2']));
  });
});

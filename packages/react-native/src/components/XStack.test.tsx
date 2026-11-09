import { render, screen } from '@testing-library/react-native';
import { View } from 'react-native';

import { XStack } from './XStack';

describe('XStack', () => {
  it('renders a row with the Flex props', async () => {
    await render(<XStack align="center" gap={2} testID="stack" />);

    expect(
      String(screen.getByTestId('stack').props.className).split(' '),
    ).toEqual(expect.arrayContaining(['flex-row', 'items-center', 'gap-2']));
  });

  describe('separator', () => {
    const separators = () =>
      screen
        .getByTestId('stack')
        .children.filter(
          (child) =>
            typeof child !== 'string' && child.props.role === 'separator',
        );

    it('renders no separator by default', async () => {
      await render(
        <XStack testID="stack">
          <View />
          <View />
        </XStack>,
      );

      expect(separators()).toHaveLength(0);
    });

    it('renders a separator between each two children', async () => {
      await render(
        <XStack separator testID="stack">
          <View testID="a" />
          <View testID="b" />
          <View testID="c" />
        </XStack>,
      );

      expect(
        screen
          .getByTestId('stack')
          .children.map((child) =>
            typeof child === 'string'
              ? child
              : (child.props.testID ?? child.props.role),
          ),
      ).toEqual(['a', 'separator', 'b', 'separator', 'c']);
    });

    it('renders no separator around a single child', async () => {
      await render(
        <XStack separator testID="stack">
          <View />
        </XStack>,
      );

      expect(separators()).toHaveLength(0);
    });

    it('skips falsy children', async () => {
      await render(
        <XStack separator testID="stack">
          {null}
          <View />
          {false}
          {undefined}
          <View />
          {null}
        </XStack>,
      );

      expect(separators()).toHaveLength(1);
    });

    it('hides the separators from assistive technology', async () => {
      await render(
        <XStack separator testID="stack">
          <View />
          <View />
        </XStack>,
      );

      expect(separators()[0]).toHaveProp('aria-hidden', true);
    });

    it('renders vertical separators', async () => {
      await render(
        <XStack separator testID="stack">
          <View />
          <View />
        </XStack>,
      );

      expect(separators()[0]).toHaveProp(
        'className',
        expect.stringContaining('w-px self-stretch'),
      );
    });
  });
});

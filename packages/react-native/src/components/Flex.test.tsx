import { render, screen } from '@testing-library/react-native';

import { Flex } from './Flex';

function classesOf(testID: string) {
  return String(screen.getByTestId(testID).props.className).split(' ');
}

describe('Flex', () => {
  it('lays its children out in a row, like the web', async () => {
    await render(<Flex testID="flex" />);

    expect(classesOf('flex')).toContain('flex-row');
  });

  it('renders layout props as Tailwind classes', async () => {
    await render(
      <Flex
        align="center"
        direction="column"
        gap={4}
        gapX={2}
        gapY={3}
        justify="between"
        testID="flex"
        wrap="wrap"
      />,
    );

    expect(classesOf('flex')).toEqual(
      expect.arrayContaining([
        'flex-col',
        'flex-wrap',
        'items-center',
        'justify-between',
        'gap-4',
        'gap-x-2',
        'gap-y-3',
      ]),
    );
  });

  it('lets className override the props', async () => {
    await render(
      <Flex
        className="custom-class flex-row"
        direction="column"
        testID="flex"
      />,
    );

    expect(classesOf('flex')).toEqual(
      expect.arrayContaining(['flex-row', 'custom-class']),
    );
    expect(classesOf('flex')).not.toContain('flex-col');
  });
});

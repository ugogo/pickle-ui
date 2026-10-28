import { render, screen, within } from '@testing-library/react-native';
import { Text } from 'react-native';

import { Grid } from './Grid';

const LABELS = ['A', 'B', 'C', 'D', 'E'];

/** The labels of each grid row, empty cells as `''`. */
function gridRows() {
  return screen
    .getByTestId('grid')
    .children.map((row) =>
      typeof row === 'string'
        ? []
        : row.children.map((cell) =>
            typeof cell === 'string'
              ? cell
              : (within(cell).queryByText(/./)?.props.children ?? ''),
          ),
    );
}

function renderGrid(props: React.ComponentProps<typeof Grid>) {
  return render(
    <Grid testID="grid" {...props}>
      {LABELS.map((label) => (
        <Text key={label}>{label}</Text>
      ))}
    </Grid>,
  );
}

describe('Grid', () => {
  it('fills rows first, keeping empty cells in the last row', async () => {
    await renderGrid({ columns: 3 });

    expect(gridRows()).toEqual([
      ['A', 'B', 'C'],
      ['D', 'E', ''],
    ]);
  });

  it('fills columns first with flow="column"', async () => {
    await renderGrid({ flow: 'column', rows: 2 });

    expect(gridRows()).toEqual([
      ['A', 'C', 'E'],
      ['B', 'D', ''],
    ]);
  });

  it('stacks its children in one column by default', async () => {
    await renderGrid({});

    expect(gridRows()).toEqual([['A'], ['B'], ['C'], ['D'], ['E']]);
  });

  it('spaces rows with gapY and columns with gapX', async () => {
    await renderGrid({ columns: 2, gap: 4, gapX: 2 });

    const grid = screen.getByTestId('grid');
    expect(grid).toHaveProp('className', 'gap-y-4');
    expect(grid.children[0]).toHaveProp('className', 'flex-row gap-x-2');
  });

  it('places items in their cells', async () => {
    await renderGrid({ align: 'end', columns: 2 });
    const cell = screen.getByText('A').parent;
    expect(cell).toHaveProp('className', 'flex-1 justify-end');

    await renderGrid({ align: 'end', columns: 2, placeItems: 'center' });
    expect(screen.getByText('A').parent).toHaveProp(
      'className',
      'flex-1 items-center justify-center',
    );
  });
});

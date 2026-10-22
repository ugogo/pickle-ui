import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Combobox } from './Combobox';

type Fruit = { label: string; value: string };

const FRUITS: Fruit[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
];

function renderList() {
  return (
    <Combobox.Content>
      <Combobox.Empty>No fruit found.</Combobox.Empty>
      <Combobox.List>
        {(fruit: Fruit) => (
          <Combobox.Item key={fruit.value} value={fruit}>
            {fruit.label}
          </Combobox.Item>
        )}
      </Combobox.List>
    </Combobox.Content>
  );
}

describe('Combobox', () => {
  it('shows the selected item label in the input', () => {
    render(
      <Combobox defaultValue={FRUITS[1]} items={FRUITS}>
        <Combobox.Input aria-label="Fruit" />
        {renderList()}
      </Combobox>,
    );

    expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveValue(
      'Banana',
    );
  });

  it('filters items as the user types', () => {
    render(
      <Combobox defaultOpen items={FRUITS}>
        <Combobox.Input aria-label="Fruit" />
        {renderList()}
      </Combobox>,
    );

    fireEvent.change(screen.getByRole('combobox', { name: 'Fruit' }), {
      target: { value: 'ch' },
    });

    expect(screen.getAllByRole('option').map((o) => o.textContent)).toEqual([
      'Cherry',
    ]);
  });

  it('shows the empty state when nothing matches', () => {
    render(
      <Combobox defaultOpen items={FRUITS}>
        <Combobox.Input aria-label="Fruit" />
        {renderList()}
      </Combobox>,
    );

    fireEvent.change(screen.getByRole('combobox', { name: 'Fruit' }), {
      target: { value: 'zzz' },
    });

    expect(screen.queryAllByRole('option')).toHaveLength(0);
    expect(screen.getByText('No fruit found.')).toBeInTheDocument();
  });

  it('renders the trigger by default and the clear button on demand', () => {
    const { rerender } = render(
      <Combobox defaultValue={FRUITS[0]} items={FRUITS}>
        <Combobox.Input aria-label="Fruit" />
        {renderList()}
      </Combobox>,
    );

    expect(screen.getByLabelText('Open popup')).toBeInTheDocument();
    expect(screen.queryByLabelText('Clear')).not.toBeInTheDocument();

    rerender(
      <Combobox defaultValue={FRUITS[0]} items={FRUITS}>
        <Combobox.Input aria-label="Fruit" showClear showTrigger={false} />
        {renderList()}
      </Combobox>,
    );

    expect(screen.queryByLabelText('Open popup')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Clear')).toBeInTheDocument();
  });

  it('renders removable chips for multiple selection', () => {
    render(
      <Combobox defaultValue={[FRUITS[0], FRUITS[2]]} items={FRUITS} multiple>
        <Combobox.Chips>
          <Combobox.Value>
            {(value: Fruit[]) => (
              <>
                {value.map((fruit) => (
                  <Combobox.Chip key={fruit.value}>{fruit.label}</Combobox.Chip>
                ))}
                <Combobox.ChipsInput aria-label="Fruits" />
              </>
            )}
          </Combobox.Value>
        </Combobox.Chips>
        {renderList()}
      </Combobox>,
    );

    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Cherry')).toBeInTheDocument();

    fireEvent.click(screen.getAllByLabelText('Remove')[0]);

    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    expect(screen.getByText('Cherry')).toBeInTheDocument();
  });
});

import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';

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

  describe('onCreate', () => {
    function CreatableFruit({
      multiple = false,
      onCreate,
    }: {
      multiple?: boolean;
      onCreate: (label: string) => Fruit;
    }) {
      const [items, setItems] = React.useState(FRUITS);

      return (
        <Combobox
          items={items}
          multiple={multiple}
          onCreate={(label) => {
            const fruit = onCreate(label);
            setItems((current) => [...current, fruit]);

            return fruit;
          }}
        >
          {multiple ? (
            <Combobox.Chips>
              <Combobox.Value>
                {(value: Fruit[]) => (
                  <>
                    {value.map((fruit) => (
                      <Combobox.Chip key={fruit.value}>
                        {fruit.label}
                      </Combobox.Chip>
                    ))}
                    <Combobox.ChipsInput aria-label="Fruit" />
                  </>
                )}
              </Combobox.Value>
            </Combobox.Chips>
          ) : (
            <Combobox.Input aria-label="Fruit" />
          )}
          {renderList()}
        </Combobox>
      );
    }

    function type(text: string) {
      const input = screen.getByRole('combobox', { name: 'Fruit' });
      fireEvent.focus(input);
      // Base UI only treats events with an inputType as typed queries.
      fireEvent.input(input, {
        inputType: 'insertText',
        target: { value: text },
      });
    }

    const toFruit = (label: string): Fruit => ({
      label,
      value: label.toLowerCase(),
    });

    it('offers a create option when the input matches no item', () => {
      render(<CreatableFruit onCreate={toFruit} />);

      type('Papaya');

      expect(screen.getAllByRole('option').map((o) => o.textContent)).toEqual([
        'Create "Papaya"',
      ]);
      expect(screen.queryByText('No fruit found.')).not.toBeInTheDocument();
    });

    it('hides the create option on an exact, case-insensitive match', () => {
      render(<CreatableFruit onCreate={toFruit} />);

      type('cherry ');

      expect(screen.getAllByRole('option').map((o) => o.textContent)).toEqual([
        'Cherry',
      ]);
    });

    it('creates and selects the new item', () => {
      const handleCreate = vi.fn(toFruit);
      render(<CreatableFruit onCreate={handleCreate} />);

      type('Papaya');
      fireEvent.click(screen.getByRole('option', { name: 'Create "Papaya"' }));

      expect(handleCreate).toHaveBeenCalledWith('Papaya');
      expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveValue(
        'Papaya',
      );
    });

    it('adds the created item as a chip in multiple mode', () => {
      render(<CreatableFruit multiple onCreate={toFruit} />);

      type('Papaya');
      fireEvent.click(screen.getByRole('option', { name: 'Create "Papaya"' }));

      expect(screen.getByText('Papaya')).toHaveAttribute(
        'data-slot',
        'combobox-chip',
      );
    });

    it('appends the create option after grouped items', () => {
      const groups = [{ items: FRUITS, value: 'Fruits' }];

      render(
        <Combobox items={groups} onCreate={toFruit}>
          <Combobox.Input aria-label="Fruit" />
          <Combobox.Content>
            <Combobox.List>
              {(group: (typeof groups)[number]) => (
                <Combobox.Group items={group.items} key={group.value}>
                  <Combobox.GroupLabel>{group.value}</Combobox.GroupLabel>
                  <Combobox.Collection>
                    {(fruit: Fruit) => (
                      <Combobox.Item key={fruit.value} value={fruit}>
                        {fruit.label}
                      </Combobox.Item>
                    )}
                  </Combobox.Collection>
                </Combobox.Group>
              )}
            </Combobox.List>
          </Combobox.Content>
        </Combobox>,
      );

      type('an');

      expect(screen.getAllByRole('option').map((o) => o.textContent)).toEqual([
        'Banana',
        'Create "an"',
      ]);
    });
  });
});

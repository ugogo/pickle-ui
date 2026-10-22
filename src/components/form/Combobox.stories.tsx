import type { Meta, StoryObj } from '@storybook/react-vite';

import { cn } from '@/lib/utils';

import { type ComponentMatrixCellProps, Story } from '../_internal/Story';
import { Combobox } from './Combobox';

const meta = {
  component: Combobox,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'components/form/Combobox',
} satisfies Meta<typeof Combobox>;

export default meta;
type Fruit = {
  label: string;
  value: string;
};

type FruitGroup = {
  items: Fruit[];
  value: string;
};

type StoryDefinition = StoryObj<typeof meta>;

const FRUITS: Fruit[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Grape', value: 'grape' },
  { label: 'Kiwi', value: 'kiwi' },
  { label: 'Mango', value: 'mango' },
  { label: 'Orange', value: 'orange' },
  { label: 'Peach', value: 'peach' },
  { label: 'Pear', value: 'pear' },
  { label: 'Pineapple', value: 'pineapple' },
  { label: 'Strawberry', value: 'strawberry' },
];

const PRODUCE: FruitGroup[] = [
  {
    items: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Cherry', value: 'cherry' },
    ],
    value: 'Fruits',
  },
  {
    items: [
      { label: 'Carrot', value: 'carrot' },
      { label: 'Leek', value: 'leek' },
      { label: 'Spinach', value: 'spinach' },
    ],
    value: 'Vegetables',
  },
];

type FruitComboboxStateProps = {
  disabled?: boolean;
  inputClassName?: string;
  invalid?: boolean;
  value?: Fruit;
};

const STATE_COLUMNS: {
  key: string;
  label: string;
  props: FruitComboboxStateProps;
}[] = [
  { key: 'placeholder', label: 'Placeholder', props: {} },
  { key: 'selected', label: 'Selected', props: { value: FRUITS[0] } },
  {
    key: 'focus',
    label: 'Focus',
    props: {
      inputClassName: 'pseudo-focus-visible',
      value: FRUITS[0],
    },
  },
  {
    key: 'disabled',
    label: 'Disabled',
    props: { disabled: true, value: FRUITS[0] },
  },
  {
    key: 'invalid',
    label: 'Invalid',
    props: { invalid: true, value: FRUITS[0] },
  },
];

const STATE_PROPS = Object.fromEntries(
  STATE_COLUMNS.map((state) => [state.key, state.props]),
) as Record<string, FruitComboboxStateProps>;

function ComboboxMatrixCell({ column }: ComponentMatrixCellProps) {
  return <FruitCombobox {...STATE_PROPS[column.key]} />;
}

function FruitCombobox({
  disabled,
  inputClassName,
  invalid,
  value,
}: FruitComboboxStateProps) {
  return (
    <Combobox defaultValue={value} disabled={disabled} items={FRUITS}>
      <Combobox.Input
        aria-invalid={invalid || undefined}
        aria-label="Fruit"
        className={cn('w-48', inputClassName)}
        placeholder="Select a fruit"
      />
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
    </Combobox>
  );
}

export const All: StoryDefinition = {
  render: () => (
    <Story.Layout className="max-w-5xl" title="Combobox">
      <Story.Section title="States">
        <Story.Matrix
          Cell={ComboboxMatrixCell}
          columns={STATE_COLUMNS}
          rows={[{ key: 'combobox', label: 'Combobox' }]}
        />
      </Story.Section>

      <Story.Section title="Label and clear">
        <Combobox defaultValue={FRUITS[6]} items={FRUITS}>
          <div className="flex w-64 flex-col gap-2">
            <label
              className="text-sm leading-none font-medium"
              htmlFor="favorite-fruit"
            >
              Favorite fruit
            </label>
            <Combobox.Input
              id="favorite-fruit"
              placeholder="Search fruits…"
              showClear
            />
          </div>
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
        </Combobox>
      </Story.Section>

      <Story.Section title="Sizes">
        <div className="flex flex-wrap items-center gap-4">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <Combobox items={FRUITS} key={size}>
              <Combobox.Input
                aria-label={`Fruit (${size})`}
                className="w-48"
                placeholder={`Size ${size}`}
                size={size}
              />
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
            </Combobox>
          ))}
        </div>
      </Story.Section>

      <Story.Section title="Groups">
        <Combobox items={PRODUCE}>
          <Combobox.Input
            aria-label="Produce"
            className="w-64"
            placeholder="Search produce…"
          />
          <Combobox.Content>
            <Combobox.Empty>Nothing found.</Combobox.Empty>
            <Combobox.List>
              {(group: FruitGroup, index: number) => (
                <Combobox.Group items={group.items} key={group.value}>
                  {index > 0 ? <Combobox.Separator /> : null}
                  <Combobox.GroupLabel>{group.value}</Combobox.GroupLabel>
                  <Combobox.Collection>
                    {(item: Fruit) => (
                      <Combobox.Item key={item.value} value={item}>
                        {item.label}
                      </Combobox.Item>
                    )}
                  </Combobox.Collection>
                </Combobox.Group>
              )}
            </Combobox.List>
          </Combobox.Content>
        </Combobox>
      </Story.Section>

      <Story.Section title="Multiple">
        <Combobox defaultValue={[FRUITS[0], FRUITS[3]]} items={FRUITS} multiple>
          <Combobox.Chips className="w-80">
            <Combobox.Value>
              {(value: Fruit[]) => (
                <>
                  {value.map((fruit) => (
                    <Combobox.Chip key={fruit.value}>
                      {fruit.label}
                    </Combobox.Chip>
                  ))}
                  <Combobox.ChipsInput
                    aria-label="Fruits"
                    placeholder={value.length > 0 ? '' : 'Select fruits…'}
                  />
                </>
              )}
            </Combobox.Value>
          </Combobox.Chips>
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
        </Combobox>
      </Story.Section>
    </Story.Layout>
  ),
};

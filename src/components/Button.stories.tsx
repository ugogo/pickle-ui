import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';

import { IconPlus } from '@tabler/icons-react';

import { Button, type ButtonProps } from './Button';

const meta = {
  component: Button,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'components/Button',
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const VARIANTS: NonNullable<ButtonProps['variant']>[] = [
  'primary',
  'secondary',
  'destructive',
  'outline',
  'ghost',
  'link',
];

// Each state forces the matching CSS pseudo-state via storybook-addon-pseudo-states,
// except Default (none) and Disabled (the real `disabled` attribute).
const STATES: { label: string; props: Partial<ButtonProps> }[] = [
  { label: 'Default', props: {} },
  { label: 'Hover', props: { className: 'pseudo-hover' } },
  { label: 'Focus', props: { className: 'pseudo-focus-visible' } },
  { label: 'Active', props: { className: 'pseudo-active' } },
  { label: 'Disabled', props: { disabled: true } },
];

const SIZES: { label: string; props: Partial<ButtonProps> }[] = [
  { label: 'Medium', props: { size: 'md' } },
];

function Section({ children, title }: { children: ReactNode; title: string }) {
  return (
    <section>
      <h2 className="text-foreground mb-6 text-xl font-medium">{title}</h2>
      {children}
    </section>
  );
}

export const All: Story = {
  render: () => (
    <div className="bg-background text-foreground min-h-screen font-sans">
      <div className="mx-auto max-w-5xl px-8 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Button</h1>
        </header>

        <div className="space-y-16">
          <Section title="Variants &times; States">
            <div className="overflow-x-auto">
              <table className="bg-card w-full border-collapse">
                <thead>
                  <tr className="border-border bg-border/10 border">
                    <th aria-hidden="true" className="w-28 px-3 py-2.5" />
                    {STATES.map((state) => (
                      <th
                        className="text-muted-foreground border-border border p-3 text-center text-xs font-medium"
                        key={state.label}
                      >
                        {state.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {VARIANTS.map((variant) => (
                    <tr className="border-border border" key={variant}>
                      <td className="text-muted-foreground border-border border pl-6 align-middle text-xs font-medium capitalize">
                        {variant}
                      </td>
                      {STATES.map((state) => (
                        <td
                          className="border-border border p-3 text-center align-middle"
                          key={state.label}
                        >
                          <Button variant={variant} {...state.props}>
                            Button
                          </Button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="Sizes">
            <div className="flex flex-wrap items-center gap-3">
              {SIZES.map((s) => (
                <Button key={s.label} {...s.props}>
                  Add
                </Button>
              ))}
              <Button aria-label="Add" size="icon">
                <IconPlus stroke={2} />
              </Button>
              <Button aria-label="Add">
                <IconPlus stroke={2} />
                Add
              </Button>
            </div>
          </Section>
        </div>
      </div>
    </div>
  ),
};

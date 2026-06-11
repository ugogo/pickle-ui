import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconPlus } from '@tabler/icons-react';
import { Button, type ButtonProps } from './Button';

const meta = {
  title: 'components/Button',
  component: Button,
  parameters: {
    layout: 'fullscreen',
  },
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

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-6 text-xl font-medium text-foreground">{title}</h2>
      {children}
    </section>
  );
}

export const All: Story = {
  render: () => (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <div className="mx-auto max-w-5xl px-8 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Button</h1>
        </header>

        <div className="space-y-16">
          <Section title="Variants &times; States">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-card">
                <thead>
                  <tr className="border border-border bg-border/10">
                    <th className="w-28 px-3 py-2.5" aria-hidden="true" />
                    {STATES.map((state) => (
                      <th
                        key={state.label}
                        className="p-3 text-center text-xs font-medium text-muted-foreground border border-border"
                      >
                        {state.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {VARIANTS.map((variant) => (
                    <tr key={variant} className="border border-border">
                      <td className="align-middle pl-6 text-xs font-medium text-muted-foreground border border-border capitalize">
                        {variant}
                      </td>
                      {STATES.map((state) => (
                        <td
                          key={state.label}
                          className="p-3 text-center align-middle border border-border"
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
              <Button size="icon" aria-label="Add">
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

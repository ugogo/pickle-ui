import type { Meta, StoryObj } from '@storybook/react-vite';

import { Slider } from './Slider';
import { Section, StoryLayout } from './story-utils';

const meta = {
  component: Slider,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'components/Slider',
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

const STEP_MAX = 12;
const STEP_SKIP_INTERVAL = 2;

export const All: Story = {
  render: () => (
    <StoryLayout className="max-w-2xl" title="Slider">
      <Section title="Default">
        <div className="flex flex-col gap-10">
          <Slider defaultValue={[33]} />
          <Slider defaultValue={[25, 75]} />
          <Slider defaultValue={[50]} disabled />
        </div>
      </Section>

      <Section title="With labels">
        <div className="flex flex-col gap-10">
          <Slider defaultValue={[60]}>
            <Slider.Label className="mb-3">Volume</Slider.Label>
          </Slider>

          <Slider defaultValue={[40]}>
            <div className="mb-3 flex items-center justify-between">
              <Slider.Label>Brightness</Slider.Label>
              <Slider.Value />
            </div>
          </Slider>

          <Slider defaultValue={[20, 80]}>
            <div className="mb-3 flex items-center justify-between">
              <Slider.Label>Price range</Slider.Label>
              <Slider.Value />
            </div>
          </Slider>
        </div>
      </Section>

      <Section title="With steps">
        <div>
          <Slider
            aria-label="Value selector"
            defaultValue={[5]}
            max={STEP_MAX}
            step={1}
          />
          <Slider.Marks
            labelInterval={STEP_SKIP_INTERVAL}
            max={STEP_MAX}
            step={1}
          />
        </div>
      </Section>
    </StoryLayout>
  ),
};

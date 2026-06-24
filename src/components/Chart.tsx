import * as React from 'react';

import { cn } from '@/lib/utils';

import { Text } from './Text';
import { XStack } from './XStack';
import { YStack } from './YStack';

type ChartBarProps = {
  className?: string;
  colorClassName?: string;
  index?: number;
};

type ChartContextValue = {
  items: ChartItem[];
  max: number;
};

type ChartItem = {
  label: string;
  value: number;
};

type ChartProps = {
  children?: React.ReactNode;
  className?: string;
  items: ChartItem[];
  max?: number;
};

type ChartXAxisProps = {
  className?: string;
};

const ChartContext = React.createContext<ChartContextValue | null>(null);

function ChartBar({
  className,
  colorClassName = 'bg-chart-1',
  index = 0,
}: ChartBarProps) {
  const { items, max } = useChartContext();
  const item = items[index];

  if (!item) {
    return null;
  }

  return (
    <div
      className={cn(
        'w-full max-w-10 rounded-t-md transition-[height]',
        colorClassName,
        className,
      )}
      data-slot="chart-bar"
      style={{
        height: `${(item.value / max) * 100}%`,
        opacity: 0.45 + index * 0.08,
      }}
    />
  );
}

function ChartBarChart({ children, className }: React.ComponentProps<'div'>) {
  const { items } = useChartContext();

  return (
    <XStack
      align="end"
      className={cn('h-48', className)}
      gap={2}
      justify="between"
    >
      {items.map((item, index) => (
        <YStack
          align="center"
          className="h-full flex-1"
          gap={2}
          justify="end"
          key={item.label}
        >
          {React.Children.map(children, (child) =>
            React.isValidElement<ChartBarProps>(child)
              ? React.cloneElement(child, { index })
              : child,
          )}
        </YStack>
      ))}
    </XStack>
  );
}

function ChartRoot({ children, className, items, max }: ChartProps) {
  const resolvedMax = max ?? Math.max(...items.map((item) => item.value), 1);
  const contextValue = React.useMemo(
    () => ({ items, max: resolvedMax }),
    [items, resolvedMax],
  );

  return (
    <ChartContext.Provider value={contextValue}>
      <div className={cn('w-full', className)} data-slot="chart">
        {children}
      </div>
    </ChartContext.Provider>
  );
}

function ChartXAxis({ className }: ChartXAxisProps) {
  const { items } = useChartContext();

  return (
    <XStack className={cn('mt-2', className)} gap={2} justify="between">
      {items.map((item) => (
        <Text
          className="flex-1 text-center"
          key={item.label}
          tone="muted"
          variant="small"
        >
          {item.label}
        </Text>
      ))}
    </XStack>
  );
}

function useChartContext() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error('Chart parts must be used within Chart.');
  }

  return context;
}

const Chart = Object.assign(ChartRoot, {
  Bar: ChartBar,
  BarChart: ChartBarChart,
  XAxis: ChartXAxis,
});

export { Chart, ChartBar, ChartBarChart, ChartXAxis, useChartContext };
export type { ChartBarProps, ChartItem, ChartProps, ChartXAxisProps };

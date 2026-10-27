import { type ComponentType, type ReactNode } from 'react';
import { ScrollView, View } from 'react-native';

import { cn } from '../../lib/cn';
import { Text } from '../Text';

type ComponentMatrixCellProps = {
  column: ComponentMatrixColumn;
  row: ComponentMatrixRow;
};

type ComponentMatrixColumn = {
  description?: string;
  key: string;
  label: string;
};

type ComponentMatrixProps = {
  Cell: ComponentType<ComponentMatrixCellProps>;
  cellClassName?: string;
  className?: string;
  columns: ComponentMatrixColumn[];
  rows: ComponentMatrixRow[];
};

type ComponentMatrixRow = {
  description?: string;
  key: string;
  label: string;
};

// Same layout as `Story` in @pickle-ui/react, built on React Native
// primitives: a 12rem column of row labels, then one column per matrix
// column that grows from 12rem, like the web's `minmax(12rem, 1fr)`, since
// React Native has no CSS grid.
function Layout({
  children,
  className,
  title,
}: {
  children: ReactNode;
  className?: string;
  title: string;
}) {
  return (
    <View className="bg-background min-h-screen">
      <View className={cn('px-8 py-12', className)}>
        <View className="mb-12">
          <Text variant="h1">{title}</Text>
        </View>
        <View className="gap-16">{children}</View>
      </View>
    </View>
  );
}

function Matrix({
  Cell,
  cellClassName,
  className,
  columns,
  rows,
}: ComponentMatrixProps) {
  return (
    <ScrollView
      className={cn('border-border bg-card/20 rounded-md border', className)}
      contentContainerClassName="min-w-full"
      horizontal
    >
      <View className="flex-1">
        <View className="flex-row">
          <View className="border-border bg-muted/30 w-48 border-r border-b p-3" />
          {columns.map((column, columnIndex) => (
            <View
              className={cn(
                'border-border bg-muted/30 min-w-48 flex-1 border-b p-3',
                columnIndex < columns.length - 1 && 'border-r',
              )}
              key={column.key}
            >
              <Text className="font-medium">{column.label}</Text>
              {column.description ? (
                <Text className="mt-1" tone="muted" variant="small">
                  {column.description}
                </Text>
              ) : null}
            </View>
          ))}
        </View>

        {rows.map((row, rowIndex) => (
          <View className="flex-row" key={row.key}>
            <View
              className={cn(
                'border-border bg-background/80 w-48 border-r p-3',
                rowIndex < rows.length - 1 && 'border-b',
              )}
            >
              <Text className="font-medium">{row.label}</Text>
              {row.description ? (
                <Text className="mt-1 max-w-40" tone="muted" variant="small">
                  {row.description}
                </Text>
              ) : null}
            </View>
            {columns.map((column, columnIndex) => (
              <View
                className={cn(
                  'border-border bg-background/55 min-h-24 min-w-48 flex-1 items-center justify-center p-4',
                  rowIndex < rows.length - 1 && 'border-b',
                  columnIndex < columns.length - 1 && 'border-r',
                  cellClassName,
                )}
                key={`${row.key}-${column.key}`}
              >
                <Cell column={column} row={row} />
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function Section({ children, title }: { children: ReactNode; title: string }) {
  return (
    <View>
      <Text className="mb-6" variant="h3">
        {title}
      </Text>
      {children}
    </View>
  );
}

const Story = Object.assign(Layout, {
  Layout,
  Matrix,
  Section,
});

export { Story };
export type {
  ComponentMatrixCellProps,
  ComponentMatrixColumn,
  ComponentMatrixRow,
};

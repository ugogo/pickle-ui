import { type ComponentType, Fragment, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

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
  cellWidth?: string;
  className?: string;
  columns: ComponentMatrixColumn[];
  rows: ComponentMatrixRow[];
};

type ComponentMatrixRow = {
  description?: string;
  key: string;
  label: string;
};

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
    <div className="bg-background text-foreground min-h-screen font-sans">
      <div className={cn('mx-auto px-8 py-12', className)}>
        <header className="mb-12">
          <Text as="h1" variant="h1">
            {title}
          </Text>
        </header>
        <div className="space-y-16">{children}</div>
      </div>
    </div>
  );
}

function Matrix({
  Cell,
  cellClassName,
  cellWidth = 'minmax(12rem, 1fr)',
  className,
  columns,
  rows,
}: ComponentMatrixProps) {
  const resolvedCellWidth =
    cellWidth.includes('fr') || cellWidth.includes('minmax(')
      ? cellWidth
      : `minmax(${cellWidth}, 1fr)`;

  return (
    <div
      className={cn(
        'border-border bg-card/20 overflow-x-auto rounded-md border',
        className,
      )}
    >
      <div
        className="grid min-w-max"
        style={{
          gridTemplateColumns: `12rem repeat(${columns.length}, ${resolvedCellWidth})`,
        }}
      >
        <div className="border-border bg-muted/30 border-r border-b p-3" />
        {columns.map((column, columnIndex) => (
          <div
            className={cn(
              'border-border bg-muted/30 border-b p-3',
              columnIndex < columns.length - 1 && 'border-r',
            )}
            key={column.key}
          >
            <div className="text-foreground text-sm font-medium">
              {column.label}
            </div>
            {column.description ? (
              <div className="text-muted-foreground mt-1 text-xs">
                {column.description}
              </div>
            ) : null}
          </div>
        ))}

        {rows.map((row, rowIndex) => (
          <Fragment key={row.key}>
            <div
              className={cn(
                'border-border bg-background/80 border-r p-3',
                rowIndex < rows.length - 1 && 'border-b',
              )}
            >
              <div className="text-foreground text-sm font-medium">
                {row.label}
              </div>
              {row.description ? (
                <div className="text-muted-foreground mt-1 max-w-40 text-xs">
                  {row.description}
                </div>
              ) : null}
            </div>
            {columns.map((column, columnIndex) => (
              <div
                className={cn(
                  'border-border bg-background/55 flex min-h-24 items-center justify-center p-4',
                  rowIndex < rows.length - 1 && 'border-b',
                  columnIndex < columns.length - 1 && 'border-r',
                  cellClassName,
                )}
                key={`${row.key}-${column.key}`}
              >
                <Cell column={column} row={row} />
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function Section({ children, title }: { children: ReactNode; title: string }) {
  return (
    <section>
      <Text as="h2" className="mb-6" variant="h3">
        {title}
      </Text>
      {children}
    </section>
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

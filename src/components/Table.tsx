import * as React from 'react';

import { cn } from '@/lib/utils';

type TableBodyProps = React.ComponentProps<'tbody'>;
type TableCaptionProps = React.ComponentProps<'caption'>;
type TableCellProps = React.ComponentProps<'td'>;
type TableFooterProps = React.ComponentProps<'tfoot'>;
type TableHeaderProps = React.ComponentProps<'thead'>;
type TableHeadProps = React.ComponentProps<'th'>;
type TableProps = {
  children?: React.ReactNode;
  className?: string;
};
type TableRowProps = React.ComponentProps<'tr'>;

function TableBody({ className, ...props }: TableBodyProps) {
  return (
    <tbody
      className={cn('[&_tr:last-child]:border-0', className)}
      data-slot="table-body"
      {...props}
    />
  );
}

function TableCaption({ className, ...props }: TableCaptionProps) {
  return (
    <caption
      className={cn('text-muted-foreground mt-4 text-sm', className)}
      data-slot="table-caption"
      {...props}
    />
  );
}

function TableCell({ className, ...props }: TableCellProps) {
  return (
    <td
      className={cn('p-4 align-middle text-sm', className)}
      data-slot="table-cell"
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: TableFooterProps) {
  return (
    <tfoot
      className={cn(
        'bg-muted/50 border-t font-medium [&>tr]:last:border-b-0',
        className,
      )}
      data-slot="table-footer"
      {...props}
    />
  );
}

function TableHead({ className, ...props }: TableHeadProps) {
  return (
    <th
      className={cn(
        'text-muted-foreground h-10 px-4 text-left align-middle text-xs font-medium tracking-wide uppercase',
        className,
      )}
      data-slot="table-head"
      {...props}
    />
  );
}

function TableHeader({ className, ...props }: TableHeaderProps) {
  return (
    <thead
      className={cn('[&_tr]:border-b', className)}
      data-slot="table-header"
      {...props}
    />
  );
}

function TableRoot({ children, className }: TableProps) {
  return (
    <div
      className={cn('relative w-full overflow-auto', className)}
      data-slot="table-container"
    >
      <table className="w-full caption-bottom text-sm" data-slot="table">
        {children}
      </table>
    </div>
  );
}

function TableRow({ className, ...props }: TableRowProps) {
  return (
    <tr
      className={cn(
        'border-border hover:bg-muted/50 border-b transition-colors',
        className,
      )}
      data-slot="table-row"
      {...props}
    />
  );
}

const Table = Object.assign(TableRoot, {
  Body: TableBody,
  Caption: TableCaption,
  Cell: TableCell,
  Footer: TableFooter,
  Head: TableHead,
  Header: TableHeader,
  Row: TableRow,
});

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
};
export type {
  TableBodyProps,
  TableCaptionProps,
  TableCellProps,
  TableFooterProps,
  TableHeaderProps,
  TableHeadProps,
  TableProps,
  TableRowProps,
};

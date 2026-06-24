import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Table } from './Table';

describe('Table', () => {
  it('renders header and body cells', () => {
    render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Atlas</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,
    );

    expect(
      screen.getByRole('columnheader', { name: 'Name' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Atlas' })).toBeInTheDocument();
  });
});

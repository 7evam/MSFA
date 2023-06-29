import React, { useState } from 'react';
import styled from 'styled-components';
import '@fontsource/open-sans';
import {
  useReactTable, getCoreRowModel, getSortedRowModel, flexRender,
} from '@tanstack/react-table';
import { useSelector } from 'react-redux';
import MonthTicker from '../../components/MonthTicker';
import { mobileBreakPoint } from '../../constants/style';
import { convertDateObjToReadable } from '../../utils';

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
    margin-top: 50px;
`;

const MonthContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 18px;
`;

const YearContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 18px;
`;

const Td = styled.td`
  padding: 12px;
`;

const Th = styled.th``;

const Tr = styled.tr``;

const Table = styled.table`
@media (max-width: ${mobileBreakPoint}){
   width: 100%;
  }

`;

function TransactionTable({ filteredTransactions }) {
  const { selectedYear } = useSelector((state) => ({
    ...state.sportReducer,
  }));

  const [sorting, setSorting] = useState([]);
  const [columns, setColumns] = useState([
    {
      header: 'Transaction Type',
      accessorKey: 'transaction_type',
    },
    {
      header: 'Transactor',
      accessorKey: 'user_id',
    },
    {
      header: 'Transaction Time',
      accessorKey: 'transaction_time',
      cell: (props) => <>{`${convertDateObjToReadable(new Date(props.getValue()))}`}</>,
    },
    {
      header: 'Team Added',
      accessorKey: 'team_added',
    },
    {
      header: 'Team Added Value',
      accessorKey: 'team_added_value',
      cell: (props) => <>{`$${props.getValue()}`}</>,
    },
    {
      header: 'Team Dropped',
      accessorKey: 'team_dropped',
    }, {
      header: 'Team Dropped Value',
      accessorKey: 'team_dropped_value',
      cell: (props) => <>{`$${props.getValue()}`}</>,
    },
  ]);

  const table = useReactTable({
    data: filteredTransactions,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: false,
  });

  return (
    <Table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Th key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder ? null : (
                  <div
                    {...{
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted()] ?? null}
                  </div>
                )}
              </Th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table
          .getRowModel()
          .rows
          .map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext(),
                  )}
                </Td>
              ))}
            </Tr>
          ))}
      </tbody>
    </Table>
  );
}

export default TransactionTable;

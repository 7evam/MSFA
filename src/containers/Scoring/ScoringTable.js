import React, {
  useState, useEffect, useReducer, useMemo,
} from 'react';
import styled from 'styled-components';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useSelector } from 'react-redux';
import { mediumBlue, lightBlue } from '../../constants/style';

const Td = styled.td`
    width: 33%;
    height: 20px;
`;

const Tr = styled.tr`
background-color: ${mediumBlue};
    &:nth-child(odd) {
    background-color: ${lightBlue};
    }
`;

const Table = styled.table`
    width: 100%;
    overflow-x: scroll;
`;

const Th = styled.th`
    font-weight: 800;
    cursor: pointer;
    &:hover{
      text-decoration: underline;
    }
`;

function ScoringTable({
  filteredPoints,
}) {
  const [sorting, setSorting] = useState([]);
  const [columns, setColumns] = useState([
    {
      header: 'Name',
      accessorKey: 'teamName',
    },
    {
      header: 'Points',
      accessorKey: 'points',
    },
  ]);

  const table = useReactTable({
    data: filteredPoints,
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
    filteredPoints
      ? (
        <div>
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
        </div>
      ) : <p>Loading...</p>
  );
}

export default ScoringTable;

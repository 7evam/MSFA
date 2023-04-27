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
  roflMonth, scores, sportTeams, league,
}) {
  const [data, setData] = useState(null);

  const {
    selectedYear,
  } = useSelector((state) => ({
    ...state.sportReducer,
  }));

  useEffect(() => {
    const result = [];

    Object.keys(scores.points[league][`${roflMonth}-${selectedYear}`]).forEach((teamId) => {
      result.push({
        id: teamId,
        teamName: `${sportTeams[league][teamId].city} ${sportTeams[league][teamId].name}`,
        points: scores.points[league][`${roflMonth}-${selectedYear}`][teamId],
      });
    });
    setData(result);
  }, []);

  // useEffect(() => {
  //     // change format
  //     if(league === 1){
  //         playoffs ? setColumns(mlbPlayoffs) : setColumns(mlbReg)
  //     } else if(league === 2){
  //         playoffs ? setColumns(nflPlayoffs) : setColumns(nflReg)
  //     } else if(league === 3){
  //         playoffs ? setColumns(nhlPlayoffs) : setColumns(nhlReg)
  //     } else if(league ===4){
  //         playoffs ? setColumns(nbaPlayoffs) : setColumns(nbaReg)
  //     }
  // }, [league, playoffs]);

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
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: false,
  });

  console.log('here is data and league');
  console.log(data);
  console.log(league);

  return (
    data
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

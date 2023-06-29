import React, { useState } from 'react';
import styled from 'styled-components';
import '@fontsource/open-sans';
import {
  useReactTable, getCoreRowModel, getSortedRowModel, flexRender,
} from '@tanstack/react-table';
import { useSelector } from 'react-redux';
import MonthTicker from '../../components/MonthTicker';
import { mobileBreakPoint } from '../../constants/style';
import TransactionTable from './TransactionTable';

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
  &:hover {
    font-weight: 700;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Th = styled.th``;

const Tr = styled.tr``;

const Table = styled.table`
@media (max-width: ${mobileBreakPoint}){
   width: 100%;
  }

`;

function PastTransactions({ transactions }) {
  const { selectedYear } = useSelector((state) => ({
    ...state.sportReducer,
  }));
  const [roflMonth, setRoflMonth] = useState(
    transactions ? Math.max(...Object.keys(transactions)) : null,
  );
  const [sorting, setSorting] = useState([]);
  const [columns, setColumns] = useState([
    {
      header: 'Transaction Type',
      accessorKey: 'transaction_type',
    },
    {
      header: 'Team Added',
      accessorKey: 'team_added',
    },
    {
      header: 'Team Added Value',
      accessorKey: 'team_dropped_value',
    },
    {
      header: 'Team Dropped',
      accessorKey: 'team_dropped',
    }, {
      header: 'Team Dropped Value',
      acessorKey: 'team_dropped_value',
    }, {
      header: 'Transaction Time',
      acessorKey: 'transaction_time',
    },
  ]);

  const table = useReactTable({
    data: transactions,
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
    transactions
      ? (
        <Container>
          <MonthTicker
            roflMonth={roflMonth}
            setRoflMonth={setRoflMonth}
            onlyShownMonths={Object.keys(transactions).map((n) => Number(n))}
            selectedYear={selectedYear}
          />
          <MonthContainer>
            <p>
              MSFA Month:
              {roflMonth}
            </p>
          </MonthContainer>
          {
            transactions[roflMonth].length
              ? (
                <TransactionTable
                  filteredTransactions={transactions[roflMonth]}
                />
              )
              : <p>No transactions for this month</p>
          }

        </Container>
      ) : <p>Loading...</p>
  );
}

export default PastTransactions;

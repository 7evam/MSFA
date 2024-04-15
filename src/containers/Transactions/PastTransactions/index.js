import React, { useState } from 'react';
import styled from 'styled-components';
import '@fontsource/open-sans';
import {
  useReactTable, getCoreRowModel, getSortedRowModel, flexRender,
} from '@tanstack/react-table';
import { useSelector } from 'react-redux';
import MonthSelector from '../../../components/MonthSelector';
import { mobileBreakPoint } from '../../../constants/style';
import TransactionTable from './TransactionTable';
import { Container, NoTrxContainer } from './components';

function PastTransactions({ transactions }) {
  const { selectedYear } = useSelector((state) => ({
    ...state.sportReducer,
  }));
  const [roflMonth, setRoflMonth] = useState(
    transactions ? Math.max(...Object.keys(transactions)) : null,
  );

  return (
    transactions
      ? (
        <Container>
          <MonthSelector
            selectedMonth={roflMonth}
            setSelectedMonth={setRoflMonth}
            onlyShownMonths={Object.keys(transactions).map((n) => Number(n))}
          />
          {
            transactions[roflMonth]?.length
              ? (
                <TransactionTable
                  filteredTransactions={transactions[roflMonth]}
                />

              )
              : <NoTrxContainer>No transactions for this month</NoTrxContainer>
          }

        </Container>
      ) : <p>Loading...</p>
  );
}

export default PastTransactions;
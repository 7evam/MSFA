import React, { useState } from 'react';
import styled from 'styled-components';
import '@fontsource/open-sans';
import {
  useReactTable, getCoreRowModel, getSortedRowModel, flexRender,
} from '@tanstack/react-table';
import { useSelector } from 'react-redux';
import MonthSelector from '../../components/MonthSelector';
import { mobileBreakPoint } from '../../constants/style';
import TransactionTable from './TransactionTable';


const Container = styled.div`
width: 100%;
max-width: 800px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
    margin-top: 50px;
`;

const NoTrxContainer = styled.div`
margin-top: 20px;
width: 100%;
max-width: 800px;
`

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

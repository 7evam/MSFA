import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import '@fontsource/open-sans';
import {
  useReactTable, getCoreRowModel, getSortedRowModel, flexRender,
} from '@tanstack/react-table';
import { useSelector } from 'react-redux';
import MonthTicker from '../../../components/MonthTicker';
import { mobileBreakPoint } from '../../../constants/style';
import { convertDateObjToReadable, shortenName } from '../../../utils';
import { Cell, CellContent, TableContainer, HeaderLabel } from './components';

function TransactionTable({ filteredTransactions }) {
  const { selectedYear } = useSelector((state) => ({
    ...state.sportReducer,
  }));

  const { orgMembers } = useSelector((state) => ({
    ...state.sportReducer,
  }));

  return (
    <TableContainer>
      <HeaderLabel><CellContent>Transaction Type</CellContent></HeaderLabel>
      <HeaderLabel><CellContent>Transactor</CellContent></HeaderLabel>
      <HeaderLabel><CellContent>Transaction Time</CellContent></HeaderLabel>
      <HeaderLabel><CellContent>Team Added</CellContent></HeaderLabel>
      <HeaderLabel><CellContent>Team Dropped</CellContent></HeaderLabel>
      {filteredTransactions.map(trx => (
        <Fragment>
          <Cell firstItem>
            <CellContent>{trx.transaction_type}</CellContent>
          </Cell>
          <Cell>
            <CellContent>{shortenName(orgMembers[trx.user_id].team_name)}</CellContent>
          </Cell>
          <Cell>
            <CellContent>{convertDateObjToReadable(new Date(trx.transaction_time))}</CellContent>
          </Cell>
          <Cell>
            <CellContent>{trx.team_added ? `${trx.team_added} ($${trx.team_added_value})` : "-"} </CellContent>
          </Cell>
          <Cell>
            {
              trx.team_dropped ?
                <CellContent>{trx.team_dropped} (${trx.team_dropped_value})</CellContent>
                : <CellContent>-</CellContent>}
          </Cell>

        </Fragment>
      ))}
    </TableContainer>
  );
}

export default TransactionTable;
import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import '@fontsource/open-sans';
import {
  useReactTable, getCoreRowModel, getSortedRowModel, flexRender,
} from '@tanstack/react-table';
import { useSelector } from 'react-redux';
import MonthTicker from '../../components/MonthTicker';
import { mobileBreakPoint } from '../../constants/style';
import { convertDateObjToReadable, shortenName } from '../../utils';

const CellContent = styled.p`
display: inline-block;
width: 100%;
position: relative;
`

const TableContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 2fr) 3fr repeat(2, 4fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    width: 90%;
    margin-top: 15px;
    border: 2px solid #E5EAF4;
    border-radius: 10px;
    & div:nth-child(7n+14),
    & div:nth-child(7n+15),
    & div:nth-child(7n+16),
    & div:nth-child(7n+17),
    & div:nth-child(7n+18),
    & div:nth-child(7n+19),
    & div:nth-child(7n+20), {
      background-color: #F7FBFF;
    }
  }
`;

const Cell = styled.div`
padding: 5px;
text-align: center;
    position: relative;
    border-bottom: ${(props) => (props.isLastInList ? null : '2px solid #E5EAF4')}; 
    background-color: ${(props) => (props.colored ? '#F7FBFF' : 'white')};
    &:hover{
        text-decoration: ${(props) => (props.teamName ? 'underline' : null)}; 
        cursor: ${(props) => (props.teamName ? 'pointer' : null)}; 
    }
    @media (min-width: ${mobileBreakPoint}){
        ${(props) => !props.firstItem && `
            &:before {
                content: "";
                left: 0;
                z-index: 100;
                position: absolute; 
                top: 40%;
                height: 20%; 
                border-right: 2px solid #E5EAF4;
                margin-right: 8px;
            }
        `}
    }
    
    @media (max-width: ${mobileBreakPoint}){
        font-size: 14px;
    }
`;

const HeaderLabel = styled.div`
    padding: 5px;
    background-color: #F7FBFF;
    font-weight: 800;
    font-size: 14px;
    text-align: center;
    &:hover{
      cursor: pointer;
      text-decoration: underline;
  }
    @media (max-width: ${mobileBreakPoint}){
      font-size: 10px;
      padding-right: 16px;
     }
`;

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
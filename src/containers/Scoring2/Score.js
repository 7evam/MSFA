import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { mobileBreakPoint } from '../../constants/style';
import MonthSelector from '../../components/MonthSelector';

const ScoringContainer = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr; 
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    width: 90%;
`;

const Cell = styled.div`
padding: 16px 0px 8px 16px;
border-bottom: ${(props) => (props.isLastInList ? null : '2px solid #E5EAF4')}; 
background-color: lightBlue;
`;
const HeaderLabel = styled.div`
    padding: 16px 0px 8px 16px;
    text-align:center;
    background-color: #EAEEF480;
    font-weight: 800;
    font-size: 14px;
    @media (max-width: ${mobileBreakPoint}){
      font-size: 10px;
      padding-right: 16px;
     }
`;

function Score(props) {
  return (
    <>
      <MonthSelector
        finalMonthForDisplay={props.finalMonthForDisplay}
        selectedMonth={props.selectedMonth}
        setSelectedMonth={props.setSelectedMonth}
      />
      <ScoringContainer>
        <HeaderLabel>Team</HeaderLabel>
        <HeaderLabel>Points</HeaderLabel>
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
      </ScoringContainer>
    </>
  );
}

export default Score;

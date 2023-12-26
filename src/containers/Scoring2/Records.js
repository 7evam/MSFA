import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { mobileBreakPoint } from '../../constants/style';
import MonthSelector from '../../components/MonthSelector';

const RecordsContainer = styled.div`
    display: grid;
    : ; 
    grid-template-columns: ${(props) => (props.league === 2 || props.league === 3 ? '2fr 1fr 1fr 1fr' : '2fr 1fr 1fr')}; 
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
    &:hover{
        text-decoration: underline;
        cursor: pointer;
    }
    @media (max-width: ${mobileBreakPoint}){
      font-size: 10px;
      padding-right: 16px;
     }
`;

function Records(props) {
  const leagueHeadersSwitch = (league) => {
    switch (league) {
      case 1: return (
        <>
          <HeaderLabel>Wins</HeaderLabel>
          <HeaderLabel>Losses</HeaderLabel>
        </>
      );
      case 2: return (
        <>
          <HeaderLabel>Wins</HeaderLabel>
          <HeaderLabel>Losses</HeaderLabel>
          <HeaderLabel>Ties</HeaderLabel>

        </>
      );
      case 3: return (
        <>
          <HeaderLabel>Wins</HeaderLabel>
          <HeaderLabel>Losses</HeaderLabel>
          <HeaderLabel>OT Losses</HeaderLabel>

        </>
      );
      case 4: return (
        <>
          <HeaderLabel>Wins</HeaderLabel>
          <HeaderLabel>Losses</HeaderLabel>
        </>
      );
      default: return <p>error</p>;
    }
  };

  return (
    <>
      <MonthSelector
        finalMonthForDisplay={props.finalMonthForDisplay}
        selectedMonth={props.selectedMonth}
        setSelectedMonth={props.setSelectedMonth}
      />
      <RecordsContainer league={props.league}>
        <HeaderLabel>Team</HeaderLabel>
        {leagueHeadersSwitch(props.league)}

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
      </RecordsContainer>
    </>
  );
}

export default Records;

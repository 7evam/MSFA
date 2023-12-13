import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Slot from '../../components/Roster2/Slot';
import Loading from '../../components/Loading';
import MonthSelector from '../../components/MonthSelector';
import { mobileBreakPoint } from '../../constants/style';
import useStandings from './useStandings';
import StandingsSlot from './StandingsSlot';
import { Container } from './components';

const StandingsContainer = styled.div`
    margin-top: 15px;
    border: 2px solid #E5EAF4;
    border-radius: 10px;
    display: grid;
    grid-template-columns: 1fr 3fr 3fr 2fr 2fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    width: 90%;
    & div:nth-child(10n+11){
      background-color: #F7FBFF;
    }
    & div:nth-child(10n+12){
      background-color: #F7FBFF;
    }
    & div:nth-child(10n+13){
      background-color: #F7FBFF;
    }
    & div:nth-child(10n+14){
      background-color: #F7FBFF;
      z-index: -1;
    }
    & div:nth-child(10n+15){
      background-color: #F7FBFF;
      z-index: -1;
    }
`;

const HeaderLabel = styled.div`
    padding: 16px 0px 8px 16px;
    text-align:center;
    background-color: #EAEEF480;
    font-weight: 800;
    font-size: 14px;
    @media (max-width: ${mobileBreakPoint}){
      font-size: 14px;
      padding-right: 16px;
     }
`;

function Standings() {
  const { selectedYear } = useSelector((state) => ({
    ...state.sportReducer,
  }));

  const {
    selectedMonth,
    setSelectedMonth,
    standings,
    finalMonthForDisplay,
  } = useStandings();

  // if (standings && standings[`${selectedMonth}-${selectedYear}`]) {
  //   console.log(standings[`${selectedMonth}-${selectedYear}`]);
  // }

  return (
    standings && standings[`${selectedMonth}-${selectedYear}`]
      ? (
        <Container>
          <MonthSelector finalMonthForDisplay={finalMonthForDisplay} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
          <StandingsContainer>
            <HeaderLabel>Rank</HeaderLabel>
            <HeaderLabel>Manager</HeaderLabel>
            <HeaderLabel>Team</HeaderLabel>
            <HeaderLabel>Monthly Points</HeaderLabel>
            <HeaderLabel>Total Points</HeaderLabel>
            {
              standings[`${selectedMonth}-${selectedYear}`].map((item, index) => (
                <StandingsSlot
                  selectedMonth={selectedMonth}
                  rank={index + 1}
                  item={item}
                />
              ))
            }
          </StandingsContainer>
        </Container>
      )
      : <Loading />
  );
}

export default Standings;

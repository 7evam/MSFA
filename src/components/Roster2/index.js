import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Slot from './Slot';
import useRoster from './useRoster';
import Loading from '../Loading';
import MonthSelector from '../MonthSelector';
import { mobileBreakPoint } from '../../constants/style';

const Container = styled.div`
    margin-top: 15px;
    border: 2px solid #E5EAF4;
    border-radius: 10px;
    display: grid;
    grid-template-columns: 1fr 3fr repeat(2, 1fr);
    grid-template-rows: repeat(4, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    width: 90%;
    & div:nth-child(8n+9){
        background-color: #F7FBFF;
    }
    & div:nth-child(8n+10){
        background-color: #F7FBFF;
    }
    & div:nth-child(8n+11){
        background-color: #F7FBFF;
    }
    & div:nth-child(8n+12){
        background-color: #F7FBFF;
        z-index: -1;
    }
`;

const HeaderLabel = styled.div`
    padding: 16px 0px 8px 16px;
    text-align:center;
    background-color: #EAEEF480;
    font-weight: 800;
    @media (max-width: ${mobileBreakPoint}){
      font-size: 14px;
      padding-right: 16px;
     }
`;

function Roster() {
  const {
    selectedYear,
    selectedMonth,
    roster,
    selectedSlot,
    setSelectedMonth,
    changeRoster,
  } = useRoster();

  const currentRoster = (roster && selectedMonth) ? roster[`${selectedMonth}-${selectedYear}`] : null;

  const leagueIdSlotNameTable = {
    1: 'MLB',
    2: 'NFL',
    3: 'NHL',
    4: 'NBA',
  };

  const calculateTotalScore = () => {
    const totalScore = Object.entries(currentRoster)
      .filter(([key]) => !key.includes('bench'))
      .map(([, subObject]) => subObject.roflScore)
      .reduce((accumulator, roflScore) => accumulator + roflScore, 0);
    return totalScore;
  };

  return (
    !currentRoster
      ? <Loading />
      : (
        <>
          <MonthSelector selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
          <Container>
            <HeaderLabel>Slot</HeaderLabel>
            <HeaderLabel>Team</HeaderLabel>
            <HeaderLabel>Action</HeaderLabel>
            <HeaderLabel>Points</HeaderLabel>
            {
            // renders league slots then flex slots then total points then bench slots
            ['league', 'flex', 'total', 'bench'].map((slotType) => (
              slotType === 'total'
                ? <Slot totalScore={calculateTotalScore()} isTotalPoints />
                : Object.keys(currentRoster).filter(
                  (key) => key.includes(slotType),
                ).map((league) => {
                  const team = currentRoster[league];
                  return <Slot isLocked={team.isLocked} key={league} changeRoster={changeRoster} leagueKey={league} selectedSlot={selectedSlot} points={team.roflScore} teamName={`${team.city} ${team.name}`} slotName={slotType === 'league' ? leagueIdSlotNameTable[league.split('_')[1]] : slotType} />;
                })
            ))
        }
          </Container>
        </>
      )
  );
}

export default Roster;

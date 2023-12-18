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
    grid-template-columns: ${(props) => (props.readOnly ? '1fr 2fr 1fr' : '1fr 3fr repeat(2, 1fr);')}; 
    grid-template-rows: repeat(4, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    width: 90%;
    & div:nth-child(${(props) => props.number}n+${(props) => props.number + 1}){
        background-color: #F7FBFF;
    }
    & div:nth-child(${(props) => props.number}n+${(props) => props.number + 2}){
        background-color: #F7FBFF;
    }
    & div:nth-child(${(props) => props.number}n+${(props) => props.number + 3}){
        background-color: #F7FBFF;
    }
    & div:nth-child(${(props) => props.number}n+12){
        background-color: ${(props) => (props.readOnly ? null : '#F7FBFF')};
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

function Roster({ readOnly, userId }) {
  const {
    selectedYear,
    selectedMonth,
    roster,
    selectedSlot,
    setSelectedMonth,
    changeRoster,
  } = useRoster(userId);

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
          <Container number={readOnly ? 6 : 8} readOnly={readOnly}>
            <HeaderLabel>Slot</HeaderLabel>
            <HeaderLabel>Team</HeaderLabel>
            {readOnly ? null : <HeaderLabel>Action</HeaderLabel>}
            <HeaderLabel>Points</HeaderLabel>
            {
            // renders league slots then flex slots then total points then bench slots
            ['league', 'flex', 'total', 'bench'].map((slotType, i) => (
              slotType === 'total'
                ? <Slot key={`${slotType}-${i}}`} readOnly={readOnly} totalScore={calculateTotalScore()} isTotalPoints />
                : Object.keys(currentRoster).filter(
                  (key) => key.includes(slotType),
                ).map((league) => {
                  const team = currentRoster[league];
                  return <Slot readOnly={readOnly} isLocked={team.isLocked} key={league} changeRoster={changeRoster} leagueKey={league} selectedSlot={selectedSlot} points={team.roflScore} teamName={`${team.city} ${team.name}`} slotName={slotType === 'league' ? leagueIdSlotNameTable[league.split('_')[1]] : slotType} />;
                })
            ))
        }
          </Container>
        </>
      )
  );
}

export default Roster;

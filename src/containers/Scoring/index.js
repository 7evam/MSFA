import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { mobileBreakPoint } from '../../constants/style';
import useScoring from './useScoring';
import MonthSelector from '../../components/MonthSelector';
import Score from './Score';
import Records from './Records';
import Scheme from './Scheme';

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  @media (max-width: ${mobileBreakPoint}){
      width: 100vw;
  }
`;

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

const Selectors = styled.div`
  padding: 0px 25%;
  margin-bottom: 10px;
  font-size: 18px;
`;

const LeagueSelectors = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const League = styled.p`
  margin: 0px 10px;
  text-decoration: underline;
  font-weight: ${(props) => (props.selected ? '800' : '400')}; 
  &:hover{
    font-weight: 800;
    cursor: pointer;
}
`;

const ViewSelectors = styled.div`
display: flex;
flex-direction: row;
align-items: center;
`;

const View = styled.p`
margin: 0px 10px;
text-decoration: underline;
font-weight: ${(props) => (props.selected ? '800' : '400')}; 
&:hover{
    font-weight: 800;
    cursor: pointer;
}
`;

function Scoring() {
  const {
    playoffMonths,
    selectedYear,
    league,
    selectedMonth,
    sportTeams,
    scores,
    firstMonthForDisplay,
    finalMonthForDisplay,
    setSelectedMonth,
    display,
    readyToRender,
    changeLeague,
    filteredPoints,
    filteredRecords,
    finalLeagueToShow,
    changeDisplay,
  } = useScoring();

  const displaySwitch = (display) => {
    switch (display) {
      case 'score': return (
        <Score
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          finalMonthForDisplay={finalMonthForDisplay}
          league={league}
          scores={scores}
          sportTeams={sportTeams}
          filteredPoints={filteredPoints}
          selectedYear={selectedYear}
          firstMonthForDisplay={firstMonthForDisplay}
        />
      );
      case 'records': return <Records firstMonthForDisplay={firstMonthForDisplay} sportTeams={sportTeams} selectedYear={selectedYear} filteredRecords={filteredRecords} league={league} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} finalMonthForDisplay={finalMonthForDisplay} />;
      case 'scheme': return <Scheme league={league} scheme={scores.scheme[league]} />;
      default: return <p>error</p>;
    }
  };

  return (
    <Container>
      <Selectors>
        <LeagueSelectors>
          <p>League:</p>
          <League selected={league === 1} onClick={() => changeLeague(1)}>MLB</League>
          {' |'}
          <League selected={league === 2} onClick={() => changeLeague(2)}>NFL</League>
          {' |'}
          <League selected={league === 3} onClick={() => changeLeague(3)}>NHL</League>
          {' |'}
          <League selected={league === 4} onClick={() => changeLeague(4)}>NBA</League>
        </LeagueSelectors>
        <ViewSelectors>
          <p>View:</p>
          <View selected={display === 'score'} onClick={() => changeDisplay('score')}>Score</View>
          |
          <View selected={display === 'records'} onClick={() => changeDisplay('records')}>Records</View>
          |
          <View selected={display === 'scheme'} onClick={() => changeDisplay('scheme')}>Scheme</View>
        </ViewSelectors>
      </Selectors>
      {displaySwitch(display)}
    </Container>
  );
}

export default Scoring;

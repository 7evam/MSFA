import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import useApi from '../../hooks/useApi';
import MonthTicker from '../../components/MonthTicker';
import ScoringTable from './ScoringTable';
import RecordsTable from './RecordsTable';
import Scheme from './Scheme';
import useHydration from '../../hooks/useHydration';
import Loading from '../../components/Loading';
import { lightBlue, mobileBreakPoint } from '../../constants/style';

import {
  Container,
  LeagueSelector,
  DisplaySelector,
  ScItem,
  League,
} from './components';
import useScoring from './useScoring';

const Total = styled.p`
display: flex;
margin:0;
margin-top: 5px;
  flex-direction: row;
  justify-content: space-evenly;
  background-color: ${lightBlue};
  height: 30px;
  align-items: center;
  width: 700px;
  font-weight: ${(props) => (props.totalSelected ? '800' : '400')}; 
  &:hover {
    font-weight: 700;
    text-decoration: underline;
    cursor: pointer;
  }
  @media (max-width: ${mobileBreakPoint}){
    width: 100vw;
  }

`;

function Scoring() {
  const {
    playoffMonths,
    selectedYear,
    league,
    roflMonth,
    sportTeams,
    scores,
    firstMonthForDisplay,
    finalMonthForDisplay,
    setRoflMonth,
    display,
    readyToRender,
    changeLeague,
    filteredPoints,
    filteredRecords,
    finalLeagueToShow,
    changeDisplay,
  } = useScoring();

  const renderSwitch = (componentToRender) => {
    switch (componentToRender) {
      case 'scheme':
        return <Scheme scheme={scores.scheme[league]} league={league} />;
      case 'score': return (
        scores.records[league] ? (
          <>
            <Total
              onClick={() => setRoflMonth('total')}
              totalSelected={roflMonth === 'total'}
            >
              Full Season Score
            </Total>
            <MonthTicker
              roflMonth={roflMonth}
              setRoflMonth={setRoflMonth}
              selectedYear={selectedYear}
              finalMonthForDisplay={finalMonthForDisplay}
              firstMonthForDisplay={firstMonthForDisplay}
            />
            <ScoringTable
              league={league}
              roflMonth={roflMonth}
              scores={scores}
              roflYear={selectedYear}
              sportTeams={sportTeams}
              filteredPoints={filteredPoints}
            />
          </>
        ) : (
          <p>This League is not active</p>
        )
      );
      case 'records': return (
        scores.records[league] ? (
          <>
            <MonthTicker
              roflMonth={roflMonth}
              setRoflMonth={setRoflMonth}
              selectedYear={selectedYear}
              finalMonthForDisplay={finalMonthForDisplay}
              firstMonthForDisplay={firstMonthForDisplay}
            />
            <RecordsTable
              league={league}
              roflMonth={roflMonth}
              scores={scores}
              roflYear={selectedYear}
              sportTeams={sportTeams}
              playoffs={playoffMonths[selectedYear][league] === roflMonth}
              filteredRecords={filteredRecords}
            />
          </>
        ) : (
          <p>This League is not active</p>
        )
      );
      default:
        return <div>error</div>;
    }
  };

  return (
    <Container>
      {readyToRender ? (
        <div>
          <LeagueSelector>
            <League selected={league === 1} onClick={() => changeLeague(1)}>
              MLB
            </League>
            <League selected={league === 2} onClick={() => changeLeague(2)}>
              NFL
            </League>
            <League selected={league === 3} onClick={() => changeLeague(3)}>
              NHL
            </League>
            <League selected={league === 4} onClick={() => changeLeague(4)}>
              NBA
            </League>
          </LeagueSelector>
          <DisplaySelector>
            {
              finalLeagueToShow >= league ? (
                <ScItem
                  selected={display === 'score'}
                  onClick={() => changeDisplay('score')}
                >
                  Score
                </ScItem>
              ) : null
            }
            |
            {
              finalLeagueToShow >= league ? (
                <ScItem
                  selected={display === 'records'}
                  onClick={() => changeDisplay('records')}
                >
                  Records
                </ScItem>
              ) : null
            }
            |
            <ScItem
              selected={display === 'scheme'}
              onClick={() => changeDisplay('scheme')}
            >
              Scheme
            </ScItem>
          </DisplaySelector>
          {renderSwitch(display)}
        </div>
      ) : <Loading />}
    </Container>
  );
}

export default Scoring;

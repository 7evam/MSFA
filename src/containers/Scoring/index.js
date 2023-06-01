import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useApi from '../../hooks/useApi';
import MonthTicker from '../../components/MonthTicker';
import ScoringTable from './ScoringTable';
import RecordsTable from './RecordsTable';
import Scheme from './Scheme';
import useHydration from '../../hooks/useHydration';
import Loading from '../../components/Loading';

import {
  Container,
  LeagueSelector,
  DisplaySelector,
  ScItem,
  League,
} from './components';
import useScoring from './useScoring';

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
    setDisplay,
    readyToRender,
    changeLeague,
    filteredPoints,
    filteredRecords,
    finalLeagueToShow,
  } = useScoring();

  const renderSwitch = (componentToRender) => {
    switch (componentToRender) {
      case 'scheme':
        return <Scheme scheme={scores.scheme[league]} league={league} />;
      case 'score': return (
        scores.records[league] ? (
          <>
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
      { readyToRender ? (
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
                  onClick={() => setDisplay('score')}
                >
                  Score
                </ScItem>
              ) : null
            }
            {
              finalLeagueToShow >= league ? (
                <ScItem
                  selected={display === 'records'}
                  onClick={() => setDisplay('records')}
                >
                  Records
                </ScItem>
              ) : null
            }
            <ScItem
              selected={display === 'scheme'}
              onClick={() => setDisplay('scheme')}
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

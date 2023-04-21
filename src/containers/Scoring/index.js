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

function Scoring() {
  const { currentOrganization } = useSelector((state) => ({
    ...state.authReducer,
  }));

  const {
    activeYears,
    startingMonths,
    playoffMonths,
    sportTeams,
    selectedYear,
  } = useSelector((state) => ({
    ...state.sportReducer,
  }));

  const { makeRequest } = useApi();

  const { hydrateSportTeams, hydrateActiveYears } = useHydration();

  const [scores, setScores] = useState(null);
  const [roflMonth, setRoflMonth] = useState(null);
  const [league, setLeague] = useState(null);
  const [finalMonthForDisplay, setFinalMonthForDisplay] = useState(null);
  const [display, setDisplay] = useState('score');
  const [firstMonthForDisplay, setFirstMonthForDisplay] = useState(null);
  const [readyToRender, setReadyToRender] = useState(false);
  // const [renderCount, setRenderCount] = useState(0);
  const [error, setError] = useState(null);

  // find the current, first and last rofl month for display
  const setDisplayMonthRange = (selectedLeague) => {
    const newFinalMonth = activeYears[selectedYear][selectedLeague]
      ? activeYears[selectedYear][selectedLeague].roflMonth
      : playoffMonths[selectedYear][selectedLeague];
    const newStartingMonth = startingMonths[selectedYear][selectedLeague];
    const newCurrentMonth = roflMonth > newStartingMonth && roflMonth < newFinalMonth
      ? roflMonth
      : newFinalMonth;
    setFinalMonthForDisplay(newFinalMonth);
    setFirstMonthForDisplay(newStartingMonth);
    setRoflMonth(newCurrentMonth);
  };

  const calculateMonthsToDisplay = (records) => {
    const allMonths = [];
    Object.keys(records).forEach((leagueId) => {
      Object.keys(records[leagueId]).forEach((monthKey) => {
        allMonths.push(Number(monthKey.split('-')[0]));
      });
    });
    setFinalMonthForDisplay(Math.max(...allMonths));
    // PROBLEM on re-render 2023 is defined in startingMonths
    setFirstMonthForDisplay(startingMonths[selectedYear][league]);
  };

  const fetchScores = async (abortController) => {
    const res = await makeRequest({
      method: 'get',
      route: `/sports/scores/${currentOrganization.id}/${selectedYear}`,
      abort: abortController,
    });
    if (res.statusCode === 200) {
      const scores = res.body;
      calculateMonthsToDisplay(scores.records);
      setScores(scores);
    }
  };

  // --use effects for initial render--

  // this function runs on page load and makes all api requests
  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      //   firstMonthForDisplay
      //   finalMonthForDisplay
      //   league
      //   scores
      //   sportTeams
      try {
        await fetchScores(abortController);
        if (!sportTeams) await hydrateSportTeams(abortController);
        if (!activeYears) await hydrateActiveYears(abortController);
        const activeLeagueArray = Object.keys(activeYears[selectedYear]);
        const startingActiveLeague = Math.min(...activeLeagueArray);
        setLeague(startingActiveLeague);
        setDisplayMonthRange(startingActiveLeague);
        setReadyToRender(true);
      } catch (e) {
        setError(error);
      }
      return () => abortController.abort();
    }
    fetchData();
  }, []);

  // when all api requests have been made, update state derrived from api calls
  //   useEffect(() => {
  //     if (scores && activeYears && !readyToRender) {
  //       const activeLeagueArray = Object.keys(activeYears[selectedYear]);
  //       const startingActiveLeague = Math.min(...activeLeagueArray);
  //       setLeague(startingActiveLeague);
  //       setDisplayMonthRange(startingActiveLeague);
  //     }
  //   }, [scores, league, finalMonthForDisplay, firstMonthForDisplay]);

  // if all derrived state has been set, the app must be ready to render
  // useEffect(() => {
  //   if (
  //     firstMonthForDisplay
  //     && finalMonthForDisplay
  //     && league
  //     && scores
  //     && sportTeams
  //     && !readyToRender
  //     && !reLoading
  //   ) {
  //     setReadyToRender(true);
  //   }
  // }, [scores, league, finalMonthForDisplay, firstMonthForDisplay, sportTeams, reLoading]);

  // initial requests functiioin
  //   const makeInitialRequests = async (abortController) => {
  //     console.log('stp 1');

  //     console.log('step 2');
  //   };

  //  --post initial render use effect--

  //  change data on league change
  useEffect(() => {
    async function reCalculate() {
      setReadyToRender(false);
      await setDisplayMonthRange(league);
      setReadyToRender(true);
    }
    if (readyToRender) reCalculate();
  }, [league]);

  //  change data on year change
  useEffect(() => {
    async function refetchData() {
      setReadyToRender(false);
      const abortController = new AbortController();
      try {
        console.log('before refetch scores');
        await fetchScores(abortController);
        console.log('after refetch scorees');
        const activeLeagueArray = Object.keys(activeYears[selectedYear]);
        const startingActiveLeague = Math.min(...activeLeagueArray);
        setLeague(startingActiveLeague);
        setDisplayMonthRange(startingActiveLeague);
        setReadyToRender(true);
      } catch (e) {
        setError(error);
      }
      setReadyToRender(true);
      return () => abortController.abort();
    }
    if (readyToRender) refetchData();
  }, [selectedYear]);

  // useEffect(() => {
  //   setReadyToRender(false);
  //   if (selectedYear) {
  //     makeInitialRequests();
  //   }
  // }, [selectedYear]);

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
              selectedRoflYear={selectedYear}
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
      {!readyToRender && <Loading />}
      { readyToRender && (
        <div>
          <LeagueSelector>
            <League selected={league === 1} onClick={() => setLeague(1)}>
              MLB
            </League>
            <League selected={league === 2} onClick={() => setLeague(2)}>
              NFL
            </League>
            <League selected={league === 3} onClick={() => setLeague(3)}>
              NHL
            </League>
            <League selected={league === 4} onClick={() => setLeague(4)}>
              NBA
            </League>
          </LeagueSelector>
          <DisplaySelector>
            <ScItem
              selected={display === 'score'}
              onClick={() => setDisplay('score')}
            >
              Score
            </ScItem>
            <ScItem
              selected={display === 'records'}
              onClick={() => setDisplay('records')}
            >
              Records
            </ScItem>
            <ScItem
              selected={display === 'scheme'}
              onClick={() => setDisplay('scheme')}
            >
              Scheme
            </ScItem>
          </DisplaySelector>
          {renderSwitch(display)}
        </div>
      )}
    </Container>
  );
}

export default Scoring;

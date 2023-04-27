import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useApi from '../../hooks/useApi';
import useHydration from '../../hooks/useHydration';

function useScoring() {
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

  // this function runs on page load and makes all api requests
  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
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
        await fetchScores(abortController);
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

  return {
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
    setLeague,
  };
}

export default useScoring;

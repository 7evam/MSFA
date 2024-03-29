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
  const [filteredPoints, setFilteredPoints] = useState(null);
  const [filteredRecords, setFilteredRecords] = useState(null);
  const [finalLeagueToShow, setFinalLeagueToShow] = useState(null);

  const formatPoints = (pointsData, league, roflMonth, year, fetchedSportTeams) => {
    const teamTable = sportTeams || fetchedSportTeams;
    if (pointsData[league][`${roflMonth}-${year}`]) {
      const result = [];
      Object.keys(pointsData[league][`${roflMonth}-${year}`]).forEach((teamId) => {
        result.push({
          id: teamId,
          teamName: `${teamTable[league][teamId].city} ${teamTable[league][teamId].name}`,
          points: pointsData[league][`${roflMonth}-${year}`][teamId],
        });
      });
      return result;
    }
    if (league === 1) {
      setRoflMonth(1);
    }
    if (league === 2) {
      setRoflMonth(6);
    }
    if (league === 3 || league === 4) {
      setRoflMonth(7);
    }

    // setError('points data formatted wrong');
    // throw new Error('points data ormatted wrong');
  };

  // calculate and set the first and last rofl month for display
  // if set current is set to true, function will also calcualte set and return the current rofl month
  const setDisplayMonthRange = (selectedLeague, setCurrent, fetchedActiveYears) => {
    const startingMonths = {
      2022: {
        1: 1,
        2: 6,
        3: 7,
        4: 7,
      },
      2023: {
        1: 1,
        2: 6,
        3: 7,
        4: 7,
      },
    };

    const playoffMonths = {
      2022: {
        1: 7,
        2: 10,
        3: 13,
        4: 13,
      },
      2023: {
        1: 7,
        2: 10,
        3: 13,
        4: 13,
      },
    };

    const existingActiveYears = fetchedActiveYears || activeYears;

    const newFinalMonth = existingActiveYears[selectedYear][selectedLeague]
      ? existingActiveYears[selectedYear][selectedLeague].roflMonth
      : playoffMonths[selectedYear][selectedLeague];

    const newStartingMonth = startingMonths[selectedYear][selectedLeague];
    setFinalMonthForDisplay(newFinalMonth);
    setFirstMonthForDisplay(newStartingMonth);
    if (setCurrent) {
      const newCurrentMonth = roflMonth > newStartingMonth && roflMonth < newFinalMonth
        ? roflMonth
        : newFinalMonth;
      setRoflMonth(newCurrentMonth);
      return newCurrentMonth;
    }
  };

  const calculateMonthsToDisplay = (records) => {
    const startingMonths = {
      2022: {
        1: 1,
        2: 6,
        3: 7,
        4: 7,
      },
      2023: {
        1: 1,
        2: 6,
        3: 7,
        4: 7,
      },
    };
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
      return scores;
    }
  };

  const calculateActiveLeagues = (fetchedActiveYears) => {
    const existingActiveYears = activeYears || fetchedActiveYears;
    return Object.keys(existingActiveYears[selectedYear]);
  };

  // this function runs on page load and makes all api requests
  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      try {
        const fetchedData = await fetchScores(abortController);
        let fetchedSportTeams;
        if (!sportTeams) {
          fetchedSportTeams = await hydrateSportTeams(abortController);
        }
        let fetchedActiveYears;
        if (!activeYears) {
          fetchedActiveYears = await hydrateActiveYears(abortController);
          fetchedActiveYears = fetchedActiveYears.activeYears;
        }
        const activeLeagues = calculateActiveLeagues(fetchedActiveYears);
        setFinalLeagueToShow(Math.max(...activeLeagues));
        const startingActiveLeague = Math.min(...activeLeagues);
        setLeague(startingActiveLeague);
        const initialRoflMonth = setDisplayMonthRange(startingActiveLeague, true, fetchedActiveYears);
        setFilteredPoints(
          formatPoints(fetchedData.points, startingActiveLeague, initialRoflMonth, selectedYear, fetchedSportTeams),
        );
        setFilteredRecords(fetchedData.records[startingActiveLeague][`${initialRoflMonth}-${selectedYear}`]);
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
      await setDisplayMonthRange(league, false);
      setFilteredPoints(formatPoints(scores.points, league, roflMonth, selectedYear));
      setFilteredRecords(scores.records[league][`${roflMonth}-${selectedYear}`]);
      setReadyToRender(true);
    }
    if (readyToRender && league <= finalLeagueToShow) reCalculate();
  }, [league, roflMonth]);

  //  change data on year change
  useEffect(() => {
    async function refetchData() {
      setReadyToRender(false);
      const abortController = new AbortController();
      try {
        const fetchedData = await fetchScores(abortController);
        const activeLeagues = Object.keys(activeYears[selectedYear]);
        setFinalLeagueToShow(Math.max(...activeLeagues));
        const startingActiveLeague = Math.min(...activeLeagues);
        setLeague(startingActiveLeague);
        const newRoflMonth = setDisplayMonthRange(startingActiveLeague, true);
        setFilteredPoints(
          formatPoints(fetchedData.points, startingActiveLeague, newRoflMonth, selectedYear),
        );
        setFilteredRecords(fetchedData.records[startingActiveLeague][`${newRoflMonth}-${selectedYear}`]);
        setReadyToRender(true);
      } catch (e) {
        setError(error);
      }
      setReadyToRender(true);
      return () => abortController.abort();
    }
    if (readyToRender) refetchData();
  }, [selectedYear]);

  const changeLeague = (newLeague) => {
    if (newLeague > finalLeagueToShow) setDisplay('scheme');
    setLeague(newLeague);
  };

  const changeDisplay = (newDisplay) => {
    if (roflMonth === 'total') {
      if (league === 1) {
        setRoflMonth(1);
      }
      if (league === 2) {
        setRoflMonth(6);
      }
      if (league === 3 || league === 4) {
        setRoflMonth(7);
      }
    }
    setDisplay(newDisplay);
  };

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
    changeLeague,
    filteredPoints,
    filteredRecords,
    finalLeagueToShow,
    changeDisplay,
  };
}

export default useScoring;
